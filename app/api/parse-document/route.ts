// Proxy route that forwards requests to the actual API handler in /api/parse-document
import { NextRequest } from 'next/server'

// Import the actual handlers from the root /api directory
import { POST as actualPOST, GET as actualGET } from '../../../api/parse-document/route'

// Re-export the handlers
export const POST = actualPOST
export const GET = actualGET