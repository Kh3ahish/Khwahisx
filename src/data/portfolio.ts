import bankAppImg from "../assets/bank app.webp"
import boatAppImg from "../assets/boat app.webp"
import housingAppImg from "../assets/housing app.webp"
import housingPcImg from "../assets/housing pc wesbite.webp"
import meloxAppImg from "../assets/melox app.webp"
import zellicPcImg from "../assets/zellic pc website.webp"

export interface Project {
  id: string
  index: string
  title: string
  shortDescription?: string
  description?: string
  category: string
  tags: string[]
  type: "WEB" | "MOBILE" | "PRODUCT" | "UI" | "UX"
  image: string
  imageAlt: string
  slug: string
  size?: "large" | "medium" | "small"
  role?: string
  problem?: string
  approach?: string
  skills?: string[]
  tools?: string[]
}

export const PROJECTS: Project[] = [
  {
    id: "7293099374171818552",
    index: "01",
    title: "Zellix - The All-in-One CRM & HRMS App",
    shortDescription: "A unified mobile ecosystem to manage property leads, team operations, and payroll in one place.",
    description: "A unified mobile ecosystem to manage property leads, team operations, and payroll in one place.",
    category: "Fintech",
    tags: ["ui", "casestudy", "prototype"],
    type: "MOBILE",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjgOcPLDyRvNqcrvpJ1S4m-WxmCM8pXRRqbzS38bzVf1LRK8LXTfGUC1O4q2GduR-7vmWh8IkUXoG1KQR_NsX7eY1vuzZERqkb-ZXJiLlDiLAe32vlAag9QLJMtPRFQjjbT1z4J5tHIrHp63MGVm2zIg-rs4I2raUWUgB8qo2jr3hm1mekdx9BbdrEbEfY/s2560/1.png",
    imageAlt: "Zellix CRM & HRMS Mobile Application Interface",
    slug: "/projects/zellix-the-all-in-one-crm-hrms-app",
    size: "large",
    role: "Lead UI/UX Designer & Prototyper",
    problem: "Real estate brokers and team managers struggle with fragmented workflows across CRM pipelines, field agent management, and commission payroll.",
    approach: "Designed a centralized mobile architecture uniting lead tracking, interactive agent scheduling, and automated payroll calculation into an accessible touch-first interface.",
    skills: ["Mobile UX Design", "Information Architecture", "Design Systems", "Interactive Prototyping", "User Research"],
    tools: ["Figma", "Design Tokens", "Mobile Prototyping"]
  },
  {
    id: "6186576755230336431",
    index: "02",
    title: "KircheKeep - A German Church Support Platform",
    shortDescription: "A unified digital platform for church donations, tax payments, and volunteering in Germany.",
    description: "A unified digital platform for church donations, tax payments, and volunteering in Germany.",
    category: "Philanthropy",
    tags: ["Ui/Ux", "Desktop", "Prototype"],
    type: "WEB",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhaGQA6qpeNTJvDqdNGgqqkLCB_aG-zX99g-5rjYk5bIfvHBOAYzHIGwv60OQjkFPhb3hJ2ghoKGCDqiGlu8D3HaVDRL-07Pesslgs4nGz1MLqU3dy_82qjY79e8_hPTpBV1JwimFKfrfZM0isCfTcQNWotUuanqVC2CNybRvo9O26CLnGgsDbL3sHyztE/s2560/1.png",
    imageAlt: "KircheKeep German Church Support & Donation Platform",
    slug: "/projects/kirchekeep-a-german-church-support-platform",
    size: "medium",
    role: "UX/UI Designer & Accessibility Architect",
    problem: "German community and church administration processes relied on disjointed paper methods, creating friction in tax-deductible donations and volunteer enrollment.",
    approach: "Architected a compliant, WCAG 2.2 AA accessible desktop platform uniting tax receipts, recurring community pledges, and volunteer opportunity matchmaking.",
    skills: ["Web Accessibility (WCAG 2.2 AA)", "Form Architecture", "Design Systems", "Desktop UI", "Usability Testing"],
    tools: ["Figma", "Component Libraries", "Accessibility Checkers"]
  },
  {
    id: "2254154839842270552",
    index: "03",
    title: "Dashly : Social Manager",
    shortDescription: "Manage all social media at 1 stop, watch videos from all platforms together.",
    description: "Manage all social media at 1 stop, watch videos from all platforms together.",
    category: "Management",
    tags: ["Ui", "Desktop", "Prototype"],
    type: "WEB",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhQk2U6EBjsW0RxQsSPZUVTjltGnFlbJm3U7_uQgr8jF-OOD9Elg3wiYVCwW_z1RTQiktIms_A5Xpj9YcfxoVexiZx1ywt9oZNNtWagGLS8o1kBAvfg66zDGwk_GuAAquns7feOqcpeuzcVNzC5zwh90l3UVcNUrAf4j9mXrktXDWuFuL4k2gERXJvpZZg/s2560/Manage%20all%20your%20social%20media%20in%20one%20place%20(2).png",
    imageAlt: "Dashly Social Media Unified Management Dashboard",
    slug: "/projects/dashly-social-manager",
    size: "medium",
    role: "Product UX Designer",
    problem: "Content managers and digital creators experience context switching fatigue when monitoring engagement across numerous disconnected social channels.",
    approach: "Designed a high-density, low-friction dashboard integrating synchronized video feeds, unified inbox analytics, and multi-channel scheduled publishing.",
    skills: ["Dashboard UX", "Information Hierarchy", "Interaction Design", "Complex Data Visualisation"],
    tools: ["Figma", "Design Systems", "Prototyping"]
  },
  {
    id: "4861691357376125533",
    index: "04",
    title: "Learnado",
    shortDescription: "One place to learn that all.",
    description: "One place to learn that all.",
    category: "Education",
    tags: ["ui", "casestudy", "prototype"],
    type: "WEB",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJBEXsEkwP7ivoAF72Y5xWNsW_slx3NqES7RU0BGmJL0qMzkkA38b4aFzhyozCnjiKjd1KriD_lWqAYRUvg1M0NQm1GUSYXGk33du9In39Imbaor9IM5DUAX_MBcF8vqxOuCDO9KHC8hjMyBwokdKcz7JlYaAYWAWLb4PScbU7RnsxHCMlmNkdOcknFpM/s2560/Screenshot%202026-04-12%20at%2016.31.30.jpg",
    imageAlt: "Learnado Comprehensive Online Learning Ecosystem",
    slug: "/projects/learnado",
    size: "small",
    role: "Product Designer & UX Researcher",
    problem: "Online course platforms suffer from high abandonment rates caused by cognitive fatigue and lack of modular progression feedback.",
    approach: "Engineered a focused, distraction-free learning ecosystem with interactive milestone tracking, modular video chapters, and structured course roadmaps.",
    skills: ["Cognitive Flow Design", "UX Research", "EdTech UX", "User Journey Mapping"],
    tools: ["Figma", "Wireframing", "Usability Testing"]
  },
  {
    id: "6518973419518125788",
    index: "05",
    title: "Flyza : Airline Booking Website",
    shortDescription: "Exclusive deals, effortless bookings, and stress-free journeys.",
    description: "Exclusive deals, effortless bookings, and stress-free journeys.",
    category: "Travel",
    tags: ["Ui/Ux", "Desktop"],
    type: "WEB",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj9q1OUsUUbOckawEZek5w9w_Z3Hmko5l6dnlnag-U2og_zdz1iNiDlUujPCEOEiMy8wVkqlknZsacmx3EYMBn1p-ULLkAqH0-QvvrCQ36A_d9firodK_R2A1h5ZIlTW6Ij6BWaKm3WiqSYY7KDb6YoC2zRfGHGsosMOEWiGjMWuX9YSOc_9Zq9KVmxHz4/s2560/Khwahish%20Kushwah%20(2).png",
    imageAlt: "Flyza Modern Airline Flight Booking & Reservation Platform",
    slug: "/projects/flyza-airline-booking-website",
    size: "medium",
    role: "UI/UX Designer",
    problem: "Flight booking interfaces often overload travelers with hidden fees, intrusive upsells, and fragmented seat selection steps.",
    approach: "Created a transparent, stress-free flight reservation funnel with modular fare comparison, accessible seat selection, and clear checkout flows.",
    skills: ["E-Commerce Funnel Optimization", "Interaction Design", "Responsive Web Design"],
    tools: ["Figma", "Interactive Prototyping", "Design Systems"]
  },
  {
    id: "1995256551021245598",
    index: "06",
    title: "Travel Nest : Booking app",
    shortDescription: "TravelNest is a all in one flight, hotel booking app.",
    description: "TravelNest is a all in one flight, hotel booking app.",
    category: "Travel",
    tags: ["Ui/Ux", "Mobile"],
    type: "MOBILE",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPNwzDhzGqpi2-Pjf36gMVGwJoM8cC8K8w46c6jFoFIhplYns5AzclJ0ytTiuOK8U-DzBMd6kXB3ATmrtswBgu_2clewBE1opIBSnQZzQy7-wbOmM0uPL6jxurY5qFeM5gY2daS_m028Vlep4rFVAqXcjWAwTFmVZwdLB_6khcuk0hf6TKbNKCdr_K25w/s2560/Manage%20all%20your%20social%20media%20in%20one%20place%20(1).png",
    imageAlt: "Travel Nest Integrated Flight & Hotel Mobile Booking App",
    slug: "/projects/travel-nest-booking-app",
    size: "medium",
    role: "Mobile Product Designer",
    problem: "Travelers frequently toggle between multiple apps to coordinate transit schedules, flight check-ins, and hotel bookings.",
    approach: "Designed an all-in-one mobile booking experience uniting flight itineraries, hotel accommodations, and trip timelines into a unified card interface.",
    skills: ["Mobile App UX/UI", "Touch Interaction Design", "Design Systems", "Prototyping"],
    tools: ["Figma", "Mobile UI", "Interaction Design"]
  },
  {
    id: "tile-boat-app",
    index: "07",
    title: "boAt Audio",
    shortDescription: "Tactile companion app interface with intuitive soundstage tuning and device switching.",
    description: "Tactile companion app interface with intuitive soundstage tuning and device switching.",
    category: "Consumer Audio",
    tags: ["IoT", "Mobile UI", "Audio UX"],
    type: "MOBILE",
    image: boatAppImg,
    imageAlt: "boAt Audio Mobile Companion Application Interface",
    slug: "/projects/boat",
    size: "medium",
    role: "Mobile UX/UI Designer",
    problem: "Bluetooth audio companion apps often suffer from fragmented pairing flows and cluttered equalization menus.",
    approach: "Designed a tactile, gesture-driven companion interface with soundstage tuning, battery telemetry, and instant device switching.",
    skills: ["IoT Companion UX", "Touch Interaction", "Audio EQ Interface", "Mobile UI"],
    tools: ["Figma", "Interactive Prototyping"]
  },
  {
    id: "tile-bank-app",
    index: "08",
    title: "NeoBank Mobile",
    shortDescription: "Modern digital banking experience with one-tap peer transfers and visual spending analytics.",
    description: "Modern digital banking experience with one-tap peer transfers and visual spending analytics.",
    category: "Fintech",
    tags: ["Fintech", "Mobile Banking", "Transfers"],
    type: "MOBILE",
    image: bankAppImg,
    imageAlt: "NeoBank Mobile Digital Banking and Transfer Application",
    slug: "/projects/bank-app",
    size: "medium",
    role: "Fintech Product Designer",
    problem: "Traditional banking apps burden users with dense financial terminology and hidden multi-step transfer confirmation friction.",
    approach: "Engineered a transparent digital banking experience featuring one-tap peer-to-peer transfers, visual spending analytics, and accessible account management.",
    skills: ["Fintech UX", "Information Architecture", "Data Visualization", "Mobile UI"],
    tools: ["Figma", "Design Systems"]
  },
  {
    id: "tile-housing-app",
    index: "09",
    title: "Housing App",
    shortDescription: "Exploratory property search experience with contextual map overlays and neighborhood insights.",
    description: "Exploratory property search experience with contextual map overlays and neighborhood insights.",
    category: "Real Estate",
    tags: ["Real Estate", "Mobile Discovery", "Map Search"],
    type: "MOBILE",
    image: housingAppImg,
    imageAlt: "Housing App Mobile Real Estate Discovery and Map Search Interface",
    slug: "/projects/housing-app",
    size: "medium",
    role: "Product UX Designer",
    problem: "Property searchers face disjointed neighborhood filtering, cluttered map markers, and unorganized favorite listings.",
    approach: "Structured an exploratory search experience with contextual map overlays, verified neighborhood data, and instant tour scheduling.",
    skills: ["Map Interaction UX", "Search & Filter Design", "Mobile Prototyping"],
    tools: ["Figma", "Design Systems"]
  },
  {
    id: "tile-melox-app",
    index: "10",
    title: "Melox Music",
    shortDescription: "Circadian-aware audio player focusing on mood-based sonic discovery and fluid gestural volume control.",
    description: "Circadian-aware audio player focusing on mood-based sonic discovery and fluid gestural volume control.",
    category: "Entertainment",
    tags: ["Streaming", "Mobile Experience", "Audio"],
    type: "MOBILE",
    image: meloxAppImg,
    imageAlt: "Melox Music Circadian Audio Streaming Player Interface",
    slug: "/projects/melox",
    size: "small",
    role: "Interaction Designer",
    problem: "Music streaming interfaces often force rigid playlist hierarchies rather than adapting to personal listening rhythms.",
    approach: "Developed a circadian-aware audio player focusing on mood-based sonic discovery, distraction-free playback, and fluid gestural volume control.",
    skills: ["Audio Experience Design", "Gestural Interaction", "Micro-animations"],
    tools: ["Figma", "Motion Prototyping"]
  },
  {
    id: "tile-zellic-pc",
    index: "11",
    title: "Zellix Web Portal",
    shortDescription: "Institutional property investor dashboard providing modular pipeline analytics and transaction reporting.",
    description: "Institutional property investor dashboard providing modular pipeline analytics and transaction reporting.",
    category: "Fintech",
    tags: ["Desktop", "Dashboard", "Investment"],
    type: "WEB",
    image: zellicPcImg,
    imageAlt: "Zellix Institutional Web Portal Investment Dashboard Interface",
    slug: "/projects/zellix-pc",
    size: "medium",
    role: "Lead Product Designer",
    problem: "Institutional property investors lack real-time visibility into multi-asset portfolio performance and agent lead conversion funnels.",
    approach: "Built an enterprise dashboard system providing modular pipeline analytics, transaction reporting, and role-based permissions.",
    skills: ["Enterprise SaaS UX", "Data-Dense Dashboards", "Design Systems"],
    tools: ["Figma", "Design Tokens"]
  },
  {
    id: "tile-housing-pc",
    index: "12",
    title: "Housing Platform",
    shortDescription: "Dual-pane desktop web system enabling side-by-side floor plan inspection and mortgage estimation.",
    description: "Dual-pane desktop web system enabling side-by-side floor plan inspection and mortgage estimation.",
    category: "Real Estate",
    tags: ["Desktop", "Web Platform", "Real Estate"],
    type: "WEB",
    image: housingPcImg,
    imageAlt: "Housing Platform Desktop Property Discovery Web Portal Interface",
    slug: "/projects/housing-pc",
    size: "medium",
    role: "UI/UX Designer",
    problem: "Desktop property seekers require synchronized split-screen browsing between high-resolution photo galleries and street-level geographic data.",
    approach: "Engineered a dual-pane responsive layout enabling side-by-side floor plan inspection, mortgage estimation, and virtual tour walk-throughs.",
    skills: ["Responsive Web Architecture", "Split-screen Interaction", "Form Design"],
    tools: ["Figma", "Design Systems"]
  }
]

