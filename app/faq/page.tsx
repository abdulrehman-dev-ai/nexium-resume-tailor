'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How does Resume Tailor AI work?",
          answer: "Resume Tailor AI uses advanced artificial intelligence to analyze your resume and job descriptions. Our AI engine identifies gaps, suggests improvements, and optimizes your resume for Applicant Tracking Systems (ATS) to increase your chances of getting interviews by up to 300%."
        },
        {
          question: "Is Resume Tailor AI free to use?",
          answer: "Yes! We offer a free tier that allows you to analyze and optimize your resume. Premium features include unlimited optimizations, advanced ATS scoring, and priority support. No credit card required to get started."
        },
        {
          question: "What file formats do you support?",
          answer: "We support PDF, DOC, and DOCX file formats. For best results, we recommend uploading your resume as a PDF to maintain formatting consistency across different systems."
        }
      ]
    },
    {
      category: "Resume Optimization",
      questions: [
        {
          question: "What is ATS optimization and why is it important?",
          answer: "ATS (Applicant Tracking System) optimization ensures your resume can be properly read and ranked by automated systems that 98% of Fortune 500 companies use. Our AI optimizes keywords, formatting, and structure to pass ATS filters and reach human recruiters."
        },
        {
          question: "How accurate is the AI analysis?",
          answer: "Our AI is trained on millions of successful resumes and job postings. It provides 95%+ accuracy in identifying optimization opportunities, keyword gaps, and ATS compatibility issues. The system is continuously updated with the latest hiring trends."
        },
        {
          question: "Can I optimize my resume for multiple job types?",
          answer: "Absolutely! You can create multiple optimized versions of your resume for different roles, industries, or companies. Each optimization is tailored to specific job requirements and industry standards."
        },
        {
          question: "How long does the optimization process take?",
          answer: "Our AI analyzes your resume in under 30 seconds. You'll receive instant feedback on ATS compatibility, keyword optimization, and improvement suggestions. Implementing the changes typically takes 5-10 minutes."
        }
      ]
    },
    {
      category: "Features & Pricing",
      questions: [
        {
          question: "What's included in the free plan?",
          answer: "The free plan includes: 1 resume analysis per month, basic ATS scoring, keyword suggestions, and formatting recommendations. Perfect for testing our service and getting started with resume optimization."
        },
        {
          question: "What premium features are available?",
          answer: "Premium features include: unlimited resume analyses, advanced ATS scoring, industry-specific optimization, cover letter generation, LinkedIn profile optimization, priority support, and access to our job matching algorithm."
        },
        {
          question: "Do you offer refunds?",
          answer: "Yes, we offer a 30-day money-back guarantee for all premium plans. If you're not satisfied with the results, contact our support team for a full refund."
        }
      ]
    },
    {
      category: "Privacy & Security",
      questions: [
        {
          question: "Is my resume data secure?",
          answer: "Absolutely. We use enterprise-grade encryption (AES-256) to protect your data. Your resume is never shared with third parties, and you can delete your data at any time. We're GDPR and CCPA compliant."
        },
        {
          question: "Do you store my personal information?",
          answer: "We only store the minimum information necessary to provide our service. Your resume content is encrypted and automatically deleted after 90 days of inactivity. You have full control over your data."
        },
        {
          question: "Can employers see my resume through your platform?",
          answer: "No, your resume is completely private. We don't share your information with employers or recruiters. Resume Tailor AI is a tool for you to optimize your resume before applying to jobs directly."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What browsers do you support?",
          answer: "Resume Tailor AI works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience."
        },
        {
          question: "I'm having trouble uploading my resume. What should I do?",
          answer: "First, ensure your file is under 10MB and in PDF, DOC, or DOCX format. Clear your browser cache and try again. If issues persist, contact our support team at support@resumetailorai.com."
        },
        {
          question: "How can I contact customer support?",
          answer: "You can reach our support team via email at support@resumetailorai.com or through the live chat feature. Premium users receive priority support with response times under 2 hours."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Everything you need to know about Resume Tailor AI, ATS optimization, and how our AI-powered platform helps you land more interviews.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
            <p className="text-blue-800 font-medium">
              Can't find what you're looking for? <a href="mailto:support@resumetailorai.com" className="text-blue-600 hover:text-blue-700 underline">Contact our support team</a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const itemIndex = categoryIndex * 100 + questionIndex
                  const isOpen = openItems.includes(itemIndex)
                  
                  return (
                    <div key={questionIndex} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      <button
                        onClick={() => toggleItem(itemIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className={`transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      } overflow-hidden`}>
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Optimize Your Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of job seekers who've increased their interview callbacks by 300%
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Get Started Free
            </a>
            <a
              href="/dashboard"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Try Demo
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}