/**
 * ============================================================
 *  SOURCE OF TRUTH — src/data/content.ts
 *  All text, links, and metadata live here.
 *  Components must read from this file; never hardcode content.
 *  Fields marked `null` are hidden or shown as labeled placeholders.
 * ============================================================
 */

// ─── Personal ────────────────────────────────────────────────
export const person = {
  name: 'Mishesh Patel',
  role: 'AI/ML Developer',
  bio: 'I\'m a computer science student specialising in Artificial Intelligence and Machine Learning, focused on building intelligent software systems. I enjoy exploring how data, algorithms, and modern technologies can solve meaningful problems. Through my projects, I turn ideas into practical applications, combining software engineering with machine intelligence. I\'m most interested in building solutions that are useful, thoughtful, and scalable.' as string | null,
  email: 'misheshpatel2414@gmail.com',
  github: 'https://github.com/Mishesh06',
  linkedin: 'https://www.linkedin.com/in/mishesh-patel-941a74306/',
  /** Resume / CV download link — verified PDF in public directory */
  resume: '/Mishesh_Patel_Resume.pdf' as string | null,
  location: null as string | null,
} as const

// ─── Navigation links ─────────────────────────────────────────
export const navLinks = [
  { label: 'About',    href: '#about'    },
  { label: 'Projects', href: '#projects' },
  { label: 'Work',     href: '#all-work' },
  { label: 'Contact',  href: '#contact'  },
] as const

// ─── Featured Projects (hero mockup cards) ───────────────────
/**
 * `mockupType`: 'browser' renders a desktop browser chrome,
 *               'phone'   renders a mobile phone frame.
 * `accent`: optional per-project colour override (Tailwind-style hex)
 * Fields set to `null` will be hidden in the UI.
 */
export type Project = {
  id: string
  title: string
  projectNumber?: string
  year?: string
  role?: string
  tagline: string
  description: string
  problem?: string
  highlights?: string[]
  tech: string[]
  mockupType: 'browser' | 'phone'
  /** Live demo URL — null if not deployed */
  liveUrl: string | null
  /** GitHub repo URL — null if private */
  repoUrl: string | null
  /** Path to a screenshot inside /public — null shows a conceptual mockup */
  screenshot: string | null
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'career-gap-analyzer',
    title: 'Career Gap Finder',
    projectNumber: '01',
    year: '2026',
    role: 'AI Application Developer',
    tagline: 'AI-driven resume analysis, career gap risk assessment & job agent',
    description:
      'An intelligent AI agent that evaluates resumes across 28 skill dimensions, auto-scrapes gap-friendly job openings from LinkedIn and Indeed, and generates personalized roadmaps.',
    problem:
      'Career breaks shouldn’t mean automated rejections. We built an AI platform that turns employment pauses into quantifiable strengths with objective skill bridging.',
    highlights: [
      'Autonomous AI Job Agent with multi-platform scraping across LinkedIn, Indeed, Naukri & Wellfound',
      'Intelligent career gap analysis with automated risk assessment and missing skills mapping',
      'Live candidate dashboard tracking resume scores, gap durations, and recommended gap-friendly jobs',
      'Super Admin analytics portal for student profile auditing, gap statistics, and course review management',
    ],
    tech: ['Python', 'FastAPI', 'PyTorch', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    mockupType: 'browser',
    liveUrl: 'https://career-gap-analyzer-ten.vercel.app/',
    repoUrl: 'https://github.com/Mishesh06/career-gap-analyzer',
    screenshot: '/projects/career-gap-analyzer/desktop-1.jpg',
    featured: true,
  },
  {
    id: 'branded-shortlink-bio-hub',
    title: 'Branded Short-Link & Bio-Link Hub',
    projectNumber: '02',
    year: '2025',
    role: 'Full-stack development',
    tagline: 'High-throughput URL redirection engine & dynamic bio-link profiles',
    description:
      'Delivers sub-15ms edge redirects via Redis caching, dynamic bio-link profile studios, scannable QR generation, and real-time privacy-first clickstream telemetry.',
    problem:
      'Slow redirects and fragmented shorteners cost brands traffic. We built a branded routing engine and dynamic bio hub that gives creators total audience control.',
    highlights: [
      'Low-latency redirection engine with Redis caching achieving sub-15ms edge resolution',
      'Dynamic bio-link profile builder with customizable theme presets and live preview',
      'Real-time click telemetry tracking referrers, user agents, and conversion analytics',
      'Custom vanity domain mapping with automated slug routing and tag organization',
    ],
    tech: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Docker'],
    mockupType: 'browser',
    liveUrl: 'https://branded-link-hub.vercel.app/',
    repoUrl: 'https://github.com/Mishesh06/Branded_link_hub',
    screenshot: '/projects/branded-shortlink-bio-hub/desktop-1.jpg',
    featured: true,
  },
  {
    id: 'mini-erp-crm-portal',
    title: 'Mini ERP + CRM Operations Portal',
    projectNumber: '03',
    year: '2025',
    role: 'Full-stack development',
    tagline: 'Integrated inventory tracking, customer accounts & challan dispatch workflows',
    description:
      'Features real-time multi-warehouse inventory tracking with low-stock alerts, customer CRM accounts with follow-ups, and synchronized delivery challan workflows.',
    problem:
      'Spreadsheet chaos and inventory lag create costly stockouts. We unified warehouse distribution and sales pipelines into an audit-grade operations portal.',
    highlights: [
      'Unified customer account CRM with order histories, credit limits, and contact directories',
      'Real-time multi-warehouse inventory engine with automated low-stock reorder thresholds',
      'Audit-ready stock movement ledger tracking receipts, returns, bin transfers, and scrap logs',
      'End-to-end delivery challan workflow with sequential ID generation, verification, and dispatch',
    ],
    tech: ['TypeScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Docker'],
    mockupType: 'browser',
    liveUrl: 'https://mini-erp-crm-topaz.vercel.app/',
    repoUrl: 'https://github.com/Mishesh06/mini-erp-crm',
    screenshot: '/projects/mini-erp-crm-portal/desktop-1.jpg',
    featured: true,
  },
]

