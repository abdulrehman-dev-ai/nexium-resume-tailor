'use client'

import { useState, useEffect } from 'react'
import { createClient } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        router.push('/dashboard')
      }
    }
    checkAuth()
  }, [router, supabase.auth])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setLoading(true)
    setMessage('')
    
    // Directly send magic link without checking user existence
    // This avoids rate limits and works for both new and existing users
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
        setMessage('Check your email for the magic link!')
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Resume Tailor AI
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in with your email to get started
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Sending Magic Link...' : 'Send Magic Link'}
            </button>
          </div>
        </form>

        {message && (
          <div className={`text-center text-sm p-3 rounded-md ${
            message.includes('Error') || message.includes('Invalid') 
              ? 'text-red-700 bg-red-50 border border-red-200' 
              : 'text-green-700 bg-green-50 border border-green-200'
          }`}>
            {message}
          </div>
        )}

      </div>
    </div>
  )
}