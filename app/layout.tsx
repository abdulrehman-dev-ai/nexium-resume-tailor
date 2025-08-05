import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume Tailor AI - AI-Powered Resume Optimization Tool | Land Your Dream Job",
  description: "Transform your resume with AI-powered optimization. Get ATS-friendly resumes, keyword matching, and personalized suggestions to increase interview callbacks by 300%. Free trial available.",
  keywords: [
    "resume optimization",
    "AI resume builder",
    "ATS resume checker",
    "resume keywords",
    "job application",
    "career advancement",
    "resume tailor",
    "AI job matching",
    "resume analyzer",
    "professional resume"
  ],
  authors: [{ name: "Abdul Rehman", url: "https://abdulrehmansarwar.vercel.app" }],
  creator: "Abdul Rehman",
  publisher: "Nexium",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://resume-tailor-ai.vercel.app",
    title: "Resume Tailor AI - AI-Powered Resume Optimization Tool",
    description: "Transform your resume with AI-powered optimization. Get ATS-friendly resumes, keyword matching, and personalized suggestions to increase interview callbacks by 300%.",
    siteName: "Resume Tailor AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Resume Tailor AI - AI-Powered Resume Optimization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Tailor AI - AI-Powered Resume Optimization Tool",
    description: "Transform your resume with AI-powered optimization. Get ATS-friendly resumes and increase interview callbacks by 300%.",
    images: ["/og-image.png"],
    creator: "@abdulrehman",
  },
  alternates: {
    canonical: "https://resume-tailor-ai.vercel.app",
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Resume Tailor AI",
    "description": "AI-powered resume optimization tool that helps job seekers create ATS-friendly resumes and increase interview callbacks.",
    "url": "https://resume-tailor-ai.vercel.app",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free trial available with premium features"
    },
    "creator": {
      "@type": "Person",
      "name": "Abdul Rehman",
      "url": "https://abdulrehmansarwar.vercel.app"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nexium",
      "url": "https://nexium.ltd"
    },
    "featureList": [
      "AI-powered resume analysis",
      "ATS optimization",
      "Keyword matching",
      "Resume scoring",
      "Personalized suggestions",
      "Multiple export formats"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
