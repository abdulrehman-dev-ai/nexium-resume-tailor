# Resume Tailor AI - Wireframes

## Overview

This document contains wireframes for the Resume Tailor AI web application. The wireframes are presented in ASCII art format to provide a clear visual representation of the user interface layout and functionality.

## 1. Landing Page

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Resume Tailor AI                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│    ┌─────────────────────────────────────────────────────────┐     │
│    │                                                         │     │
│    │              🎯 Resume Tailor AI                        │     │
│    │                                                         │     │
│    │        AI-Powered Resume Optimization Tool              │     │
│    │                                                         │     │
│    │    "Tailor your resume for any job in seconds"          │     │
│    │                                                         │     │
│    │              [Get Started Free]                         │     │
│    │                                                         │     │
│    └─────────────────────────────────────────────────────────┘     │
│                                                                     │
│    ✨ Features:                                                     │
│    • AI-powered optimization                                        │
│    • Keyword analysis                                               │
│    • Match score calculation                                        │
│    • Professional formatting                                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 2. Login Page

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Resume Tailor AI                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                    ┌─────────────────────┐                         │
│                    │                     │                         │
│                    │   🔐 Sign In        │                         │
│                    │                     │                         │
│                    │  Sign in with your  │                         │
│                    │  email to get       │                         │
│                    │  started            │                         │
│                    │                     │                         │
│                    │  ┌─────────────────┐ │                         │
│                    │  │ Email Address   │ │                         │
│                    │  └─────────────────┘ │                         │
│                    │                     │                         │
│                    │  [Send Magic Link]  │                         │
│                    │                     │                         │
│                    │  Status: ________   │                         │
│                    │                     │                         │
│                    └─────────────────────┘                         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 3. Dashboard - Main View

```
┌─────────────────────────────────────────────────────────────────────┐
│ Resume Tailor AI                    Welcome, user@email.com [Logout] │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│              Welcome to Resume Tailor AI                           │
│        Your AI-powered resume optimization tool                     │
│                                                                     │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐       │
│  │                 │ │                 │ │                 │       │
│  │  📄 Upload      │ │  📋 Job         │ │  🤖 AI          │       │
│  │     Resume      │ │     Description │ │     Optimization│       │
│  │                 │ │                 │ │                 │       │
│  │  Upload your    │ │  Paste the job  │ │  Let AI tailor  │       │
│  │  current resume │ │  description    │ │  your resume    │       │
│  │  to get started │ │  you're         │ │  for the job    │       │
│  │                 │ │  applying for   │ │                 │       │
│  │                 │ │                 │ │                 │       │
│  │ [Upload Resume] │ │ [Add Job Desc]  │ │ [Optimize]      │       │
│  │                 │ │                 │ │                 │       │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘       │
│                                                                     │
│  Recent Optimizations:                                              │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Software Engineer @ TechCorp        Score: 85%  [View]      │   │
│  │ Product Manager @ StartupXYZ        Score: 92%  [View]      │   │
│  │ Data Analyst @ BigData Inc          Score: 78%  [View]      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 4. Resume Upload Modal

```
┌─────────────────────────────────────────────────────────────────────┐
│                          Upload Resume                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│    ┌─────────────────────────────────────────────────────────┐     │
│    │                                                         │     │
│    │              📄 Upload Your Resume                      │     │
│    │                                                         │     │
│    │    ┌─────────────────────────────────────────────┐     │     │
│    │    │                                             │     │     │
│    │    │         Drag & drop your resume here        │     │     │
│    │    │                    or                       │     │     │
│    │    │              [Choose File]                  │     │     │
│    │    │                                             │     │     │
│    │    │     Supported: PDF, DOC, DOCX, TXT          │     │     │
│    │    │                                             │     │     │
│    │    └─────────────────────────────────────────────┘     │     │
│    │                                                         │     │
│    │    OR paste your resume text:                           │     │
│    │    ┌─────────────────────────────────────────────┐     │     │
│    │    │                                             │     │     │
│    │    │  [Text area for resume content]             │     │     │
│    │    │                                             │     │     │
│    │    └─────────────────────────────────────────────┘     │     │
│    │                                                         │     │
│    │              [Cancel]    [Upload Resume]                │     │
│    │                                                         │     │
│    └─────────────────────────────────────────────────────────┘     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 5. Job Description Input