// ─── Skills ───────────────────────────────────────────────────
export type SkillCategory = {
  category: string
  code: string
  description?: string
  items: string[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Programming Languages',
    code: 'LANG',
    description: 'Core procedural, object-oriented & systems syntax',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    category: 'AI / Applied AI',
    code: 'AI/ML',
    description: 'LLM integrations, weighted matching algorithms & vector analysis',
    items: [
      'OpenAI API',
      'GPT-4o-mini',
      'AI Application Development',
      'AI-Powered Resume Analysis',
      'Weighted Matching Algorithm',
      'Personalized Job Recommendations',
    ],
  },
  {
    category: 'Backend & APIs',
    code: 'SRV',
    description: 'High-throughput microservices, REST architecture & secure RBAC',
    items: [
      'Node.js',
      'Express.js',
      'FastAPI',
      'Flask',
      'REST API Design',
      'JWT Authentication',
      'Role-Based Access Control (RBAC)',
    ],
  },
  {
    category: 'Databases',
    code: 'DATA',
    description: 'Relational schemas, ACID transactions & document indexing',
    items: [
      'PostgreSQL',
      'MongoDB',
      'MySQL',
      'SQLite',
      'Database Design (Schema Design, Indexing)',
    ],
  },
  {
    category: 'Data Processing',
    code: 'PIPE',
    description: 'Binary stream parsing, aggregation pipelines & validation',
    items: [
      'PDF Parsing (pdf-parse)',
      'File Upload Handling (Multer)',
      'MongoDB Aggregation Pipelines',
      'SQL Migrations',
      'Input Validation (Zod, express-validator)',
    ],
  },
  {
    category: 'Algorithms & Computer Science',
    code: 'CORE',
    description: 'Data structures, algorithmic complexity & design patterns',
    items: [
      'Data Structures (Arrays, Linked Lists, Trees, Graphs)',
      'Algorithms (Sorting & Searching, Recursion, Dynamic Programming)',
      'Algorithm Design',
      'OOP',
      'Software Design Patterns',
    ],
  },
  {
    category: 'Tools & Testing',
    code: 'TOOL',
    description: 'Verification suites, reactive UI styling & deployment',
    items: [
      'Git',
      'GitHub',
      'Jest',
      'Supertest',
      'React.js',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Vercel',
    ],
  },
]

// ─── Experience ───────────────────────────────────────────────
/**
 * Professional experience entries (strictly verified).
 * Empty array prevents unsupported claims and placeholder text.
 */
export type ExperienceEntry = {
  id: string
  company: string
  role: string
  period: string
  description: string | null
  current: boolean
}

export const experience: ExperienceEntry[] = []

// ─── Education ────────────────────────────────────────────────
export type EducationEntry = {
  id: string
  institution: string
  degree: string
  period: string
  note: string | null
  cgpa?: string
  honors?: string
  location?: string
}

export const education: EducationEntry[] = [
  {
    id: 'edu-btech',
    institution: 'Parul Institute of Engineering and Technology',
    location: 'Vadodara, Gujarat, India',
    degree: 'Bachelor of Technology (B.Tech), Computer Science & Engineering (Artificial Intelligence)',
    period: '2023 – 2027',
    cgpa: '7.33 / 10',
    honors: 'Merit Scholarship Recipient',
    note: 'Specialized curriculum in Artificial Intelligence, Neural Networks, Database Systems, Algorithm Design, and Systems Architecture.',
  },
]

// ─── Profile & Hero section ──────────────────────────────────
/**
 * Structured content for the hero section and general profile summary.
 * `headlineLines[accentIndex]` receives the amber accent colour.
 * `summary` is the short intro beneath the headline.
 */
export const heroContent = {
  /**
   * Three-line cinematic headline. Keep each line short — it renders
   * at display size (clamp 3.5 rem → 8.5 rem).
   */
  headlineLines: ['I build', 'intelligence into', 'systems.'] as const,
  /** Index into headlineLines that gets the amber accent colour. */
  accentIndex: 1,
  /**
   * Short intro shown beneath the headline.
   * Concise and purposeful — teases the person's focus.
   */
  summary:
    'Exploring AI and machine learning to transform complex problems into practical, intelligent, and scalable solutions.',
  primaryCta:   { label: 'View Projects', href: '#projects' },
  secondaryCta: { label: 'Say Hello',     href: '#contact'  },
} as const

/**
 * Standard profile object containing headline, summary, and role metadata.
 * resumePdf: set to non-null URL or file path when resume is ready for download.
 */
export const profile = {
  headline: 'I build intelligence into systems.',
  headlineLines: heroContent.headlineLines,
  accentIndex: heroContent.accentIndex,
  summary: heroContent.summary,
  name: person.name,
  role: person.role,
  resumePdf: person.resume as string | null,
} as const

// ─── Contact copy ─────────────────────────────────────────────
export const contactCopy = {
  heading: "Let's build something",
  subheading: "Have an interesting problem? I'm always open to new ideas.",
  cta: 'Say hello',
}
