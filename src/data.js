import {
  FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin, FiCode,
} from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'

export const profile = {
  name: 'Sithishwar B M',
  role: 'Software Engineer',
  tagline: 'B.Tech Information Technology · College of Engineering, Guindy',
  location: 'Chennai, India',
  email: 'sithishwar0507@gmail.com',
  phone: '+91 93445 19698',
  github: 'https://github.com/Sithishwar',
  linkedin: 'https://linkedin.com/in/sithishwar008',
  leetcode: 'https://leetcode.com/sithishwar',
  resumeFile: '/resume.pdf',
  heroLines: [
    'I build systems that',
    'find the signal',
    'in the noise.',
  ],
  about: [
    "I'm an Information Technology undergraduate at College of Engineering, Guindy, maintaining an 8.26 CGPA while shipping full-stack, geospatial, and computer-vision systems end to end — from database schema to deployed UI.",
    "My work spans a common thread: taking messy, high-volume data — farm listings across a state, viral genome sequences, unlabeled SMS text, video streams from a crowded plaza — and turning it into something a person can query, trust, and act on in real time.",
    "I reach for React and Node.js on the frontend and API layer, PostgreSQL and PostGIS when location matters, and Python-based ML (YOLO, LSTM, OpenCV) when the system needs to see and predict. Outside of code, I organize technical operations for my college's flagship tech fest and mentor peers through NASSCOM's STEM Scholar program.",
  ],
}

export const stats = [
  { label: 'CGPA', value: '8.26', suffix: '/10' },
  { label: 'HSC Score', value: '95.1', suffix: '%' },
  { label: 'Shipped Projects', value: '4', suffix: '+' },
  { label: 'Tech Domains Led', value: '3', suffix: '' },
]

export const skillGroups = [
  {
    title: 'Languages',
    icon: 'code',
    items: ['C++', 'Java', 'Python', 'JavaScript', 'C'],
  },
  {
    title: 'Frontend',
    icon: 'layout',
    items: ['React', 'HTML5', 'CSS3', 'React Native'],
  },
  {
    title: 'Backend',
    icon: 'server',
    items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'WebSockets'],
  },
  {
    title: 'Database & Geo',
    icon: 'database',
    items: ['PostgreSQL', 'MongoDB', 'PostGIS', 'SQLite'],
  },
  {
    title: 'AI / ML',
    icon: 'cpu',
    items: ['YOLO', 'LSTM', 'OpenCV', 'Anomaly Detection'],
  },
  {
    title: 'Developer Tools',
    icon: 'tool',
    items: ['Git', 'GitHub', 'Postman', 'VS Code'],
  },
  {
    title: 'Core Subjects',
    icon: 'book',
    items: ['DSA', 'OOPS', 'Operating Systems', 'DBMS', 'Computer Networks'],
  },
]

export const projects = [
  {
    title: 'Sandhai — Agricultural Management Platform',
    tag: 'Full-Stack · GeoSpatial',
    period: 'React · Node.js · PostgreSQL · PostGIS',
    description:
      'A marketplace and equipment-rental platform connecting farmers directly with vendors and buyers, built to cut through fragmented, informal local supply chains.',
    features: [
      'Two-sided marketplace covering produce listings and farm-equipment rentals',
      'Location-based product discovery powered by PostGIS spatial queries',
      'REST API layer handling listings, availability, and transactions',
    ],
    builtWhat:
      'Designed the PostgreSQL/PostGIS schema for geo-indexed listings and built the REST API and React client that query it in real time.',
    challenge:
      'Efficient proximity search at scale required moving from naive distance calculations to indexed spatial queries, which meant learning PostGIS indexing strategies under time pressure.',
    stack: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'PostGIS'],
    github: 'https://github.com/Sithishwar',
    demo: null,
  },
  {
    title: 'Genomic Variant Tracker',
    tag: 'Systems · Data Structures',
    period: 'C++ · Data Structures',
    description:
      'A genomic analysis platform for viral samples, built to search, compare, and trace how variants evolve across a growing sample set.',
    features: [
      'Mutation-based sample identification across large sequence sets',
      'Genome similarity search comparing sample sequences directly',
      'Variant evolution analysis tracing lineage over time',
    ],
    builtWhat:
      'Implemented the core matching and comparison engine in C++, choosing data structures that keep sequence search fast as the sample library grows.',
    challenge:
      'Comparing genome sequences naively is expensive at scale; the engine needed structures purpose-built for approximate and exact sequence matching rather than brute-force comparison.',
    stack: ['C++', 'Data Structures', 'Algorithms'],
    github: 'https://github.com/Sithishwar',
    demo: null,
  },
  {
    title: 'Smart Expense Tracker',
    tag: 'Mobile · Offline-First',
    period: 'React Native · SQLite',
    description:
      'An offline-first mobile app that reads UPI SMS notifications and turns them into categorized, queryable spending data — no manual entry required.',
    features: [
      'Regex-based SMS parser extracting amount, merchant, and transaction type',
      'Automatic expense categorization from parsed transaction data',
      'Local analytics and spending breakdowns, fully offline via SQLite',
    ],
    builtWhat:
      'Built the SMS parsing engine and the local-first data layer so the app works fully offline with no server dependency.',
    challenge:
      "UPI SMS formats vary widely across banks and payment apps, so the parser needed to generalize across formats rather than being hard-coded to one bank's template.",
    stack: ['React Native', 'SQLite', 'Regex'],
    github: 'https://github.com/Sithishwar',
    demo: null,
  },
  {
    title: 'Early Risk Detection in Crowded Spaces',
    tag: 'Computer Vision · AI',
    period: 'React · Node.js · FastAPI · YOLO · LSTM · OpenCV',
    description:
      'An AI-based anomaly detection system that watches crowd behavior in real time and flags early warning signs before a situation escalates.',
    features: [
      'YOLO-based object detection to track people and density in a scene',
      'LSTM sequence modeling to predict abnormal crowd-behavior patterns',
      'Live monitoring dashboard streaming alerts over REST APIs and WebSockets',
    ],
    builtWhat:
      'Built the FastAPI inference service wrapping YOLO and LSTM models, and the React dashboard that consumes live detections over WebSockets.',
    challenge:
      'Real-time inference had to stay fast enough for a live feed while the LSTM layer needed enough temporal context to tell a genuine anomaly from normal crowd movement.',
    stack: ['React', 'Node.js', 'FastAPI', 'YOLO', 'LSTM', 'OpenCV', 'WebSockets'],
    github: 'https://github.com/Sithishwar',
    demo: null,
  },
]