```
┌─────────────────────────────────────────────────────────────────────┐
│                       Add Job Description                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│    ┌─────────────────────────────────────────────────────────┐     │
│    │                                                         │     │
│    │              📋 Job Description                         │     │
│    │                                                         │     │
│    │    Job Title: ┌─────────────────────────────────┐       │     │
│    │               │ Software Engineer               │       │     │
│    │               └─────────────────────────────────┘       │     │
│    │                                                         │     │
│    │    Company:   ┌─────────────────────────────────┐       │     │
│    │               │ TechCorp Inc.                   │       │     │
│    │               └─────────────────────────────────┘       │     │
│    │                                                         │     │
│    │    Job Description:                                     │     │
│    │    ┌─────────────────────────────────────────────┐     │     │
│    │    │ We are looking for a skilled Software      │     │     │
│    │    │ Engineer to join our team. Requirements:   │     │     │
│    │    │ - 3+ years experience with React/Node.js   │     │     │
│    │    │ - Strong problem-solving skills             │     │     │
│    │    │ - Experience with cloud platforms           │     │     │
│    │    │ - Bachelor's degree in CS or related       │     │     │
│    │    │                                             │     │     │
│    │    └─────────────────────────────────────────────┘     │     │
│    │                                                         │     │
│    │              [Cancel]    [Analyze Job]                 │     │
│    │                                                         │     │
│    └─────────────────────────────────────────────────────────┘     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 6. AI Processing Screen

```
┌─────────────────────────────────────────────────────────────────────┐
│                       AI Optimization                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                    ┌─────────────────────┐                         │
│                    │                     │                         │
│                    │   🤖 AI Working     │                         │
│                    │                     │                         │
│                    │      ⟳ Loading      │                         │
│                    │                     │                         │
│                    │  Analyzing your     │                         │
│                    │  resume and job     │                         │
│                    │  description...     │                         │
│                    │                     │                         │
│                    │  ████████░░ 80%     │                         │
│                    │                     │                         │
│                    │  Current step:      │                         │
│                    │  Optimizing content │                         │
│                    │                     │                         │
│                    │  Estimated time:    │                         │
│                    │  30 seconds         │                         │
│                    │                     │                         │
│                    └─────────────────────┘                         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 7. Optimization Results

```
┌─────────────────────────────────────────────────────────────────────┐
│ Resume Tailor AI                                          [Dashboard]│
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  🎉 Optimization Complete!                                          │
│                                                                     │
│  ┌─────────────────┐                    ┌─────────────────────────┐ │
│  │                 │                    │                         │ │
│  │  📊 Match Score │                    │  🔍 Analysis            │ │
│  │                 │                    │                         │ │
│  │      85%        │                    │  Keywords Found: 12/15  │ │
│  │   ████████░░    │                    │  Missing Keywords:      │ │
│  │                 │                    │  • Cloud Architecture   │ │
│  │  Improvement:   │                    │  • DevOps               │ │
│  │  +23%           │                    │  • Microservices        │ │
│  │                 │                    │                         │ │
│  └─────────────────┘                    └─────────────────────────┘ │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    📝 Suggestions                           │   │
│  │                                                             │   │
│  │  • Add specific cloud platform experience (AWS, Azure)     │   │
│  │  • Quantify your achievements with numbers and metrics      │   │
│  │  • Emphasize leadership and team collaboration skills      │   │
│  │  • Include relevant certifications or training             │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  [View Original] [View Optimized] [Download PDF] [Save & Continue]  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 8. Side-by-Side Comparison

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Resume Comparison                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────┐  │  ┌─────────────────────────────┐   │
│  │     Original Resume     │  │  │     Optimized Resume        │   │
│  ├─────────────────────────┤  │  ├─────────────────────────────┤   │
│  │                         │  │  │                             │   │
│  │ John Doe                │  │  │ John Doe                    │   │
│  │ Software Developer      │  │  │ Senior Software Engineer    │   │
│  │                         │  │  │                             │   │
│  │ Experience:             │  │  │ Experience:                 │   │
│  │ • Worked on web apps    │  │  │ • Developed scalable web    │   │
│  │ • Used React and Node   │  │  │   applications using React, │   │
│  │ • Collaborated with     │  │  │   Node.js, and cloud        │   │
│  │   team members          │  │  │   platforms (AWS)           │   │
│  │                         │  │  │ • Led cross-functional      │   │
│  │ Skills:                 │  │  │   teams of 5+ developers    │   │
│  │ • JavaScript            │  │  │                             │   │
│  │ • React                 │  │  │ Skills:                     │   │
│  │ • Node.js               │  │  │ • JavaScript, TypeScript    │   │
│  │                         │  │  │ • React, Node.js, Express   │   │
│  │                         │  │  │ • AWS, Docker, Kubernetes   │   │
│  │                         │  │  │ • Microservices, DevOps     │   │
│  │                         │  │  │                             │   │
│  └─────────────────────────┘  │  └─────────────────────────────┘   │
│                                                                     │
│              [Download Original] [Download Optimized]              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 9. History/Previous Optimizations

```
┌─────────────────────────────────────────────────────────────────────┐
│ Resume Tailor AI                                          [Dashboard]│
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  📚 Optimization History                                            │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Date       │ Job Title           │ Company      │ Score │ Action│   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ 2025-01-15 │ Software Engineer   │ TechCorp     │  85%  │[View] │   │
│  │ 2025-01-14 │ Product Manager     │ StartupXYZ   │  92%  │[View] │   │
│  │ 2025-01-13 │ Data Analyst        │ BigData Inc  │  78%  │[View] │   │
│  │ 2025-01-12 │ Frontend Developer  │ WebCorp      │  88%  │[View] │   │
│  │ 2025-01-11 │ Full Stack Dev      │ DevStudio    │  81%  │[View] │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  Filters: [All] [Last 7 days] [Last 30 days] [High Score (>80%)]   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    📈 Your Progress                         │   │
│  │                                                             │   │
│  │  Average Match Score: 84.8%                                 │   │
│  │  Total Optimizations: 15                                    │   │
│  │  Best Score: 92% (Product Manager)                          │   │
│  │  Most Improved: +31% (Data Analyst)                         │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│                        [New Optimization]                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 10. Mobile Responsive Design