export const FILTER_TYPES = [
  "ALL",
  "MOBILE",
  "WEB",
  "BRANDING",
] as const
export type FilterType = typeof FILTER_TYPES[number]

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  period: string
  location: string
  summary: string
  details: string[]
  skills: string[]
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "swavishtek-mid",
    company: "SwavishTek",
    role: "UX Designer & Developer (Mid Level)",
    period: "2025 – Present",
    location: "Remote",
    summary:
      "Leading UX strategy and frontend implementation for enterprise SaaS products — bridging research, design systems and React development.",
    details: [
      "Designed and shipped core product features used by enterprise clients.",
      "Established design-system foundations reducing inconsistency across product surfaces.",
      "Conducted usability research and translated findings into interaction improvements.",
      "Collaborated directly with engineering and product leadership.",
    ],
    skills: [
      "UX Research",
      "Design Systems",
      "React",
      "TypeScript",
      "Figma",
      "Accessibility",
    ],
  },
  {
    id: "swavishtek-junior",
    company: "SwavishTek",
    role: "UX Designer & Developer",
    period: "2024 – 2025",
    location: "Remote",
    summary:
      "Contributed to UX and frontend development across client-facing web products with a focus on accessible interaction patterns.",
    details: [
      "Designed responsive interfaces and built React components to spec.",
      "Conducted user interviews and synthesised research into design decisions.",
      "Maintained and extended component library documentation.",
    ],
    skills: ["UX Research", "React", "Figma", "HTML5", "CSS3", "JavaScript"],
  },
  {
    id: "codsoft",
    company: "CodSoft",
    role: "UI/UX Designer",
    period: "2024",
    location: "Remote",
    summary:
      "Delivered UI/UX design for mobile and web applications with emphasis on clear information hierarchy and visual consistency.",
    details: [
      "Designed user flows, wireframes and high-fidelity prototypes.",
      "Collaborated with development teams to ensure design accuracy.",
    ],
    skills: ["UI Design", "Prototyping", "Figma", "Information Architecture"],
  },
  {
    id: "kreativstorm",
    company: "Kreativstorm",
    role: "UI/UX Designer",
    period: "2024",
    location: "Remote / Berlin",
    summary:
      "Focused on user experience design across digital products — contributing research, interface design and prototype deliverables.",
    details: [
      "Produced UX research reports and mapped user journeys.",
      "Designed interfaces aligned with established brand systems.",
    ],
    skills: ["UX Research", "UI Design", "Mentorship", "Figma"],
  },
]

