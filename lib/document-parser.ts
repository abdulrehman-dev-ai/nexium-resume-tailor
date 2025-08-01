import mammoth from 'mammoth'
import pdfParse from 'pdf-parse'
//Temporarily disabled due to package installation issue

export interface DocumentParseResult {
  text: string
  wordCount: number
  fileType: string
  success: boolean
  error?: string
}

export class DocumentParser {
  static async parseDocument(buffer: Buffer, fileName: string, mimeType: string): Promise<DocumentParseResult> {
    try {
      const fileExtension = fileName.toLowerCase().split('.').pop()
      
      switch (fileExtension) {
        case 'pdf':
          return await this.parsePDF(buffer)
        case 'docx':
          return await this.parseDOCX(buffer)
        case 'doc':
          return await this.parseDOC(buffer)
        case 'txt':
          return this.parseTXT(buffer)
        default:
          throw new Error(`Unsupported file type: ${fileExtension}`)
      }
    } catch (error) {
      return {
        text: '',
        wordCount: 0,
        fileType: fileName.split('.').pop() || 'unknown',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }



  private static async parsePDF(buffer: Buffer): Promise<DocumentParseResult> {
    try {
      // Use pdf-parse library which is designed for Node.js server environments
      const data = await pdfParse(buffer)
      
      const text = data.text.trim()
      
      if (!text || text.length < 10) {
        throw new Error('PDF appears to be empty or contains no extractable text')
      }
      
      return {
        text,
        wordCount: this.countWords(text),
        fileType: 'pdf',
        success: true
      }
    } catch (error) {
      throw new Error(`PDF parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}. Please ensure the PDF contains selectable text and is not password protected.`)
    }
  }

  private static async parseDOCX(buffer: Buffer): Promise<DocumentParseResult> {
    try {
      const result = await mammoth.extractRawText({ buffer })
      const text = result.value.trim()
      
      return {
        text,
        wordCount: this.countWords(text),
        fileType: 'docx',
        success: true
      }
    } catch (error) {
      throw new Error(`DOCX parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private static async parseDOC(buffer: Buffer): Promise<DocumentParseResult> {
    // For .doc files, we'll try mammoth first, but it may not work perfectly
    try {
      const result = await mammoth.extractRawText({ buffer })
      const text = result.value.trim()
      
      if (!text || text.length < 10) {
        throw new Error('DOC file appears to be empty or corrupted')
      }
      
      return {
        text,
        wordCount: this.countWords(text),
        fileType: 'doc',
        success: true
      }
    } catch (error) {
      throw new Error(`DOC parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}. Please convert to DOCX format for better compatibility.`)
    }
  }

  private static parseTXT(buffer: Buffer): DocumentParseResult {
    try {
      const text = buffer.toString('utf-8').trim()
      
      return {
        text,
        wordCount: this.countWords(text),
        fileType: 'txt',
        success: true
      }
    } catch (error) {
      throw new Error(`TXT parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private static countWords(text: string): number {
    return text.split(/\s+/).filter(word => word.length > 0).length
  }

  static validateFile(fileName: string, fileSize: number): { valid: boolean; error?: string } {
    const allowedExtensions = ['pdf', 'docx', 'doc', 'txt']
    const maxSize = 10 * 1024 * 1024 // 10MB
    
    const extension = fileName.toLowerCase().split('.').pop()
    
    if (!extension || !allowedExtensions.includes(extension)) {
      return {
        valid: false,
        error: `Unsupported file type. Please upload: ${allowedExtensions.join(', ').toUpperCase()} files only.`
      }
    }
    
    if (fileSize > maxSize) {
      return {
        valid: false,
        error: 'File size too large. Please upload files smaller than 10MB.'
      }
    }
    
    return { valid: true }
  }
}