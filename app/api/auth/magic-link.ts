// Proxy route that forwards requests to the actual API handler in /api/auth/magic-link
import { NextApiRequest, NextApiResponse } from 'next'

// Import the actual handler from the root /api directory
import handler from '../../../api/auth/magic-link'

// Re-export the handler
export default handler