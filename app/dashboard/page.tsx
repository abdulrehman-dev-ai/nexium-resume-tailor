'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../../lib/supabase'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface OptimizationResult {
  id: string
  originalResume: string
  jobDescription: string
  optimizedResume: string
  matchScore: number
  suggestions: string[]
  keywords: string[]
  createdAt: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [uploadId, setUploadId] = useState<string | null>(null)
  const [optimizing, setOptimizing] = useState(false)
  const [result, setResult] = useState<OptimizationResult | null>(null)
  const [history, setHistory] = useState<OptimizationResult[]>([])
  const [dragActive, setDragActive] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error) {
          console.error('Auth error:', error)
          setLoading(false)
          router.replace('/login')
          return
        }
        
        setUser(user)
        setLoading(false)
        
        if (!user) {
          router.replace('/login')
        } else {
          // Add a small delay to ensure the session is fully established
          setTimeout(() => {
            fetchHistory()
          }, 100)
        }
      } catch (error) {
        console.error('Auth error:', error)
        setLoading(false)
        router.replace('/login')
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        if (event === 'SIGNED_OUT' || !session) {
          setUser(null)
          setHistory([])
          router.replace('/login')
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setUser(session.user)
          setLoading(false)
          // Refetch history when user signs in or token is refreshed
          setTimeout(() => {
            fetchHistory()
          }, 100)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router, supabase.auth])

  const fetchHistory = async () => {
    try {
      // Check if user is still authenticated before making the request
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        console.log('User not authenticated, redirecting to login')
        router.replace('/login')
        return
      }

      const response = await fetch('/api/optimizations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent
      })
      
      if (response.status === 401) {
        console.log('Authentication failed, redirecting to login')
        await supabase.auth.signOut()
        router.replace('/login')
        return
      }
      
      if (response.ok) {
        const data = await response.json()
        // Handle the correct response structure
        const optimizations = data.data || data.optimizations || []
        // Transform the data to match our interface
        const transformedHistory = optimizations.map((opt: any) => ({
          id: opt._id || opt.id,
          originalResume: opt.originalResume || '',
          jobDescription: opt.jobDescription || '',
          optimizedResume: opt.optimizedResume || '',
          matchScore: opt.matchScore || 0,
          suggestions: opt.suggestions || [],
          keywords: opt.keywordAnalysis?.present || [],
          createdAt: opt.createdAt || new Date().toISOString()
        }))
        setHistory(transformedHistory)
      } else {
        console.error('Failed to fetch history:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error fetching history:', error)
      // If it's a network error, it might be an auth issue
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.log('Network error, checking authentication...')
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.replace('/login')
        }
      }
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    console.log('handleFileUpload called with file:', file)
    console.log('File type:', file.type, 'File name:', file.name, 'File size:', file.size)
    
    // Professional file validation
    const allowedExtensions = ['pdf', 'docx', 'doc', 'txt']
    const fileExtension = file.name.toLowerCase().split('.').pop()
    
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      alert(`Unsupported file type. Please upload:\n\n• PDF files (.pdf)\n• Word documents (.docx, .doc)\n• Text files (.txt)\n\nCurrent file: ${file.name}`)
      return
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size too large. Please upload a file smaller than 10MB.')
      return
    }

    setResumeFile(file)
    setIsLoading(true)
    
    try {
      console.log('Uploading file to document parser API...')
      
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('file', file)
      
      // Check authentication before uploading
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        throw new Error('Authentication required. Please log in again.')
      }

      // Send to enhanced upload-resume API for better MongoDB integration
      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        credentials: 'include', // Ensure cookies are sent
        body: formData
      })
      
      if (response.status === 401) {
        await supabase.auth.signOut()
        router.replace('/login')
        throw new Error('Session expired. Please log in again.')
      }
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to parse document')
      }
      
      if (!result.success || !result.data?.text) {
        throw new Error(result.error || 'Document parsing failed - no text extracted')
      }
      
      console.log('Document uploaded and parsed successfully:')
      console.log('- Upload ID:', result.data.uploadId)
      console.log('- File type:', result.data.fileType)
      console.log('- Word count:', result.data.wordCount)
      console.log('- Text length:', result.data.text.length)
      console.log('- First 100 chars:', result.data.text.substring(0, 100))
      
      // Store the upload information
      setResumeText(result.data.text)
      setUploadId(result.data.uploadId)
      setActiveStep(2)
      
      // Show success message
      const fileTypeDisplay = result.data.fileType.toUpperCase()
      console.log(`✅ ${fileTypeDisplay} file uploaded and processed successfully! Extracted ${result.data.wordCount} words.`)
      
    } catch (error) {
      console.error('Error processing file:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(`Error processing file: ${errorMessage}\n\nPlease try:\n• A different file format\n• Ensuring the file isn't corrupted\n• Checking file permissions`)
    } finally {
      setIsLoading(false)
    }
  }

  // Document parsing is now handled server-side via /api/parse-document

  const handleOptimize = async () => {
    if (!resumeText || !jobDescription) {
      alert('Please provide both resume and job description')
      return
    }

    // Validate inputs
    if (resumeText.length < 100) {
      alert('Resume text seems too short. Please ensure your resume contains sufficient content.')
      return
    }

    if (jobDescription.length < 50) {
      alert('Job description seems too short. Please provide a more detailed job description.')
      return
    }

    setOptimizing(true)
    setActiveStep(3)

    try {
      console.log('Starting resume optimization...')
      console.log('Resume length:', resumeText.length)
      console.log('Job description length:', jobDescription.length)

      const response = await fetch('/api/optimize-resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Ensure cookies are sent
          body: JSON.stringify({
            resumeText,
            jobDescription,
          }),
        })

      const responseData = await response.json()
      console.log('Optimization response:', responseData)

      if (response.ok && responseData.success) {
        // Extract the actual data from the nested response
        const result = {
          id: responseData.data.optimizationId,
          originalResume: resumeText,
          jobDescription: jobDescription,
          optimizedResume: responseData.data.optimizedResume,
          matchScore: responseData.data.matchScore,
          suggestions: responseData.data.suggestions || [],
          keywords: responseData.data.keywordAnalysis?.present || [],
          createdAt: new Date().toISOString()
        }
        setResult(result)
        setActiveStep(4)
        console.log('Optimization completed successfully!')
        
        // Refresh history to show the new optimization
        await fetchHistory()
      } else {
        const errorMessage = responseData.error || 'Optimization failed'
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error('Error optimizing resume:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(`Error optimizing resume: ${errorMessage}\n\nPlease try again or contact support if the issue persists.`)
      setActiveStep(2)
    } finally {
      setOptimizing(false)
    }
  }

  const resetProcess = () => {
    setActiveStep(1)
    setResumeFile(null)
    setResumeText('')
    setJobDescription('')
    setUploadId(null)
    setResult(null)
  }

  const generatePDF = async (resumeContent: string) => {
    try {
      // Create a temporary div with professional resume formatting
      const tempDiv = document.createElement('div')
      tempDiv.style.cssText = `
        position: absolute;
        left: -9999px;
        width: 8.5in;
        background: white;
        padding: 0.75in;
        font-family: 'Times New Roman', serif;
        font-size: 11pt;
        line-height: 1.4;
        color: #000;
      `
      
      // Format the resume content for PDF
      const formattedContent = formatResumeForPDF(resumeContent)
      tempDiv.innerHTML = formattedContent
      document.body.appendChild(tempDiv)
      
      // Generate PDF using html2canvas and jsPDF
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 295 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      
      let position = 0
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      
      // Clean up
      document.body.removeChild(tempDiv)
      
      // Download the PDF
      pdf.save('optimized-resume.pdf')
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  const formatResumeForPDF = (content: string): string => {
    // Convert plain text resume to HTML with professional formatting
    const lines = content.split('\n')
    let html = ''
    let inSection = false
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (!line) {
        html += '<br>'
        continue
      }
      
      // Check if line is a section header
      if (line.match(/^[A-Z\s]+$/) && line.length > 3 && !line.includes('•')) {
        html += `<h2 style="font-size: 14pt; font-weight: bold; margin: 16pt 0 8pt 0; border-bottom: 1px solid #000; padding-bottom: 2pt;">${line}</h2>`
        inSection = true
      }
      // Check if line starts with bullet point
      else if (line.startsWith('•')) {
        html += `<p style="margin: 4pt 0 4pt 20pt; text-indent: -20pt;">${line}</p>`
      }
      // Check if line looks like a job title or company
      else if (line.includes(' - ') || line.match(/\d{4}/)) {
        html += `<p style="font-weight: bold; margin: 8pt 0 4pt 0;">${line}</p>`
      }
      // Regular content
      else {
        html += `<p style="margin: 4pt 0;">${line}</p>`
      }
    }
    
    return html
   }

   const formatResumeForDisplay = (content: string): string => {
     // Convert plain text resume to HTML for better web display
     const lines = content.split('\n')
     let html = ''
     
     for (const line of lines) {
       const trimmedLine = line.trim()
       
       if (!trimmedLine) {
         html += '<br>'
         continue
       }
       
       // Section headers (all caps)
       if (trimmedLine.match(/^[A-Z\s]+$/) && trimmedLine.length > 3 && !trimmedLine.includes('•')) {
         html += `<div style="font-weight: bold; font-size: 16px; color: #1f2937; margin: 16px 0 8px 0; border-bottom: 2px solid #3b82f6; padding-bottom: 4px;">${trimmedLine}</div>`
       }
       // Bullet points
       else if (trimmedLine.startsWith('•')) {
         html += `<div style="margin: 4px 0 4px 16px; color: #374151;">${trimmedLine}</div>`
       }
       // Job titles, companies, dates
       else if (trimmedLine.includes(' - ') || trimmedLine.match(/\d{4}/)) {
         html += `<div style="font-weight: 600; margin: 8px 0 4px 0; color: #1f2937;">${trimmedLine}</div>`
       }
       // Regular content
       else {
         html += `<div style="margin: 4px 0; color: #374151;">${trimmedLine}</div>`
       }
     }
     
     return html
   }
 
   if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RT</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Resume Tailor AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  activeStep >= step 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {activeStep > step ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                    activeStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center space-x-8 text-sm">
            <span className={activeStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>Upload Resume</span>
            <span className={activeStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>Job Description</span>
            <span className={activeStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}>AI Analysis</span>
            <span className={activeStep >= 4 ? 'text-blue-600 font-medium' : 'text-gray-500'}>Results</span>
          </div>
        </div>

        {/* Step 1: Upload Resume */}
        {activeStep === 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Upload Your Resume</h2>
              
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="mb-4">
                  <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Drag & drop your resume here</h3>
                <p className="text-gray-500 mb-6">or click to browse files</p>
                
                <input
                  type="file"
                  accept=".docx,.doc,.txt,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,text/plain"
                  onChange={(e) => {
                    console.log('File input changed:', e.target.files)
                    if (e.target.files && e.target.files[0]) {
                      console.log('Selected file:', e.target.files[0])
                      handleFileUpload(e.target.files[0])
                    }
                  }}
                  className="hidden"
                  id="resume-upload"
                  disabled={isLoading}
                />
                
                <label
                  htmlFor="resume-upload"
                  className={`px-6 py-3 rounded-lg font-medium inline-block transition-colors ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    'Choose File'
                  )}
                </label>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 font-medium mb-2">Supported formats:</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-2">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">PDF</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">DOCX</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">DOC</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">TXT</span>
                  </div>
                  <p className="text-xs text-green-600 mb-3">✅ All document formats supported. PDF files must contain selectable text.</p>
                  <p className="text-xs text-gray-500">
                    📄 Professional document parsing • 🔒 Secure processing • ⚡ Fast extraction
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Job Description */}
        {activeStep === 2 && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Add Job Description</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">Your Resume</h3>
                  <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
                    <p className="text-sm text-gray-600">{resumeText || 'Resume content will appear here...'}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">Job Description</h3>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here..."
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  onClick={resetProcess}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleOptimize}
                  disabled={!jobDescription.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg transition-colors font-medium flex items-center space-x-2"
                >
                  <span>Optimize Resume</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: AI Processing */}
        {activeStep === 3 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="mb-6">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">AI is Optimizing Your Resume</h2>
                <p className="text-gray-600">Please wait while our AI analyzes your resume and job description...</p>
              </div>
              
              <div className="space-y-2 text-left">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Analyzing job requirements</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Extracting keywords</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Generating optimizations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Calculating match score</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {activeStep === 4 && result && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Optimization Complete!</h2>
                <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <span className="text-2xl font-bold mr-2">{result.matchScore}%</span>
                  <span>Match Score</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-700">Original Resume</h3>
                  <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{result.originalResume}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-700">Optimized Resume</h3>
                  <div className="bg-blue-50 rounded-lg p-4 h-64 overflow-y-auto">
                    <div className="text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed" 
                         dangerouslySetInnerHTML={{ __html: formatResumeForDisplay(result.optimizedResume) }} />
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-700">Suggestions</h3>
                  <div className="space-y-2">
                    {(result.suggestions || []).map((suggestion, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-600">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-700">Key Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {(result.keywords || []).map((keyword, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => generatePDF(result.optimizedResume)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download PDF</span>
                </button>
                
                <button
                  onClick={resetProcess}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Optimize Another
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History Section */}
        {history.length > 0 && activeStep === 1 && (
          <div className="mt-12 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Recent Optimizations</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {history.slice(0, 6).map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-lg font-semibold text-blue-600">{item.matchScore}%</span>
                      <span className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.jobDescription.substring(0, 100)}...</p>
                    <div className="flex flex-wrap gap-1">
                      {(item.keywords || []).slice(0, 3).map((keyword, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}