'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RT</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Resume Tailor AI</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">How it Works</a>
              <button
                onClick={() => router.push('/login')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 font-medium"
              >
                Sign In
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            AI-Powered Resume Optimization
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Land Your
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Dream Job</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Transform your resume with cutting-edge AI technology. Get personalized optimization, 
            keyword analysis, and match scoring that gets you noticed by recruiters.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => router.push('/login')}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            
            <button
              onClick={() => router.push('/dev-login')}
              className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 transform hover:scale-105"
            >
              Developer Access
            </button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Instant Results</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>ATS Optimized</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
         <section id="features" className="mt-32">
           <div className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
               Powerful Features
             </h2>
             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
               Everything you need to create a winning resume that stands out
             </p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
             <div className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                 </svg>
               </div>
               <h3 className="text-2xl font-bold mb-4 text-gray-900">AI-Powered Analysis</h3>
               <p className="text-gray-600 leading-relaxed">
                 Advanced machine learning algorithms analyze your resume and job descriptions to provide 
                 intelligent, personalized optimization suggestions.
               </p>
               <div className="mt-6 flex items-center text-blue-600 font-medium">
                 <span>Learn more</span>
                 <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                 </svg>
               </div>
             </div>
             
             <div className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
               <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                 </svg>
               </div>
               <h3 className="text-2xl font-bold mb-4 text-gray-900">Smart Match Scoring</h3>
               <p className="text-gray-600 leading-relaxed">
                 Get detailed compatibility scores and see exactly how well your resume 
                 aligns with specific job requirements and industry standards.
               </p>
               <div className="mt-6 flex items-center text-indigo-600 font-medium">
                 <span>Learn more</span>
                 <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                 </svg>
               </div>
             </div>
             
             <div className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
               <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                 </svg>
               </div>
               <h3 className="text-2xl font-bold mb-4 text-gray-900">ATS Optimization</h3>
               <p className="text-gray-600 leading-relaxed">
                 Identify missing keywords and optimize your resume format to pass 
                 through Applicant Tracking Systems effectively.
               </p>
               <div className="mt-6 flex items-center text-green-600 font-medium">
                 <span>Learn more</span>
                 <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                 </svg>
               </div>
             </div>
           </div>
         </section>

        {/* How it Works Section */}
         <section id="how-it-works" className="mt-32">
           <div className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
               How It Works
             </h2>
             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
               Get your optimized resume in just 4 simple steps
             </p>
           </div>
           
           <div className="relative">
             {/* Connection Lines */}
             <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 transform -translate-y-1/2 z-0"></div>
             
             <div className="grid md:grid-cols-4 gap-8 relative z-10">
               <div className="text-center group">
                 <div className="relative">
                   <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                     <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                     </svg>
                   </div>
                   <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                     1
                   </div>
                 </div>
                 <h4 className="text-xl font-bold mb-3 text-gray-900">Upload Resume</h4>
                 <p className="text-gray-600 leading-relaxed">Upload your current resume in PDF, Word, or text format. Our system supports all major file types.</p>
               </div>
               
               <div className="text-center group">
                 <div className="relative">
                   <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                     <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                     </svg>
                   </div>
                   <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                     2
                   </div>
                 </div>
                 <h4 className="text-xl font-bold mb-3 text-gray-900">Add Job Description</h4>
                 <p className="text-gray-600 leading-relaxed">Paste the job description you're targeting. Include requirements, skills, and qualifications.</p>
               </div>
               
               <div className="text-center group">
                 <div className="relative">
                   <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                     <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                     </svg>
                   </div>
                   <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                     3
                   </div>
                 </div>
                 <h4 className="text-xl font-bold mb-3 text-gray-900">AI Analysis</h4>
                 <p className="text-gray-600 leading-relaxed">Our advanced AI analyzes both documents and generates personalized optimization recommendations.</p>
               </div>
               
               <div className="text-center group">
                 <div className="relative">
                   <div className="bg-gradient-to-r from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                     <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                     </svg>
                   </div>
                   <div className="absolute -top-2 -right-2 bg-green-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                     4
                   </div>
                 </div>
                 <h4 className="text-xl font-bold mb-3 text-gray-900">Get Results</h4>
                 <p className="text-gray-600 leading-relaxed">Download your optimized resume, match score, and detailed insights to improve your job prospects.</p>
               </div>
             </div>
           </div>
         </section>
         
         {/* CTA Section */}
         <section className="mt-32 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center text-white">
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
               ✨ No credit card required • ⚡ Instant results
             </div>
           </div>
         </section>
      </div>
    </div>
  )
}
