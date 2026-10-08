export const portfolioData = {
  personal: {
    name: "Adarsh S",
    title: "AI & Data Science Student | Full Stack Web Developer",
    tagline: "Engineering intuitive, high-performance web products & intelligent systems.",
    bio: "Second-year B.Tech undergraduate in Artificial Intelligence & Data Science at J.N.N Institute of Engineering. Proven track record building and deploying production-grade web applications for real clients, spearheading engineering teams at Smart India Hackathon 2026, and crafting high-craft interactive digital experiences with React, TypeScript, and modern motion design.",
    status: "Available for Internships & High-Impact Projects",
    location: "Chennai, Tamil Nadu, India",
    email: "vasuadarsh522@gmail.com",
    phone: "+91 6380958294",
    avatar: "/avatar.jpg",
    resumeUrl: "/Adarsh_S_CV.docx",
    socials: {
      github: "https://github.com/Adarshvasuu",
      linkedin: "https://linkedin.com/in/adarsh-s-060961392",
      email: "mailto:vasuadarsh522@gmail.com",
      phone: "tel:+916380958294"
    },
    metrics: [
      { label: "Semester 1 GPA", value: "9.37", sub: "J.N.N Institute of Engineering" },
      { label: "Semester 2 GPA", value: "8.71", sub: "B.Tech AI & Data Science" },
      { label: "Client Delivery", value: "100%", sub: "Live Corporate Deployment" },
      { label: "SIH 2026", value: "Team Lead", sub: "Vyabar Mitr Problem Statement" }
    ]
  },

  skills: {
    categories: [
      { id: "all", name: "All Capabilities" },
      { id: "languages", name: "Programming Languages" },
      { id: "frontend", name: "Frontend & UI Engineering" },
      { id: "ai_data", name: "AI & Data Science" },
      { id: "backend_tools", name: "Tools & Workflow" }
    ],
    items: [
      { name: "React JS", category: "frontend", level: 95, icon: "Code2", highlight: "Components, Hooks, State, Performance" },
      { name: "TypeScript", category: "languages", level: 88, icon: "FileCode", highlight: "Type Safety, Interfaces, Generics" },
      { name: "JavaScript (ES6+)", category: "languages", level: 92, icon: "Braces", highlight: "Async/Await, DOM, Modern Standards" },
      { name: "Python", category: "languages", level: 90, icon: "Terminal", highlight: "Data Science, Scripting, AI Core" },
      { name: "Java", category: "languages", level: 82, icon: "Cpu", highlight: "OOP Principles, Data Structures" },
      { name: "Tailwind CSS", category: "frontend", level: 96, icon: "Palette", highlight: "Utility-first Design Systems & Styling" },
      { name: "Framer Motion", category: "frontend", level: 90, icon: "Sparkles", highlight: "Physics-based Spring & Scroll Transitions" },
      { name: "HTML5 & CSS3", category: "frontend", level: 98, icon: "Layout", highlight: "Semantic Structure, Accessibility, Responsive" },
      { name: "WebGL / Canvas", category: "frontend", level: 78, icon: "Layers", highlight: "Shader Ribbons, 3D Tilt, Parallax" },
      { name: "AI & Data Science", category: "ai_data", level: 85, icon: "Brain", highlight: "Machine Learning Foundations, Analytics" },
      { name: "Git & GitHub", category: "backend_tools", level: 92, icon: "GitBranch", highlight: "Version Control, Pull Requests, CI/CD" },
      { name: "GitHub Copilot", category: "backend_tools", level: 90, icon: "Bot", highlight: "Certified Workflow & AI Pair Programming" },
      { name: "VS Code & Tooling", category: "backend_tools", level: 95, icon: "Wrench", highlight: "Extensions, Debugging, Linting" },
      { name: "Vite & Modern Bundlers", category: "backend_tools", level: 88, icon: "Zap", highlight: "Fast HMR, Modern Production Bundling" }
    ]
  },

  projects: [
    {
      id: "vyabar-mitr",
      title: "Vyabar Mitr — Smart India Hackathon 2026",
      subtitle: "Team Lead & Architecture",
      category: "ai_data",
      badge: "SIH 2026 Lead",
      description: "Spearheaded a multidisciplinary engineering team to design and build an intelligent commerce and trade assistance software solution for the national Smart India Hackathon 2026.",
      tags: ["Team Lead", "AI / Solution Architecture", "Full Stack", "Problem Solving"],
      highlights: [
        "Led project roadmap, sprint management, and final pitch presentation",
        "Architected real-world solution addressing micro-enterprise commerce friction",
        "Engineered cohesive end-to-end user experience and algorithmic logic"
      ],
      github: "https://github.com/Adarshvasuu",
      live: null,
      featured: true
    },
    {
      id: "entice-hr",
      title: "Entice HR Solutions Corporate Website",
      subtitle: "Full Stack Developer Internship Client Project",
      category: "frontend",
      badge: "Live Client Deployment",
      description: "Designed, engineered, and deployed the official production corporate web platform for Entice HR Solutions (www.enticehr.com), complete with 5 responsive routes and automated lead intake.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Motion", "Google Sheets Sync"],
      highlights: [
        "Built 5 responsive pages: Home, About Us, Services, Blogs, and Contact",
        "Engineered zero-backend contact intake pipeline storing enquiries direct to spreadsheets",
        "Optimized Lighthouse performance and SEO scores; handed over to client production"
      ],
      github: "https://github.com/Adarshvasuu/Entice_HR",
      live: "https://www.enticehr.com",
      featured: true
    },
    {
      id: "jobconnect",
      title: "JobConnect — Recruitment & Job Portal",
      subtitle: "Full-Featured Web Platform",
      category: "frontend",
      badge: "Team Project",
      description: "Comprehensive recruitment platform facilitating job searches, candidate profile management, dynamic application pipelines, and CRUD administrative workflows.",
      tags: ["React", "JavaScript", "CRUD Operations", "Search & Filters"],
      highlights: [
        "Engineered instant multi-criteria search and category filtering for opportunities",
        "Built responsive candidate application workflows with real-time validation",
        "Streamlined hiring manager dashboard for applicant management"
      ],
      github: "https://github.com/Adarshvasuu/Jobconnect-",
      live: null,
      featured: true
    },
    {
      id: "reversemarket",
      title: "ReverseMarket — Algorithmic Supplier Match",
      subtitle: "Needs-First Reverse Marketplace",
      category: "frontend",
      badge: "Creative Tech Showcase",
      description: "Innovative procurement engine flipping the buyer-seller paradigm with dynamic multi-criteria weighting, real-time match scoring, and Componentry WebGL Spectral Ribbon atmosphere.",
      tags: ["React", "WebGL", "Framer Motion", "Algorithmic Scoring", "Vite"],
      highlights: [
        "Custom WebGL Spectral Ribbon atmospheric lighting shader",
        "Interactive 5-parameter dynamic weighting sliders with real-time recalculation",
        "Clean dark-mode aesthetic with tactile micro-interactions"
      ],
      github: "https://github.com/Adarshvasuu/reversemarket",
      live: null,
      featured: false
    }
  ],

  experience: [
    {
      period: "Aug 2026",
      role: "Full Stack Developer Intern",
      organization: "Entice Innovations — Entice HR Solutions",
      type: "Internship (1 month)",
      description: "Entrusted with architecting, designing, and launching the official corporate digital presence for Entice HR Solutions from scratch.",
      achievements: [
        "Authored five complete, responsive web views (Home, About, Services, Blogs, Contact) using React, TypeScript, and Tailwind CSS.",
        "Created an automated contact pipeline linking frontend form submissions directly to a Google Sheets backend.",
        "Conducted SEO audit, configured production domain routing, and successfully handed off codebase."
      ]
    },
    {
      period: "2026",
      role: "Team Lead — Vyabar Mitr",
      organization: "Smart India Hackathon 2026",
      type: "National Hackathon",
      description: "Led a cross-functional squad addressing complex real-world trade and commercial logistics problems.",
      achievements: [
        "Orchestrated development sprints, team task allocation, and core technical architecture.",
        "Delivered a polished interactive software prototype and jury presentation deck."
      ]
    },
    {
      period: "2025 – 2029 (Current)",
      role: "B.Tech in Artificial Intelligence & Data Science",
      organization: "J.N.N Institute of Engineering",
      type: "Undergraduate Education",
      description: "Focusing on artificial intelligence, algorithmic foundations, web systems, and data analytics.",
      achievements: [
        "Semester 1 GPA: 9.37 / 10",
        "Semester 2 GPA: 8.71 / 10",
        "Active contributor in technical symposiums, hackathon delegations, and software development."
      ]
    }
  ],

  certifications: [
    {
      title: "Full Stack Developer Internship Certificate",
      issuer: "Entice Innovations",
      date: "Aug 2026",
      category: "Professional Experience",
      badge: "Industry Verified"
    },
    {
      title: "AI and Python Development Megaclass (58 Hours)",
      issuer: "Instructors School of AI",
      date: "Aug 2026",
      category: "AI & Machine Learning",
      badge: "58 Hours Deep-Dive"
    },
    {
      title: "GitHub Copilot: The Complete Guide 2026",
      issuer: "GitHub Certification",
      date: "Aug 2026",
      category: "Developer Tooling",
      badge: "Certified Copilot"
    },
    {
      title: "AI and Innovation: MongoDB Resilient AI Strategy",
      issuer: "MongoDB",
      date: "Jul 2026",
      category: "Cloud & Database Architecture",
      badge: "Enterprise Tech"
    }
  ]
};
