import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'API is working correctly',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    return NextResponse.json({
      message: 'POST request received successfully',
      receivedData: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    )
  }
}