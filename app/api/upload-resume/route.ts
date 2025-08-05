// Proxy route that forwards requests to the actual API handler in /api/upload-resume
import { NextRequest } from 'next/server'

// Import the actual handlers from the root /api directory
import { GET as actualGET, POST as actualPOST } from '../../../api/upload-resume/route'

// Re-export the handlers
export const GET = actualGET
export const POST = actualPOST