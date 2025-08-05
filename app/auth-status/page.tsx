'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../../lib/supabase'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export default function AuthStatus() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        setError(`User error: ${userError.message}`)
      }
      
      setUser(user)
      
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        setError(`Session error: ${sessionError.message}`)
      }
      
      setSessionInfo(session)
      
    } catch (error) {
      setError(`Unexpected error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const refreshSession = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.refreshSession()
      
      if (error) {
        setError(`Refresh error: ${error.message}`)
      } else {
        setUser(data.user)
        setSessionInfo(data.session)
        setError(null)
      }
    } catch (error) {
      setError(`Refresh failed: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const testApiCall = async () => {
    try {
      const response = await fetch('/api/optimizations', {
        method: 'GET',
        credentials: 'include',
      })
      
      const result = await response.json()
      
      if (response.ok) {
        alert(`API call successful! Found ${result.data?.length || 0} optimizations.`)
      } else {
        alert(`API call failed: ${response.status} - ${result.error || 'Unknown error'}`)
      }
    } catch (error) {
      alert(`API call error: ${error}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Checking authentication status...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Authentication Status</h1>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}
          
          <div className="space-y-6">
            {/* User Info */}
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3">User Information</h2>
              {user ? (
                <div className="space-y-2">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>ID:</strong> {user.id}</p>
                  <p><strong>Created:</strong> {new Date(user.created_at).toLocaleString()}</p>
                  <p><strong>Last Sign In:</strong> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never'}</p>
                </div>
              ) : (
                <p className="text-red-600">No user found - not authenticated</p>
              )}
            </div>
            
            {/* Session Info */}
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3">Session Information</h2>
              {sessionInfo ? (
                <div className="space-y-2">
                  <p><strong>Access Token:</strong> {sessionInfo.access_token ? 'Present' : 'Missing'}</p>
                  <p><strong>Refresh Token:</strong> {sessionInfo.refresh_token ? 'Present' : 'Missing'}</p>
                  <p><strong>Expires At:</strong> {sessionInfo.expires_at ? new Date(sessionInfo.expires_at * 1000).toLocaleString() : 'Unknown'}</p>
                  <p><strong>Token Type:</strong> {sessionInfo.token_type || 'Unknown'}</p>
                </div>
              ) : (
                <p className="text-red-600">No session found</p>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={checkAuthStatus}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Refresh Status
              </button>
              
              {user && (
                <>
                  <button
                    onClick={refreshSession}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Refresh Session
                  </button>
                  
                  <button
                    onClick={testApiCall}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    Test API Call
                  </button>
                  
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    Go to Dashboard
                  </button>
                </>
              )}
              
              <button
                onClick={signOut}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Sign Out
              </button>
              
              <button
                onClick={() => router.push('/login')}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}