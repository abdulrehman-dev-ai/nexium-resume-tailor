import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Resume Tailor AI</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Transform your resume with AI-powered optimization. Get personalized suggestions, keyword analysis, and ATS-friendly formatting to land your dream job.
            </p>
            <div className="flex space-x-4">
              <span className="text-gray-500 text-sm">Connect with us:</span>
              <div className="flex space-x-2">
                <div className="w-5 h-5 bg-gray-600 rounded opacity-50"></div>
                <div className="w-5 h-5 bg-gray-600 rounded opacity-50"></div>
                <div className="w-5 h-5 bg-gray-600 rounded opacity-50"></div>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/login" className="text-gray-300 hover:text-white transition-colors">Login</a></li>
              <li><a href="/signup" className="text-gray-300 hover:text-white transition-colors">Sign Up</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400 cursor-default">Help Center</span></li>
              <li><span className="text-gray-400 cursor-default">Documentation</span></li>
              <li><span className="text-gray-400 cursor-default">Privacy Policy</span></li>
              <li><span className="text-gray-400 cursor-default">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Resume Tailor AI. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">All systems operational</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