export const moreProjects = [
  {
    title: 'Code Plagiarism Detection with AI Code Classifier',
    tag: 'Machine Learning',
    stack: ['Python', 'Scikit-learn', 'TF-IDF', 'Random Forest', 'Machine Learning'],
    description:
      'An AI-powered plagiarism detection system that identifies similarities across programming assignments using machine learning, built to flag copied submissions with high accuracy.',
    highlights: ['Machine Learning', 'TF-IDF Feature Engineering', 'Random Forest Classification', 'Code Similarity Detection'],
    builtWhat:
      'TF-IDF feature extraction for source-code representation, feeding a Random Forest classifier trained to separate plagiarized from original submissions.',
    github: 'https://github.com/Sithishwar',
    demo: null,
  },
  {
    title: 'Teaching Fellow Synchronization System',
    tag: 'Operating Systems · Kernel',
    stack: ['C', 'xv6', 'Operating Systems', 'Kernel Programming'],
    description:
      'The classic Teaching Fellow synchronization problem implemented inside the xv6 operating system, extending the kernel with custom system calls to coordinate processes.',
    highlights: ['xv6 Kernel Development', 'Process Synchronization', 'Custom System Calls', 'Operating Systems'],
    builtWhat:
      'Process synchronization, blocking, and wake-up mechanisms at the kernel level, working directly with xv6\'s scheduler and process management.',
    github: 'https://github.com/Sithishwar',
    demo: null,
  },
  {
    title: 'Periodic Elements — Chemistry Analyzer',
    tag: 'Data Structures',
    stack: ['C', 'Data Structures', 'Stacks', 'Queues', 'Binary Search Trees'],
    description:
      'A terminal-based chemistry analyzer for periodic element lookup and molecular formula analysis, built around efficient, purpose-fit data structures.',
    highlights: ['Data Structures', 'BST', 'Stack & Queue', 'Algorithm Design'],
    builtWhat:
      'A Binary Search Tree for fast element lookup, paired with stacks and queues for parsing and evaluating molecular expressions.',
    github: 'https://github.com/Sithishwar',
    demo: null,
  },
]

export const achievements = [
  { value: '8.26', label: 'CGPA / 10.0', detail: 'B.Tech Information Technology' },
  { value: '95.1', label: 'HSC Percentage', detail: 'Higher Secondary Certificate' },
  { value: '4', label: 'Shipped Projects', detail: 'Full-stack, systems & AI' },
  { value: '3', label: 'Leadership Domains', detail: 'CTF, SAAS & NSS' },
]

export const leadership = [
  {
    title: 'Organizer, TechOps Domain',
    org: 'CEG Tech Forum (CTF)',
    description:
      'Developed event web applications and supported technical operations for college-wide technical events.',
  },
  {
    title: 'Organizer, Events & Workshops Domain',
    org: 'SAAS',
    description:
      'Coordinated technical workshops and managed end-to-end event logistics for the student community.',
  },
  {
    title: 'STEM Scholar',
    org: 'NASSCOM Foundation & Optum India',
    description:
      'Selected as a STEM Scholar and attended national-level technical and leadership development sessions.',
  },
  {
    title: 'Coordinator, Creative & Initiatives Domain',
    org: 'CEG Tech Forum (CTF)',
    description:
      'Planned and coordinated creative activities and student-led initiatives across the forum.',
  },
  {
    title: 'NSS Volunteer',
    org: 'National Service Scheme',
    description:
      'Participated in community service and social outreach initiatives throughout the academic year.',
  },
]

export const education = [
  {
    degree: 'B.Tech in Information Technology',
    institute: 'College of Engineering, Guindy',
    score: 'CGPA: 8.26 / 10',
    period: 'Expected Graduation: 2027',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institute: 'Ponnu Matriculation Higher Secondary School',
    score: '95.1%',
    period: '',
  },
]

export const codingProfiles = [
  {
    name: 'GitHub',
    handle: '@Sithishwar',
    url: 'https://github.com/Sithishwar',
    icon: FiGithub,
    description: 'Source for every project below — commits, architecture, and code.',
  },
  {
    name: 'LinkedIn',
    handle: '/in/sithishwar008',
    url: 'https://linkedin.com/in/sithishwar008',
    icon: FiLinkedin,
    description: 'Professional network, experience, and recommendations.',
  },
  {
    name: 'LeetCode',
    handle: '@sithishwar',
    url: 'https://leetcode.com/sithishwar',
    icon: SiLeetcode,
    description: 'DSA practice — arrays to graphs, problem by problem.',
  },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'More Projects', href: '#more-projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export const contactIcons = { FiMail, FiPhone, FiMapPin, FiCode }
