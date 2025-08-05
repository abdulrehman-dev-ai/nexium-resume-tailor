import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Blog() {

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Resume Keywords That Get You Hired in 2025",
      excerpt: "Discover the most important keywords recruiters are looking for and how to naturally incorporate them into your resume for maximum ATS compatibility.",
      category: "keywords",
      readTime: "5 min read",
      date: "January 25, 2025",
      image: "/blog/keywords-2025.jpg",
      slug: "essential-resume-keywords-2025"
    },
    {
      id: 2,
      title: "How to Beat Applicant Tracking Systems (ATS) in 2025",
      excerpt: "Learn the insider secrets to creating ATS-friendly resumes that pass automated screening and reach human recruiters.",
      category: "ats",
      readTime: "7 min read",
      date: "January 22, 2025",
      image: "/blog/beat-ats-2025.jpg",
      slug: "beat-applicant-tracking-systems-2025"
    },
    {
      id: 3,
      title: "AI Resume Optimization: The Complete Guide",
      excerpt: "Everything you need to know about using AI to optimize your resume, from keyword analysis to formatting best practices.",
      category: "ai",
      readTime: "10 min read",
      date: "January 20, 2025",
      image: "/blog/ai-resume-guide.jpg",
      slug: "ai-resume-optimization-complete-guide"
    },
    {
      id: 4,
      title: "Resume Formatting Mistakes That Cost You Interviews",
      excerpt: "Avoid these common formatting errors that cause your resume to be rejected by both ATS systems and human recruiters.",
      category: "formatting",
      readTime: "6 min read",
      date: "January 18, 2025",
      image: "/blog/formatting-mistakes.jpg",
      slug: "resume-formatting-mistakes-cost-interviews"
    },
    {
      id: 5,
      title: "Industry-Specific Resume Tips for Tech Professionals",
      excerpt: "Tailored advice for software engineers, data scientists, and other tech professionals to create standout resumes.",
      category: "industry",
      readTime: "8 min read",
      date: "January 15, 2025",
      image: "/blog/tech-resume-tips.jpg",
      slug: "tech-professional-resume-tips"
    },
    {
      id: 6,
      title: "The Psychology of Resume Writing: What Recruiters Really Want",
      excerpt: "Understand the psychological factors that influence hiring decisions and how to leverage them in your resume.",
      category: "psychology",
      readTime: "9 min read",
      date: "January 12, 2025",
      image: "/blog/resume-psychology.jpg",
      slug: "psychology-resume-writing-recruiters"
    }
  ]

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'keywords', name: 'Keywords', count: blogPosts.filter(post => post.category === 'keywords').length },
    { id: 'ats', name: 'ATS Tips', count: blogPosts.filter(post => post.category === 'ats').length },
    { id: 'ai', name: 'AI Optimization', count: blogPosts.filter(post => post.category === 'ai').length },
    { id: 'formatting', name: 'Formatting', count: blogPosts.filter(post => post.category === 'formatting').length },
    { id: 'industry', name: 'Industry Tips', count: blogPosts.filter(post => post.category === 'industry').length },
    { id: 'psychology', name: 'Psychology', count: blogPosts.filter(post => post.category === 'psychology').length }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-20">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Resume Optimization
            <span className="block text-4xl md:text-5xl mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Expert Insights
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay ahead of the competition with our expert tips on resume optimization, 
            ATS strategies, and career advancement. Learn from industry professionals 
            and land your dream job faster.
          </p>
        </header>

        {/* Blog Posts Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <div className="text-6xl opacity-20">📄</div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {categories.find(cat => cat.id === post.category)?.name}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <button className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    Read More
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Newsletter Signup */}
        <section className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Resume Trends
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get weekly insights on resume optimization, ATS tips, and career advice delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

// SEO Metadata
export const metadata = {
  title: "Resume Optimization Blog - Expert Tips & ATS Strategies | Resume Tailor AI",
  description: "Expert insights on resume optimization, ATS strategies, and career advancement. Learn from industry professionals and increase your interview callbacks by 300%.",
  keywords: [
    "resume optimization blog",
    "ATS tips",
    "resume keywords",
    "career advice",
    "job search strategies",
    "resume writing tips",
    "interview preparation",
    "professional development"
  ],
  openGraph: {
    title: "Resume Optimization Blog - Expert Tips & Strategies",
    description: "Expert insights on resume optimization, ATS strategies, and career advancement. Learn from industry professionals.",
    type: "website",
    url: "https://resume-tailor-ai.vercel.app/blog"
  }
}