```
┌─────────────────┐
│ Resume Tailor AI│
├─────────────────┤
│                 │
│ 🎯 Welcome!     │
│                 │
│ ┌─────────────┐ │
│ │ 📄 Upload   │ │
│ │   Resume    │ │
│ │             │ │
│ │ [Upload]    │ │
│ └─────────────┘ │
│                 │
│ ┌─────────────┐ │
│ │ 📋 Job      │ │
│ │ Description │ │
│ │             │ │
│ │ [Add Job]   │ │
│ └─────────────┘ │
│                 │
│ ┌─────────────┐ │
│ │ 🤖 AI       │ │
│ │ Optimize    │ │
│ │             │ │
│ │ [Optimize]  │ │
│ └─────────────┘ │
│                 │
│ Recent:         │
│ • TechCorp 85%  │
│ • StartupXYZ 92%│
│                 │
│ [☰ Menu]        │
└─────────────────┘
```

## Design Principles

### 1. Simplicity
- Clean, uncluttered interface
- Clear call-to-action buttons
- Minimal cognitive load

### 2. Progressive Disclosure
- Show information when needed
- Step-by-step workflow
- Expandable sections for details

### 3. Feedback & Status
- Clear progress indicators
- Real-time status updates
- Success and error states

### 4. Accessibility
- High contrast colors
- Keyboard navigation
- Screen reader compatibility
- Clear typography

### 5. Mobile-First
- Responsive design
- Touch-friendly interactions
- Optimized for small screens

## Color Scheme

- **Primary:** Blue (#3B82F6) - Trust, professionalism
- **Secondary:** Green (#10B981) - Success, optimization
- **Accent:** Purple (#8B5CF6) - AI, innovation
- **Neutral:** Gray (#6B7280) - Text, backgrounds
- **Success:** Green (#059669) - Positive feedback
- **Warning:** Yellow (#D97706) - Caution
- **Error:** Red (#DC2626) - Errors, alerts

## Typography

- **Headings:** Geist Sans (Bold)
- **Body Text:** Geist Sans (Regular)
- **Code/Monospace:** Geist Mono
- **Sizes:** 12px, 14px, 16px, 18px, 24px, 32px

## Interactive Elements

- **Buttons:** Rounded corners, hover states
- **Forms:** Clear labels, validation feedback
- **Cards:** Subtle shadows, hover effects
- **Modals:** Overlay with backdrop blur
- **Loading:** Smooth animations, progress bars

These wireframes provide a comprehensive visual guide for implementing the Resume Tailor AI user interface, ensuring a consistent and user-friendly experience across all features and devices.