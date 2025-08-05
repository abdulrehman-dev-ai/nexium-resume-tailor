'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../components/Navbar'

export default function Support() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('faq')
  const [searchQuery, setSearchQuery] = useState('')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const faqData = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I upload my resume?',
          a: 'Click the "Upload Resume" button on the dashboard, then select your PDF, DOC, or DOCX file. Make sure your file is under 10MB and contains text (not just images).'
        },
        {
          q: 'What file formats are supported?',
          a: 'We support PDF, DOC, and DOCX formats. PDF is recommended for best results as it preserves formatting and is most commonly used by employers.'
        },
        {
          q: 'How long does optimization take?',
          a: 'Most resume optimizations are completed within 30-60 seconds. Complex resumes or high traffic periods may take slightly longer.'
        }
      ]
    },
    {
      category: 'Account & Billing',
      questions: [
        {
          q: 'How do I upgrade to premium?',
          a: 'Go to your dashboard and click "Upgrade to Premium". You can choose between monthly and annual plans with different features.'
        },
        {
          q: 'Can I cancel my subscription anytime?',
          a: 'Yes, you can cancel your subscription at any time from your account settings. You\'ll continue to have access until the end of your billing period.'
        },
        {
          q: 'Do you offer refunds?',
          a: 'We offer a 30-day money-back guarantee if you\'re not satisfied with our service. Contact support for refund requests.'
        }
      ]
    },
    {
      category: 'Technical Issues',
      questions: [
        {
          q: 'My file upload failed. What should I do?',
          a: 'Check that your file is under 10MB, in a supported format (PDF/DOC/DOCX), and not password-protected. Try refreshing the page and uploading again.'
        },
        {
          q: 'The optimization is taking too long',
          a: 'If optimization takes more than 2 minutes, try refreshing the page. If the issue persists, contact support with your file details.'
        },
        {
          q: 'I can\'t download my optimized resume',
          a: 'Ensure your browser allows downloads and check your download folder. Try using a different browser or clearing your browser cache.'
        }
      ]
    },
    {
      category: 'Privacy & Security',
      questions: [
        {
          q: 'Is my resume data secure?',
          a: 'Yes, we use enterprise-grade encryption and never store your personal information longer than necessary. All data is automatically deleted after 30 days.'
        },
        {
          q: 'Who can see my resume?',
          a: 'Only you can access your resume data. Our AI processes your resume securely, and our staff cannot view your personal information.'
        },
        {
          q: 'How do I delete my account?',
          a: 'Go to Account Settings and click "Delete Account". This will permanently remove all your data from our servers.'
        }
      ]
    }
  ]

  const troubleshootingSteps = [
    {
      issue: 'Upload Failed',
      icon: '📁',
      steps: [
        'Check file format (PDF, DOC, DOCX only)',
        'Ensure file size is under 10MB',
        'Verify file is not password-protected',
        'Try a different browser',
        'Clear browser cache and cookies'
      ]
    },
    {
      issue: 'Slow Performance',
      icon: '⚡',
      steps: [
        'Check your internet connection',
        'Close other browser tabs',
        'Try during off-peak hours',
        'Use a different browser',
        'Restart your browser'
      ]
    },
    {
      issue: 'Login Issues',
      icon: '🔐',
      steps: [
        'Check your email for magic link',
        'Verify email address is correct',
        'Check spam/junk folder',
        'Try requesting a new magic link',
        'Clear browser cookies'
      ]
    }
  ]

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for contacting us! We\'ll get back to you within 24 hours.')
      setContactForm({ name: '', email: '', subject: '', message: '', priority: 'medium' })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-xl text-gray-600 mb-8">Get the support you need to optimize your resume successfully</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Get instant help from our support team</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Start Chat
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Send us a detailed message</p>
              <button 
                onClick={() => setActiveTab('contact')}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
          

        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'faq', label: 'FAQ', icon: '❓' },
                { id: 'troubleshooting', label: 'Troubleshooting', icon: '🔧' },
                { id: 'contact', label: 'Contact Us', icon: '📞' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div className="space-y-8">
                {filteredFAQ.length > 0 ? (
                  filteredFAQ.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        {category.category}
                      </h3>
                      <div className="space-y-4">
                        {category.questions.map((faq, faqIndex) => (
                          <div key={faqIndex} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                            <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-start">
                              <span className="text-blue-500 mr-2 mt-1">Q:</span>
                              {faq.q}
                            </h4>
                            <p className="text-gray-700 leading-relaxed ml-6">
                              <span className="text-green-600 font-medium mr-2">A:</span>
                              {faq.a}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600">Try adjusting your search terms or browse all categories above.</p>
                  </div>
                )}
              </div>
            )}

            {/* Troubleshooting Tab */}
            {activeTab === 'troubleshooting' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Common Issues & Solutions</h3>
                  <p className="text-gray-600">Step-by-step guides to resolve the most common problems</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {troubleshootingSteps.map((item, index) => (
                    <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">{item.icon}</div>
                        <h4 className="text-lg font-semibold text-gray-900">{item.issue}</h4>
                      </div>
                      <ol className="space-y-2">
                        {item.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start text-sm text-gray-700">
                            <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                              {stepIndex + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-8">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-semibold text-yellow-900 mb-2">Still Need Help?</h4>
                      <p className="text-yellow-800 mb-4">If these steps don't resolve your issue, our support team is here to help!</p>
                      <button 
                        onClick={() => setActiveTab('contact')}
                        className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                      >
                        Contact Support
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h3>
                  <p className="text-gray-600">Send us a message and we'll get back to you within 24 hours</p>
                </div>

                {submitMessage && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-green-800">{submitMessage}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of your issue"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                      Priority Level
                    </label>
                    <select
                      id="priority"
                      value={contactForm.priority}
                      onChange={(e) => setContactForm({ ...contactForm, priority: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Low - General question</option>
                      <option value="medium">Medium - Need assistance</option>
                      <option value="high">High - Urgent issue</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Please describe your issue in detail..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="grid md:grid-cols-2 gap-6 text-center">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Email Support</h4>
                      <p className="text-blue-800 text-sm mb-1">support@resumetailorai.com</p>
                      <p className="text-blue-700 text-xs">Response within 24 hours</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Live Chat</h4>
                      <p className="text-green-800 text-sm mb-1">Available 9 AM - 6 PM EST</p>
                      <p className="text-green-700 text-xs">Instant assistance</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}