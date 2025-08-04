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
    console.log('Starting resume optimization request...')
    
    // Verify authentication
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error('Authentication error:', authError)
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('User authenticated:', user.email)

    const { resumeText, jobDescription } = await request.json()
    console.log('Request data received - Resume length:', resumeText?.length, 'Job description length:', jobDescription?.length)

    if (!resumeText || !jobDescription) {
      console.error('Missing required fields')
      return NextResponse.json(
        { error: 'Resume text and job description are required' },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    console.log('Connecting to MongoDB...')
    await connectDB()
    console.log('MongoDB connected successfully')

    // Optimize resume using AI
    console.log('Starting AI optimization...')
    const optimizationResult = await resumeOptimizer.optimizeResume({
      resumeText,
      jobDescription,
      userEmail: user.email!
    })
    console.log('AI optimization completed successfully')

    // Save optimization result to MongoDB
    console.log('Saving optimization result to MongoDB...')
    const optimization = new Optimization({
      userId: user.id,
      userEmail: user.email,
      originalResume: resumeText,
      jobDescription,
      optimizedResume: optimizationResult.optimizedResume,
      suggestions: optimizationResult.suggestions,
      matchScore: optimizationResult.matchScore,
      keywordAnalysis: optimizationResult.keywordAnalysis
    })

    await optimization.save()
    console.log('Optimization result saved successfully')

    // Trigger n8n workflow for additional processing (optional)
    try {
      await resumeOptimizer.triggerN8nWorkflow({
        userId: user.id,
        userEmail: user.email,
        matchScore: optimizationResult.matchScore,
        optimizationId: optimization._id
      })
    } catch (n8nError) {
      console.warn('N8N workflow failed, but optimization completed:', n8nError)
    }

    return NextResponse.json({
      success: true,
      data: {
        optimizedResume: optimizationResult.optimizedResume,
        suggestions: optimizationResult.suggestions,
        matchScore: optimizationResult.matchScore,
        keywordAnalysis: optimizationResult.keywordAnalysis,
        optimizationId: optimization._id
      }
    })

  } catch (error) {
    console.error('Resume optimization error:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Failed to optimize resume'
    if (error instanceof Error) {
      errorMessage = error.message
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      })
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}