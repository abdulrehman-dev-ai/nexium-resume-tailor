'use client'

import { useState, useEffect, Suspense } from 'react'
import { createClient } from '../../lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '../components/Navbar'

function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [useMagicLink, setUseMagicLink] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Get email from URL params if coming from magic link
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (useMagicLink) {
      // Handle magic link signup
      try {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (error) {
          if (error.message.includes('rate limit')) {
            setMessage('Too many requests. Please wait a few minutes before trying again.')
          } else {
            setMessage(`Error: ${error.message}`)
          }
        } else {
          setMessage('Check your email for the magic link to complete signup!')
        }
      } catch (error) {
        setMessage('An unexpected error occurred. Please try again.')
      } finally {
        setLoading(false)
      }
      return
    }

    // Handle password-based signup
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    try {
      // First, try the standard signup with email confirmation
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        // If signup fails, provide specific error handling
        if (error.message.includes('User already registered')) {
          setMessage('An account with this email already exists. Please sign in instead or use the magic link option.')
        } else if (error.message.includes('Invalid email')) {
          setMessage('Please enter a valid email address.')
        } else {
          setMessage(`Error: ${error.message}`)
        }
      } else if (data.user) {
        // Check if email confirmation is required
        if (data.session) {
          // User is immediately signed in (email confirmation disabled)
          setMessage('Account created successfully! Redirecting to dashboard...')
          setTimeout(() => {
            router.push('/dashboard')
          }, 2000)
        } else {
          // Email confirmation required
          setMessage('Account created! Please check your email (including spam folder) to verify your account. If you don\'t receive an email, try the Magic Link option instead.')
        }
        
        // Log for debugging
        console.log('Signup result:', {
          user: data.user,
          session: data.session,
          emailConfirmed: data.user.email_confirmed_at,
          needsConfirmation: !data.session
        })
      } else {
        setMessage('Signup completed but no user data received. Please try signing in or use the Magic Link option.')
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {useMagicLink ? 'Sign Up with Magic Link' : 'Create Your Account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {useMagicLink ? 'Enter your email to receive a magic link' : 'Set your password to complete account setup'}
          </p>
        </div>
        
        {/* Toggle between Magic Link and Password signup */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            type="button"
            onClick={() => setUseMagicLink(false)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              !useMagicLink
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Password Signup
          </button>
          <button
            type="button"
            onClick={() => setUseMagicLink(true)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              useMagicLink
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Magic Link
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            {!useMagicLink && (
              <>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password (min. 6 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:bg-gray-50 rounded-r-md transition-colors"
                      onClick={(e) => {
                        e.preventDefault()
                        setShowPassword(!showPassword)
                      }}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:bg-gray-50 rounded-r-md transition-colors"
                      onClick={(e) => {
                        e.preventDefault()
                        setShowConfirmPassword(!showConfirmPassword)
                      }}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <svg className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading 
                ? (useMagicLink ? 'Sending Magic Link...' : 'Creating Account...') 
                : (useMagicLink ? 'Send Magic Link' : 'Create Account')
              }
            </button>
          </div>

          {message && (
            <div className={`text-center text-sm p-3 rounded-md ${
              message.includes('Error') || message.includes('do not match') || message.includes('must be')
                ? 'text-red-700 bg-red-50 border border-red-200' 
                : 'text-green-700 bg-green-50 border border-green-200'
            }`}>
              {message}
            </div>
          )}
        </form>
        
        <div className="text-center">
          <a 
            href="/login" 
            className="text-indigo-600 hover:text-indigo-500 text-sm"
          >
            Already have an account? Sign in
          </a>
        </div>
      </div>
      </div>
    </div>
  )
}

export default function Signup() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SignupForm />
    </Suspense>
  )
}