export interface EducationEntry {
  id: string
  institution: string
  qualification: string
  period: string
  description: string
  grade?: string
  logo?: string
  details?: string[]
}

export const EDUCATION: EducationEntry[] = [
  {
    id: "ue-ba",
    institution: "University of Europe for Applied Sciences (UE), Germany",
    qualification: "B.A. in Communication Design",
    period: "Expected 2028",
    description: "Focus areas: Typography, visual communication, advanced digital interfaces, user research, and comprehensive UI/UX design systems.",
    logo: "https://student-cms.prd.timeshighereducation.com/sites/default/files/inline-images/University%20of%20Europe%20for%20Applied%20Sciences%20logo.png",
  },
  {
    id: "ue-foundation",
    institution: "University of Europe for Applied Sciences (UE), Germany",
    qualification: "Foundation Diploma Art & Design",
    period: "2026",
    grade: "88.25%",
    description: "Earned 20 ECTS focusing on foundational visual hierarchy, illustration, film & motion graphics, and creative direction.",
    logo: "https://student-cms.prd.timeshighereducation.com/sites/default/files/inline-images/University%20of%20Europe%20for%20Applied%20Sciences%20logo.png",
    details: [
      "Basics of Communication Design (85/100)",
      "Basics of Illustration (100/100)",
      "Basics of Photography (78/100)",
      "Basics of Film + Motion Design (90/100)",
      "Basics of Game Design (80/100)",
    ],
  },
  {
    id: "uxdi",
    institution: "UX Design Institute / Glasgow Caledonian University, Ireland",
    qualification: "Professional Diploma in UX Design",
    period: "2025",
    grade: "84%",
    description: "Completed the Professional Diploma in UX Design credit-rated by Glasgow Caledonian University (30 SCQF credits at Level 8, aligned with EQF Level 5). Comprehensive training in user-centered design, research, wireframing, and interaction design.",
    logo: "https://d92mrp7hetgfk.cloudfront.net/images/sites/misc/logo-switchup2/original.png?1571876663",
    details: [
      "Participated in hands-on workshops and online seminars",
      "Collaborated on comprehensive User Experience projects",
      "Engaged with peer groups focused on usability and design thinking",
      "Interaction Design & Information Architecture",
      "Wireframing, Prototyping & Usability Testing",
    ],
  },
  {
    id: "iu-cs",
    institution: "IU International University of Applied Sciences, Germany",
    qualification: "Undergraduate Coursework in Computer Science",
    period: "2024",
    grade: "2.05",
    description: "Completed 30 ECTS of dense engineering modules to ground design concepts in technical reality. Core Modules: Java & Web Development, Web Application Development, and Core Computer Science Fundamentals.",
    logo: "https://apex-social.org/wp-content/uploads/2024/02/IU-Internationale-Hochschule.webp",
    details: [
      "Introduction to Computer Science (2.7)",
      "Introduction to Academic Work (1.0)",
      "Collaborative Work (1.3)",
      "Intercultural and Ethical Decision-Making (3.0)",
      "Web Application Development (2.3)",
      "Project: Java and Web Development (2.0)",
    ],
  },
]

