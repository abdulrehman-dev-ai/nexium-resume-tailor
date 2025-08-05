'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../components/Navbar'

export default function Documentation() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('getting-started')

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: '🚀' },
    { id: 'upload-resume', title: 'Upload Resume', icon: '📄' },
    { id: 'job-matching', title: 'Job Matching', icon: '🎯' },
    { id: 'ai-optimization', title: 'AI Optimization', icon: '🤖' },
    { id: 'export-formats', title: 'Export Formats', icon: '💾' },
    { id: 'api-reference', title: 'API Reference', icon: '⚡' },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: '🔧' },
    { id: 'faq', title: 'FAQ', icon: '❓' }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Getting Started with Resume Tailor AI</h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-xl p-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                    <span className="text-white text-2xl">🚀</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Welcome to Resume Tailor AI!</h3>
                  <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                    Transform your resume with cutting-edge AI technology. Our platform provides intelligent analysis 
                    and personalized optimization to maximize your career opportunities.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white text-xl">🎯</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Smart AI Analysis</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Advanced AI algorithms analyze your resume's content, structure, keywords, and formatting for comprehensive insights.
                    </p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white text-xl">📊</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Detailed Reports</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Receive comprehensive feedback with actionable suggestions, keyword optimization, and industry-specific recommendations.
                    </p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white text-xl">⚡</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Instant Results</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Get your optimized resume in seconds with real-time processing and immediate download capabilities.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white text-lg">📋</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Quick Start Guide</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-6 mt-1 shadow-lg">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg mb-2 flex items-center">
                        📤 Create Account & Upload Resume
                        <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Easy</span>
                      </h4>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Sign up for free and upload your current resume in PDF, DOC, or DOCX format. Our system supports all major file types and ensures secure processing.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Free Account</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">PDF Recommended</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Secure Upload</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-6 mt-1 shadow-lg">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg mb-2 flex items-center">
                        🎯 Add Job Description (Optional)
                        <span className="ml-3 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">Recommended</span>
                      </h4>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Paste the job description you're targeting for personalized optimization. This helps our AI tailor your resume to specific job requirements and keywords.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Keyword Matching</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">ATS Optimization</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Targeted Results</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-6 mt-1 shadow-lg">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg mb-2 flex items-center">
                        📈 Get AI-Optimized Resume
                        <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Results</span>
                      </h4>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Receive AI-powered suggestions with specific improvements, keyword recommendations, and formatting enhancements. Download your optimized resume instantly in multiple formats.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Detailed Feedback</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Multiple Formats</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Instant Download</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">💡</span>
                    <h4 className="font-bold text-blue-900 text-lg">Pro Tips for Best Results</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-blue-800">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span className="font-medium">Use a clean, ATS-friendly format</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span className="font-medium">Include relevant keywords for your industry</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span className="font-medium">Ensure all text is selectable (not images)</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-blue-800">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span className="font-medium">Keep file size under 10MB</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span className="font-medium">Include complete contact information</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span className="font-medium">Review suggestions before finalizing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'upload-resume':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Upload Resume</h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-900 flex items-center">
                  <span className="mr-3">📁</span>
                  Supported File Formats
                </h3>
                <p className="text-blue-800 mb-6 leading-relaxed">
                  Upload your resume in any of the supported formats below. Our AI can process text-based documents for optimal results.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">📄</span>
                      <div>
                        <p className="font-bold text-green-900 text-lg">PDF</p>
                        <p className="text-sm font-medium text-green-700">Recommended</p>
                      </div>
                    </div>
                    <ul className="text-xs text-green-800 space-y-1">
                      <li>• Best format preservation</li>
                      <li>• Universal compatibility</li>
                      <li>• Optimal AI processing</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">📝</span>
                      <div>
                        <p className="font-bold text-blue-900 text-lg">DOC</p>
                        <p className="text-sm font-medium text-blue-700">Microsoft Word</p>
                      </div>
                    </div>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• Legacy Word format</li>
                      <li>• Widely supported</li>
                      <li>• Good text extraction</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">📋</span>
                      <div>
                        <p className="font-bold text-purple-900 text-lg">DOCX</p>
                        <p className="text-sm font-medium text-purple-700">Word 2007+</p>
                      </div>
                    </div>
                    <ul className="text-xs text-purple-800 space-y-1">
                      <li>• Modern Word format</li>
                      <li>• Rich formatting support</li>
                      <li>• Excellent compatibility</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-6 text-gray-900 flex items-center">
                  <span className="mr-3">✨</span>
                  Upload Best Practices
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">✓</span>
                      </span>
                      Document Quality
                    </h4>
                    <div className="space-y-3 ml-9">
                      <div className="flex items-start">
                        <span className="text-green-600 mr-3 mt-1 text-sm">•</span>
                        <span className="text-gray-800 font-medium">Use a clean, professional format without complex layouts</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-3 mt-1 text-sm">•</span>
                        <span className="text-gray-800 font-medium">Ensure text is selectable (not scanned images)</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-3 mt-1 text-sm">•</span>
                        <span className="text-gray-800 font-medium">Keep file size under 10MB for optimal processing</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">📋</span>
                      </span>
                      Content Requirements
                    </h4>
                    <div className="space-y-3 ml-9">
                      <div className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-1 text-sm">•</span>
                        <span className="text-gray-800 font-medium">Include all relevant sections (experience, education, skills)</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-1 text-sm">•</span>
                        <span className="text-gray-800 font-medium">Use consistent formatting and clear section headers</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-1 text-sm">•</span>
                        <span className="text-gray-800 font-medium">Avoid tables, columns, or complex graphics</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                    <span className="mr-2">⚠️</span>
                    Important Notes
                  </h4>
                  <ul className="text-yellow-800 text-sm space-y-1">
                    <li>• Maximum file size: 10MB</li>
                    <li>• Processing time: 30-60 seconds</li>
                    <li>• Scanned PDFs may have reduced accuracy</li>
                    <li>• Password-protected files are not supported</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'job-matching':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Job Matching & Keyword Optimization</h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-900">How Job Matching Works</h3>
                <p className="text-blue-800 mb-6 leading-relaxed">
                  Our advanced AI analyzes job descriptions to identify key requirements, skills, and keywords that recruiters are looking for, ensuring your resume aligns perfectly with employer expectations.
                </p>
                <div className="bg-white/50 p-6 rounded-lg border border-blue-100">
                  <h4 className="font-semibold mb-4 text-blue-900 flex items-center">
                    <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </span>
                    Comprehensive Analysis Includes:
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-600 mt-1">🎯</span>
                      <span className="text-blue-800">Required technical skills and certifications</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-600 mt-1">📊</span>
                      <span className="text-blue-800">Preferred experience levels and backgrounds</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-600 mt-1">💼</span>
                      <span className="text-blue-800">Industry-specific terminology and buzzwords</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-600 mt-1">🤖</span>
                      <span className="text-blue-800">ATS (Applicant Tracking System) keywords</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-600 mt-1">🧠</span>
                      <span className="text-blue-800">Soft skills and competencies</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-600 mt-1">📈</span>
                      <span className="text-blue-800">Performance metrics and achievements</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Optimization Strategies</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">🔑</span>
                      <h4 className="font-semibold text-blue-900">Keyword Integration</h4>
                    </div>
                    <p className="text-blue-800 text-sm leading-relaxed">Naturally incorporate relevant keywords throughout your resume while maintaining readability and authenticity</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">⭐</span>
                      <h4 className="font-semibold text-green-900">Skills Highlighting</h4>
                    </div>
                    <p className="text-green-800 text-sm leading-relaxed">Emphasize and prioritize skills that directly match job requirements and industry standards</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">🎯</span>
                      <h4 className="font-semibold text-purple-900">Experience Alignment</h4>
                    </div>
                    <p className="text-purple-800 text-sm leading-relaxed">Reframe and restructure experience descriptions to align with job expectations and requirements</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">🤖</span>
                      <h4 className="font-semibold text-orange-900">ATS Optimization</h4>
                    </div>
                    <p className="text-orange-800 text-sm leading-relaxed">Ensure maximum compatibility with applicant tracking systems and automated screening processes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'ai-optimization':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">AI Optimization Features</h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 border border-purple-200 rounded-xl p-8 shadow-lg">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
                    <span className="text-white text-2xl">🤖</span>
                  </div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-3">Advanced AI Technology</h3>
                  <p className="text-lg text-purple-800 max-w-3xl mx-auto leading-relaxed">
                    Our cutting-edge AI leverages natural language processing, machine learning, and industry expertise 
                    to transform your resume into a powerful career tool that stands out to employers and ATS systems.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white text-xl">🧠</span>
                    </div>
                    <h4 className="font-bold text-purple-900 mb-3 text-lg">Intelligent Content Analysis</h4>
                    <p className="text-purple-700 leading-relaxed mb-4">
                      Deep analysis of your experience, skills, and achievements using advanced NLP to identify 
                      relevance, impact, and optimization opportunities.
                    </p>
                    <ul className="text-sm text-purple-800 space-y-2">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                        Experience relevance scoring
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                        Skills gap identification
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                        Achievement quantification
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white text-xl">🔍</span>
                    </div>
                    <h4 className="font-bold text-purple-900 mb-3 text-lg">Smart Keyword Optimization</h4>
                    <p className="text-purple-700 leading-relaxed mb-4">
                      Identifies missing keywords, suggests strategic placements, and ensures optimal ATS compatibility 
                      while maintaining natural language flow.
                    </p>
                    <ul className="text-sm text-purple-800 space-y-2">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                        Industry-specific keywords
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                        ATS optimization scoring
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                        Keyword density analysis
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                <div className="flex items-center mb-8">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white text-lg">⚡</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Comprehensive Optimization Features</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="group hover:bg-green-50 p-4 rounded-lg transition-colors">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4 mt-1">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg mb-2">ATS Compatibility Analysis</h4>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            Comprehensive scanning to ensure your resume passes through Applicant Tracking Systems 
                            with optimal formatting and structure.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Format Check</span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Structure Analysis</span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Compatibility Score</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group hover:bg-blue-50 p-4 rounded-lg transition-colors">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4 mt-1">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg mb-2">Strategic Keyword Enhancement</h4>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            AI-powered keyword suggestions based on job descriptions, industry standards, 
                            and current market trends for maximum visibility.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Industry Keywords</span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Skill Matching</span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Trend Analysis</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="group hover:bg-purple-50 p-4 rounded-lg transition-colors">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4 mt-1">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg mb-2">Content Enhancement & Impact</h4>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            Intelligent recommendations for stronger action verbs, quantifiable achievements, 
                            and compelling narrative structure that showcases your value.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Action Verbs</span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Metrics Focus</span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Impact Stories</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group hover:bg-orange-50 p-4 rounded-lg transition-colors">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4 mt-1">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg mb-2">Professional Format Optimization</h4>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            Layout and design suggestions for improved readability, visual hierarchy, 
                            and professional presentation that captures attention.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Layout Design</span>
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Visual Hierarchy</span>
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Readability</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">📊</span>
                    <h4 className="font-bold text-gray-900 text-lg">Optimization Metrics & Scoring</h4>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg border border-gray-100">
                      <div className="text-2xl font-bold text-blue-600 mb-2">95%</div>
                      <div className="text-sm text-gray-700 font-medium">ATS Compatibility</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border border-gray-100">
                      <div className="text-2xl font-bold text-green-600 mb-2">8.5/10</div>
                      <div className="text-sm text-gray-700 font-medium">Content Quality Score</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border border-gray-100">
                      <div className="text-2xl font-bold text-purple-600 mb-2">30s</div>
                      <div className="text-sm text-gray-700 font-medium">Processing Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'api-reference':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">API Reference</h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-green-400 flex items-center">
                  <span className="mr-2">🌐</span>
                  Base URL
                </h3>
                <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
                  <code className="text-green-300 text-lg font-mono">https://api.resumetailorai.com/v1</code>
                </div>
                <p className="text-gray-300 mt-3 text-sm">All API endpoints are relative to this base URL</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="mr-2">🔐</span>
                  Authentication
                </h3>
                <p className="text-gray-700 mb-4">All API requests require authentication using an API key in the Authorization header:</p>
                <div className="bg-gray-900 p-4 rounded-lg border">
                  <code className="text-green-400 font-mono text-sm">Authorization: Bearer YOUR_API_KEY</code>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-800 text-sm">
                    <strong>Note:</strong> You can obtain your API key from your dashboard settings. Keep it secure and never expose it in client-side code.
                  </p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <span className="mr-2">⚡</span>
                  API Endpoints
                </h3>
                <div className="space-y-6">
                  <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                    <div className="flex items-center mb-3">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-mono mr-3">POST</span>
                      <h4 className="font-semibold text-blue-900">/upload-resume</h4>
                    </div>
                    <p className="text-blue-800 text-sm mb-3">Upload a resume file for processing and analysis</p>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-xs text-gray-600 mb-2">Request Body (multipart/form-data):</p>
                      <code className="text-xs font-mono text-gray-800">file: [Resume file - PDF, DOC, or DOCX]</code>
                    </div>
                  </div>
                  
                  <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                    <div className="flex items-center mb-3">
                      <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-mono mr-3">POST</span>
                      <h4 className="font-semibold text-green-900">/optimize-resume</h4>
                    </div>
                    <p className="text-green-800 text-sm mb-3">Optimize resume content based on job description and requirements</p>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-xs text-gray-600 mb-2">Request Body (JSON):</p>
                      <pre className="text-xs font-mono text-gray-800">{`{
  "resume_id": "string",
  "job_description": "string",
  "optimization_level": "basic|advanced|premium"
}`}</pre>
                    </div>
                  </div>
                  
                  <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                    <div className="flex items-center mb-3">
                      <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-mono mr-3">GET</span>
                      <h4 className="font-semibold text-purple-900">/optimizations/[id]</h4>
                    </div>
                    <p className="text-purple-800 text-sm mb-3">Retrieve optimization results and download links</p>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-xs text-gray-600 mb-2">Response (JSON):</p>
                      <pre className="text-xs font-mono text-gray-800">{`{
  "id": "string",
  "status": "completed|processing|failed",
  "download_urls": {
    "pdf": "string",
    "docx": "string"
  },
  "suggestions": ["array of strings"]
}`}</pre>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                    <span className="mr-2">📊</span>
                    Rate Limits
                  </h4>
                  <ul className="text-yellow-800 text-sm space-y-1">
                    <li>• Free tier: 10 requests per hour</li>
                    <li>• Premium tier: 100 requests per hour</li>
                    <li>• Enterprise: Custom limits available</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'export-formats':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Export Formats & Download Options</h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-900">Available Export Formats</h3>
                <p className="text-green-800 mb-6">Download your optimized resume in multiple professional formats to suit different application requirements.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-4">📄</span>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">PDF Format</h4>
                      <p className="text-sm text-gray-600">Industry Standard</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Preserves formatting across all devices</li>
                    <li>• ATS-compatible structure</li>
                    <li>• Professional appearance</li>
                    <li>• Print-ready quality</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-4">📝</span>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Word Document</h4>
                      <p className="text-sm text-gray-600">Editable Format</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Easy to customize further</li>
                    <li>• Compatible with MS Word</li>
                    <li>• Maintains professional styling</li>
                    <li>• Collaborative editing support</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Download Features</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <span className="text-2xl block mb-2">⚡</span>
                    <h4 className="font-semibold text-blue-900 mb-1">Instant Download</h4>
                    <p className="text-blue-800 text-sm">Get your optimized resume immediately</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <span className="text-2xl block mb-2">🔄</span>
                    <h4 className="font-semibold text-purple-900 mb-1">Version History</h4>
                    <p className="text-purple-800 text-sm">Access previous optimization versions</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <span className="text-2xl block mb-2">☁️</span>
                    <h4 className="font-semibold text-green-900 mb-1">Cloud Storage</h4>
                    <p className="text-green-800 text-sm">Secure cloud backup for 30 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'troubleshooting':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Troubleshooting & Support</h2>
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-yellow-900">Common Issues & Solutions</h3>
                <p className="text-yellow-800 mb-4">Quick fixes for the most frequently encountered problems.</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-3 text-red-600 flex items-center">
                    <span className="mr-2">⚠️</span>
                    Upload Failed or File Not Recognized
                  </h4>
                  <div className="ml-6">
                    <p className="text-gray-700 mb-3"><strong>Possible Causes:</strong></p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                      <li>File format not supported (only PDF, DOC, DOCX allowed)</li>
                      <li>File size exceeds 10MB limit</li>
                      <li>Corrupted or password-protected file</li>
                      <li>Scanned image instead of text-based document</li>
                    </ul>
                    <p className="text-gray-700 mb-2"><strong>Solutions:</strong></p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Convert to PDF or Word format</li>
                      <li>Compress file size or recreate document</li>
                      <li>Remove password protection</li>
                      <li>Use OCR software to convert scanned images to text</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-3 text-orange-600 flex items-center">
                    <span className="mr-2">🔄</span>
                    Optimization Taking Too Long
                  </h4>
                  <div className="ml-6">
                    <p className="text-gray-700 mb-3"><strong>Typical Processing Times:</strong></p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                      <li>Simple resumes (1-2 pages): 30-45 seconds</li>
                      <li>Complex resumes (3+ pages): 60-90 seconds</li>
                      <li>High server load: Up to 2-3 minutes</li>
                    </ul>
                    <p className="text-gray-700 mb-2"><strong>If processing exceeds 5 minutes:</strong></p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Refresh the page and try again</li>
                      <li>Check your internet connection</li>
                      <li>Try during off-peak hours</li>
                      <li>Contact support if issue persists</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-3 text-blue-600 flex items-center">
                    <span className="mr-2">📞</span>
                    Need More Help?
                  </h4>
                  <div className="ml-6">
                    <p className="text-gray-700 mb-4">For comprehensive support including FAQ, live chat, and detailed troubleshooting guides, visit our Help Center.</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => router.push('/support')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Visit Help Center
                      </button>
                      <a 
                        href="mailto:support@resumetailorai.com"
                        className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email Support
                      </a>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h5 className="font-semibold text-blue-900 mb-1 text-sm">Email Response</h5>
                        <p className="text-blue-700 text-xs">Within 24 hours</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h5 className="font-semibold text-green-900 mb-1 text-sm">Live Chat</h5>
                        <p className="text-green-700 text-xs">9 AM - 6 PM EST</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      default:
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "How accurate is the AI optimization?",
                  a: "Our AI has been trained on thousands of successful resumes and job descriptions, achieving a 95% accuracy rate in keyword matching and optimization suggestions."
                },
                {
                  q: "Is my resume data secure?",
                  a: "Yes, we use enterprise-grade encryption and never store your personal information longer than necessary for processing. All data is automatically deleted after 30 days."
                },
                {
                  q: "Can I use this for multiple job applications?",
                  a: "Absolutely! You can optimize your resume for different job descriptions and save multiple versions for various applications."
                },
                {
                  q: "What file formats are supported?",
                  a: "We support PDF, DOC, and DOCX formats. PDF is recommended for best results."
                },
                {
                  q: "How long does the optimization process take?",
                  a: "Most optimizations are completed within 30-60 seconds, depending on the complexity of your resume and job description."
                },
                {
                  q: "Can I edit the optimized resume?",
                  a: "Yes! You can download in Word format for easy editing, or use our built-in editor to make adjustments before downloading."
                },
                {
                  q: "Do you offer refunds?",
                  a: "We offer a 30-day money-back guarantee if you're not satisfied with the optimization results."
                },
                {
                  q: "Is there a limit to how many resumes I can optimize?",
                  a: "Free users get 3 optimizations per month. Premium users have unlimited optimizations with additional features."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center">
                    <span className="text-blue-500 mr-2">❓</span>
                    {faq.q}
                  </h3>
                  <p className="text-gray-700 leading-relaxed ml-6">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Documentation</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}