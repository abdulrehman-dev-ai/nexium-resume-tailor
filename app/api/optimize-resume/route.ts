// Proxy route that forwards requests to the actual API handler in /api/optimize-resume
import { NextRequest } from 'next/server'

// Import the actual handlers from the root /api directory
import { POST as actualPOST } from '../../../api/optimize-resume/route'

// Re-export the handlers
export const POST = actualPOST