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

    // Handle error messages from auth callback
    const urlParams = new URLSearchParams(window.location.search)
    const error = urlParams.get('error')
    
    if (error) {
      switch (error) {
        case 'expired':
          setMessage(
            '⚠️ Magic link has expired.\n\n' +
            'Please request a new magic link below. Magic links expire after 1 hour for security.'
          )
          break
        case 'used':
          setMessage(
            '⚠️ Magic link already used.\n\n' +
            'This often happens when email scanners automatically click links. Please request a new magic link below.'
          )
          break
        case 'invalid':
          setMessage(
            '⚠️ Invalid or corrupted magic link.\n\n' +
            'Please request a new magic link below.'
          )
          break
        default:
          setMessage(
            '⚠️ Authentication failed.\n\n' +
            'Please try requesting a new magic link.'
          )
      }
      
      // Clear the error from URL
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [router, supabase.auth])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setLoading(true)
    setMessage('')
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          shouldCreateUser: true,
        },
      })

      if (error) {
        if (error.message.includes('rate limit')) {
          setMessage('Too many requests. Please wait a few minutes before trying again.')
        } else {
          setMessage(`Error: ${error.message}`)
        }
      } else {
        setMessage(
          `✅ Magic link sent to ${email}!\n\n` +
          `📧 Check your email and click the link to sign in.\n\n` +
          `⚠️ Important Tips:\n` +
          `• Use the same browser/device to click the link\n` +
          `• Click the link immediately after receiving it\n` +
          `• If the link doesn't work, try requesting a new one\n` +
          `• Corporate emails may have security scanners - try a personal email if issues persist`
        )
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
          <div className={`text-sm p-4 rounded-md ${
            message.includes('Error') || message.includes('⚠️') 
              ? 'text-red-700 bg-red-50 border border-red-200' 
              : 'text-green-700 bg-green-50 border border-green-200'
          }`}>
            <div className="whitespace-pre-line">{message}</div>
          </div>
        )}

        {/* Magic Link Troubleshooting Tips */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-2">💡 Magic Link Tips</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Check your spam/junk folder if you don't see the email</li>
            <li>• Use the same browser and device to click the magic link</li>
            <li>• Click the link immediately after receiving it</li>
            <li>• If using corporate email, try a personal email (Gmail, Yahoo, etc.)</li>
            <li>• Request a new link if the previous one doesn't work</li>
          </ul>
        </div>

      </div>
    </div>
  )
}