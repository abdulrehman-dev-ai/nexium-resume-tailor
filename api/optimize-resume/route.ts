import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../../lib/supabase-server'
import { resumeOptimizer } from '../../ai/resume-optimizer'
import connectDB from '../../lib/mongodb'
import mongoose from 'mongoose'

// MongoDB schema for storing optimization results
const OptimizationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  originalResume: { type: String, required: true },
  jobDescription: { type: String, required: true },
  optimizedResume: { type: String, required: true },
  suggestions: [String],
  matchScore: { type: Number, required: true },
  keywordAnalysis: {
    missing: [String],
    present: [String]
  },
  createdAt: { type: Date, default: Date.now }
})

const Optimization = mongoose.models.Optimization || mongoose.model('Optimization', OptimizationSchema)

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting resume optimization request...')
    console.log('Request headers:', Object.fromEntries(request.headers.entries()))
    
    // Verify authentication
    console.log('🔐 Verifying authentication...')
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error('❌ Authentication error:', authError)
      return NextResponse.json(
        { 
          success: false,
          error: 'Unauthorized - Please log in again',
          details: authError?.message 
        },
        { status: 401 }
      )
    }

    console.log('✅ User authenticated:', user.email)

    // Parse request body with error handling
    let requestBody
    try {
      requestBody = await request.json()
      console.log('📄 Request body parsed successfully')
    } catch (parseError) {
      console.error('❌ Failed to parse request body:', parseError)
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid request format',
          details: 'Request body must be valid JSON'
        },
        { status: 400 }
      )
    }

    const { resumeText, jobDescription } = requestBody
    console.log('📊 Request data received:')
    console.log('- Resume length:', resumeText?.length || 0)
    console.log('- Job description length:', jobDescription?.length || 0)
    console.log('- Resume preview:', resumeText?.substring(0, 100) + '...')
    console.log('- Job description preview:', jobDescription?.substring(0, 100) + '...')

    if (!resumeText || !jobDescription) {
      console.error('❌ Missing required fields')
      return NextResponse.json(
        { 
          success: false,
          error: 'Resume text and job description are required',
          details: {
            hasResumeText: !!resumeText,
            hasJobDescription: !!jobDescription
          }
        },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    console.log('🗄️ Connecting to MongoDB...')
    try {
      await connectDB()
      console.log('✅ MongoDB connected successfully')
    } catch (dbError) {
      console.error('❌ MongoDB connection failed:', dbError)
      return NextResponse.json(
        { 
          success: false,
          error: 'Database connection failed',
          details: process.env.NODE_ENV === 'development' ? dbError : 'Please try again later'
        },
        { status: 503 }
      )
    }

    // Optimize resume using AI
    console.log('🤖 Starting AI optimization...')
    console.log('- Using Gemini API Key:', process.env.GEMINI_API_KEY ? 'Present' : 'Missing')
    let optimizationResult
    try {
      optimizationResult = await resumeOptimizer.optimizeResume({
        resumeText,
        jobDescription,
        userEmail: user.email!
      })
      console.log('✅ AI optimization completed successfully')
      console.log('- Match score:', optimizationResult.matchScore)
      console.log('- Suggestions count:', optimizationResult.suggestions?.length || 0)
      console.log('- Keywords found:', optimizationResult.keywordAnalysis?.present?.length || 0)
    } catch (aiError) {
      console.error('❌ AI optimization failed:', aiError)
      return NextResponse.json(
        { 
          success: false,
          error: 'AI optimization service failed',
          details: process.env.NODE_ENV === 'development' ? aiError : 'Please try again later'
        },
        { status: 503 }
      )
    }

    // Save optimization result to MongoDB
    console.log('💾 Saving optimization result to MongoDB...')
    const optimizationData = {
      userId: user.id,
      userEmail: user.email,
      originalResume: resumeText,
      jobDescription,
      optimizedResume: optimizationResult.optimizedResume,
      suggestions: optimizationResult.suggestions || [],
      matchScore: optimizationResult.matchScore || 0,
      keywordAnalysis: optimizationResult.keywordAnalysis || { missing: [], present: [] }
    }

    let savedOptimization
    try {
      const optimization = new Optimization(optimizationData)
      savedOptimization = await optimization.save()
      console.log('✅ Optimization result saved successfully with ID:', savedOptimization._id)
    } catch (saveError) {
      console.error('❌ Failed to save optimization to MongoDB:', saveError)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to save optimization result',
          details: process.env.NODE_ENV === 'development' ? saveError : 'Please try again later'
        },
        { status: 500 }
      )
    }

    // Trigger n8n workflow for additional processing (optional)
    console.log('🔗 Triggering n8n workflow...')
    try {
      await resumeOptimizer.triggerN8nWorkflow({
        userId: user.id,
        userEmail: user.email,
        matchScore: optimizationResult.matchScore,
        optimizationId: savedOptimization._id
      })
      console.log('✅ N8N workflow triggered successfully')
    } catch (n8nError) {
      console.warn('⚠️ N8N workflow failed, but optimization completed:', n8nError)
    }

    console.log('🎉 Preparing final response...')
    const responseData = {
      success: true,
      data: {
        optimizedResume: optimizationResult.optimizedResume,
        suggestions: optimizationResult.suggestions || [],
        matchScore: optimizationResult.matchScore || 0,
        keywordAnalysis: optimizationResult.keywordAnalysis || { missing: [], present: [] },
        optimizationId: savedOptimization._id.toString(),
        createdAt: savedOptimization.createdAt
      },
      message: 'Resume optimized successfully',
      timestamp: new Date().toISOString()
    }
    
    console.log('📤 Sending successful response with optimization ID:', savedOptimization._id)
    return NextResponse.json(responseData)

  } catch (error) {
    console.error('💥 Resume optimization error occurred:')
    console.error('Error type:', typeof error)
    console.error('Error instance:', error instanceof Error ? 'Error' : 'Unknown')
    console.error('Full error:', error)
    
    // Provide more specific error messages based on error type
    let errorMessage = 'Failed to optimize resume'
    let statusCode = 500
    
    if (error instanceof Error) {
      console.error('Error details:')
      console.error('- Name:', error.name)
      console.error('- Message:', error.message)
      console.error('- Stack:', error.stack)
      
      errorMessage = error.message
      
      // Handle specific error types
      if (error.message.includes('MongoDB') || error.message.includes('database')) {
        errorMessage = 'Database connection error. Please try again.'
        statusCode = 503
        console.error('🗄️ Database error detected')
      } else if (error.message.includes('AI') || error.message.includes('Gemini') || error.message.includes('API')) {
        errorMessage = 'AI service temporarily unavailable. Please try again.'
        statusCode = 503
        console.error('🤖 AI service error detected')
      } else if (error.message.includes('authentication') || error.message.includes('Unauthorized')) {
        errorMessage = 'Authentication failed. Please log in again.'
        statusCode = 401
        console.error('🔐 Authentication error detected')
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.'
        statusCode = 503
        console.error('🌐 Network error detected')
      }
    } else {
      console.error('❓ Unknown error type:', error)
    }
    
    const errorResponse = {
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
      requestId: Math.random().toString(36).substring(7),
      details: process.env.NODE_ENV === 'development' ? {
        originalError: error,
        stack: error instanceof Error ? error.stack : undefined
      } : undefined
    }
    
    console.error('📤 Sending error response:', errorResponse)
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}