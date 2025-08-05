import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../../lib/supabase-server'
import connectDB from '../../lib/mongodb'
import mongoose from 'mongoose'

// Use the same schema as in upload-resume
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

// Get user's upload history
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Connect to MongoDB
    await connectDB()

    // Get user's upload history
    const uploads = await ResumeUpload.find({ userId: user.id })
      .sort({ createdAt: -1 })
      .limit(50)
      .select('-extractedText') // Exclude large text field for list view
      .lean()

    // Calculate statistics
    const stats = {
      totalUploads: uploads.length,
      totalWordCount: uploads.reduce((sum, upload) => sum + (upload.wordCount || 0), 0),
      fileTypes: uploads.reduce((acc: Record<string, number>, upload) => {
        acc[upload.fileType] = (acc[upload.fileType] || 0) + 1
        return acc
      }, {}),
      averageFileSize: uploads.length > 0 
        ? Math.round(uploads.reduce((sum, upload) => sum + upload.fileSize, 0) / uploads.length)
        : 0
    }

    // Transform the data for frontend consumption
    const transformedUploads = uploads.map((upload) => {
      const uploadData = upload as any;
      return {
        id: (uploadData._id as mongoose.Types.ObjectId).toString(),
        fileName: uploadData.fileName,
        fileType: uploadData.fileType,
        fileSize: uploadData.fileSize,
        wordCount: uploadData.wordCount,
        processingStatus: uploadData.processingStatus,
        createdAt: uploadData.createdAt
      };
    })

    return NextResponse.json({
      success: true,
      data: {
        uploads: transformedUploads,
        statistics: stats
      },
      count: transformedUploads.length
    })

  } catch (error) {
    console.error('Get uploads error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch upload history',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// Get specific upload by ID
export async function POST(request: NextRequest) {
  try {
    const { uploadId } = await request.json()

    if (!uploadId) {
      return NextResponse.json(
        { success: false, error: 'Upload ID is required' },
        { status: 400 }
      )
    }

    // Verify authentication
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Connect to MongoDB
    await connectDB()

    // Get specific upload
    const upload = await ResumeUpload.findOne({
      _id: uploadId,
      userId: user.id
    }).lean()

    if (!upload) {
      return NextResponse.json(
        { success: false, error: 'Upload not found' },
        { status: 404 }
      )
    }

    // Transform the data
    const uploadData = upload as any;
    const transformedUpload = {
      id: (uploadData._id as mongoose.Types.ObjectId).toString(),
      fileName: uploadData.fileName,
      fileType: uploadData.fileType,
      fileSize: uploadData.fileSize,
      extractedText: uploadData.extractedText,
      wordCount: uploadData.wordCount,
      processingStatus: uploadData.processingStatus,
      createdAt: uploadData.createdAt,
      updatedAt: uploadData.updatedAt
    }

    return NextResponse.json({
      success: true,
      data: transformedUpload
    })

  } catch (error) {
    console.error('Get upload error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch upload',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}