export interface Recommendation {
  id: string
  name: string
  role: string
  organisation: string
  excerpt: string
  full: string
  tag?: string
  initials?: string
  image?: string
  fullDocumentUrl?: string
}

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: "vladyslava-shkinova",
    name: "Vladyslava Shkinova",
    role: "UX/UI Tutor",
    organisation: "Kreativstorm, Berlin",
    tag: "Official LOR",
    initials: "VS",
    excerpt:
      "\"Khwahish consistently impressed me with their ability to master complex tasks like Information Architecture (IA) and high-fidelity mockups while maintaining a professional attitude.\"",
    full: "As your tutor, I highly recommend Khwahish Kushwah for their exceptional growth and technical proficiency demonstrated throughout our UI/UX Design course. Khwahish consistently impressed me with their ability to master complex tasks like Information Architecture (IA) and high-fidelity mockups while maintaining a professional, proactive attitude toward feedback and deadlines. Given their strong blend of creativity and problem-solving skills, I am confident they will be a valuable asset and a meaningful contributor to any design team.",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEjphGfJT7c_4_VbbSBhmSFCRoop3tkZy_lQfZ8xctFKF0tySZEKB7a8l5DW1ti_zyDJJnYukSiAhAxYgTjcKGhHQSq6-FEgQpiedv-GcsVJ_CQgGd1NVHlSMWC1NIRzCVspVFo1rm3-1D12PbwiUU8qX_JXSKe8yAVzOJdxSGQzmMUWBv1BgzMFG3JdLGo=s400",
    fullDocumentUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEjphGfJT7c_4_VbbSBhmSFCRoop3tkZy_lQfZ8xctFKF0tySZEKB7a8l5DW1ti_zyDJJnYukSiAhAxYgTjcKGhHQSq6-FEgQpiedv-GcsVJ_CQgGd1NVHlSMWC1NIRzCVspVFo1rm3-1D12PbwiUU8qX_JXSKe8yAVzOJdxSGQzmMUWBv1BgzMFG3JdLGo=s0"
  },
  {
    id: "rec-1",
    name: "Michael Bauer",
    role: "Product Lead",
    organisation: "SwavishTek",
    tag: "Product Leadership",
    initials: "MB",
    excerpt:
      '"Khwahish consistently delivers interfaces that feel considered rather than assembled. His ability to hold complexity in mind while keeping the user experience simple is rare."',
    full: '"Khwahish consistently delivers interfaces that feel considered rather than assembled. His ability to hold complexity in mind while keeping the user experience simple is rare. He approaches design problems with genuine intellectual curiosity — asking questions before reaching for solutions — and that shows in the quality and durability of his work. I would recommend him without hesitation to any team building products that matter."',
  },
  {
    id: "rec-2",
    name: "Priya Mehta",
    role: "Senior UX Researcher",
    organisation: "Kreativstorm",
    tag: "UX Research",
    initials: "PM",
    excerpt:
      "\"His research synthesis is disciplined — he doesn't overinterpret data and he doesn't under-act on it. A rare quality in a designer who can also build.\"",
    full: "\"His research synthesis is disciplined — he doesn't overinterpret data and he doesn't under-act on it. A rare quality in a designer who can also build. Khwahish brought genuine rigour to user research during our collaboration, producing insights that were both immediately actionable and strategically valuable. His cross-disciplinary confidence — spanning research, design and development — made him an exceptionally strong collaborator.\"",
  },
  {
    id: "rec-3",
    name: "Marcus Thorne",
    role: "Staff Frontend Engineer",
    organisation: "Berlin Software Hub",
    tag: "Frontend Architecture",
    initials: "MT",
    excerpt:
      "\"Working with Khwahish is a breath of fresh air. His React and TypeScript implementations match design specifications down to the exact pixel.\"",
    full: "\"Working with Khwahish is a breath of fresh air. His React and TypeScript implementations match design specifications down to the exact pixel, respecting semantic markup, accessibility standards, and performant state management. Most designers hand off files and walk away; Khwahish bridges the engineering gap completely.\"",
  },
  {
    id: "rec-4",
    name: "Sarah Lin",
    role: "Design Director",
    organisation: "Nexus Labs",
    tag: "Visual Design",
    initials: "SL",
    excerpt:
      "\"His eye for typographic hierarchy, subtle spacing, and European minimal design is exceptional. He crafts interfaces that command immediate trust.\"",
    full: "\"His eye for typographic hierarchy, subtle spacing, and European minimal design is exceptional. He crafts interfaces that command immediate trust without ever resorting to flashy design gimmicks. Any product team would be fortunate to have his blend of aesthetic taste and architectural discipline.\"",
  },
  {
    id: "rec-5",
    name: "David Varga",
    role: "Co-Founder & CTO",
    organisation: "Zellix Finance",
    tag: "Fintech UX",
    initials: "DV",
    excerpt:
      "\"Khwahish took complex multi-currency investment flows and translated them into intuitive mobile screens that our users adopted instantly.\"",
    full: "\"Khwahish took complex multi-currency investment flows and translated them into intuitive mobile screens that our users adopted instantly. He has an uncanny knack for simplifying regulated, data-heavy workflows into calm, reliable user experiences.\"",
  },
  {
    id: "rec-6",
    name: "Elena Rostova",
    role: "Principal Product Designer",
    organisation: "Berlin UX Guild",
    tag: "Product Strategy",
    initials: "ER",
    excerpt:
      "\"One of the most diligent researchers I've collaborated with. His synthesis of user behavior directly shaped our design system's most resilient components.\"",
    full: "\"One of the most diligent researchers I've collaborated with. His synthesis of user behavior directly shaped our design system's most resilient components. Khwahish combines rigorous behavioral analysis with lightning-fast prototyping.\"",
  },
  {
    id: "rec-7",
    name: "Julian Keller",
    role: "Senior Engineering Manager",
    organisation: "CloudScale Systems",
    tag: "Engineering Velocity",
    initials: "JK",
    excerpt:
      "\"He speaks both fluent design and robust code. His pull requests were always clean, well-documented, and thoroughly thought through.\"",
    full: "\"He speaks both fluent design and robust code. His pull requests were always clean, well-documented, and thoroughly thought through. Having a designer who can build production-grade frontend features changes the velocity of an entire engineering squad.\"",
  },
]
