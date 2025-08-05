'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../components/Navbar'

export default function TermsOfService() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using Resume Tailor AI, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                Resume Tailor AI provides AI-powered resume optimization services, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Resume analysis and optimization suggestions</li>
                <li>Keyword matching and ATS compatibility checks</li>
                <li>Job description analysis</li>
                <li>Resume formatting and enhancement</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">
                As a user of our service, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate and truthful information</li>
                <li>Use the service only for lawful purposes</li>
                <li>Not attempt to reverse engineer or hack our systems</li>
                <li>Respect intellectual property rights</li>
                <li>Not share your account credentials with others</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The service and its original content, features, and functionality are and will remain the exclusive property of Resume Tailor AI and its licensors. The service is protected by copyright, trademark, and other laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Privacy and Data</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                In no event shall Resume Tailor AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Information</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@resumetailorai.com<br/>
                  <strong>Address:</strong> 123 AI Street, Tech City, TC 12345
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}