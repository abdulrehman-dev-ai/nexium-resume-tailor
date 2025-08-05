'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import type { User } from '@supabase/supabase-js'

interface NavbarProps {
  variant?: 'default' | 'transparent'
}

export default function Navbar({ variant = 'default' }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const navLinks = [
    { href: '/', label: 'Home', active: pathname === '/' },
    { href: '/docs', label: 'Documentation', active: pathname === '/docs' },
    { href: '/blog', label: 'Blog', active: pathname === '/blog' },
    { href: '/faq', label: 'FAQ', active: pathname === '/faq' },
    { href: '#features', label: 'Features', active: false, isAnchor: true },
    { href: '#how-it-works', label: 'How it Works', active: false, isAnchor: true },
  ]

  const baseClasses = variant === 'transparent' 
    ? 'bg-white/80 backdrop-blur-md border-b border-gray-200' 
    : 'bg-white shadow-sm border-b border-gray-200'

  return (
    <nav className={`${baseClasses} sticky top-0 z-50 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => router.push('/')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-white font-bold text-lg">RT</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">Resume Tailor AI</span>
              <span className="text-lg font-bold text-gray-900 sm:hidden">RT AI</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  if (link.isAnchor && pathname === '/') {
                    const element = document.querySelector(link.href)
                    element?.scrollIntoView({ behavior: 'smooth' })
                  } else if (link.isAnchor) {
                    router.push('/' + link.href)
                  } else {
                    router.push(link.href)
                  }
                }}
                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                  link.active ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => router.push('/login')}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push('/signup')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {!loading && user && (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg 
                className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${
                  mobileMenuOpen ? 'rotate-90' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 border-t border-gray-200">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  if (link.isAnchor && pathname === '/') {
                    const element = document.querySelector(link.href)
                    element?.scrollIntoView({ behavior: 'smooth' })
                  } else if (link.isAnchor) {
                    router.push('/' + link.href)
                  } else {
                    router.push(link.href)
                  }
                  setMobileMenuOpen(false)
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  link.active 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <div className="pt-4 border-t border-gray-200 space-y-2">
              {loading ? (
                <div className="flex justify-center py-2">
                  <div className="w-6 h-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                </div>
              ) : user ? (
                <>
                  <button
                    onClick={() => {
                      router.push('/dashboard')
                      setMobileMenuOpen(false)
                    }}
                    className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      handleSignOut()
                      setMobileMenuOpen(false)
                    }}
                    className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      router.push('/login')
                      setMobileMenuOpen(false)
                    }}
                    className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      router.push('/signup')
                      setMobileMenuOpen(false)
                    }}
                    className="block w-full text-center px-4 py-3 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}