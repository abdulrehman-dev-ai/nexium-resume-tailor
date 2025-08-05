import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../../lib/supabase-server'
import { DocumentParser } from '../../lib/document-parser'
import connectDB from '../../lib/mongodb'
import mongoose from 'mongoose'

// MongoDB schema for storing uploaded resume metadata
const ResumeUploadSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  extractedText: { type: String, required: true },
  wordCount: { type: Number, required: true },
  processingStatus: { 
    type: String, 
    enum: ['processing', 'completed', 'failed'], 
    default: 'processing' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const ResumeUpload = mongoose.models.ResumeUpload || mongoose.model('ResumeUpload', ResumeUploadSchema)

export async function POST(request: NextRequest) {
  try {
    console.log('Resume upload API called')
    
    // Verify authentication
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error('Authentication error:', authError)
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('User authenticated:', user.email)

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    console.log('File received:', file ? { name: file.name, size: file.size, type: file.type } : 'No file')
    
    if (!file) {
      console.log('No file provided in request')
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file using DocumentParser
    console.log('Validating file...')
    const validation = DocumentParser.validateFile(file.name, file.size)
    if (!validation.valid) {
      console.log('File validation failed:', validation.error)
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      )
    }
    console.log('File validation passed')
    
    // Connect to MongoDB
    console.log('Connecting to MongoDB...')
    await connectDB()
    console.log('MongoDB connected successfully')
    
    // Convert file to buffer
    console.log('Converting file to buffer...')
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    console.log('Buffer created, size:', buffer.length)
    
    // Parse document using DocumentParser
    console.log('Starting document parsing...')
    const result = await DocumentParser.parseDocument(buffer, file.name, file.type)
    console.log('Document parsing result:', { success: result.success, wordCount: result.wordCount, error: result.error })
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to parse document' },
        { status: 400 }
      )
    }
    
    if (!result.text || result.text.length < 50) {
      return NextResponse.json(
        { success: false, error: 'Document appears to be empty or too short. Please ensure your resume contains sufficient content.' },
        { status: 400 }
      )
    }

    // Save upload metadata to MongoDB
    console.log('Saving upload metadata to MongoDB...')
    const uploadData = {
      userId: user.id,
      userEmail: user.email!,
      fileName: file.name,
      fileType: result.fileType,
      fileSize: file.size,
      extractedText: result.text,
      wordCount: result.wordCount,
      processingStatus: 'completed'
    }

    const resumeUpload = new ResumeUpload(uploadData)
    const savedUpload = await resumeUpload.save()
    console.log('Upload metadata saved successfully with ID:', savedUpload._id)
    
    return NextResponse.json({
      success: true,
      data: {
        uploadId: savedUpload._id.toString(),
        text: result.text,
        wordCount: result.wordCount,
        fileType: result.fileType,
        fileName: file.name,
        fileSize: file.size,
        createdAt: savedUpload.createdAt
      },
      message: 'Resume uploaded and processed successfully'
    })
    
  } catch (error) {
    console.error('Resume upload error:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Failed to upload and process resume'
    let statusCode = 500
    
    if (error instanceof Error) {
      errorMessage = error.message
      
      // Handle specific error types
      if (error.message.includes('MongoDB') || error.message.includes('database')) {
        errorMessage = 'Database connection error. Please try again.'
        statusCode = 503
      } else if (error.message.includes('parsing') || error.message.includes('document')) {
        errorMessage = 'Document processing failed. Please check your file format.'
        statusCode = 400
      }
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: statusCode }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Resume upload API',
      supportedFormats: ['PDF', 'DOCX', 'DOC', 'TXT'],
      note: 'Upload your resume file for AI-powered optimization',
      maxFileSize: '10MB'
    },
    { status: 200 }
  )
}