import { NextRequest, NextResponse } from 'next/server'
import { DocumentParser } from '../../../lib/document-parser'

export async function POST(request: NextRequest) {
  try {
    console.log('Parse document API called')
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    console.log('File received:', file ? { name: file.name, size: file.size, type: file.type } : 'No file')
    
    if (!file) {
      console.log('No file provided in request')
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file using DocumentParser
    console.log('Validating file...')
    const validation = DocumentParser.validateFile(file.name, file.size)
    if (!validation.valid) {
      console.log('File validation failed:', validation.error)
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }
    console.log('File validation passed')
    
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
        { error: result.error || 'Failed to parse document' },
        { status: 400 }
      )
    }
    
    if (!result.text || result.text.length < 50) {
      return NextResponse.json(
        { error: 'Document appears to be empty or too short. Please ensure your resume contains sufficient content.' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({
      success: true,
      text: result.text,
      wordCount: result.wordCount,
      fileType: result.fileType,
      fileName: file.name
    })
    
  } catch (error) {
    console.error('Document parsing error:', error)
    return NextResponse.json(
      { error: 'Internal server error while parsing document' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Document parser API',
      supportedFormats: ['PDF', 'DOCX', 'DOC', 'TXT'],
      note: 'All document formats are supported. PDF files must contain selectable text for proper parsing.',
      maxFileSize: '10MB'
    },
    { status: 200 }
  )
}