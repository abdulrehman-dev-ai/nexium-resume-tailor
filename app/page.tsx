'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'
import Navbar from './components/Navbar'

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
      
      if (user) {
        router.push('/dashboard')
      }
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          router.push('/dashboard')
        } else {
          setUser(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar variant="transparent" />
      
      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="mr-2">🚀</span>
            AI-Powered Resume Optimization
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Land Your Dream Job with
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block mt-2">
              AI-Optimized Resumes
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform your resume with cutting-edge AI technology. Get personalized optimization, 
            keyword matching, and ATS compatibility to increase your interview chances by 3x.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => router.push('/login')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
            >
              <span>Start Optimizing Now</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Free to try</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Results in minutes</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Resume Tailor AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced AI technology analyzes job descriptions and optimizes your resume for maximum impact.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">ATS Optimization</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Ensure your resume passes Applicant Tracking Systems with our advanced keyword optimization and formatting.
              </p>
            </div>
            
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">AI-Powered Matching</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our AI analyzes job descriptions and tailors your resume to match specific requirements and keywords.
              </p>
            </div>
            
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Performance Analytics</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Get detailed insights and match scores to understand how well your resume aligns with job requirements.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="mt-32 py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 rounded-3xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                How It <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Works</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Get your optimized resume in just <span className="font-semibold text-blue-600">4 simple steps</span>
              </p>
            </div>
            
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Step 1: Upload Resume */}
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-500 transform group-hover:scale-110">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    1
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <h4 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">Upload Resume</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">Upload your current resume in PDF, Word, or text format. Our advanced system supports all major file types.</p>
                  <div className="flex justify-center space-x-2 text-xs">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">PDF</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">DOCX</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">TXT</span>
                  </div>
                </div>
              </div>
              
              {/* Step 2: Add Job Description */}
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-indigo-500/25 transition-all duration-500 transform group-hover:scale-110">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    2
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <h4 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-indigo-600 transition-colors">Add Job Description</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">Paste the complete job description you're targeting. Include all requirements and qualifications for optimal matching.</p>
                  <div className="flex justify-center space-x-2 text-xs">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">Requirements</span>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">Skills</span>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">Keywords</span>
                  </div>
                </div>
              </div>
              
              {/* Step 3: AI Analysis */}
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-700 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500 transform group-hover:scale-110">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    3
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <h4 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors">AI Analysis</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">Our AI analyzes both documents using advanced NLP to identify gaps and generate personalized optimization strategies.</p>
                  <div className="flex justify-center space-x-2 text-xs">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">NLP</span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">ML</span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">Smart Match</span>
                  </div>
                </div>
              </div>
              
              {/* Step 4: Get Results */}
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="bg-gradient-to-br from-green-500 to-green-700 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-green-500/25 transition-all duration-500 transform group-hover:scale-110">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-600 to-green-700 text-white text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    4
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <h4 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-green-600 transition-colors">Get Results</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">Download your optimized resume with detailed match score, keyword analysis, and actionable insights.</p>
                  <div className="flex justify-center space-x-2 text-xs">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">PDF Export</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Match Score</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Insights</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <button
                onClick={() => router.push('/login')}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span>Start Optimizing Now</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <p className="text-gray-500 text-sm mt-4">Free to try - No credit card required - Results in minutes</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-32 mb-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of professionals who have successfully optimized their resumes with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => router.push('/login')}
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Start Optimizing Now</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <div className="text-sm opacity-75">
              No credit card required - Instant results
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
