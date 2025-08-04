import { createClient } from '../../../lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')

  // Handle authentication errors
  if (error) {
    console.error('Auth callback error:', error, errorDescription)
    
    // Redirect to login with error message
    const loginUrl = new URL('/login', requestUrl.origin)
    
    if (error === 'access_denied' || errorDescription?.includes('expired')) {
      loginUrl.searchParams.set('error', 'expired')
    } else if (errorDescription?.includes('already_used')) {
      loginUrl.searchParams.set('error', 'used')
    } else {
      loginUrl.searchParams.set('error', 'invalid')
    }
    
    return NextResponse.redirect(loginUrl.toString())
  }

  if (code) {
    try {
      const supabase = await createClient()
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Session exchange error:', exchangeError)
        
        // Redirect to login with specific error
        const loginUrl = new URL('/login', requestUrl.origin)
        
        if (exchangeError.message.includes('expired')) {
          loginUrl.searchParams.set('error', 'expired')
        } else if (exchangeError.message.includes('used')) {
          loginUrl.searchParams.set('error', 'used')
        } else {
          loginUrl.searchParams.set('error', 'invalid')
        }
        
        return NextResponse.redirect(loginUrl.toString())
      }
      
      // Success - redirect to dashboard
      return NextResponse.redirect(requestUrl.origin + '/dashboard')
      
    } catch (error) {
      console.error('Unexpected auth callback error:', error)
      
      // Redirect to login with generic error
      const loginUrl = new URL('/login', requestUrl.origin)
      loginUrl.searchParams.set('error', 'invalid')
      return NextResponse.redirect(loginUrl.toString())
    }
  }

  // No code provided - redirect to login
  return NextResponse.redirect(requestUrl.origin + '/login')
}