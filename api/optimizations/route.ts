import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../../lib/supabase-server'
import connectDB from '../../lib/mongodb'
import mongoose from 'mongoose'

// Use the same schema as in optimize-resume
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

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Connect to MongoDB
    await connectDB()

    // Get user's optimization history
    const optimizations = await Optimization.find({ userId: user.id })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean() // Convert to plain JavaScript objects for better performance

    // Transform the data for frontend consumption
    const transformedOptimizations = optimizations.map((opt: any) => ({
      id: (opt._id as mongoose.Types.ObjectId).toString(),
      userId: opt.userId,
      userEmail: opt.userEmail,
      originalResume: opt.originalResume,
      jobDescription: opt.jobDescription,
      optimizedResume: opt.optimizedResume,
      suggestions: opt.suggestions || [],
      matchScore: opt.matchScore || 0,
      keywordAnalysis: opt.keywordAnalysis || { missing: [], present: [] },
      createdAt: opt.createdAt
    }))

    return NextResponse.json({
      success: true,
      data: transformedOptimizations,
      count: transformedOptimizations.length
    })

  } catch (error) {
    console.error('Get optimizations error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch optimizations' },
      { status: 500 }
    )
  }
}

// Get specific optimization by ID
export async function POST(request: NextRequest) {
  try {
    const { optimizationId } = await request.json()

    if (!optimizationId) {
      return NextResponse.json(
        { error: 'Optimization ID is required' },
        { status: 400 }
      )
    }

    // Verify authentication
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Connect to MongoDB
    await connectDB()

    // Get specific optimization
    const optimization = await Optimization.findOne({
      _id: optimizationId,
      userId: user.id
    })

    if (!optimization) {
      return NextResponse.json(
        { error: 'Optimization not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: optimization
    })

  } catch (error) {
    console.error('Get optimization error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch optimization' },
      { status: 500 }
    )
  }
}