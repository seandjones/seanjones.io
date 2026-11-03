// All user-facing copy for the site. Source of truth: docs/redesign-copy.md.

export type LineId = 'ai' | 'platform' | 'frontend' | 'extensions' | 'leadership'

export interface MapStation {
  x: number
  label: string[]
  href: string
  terminus?: boolean
}

export interface MapLine {
  id: LineId
  name: string
  y: number
  stations: MapStation[]
}

export interface MapInterchange {
  x: number
  from: LineId
  to: LineId
  label: string[]
  href: string
}

export interface Result {
  line: LineId
  figure: string
  caption: string
}

export interface Part {
  id?: string
  label?: string
  text: string
}

export interface CaseStudy {
  id: string
  title: string
  lines: LineId[]
  summary: string
  problem: Part[]
  did: Part[]
  result: Part[]
  image?: { name: string; alt: string }
  /** The live product, when there is one to visit. */
  live?: { url: string; domain: string }
  /** 2012–2016 client work, shown in the compact "Earlier work" group. */
  earlier?: boolean
}

export interface IndependentProject {
  id: string
  title: string
  summary: string
  url: string
  domain: string
  image: { name: string; alt: string }
  problem: Part[]
  did: Part[]
  result: Part[]
}

export interface Role {
  id: string
  role: string
  company: string
  companyUrl?: string
  period: string
  subline?: string
  description?: string
  contributions: string[]
  /** Case studies that carry this role's detail, so Experience does not repeat them. */
  seeAlso?: { label: string; href: string }[]
  current?: boolean
}

export const profile = {
  name: 'Sean Jones',
  role: 'Director of Engineering at Price.com. At Price.com since 2016.',
  line: 'Sole technical lead for a platform with 590,000 monthly users. I set the architecture and I still write the code.',
  email: 'hello@seanjones.io',
  positioning: 'Open to Staff, Principal and engineering-lead roles. Remote, or hybrid in the Denver area.',
  location: 'Remote, or hybrid in the Denver area.',
  replyTime: 'I usually reply within a day.',
  linkedin: 'https://www.linkedin.com/in/sean-jones-301439b0/',
  github: 'https://github.com/seandjones',
}

export const lineNames: Record<LineId, string> = {
  ai: 'AI',
  platform: 'Platform',
  frontend: 'Frontend',
  extensions: 'Extensions',
  leadership: 'Leadership',
}

export const mapCaption =
  'The Price.com platform as a system map. Each line is a workstream I own; each station links to the result behind it.'

export const mapLines: MapLine[] = [
  {
    id: 'ai',
    name: 'AI',
    y: 56,
    stations: [
      { x: 360, label: ['ai.price.com', 'frontend'], href: '#ai-did' },
      { x: 620, label: ['Responses streamed', 'over WebSockets'], href: '#ai-did' },
      { x: 1180, label: ['Recommendation', 'click-through +15%'], href: '#ai-result', terminus: true },
    ],
  },
  {
    id: 'platform',
    name: 'Platform',
    y: 138,
    stations: [
      { x: 250, label: ['Manual deploys', 'replaced with CI/CD'], href: '#price-delivery' },
      { x: 460, label: ['Django rebuilt: views,', 'services, presenters'], href: '#price-backend' },
      { x: 860, label: ['About 1,540', 'pytest tests'], href: '#price-backend' },
      { x: 1020, label: ['EC2 to ECS'], href: '#price-delivery' },
      { x: 1180, label: ['Deploy time', '−25%'], href: '#price-result', terminus: true },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend',
    y: 220,
    stations: [
      { x: 250, label: ['About 90 Cotton', 'components'], href: '#price-frontend' },
      { x: 460, label: ['About 70 Stimulus', 'controllers, no jQuery'], href: '#price-frontend' },
      { x: 1180, label: ['Lighthouse 16 → 64,', 'load time −20%'], href: '#price-result', terminus: true },
    ],
  },
  {
    id: 'extensions',
    name: 'Extensions',
    y: 302,
    stations: [
      { x: 250, label: ['Rewritten in Angular', 'and TypeScript'], href: '#price-extensions' },
      { x: 520, label: ['10,000+ users'], href: '#exp-director' },
      { x: 1180, label: ['Chrome, Firefox,', 'Edge, Safari stores'], href: '#price-extensions', terminus: true },
    ],
  },
  {
    id: 'leadership',
    name: 'Leadership',
    y: 384,
    stations: [
      { x: 250, label: ['Roadmap with the CEO', 'and executive team'], href: '#exp-director' },
      { x: 520, label: ['Directs the outside', 'extension firm'], href: '#price-extensions' },
      { x: 1180, label: ['Sole technical lead', 'since 2022'], href: '#exp-director', terminus: true },
    ],
  },
]

export const mapInterchanges: MapInterchange[] = [
  { x: 680, from: 'platform', to: 'frontend', label: ['Redesign', 'built end to end'], href: '#price-frontend' },
  { x: 860, from: 'extensions', to: 'leadership', label: ['Extension', 'releases'], href: '#price-extensions' },
]

export const results: Result[] = [
  { line: 'frontend', figure: '−20%', caption: 'sitewide load time' },
  { line: 'platform', figure: '−25%', caption: 'deployment time' },
  { line: 'ai', figure: '+15%', caption: 'click-through on AI recommendations' },
]

export const caseStudies: CaseStudy[] = [
  {
    id: 'work-price-platform',
    title: 'Price.com web application and extension platform',
    lines: ['platform', 'frontend', 'extensions'],
    summary:
      'Sole technical lead for the Price.com web app, with 590,000 monthly active users. Implemented the site redesign end to end and rebuilt the Django side underneath it.',
    problem: [
      {
        text: 'Pages loaded large legacy stylesheets and scripts, the extensions were static, unstructured JavaScript, CSS, and HTML, and deploys were manual: SSH into EC2, git pull, collectstatic.',
      },
    ],
    did: [
      {
        id: 'price-frontend',
        label: 'Frontend',
        text: 'Implemented the redesign from the design files as about 90 server-rendered Cotton components in Django and about 70 strict TypeScript Stimulus controllers that download only when a page uses them, with no jQuery.',
      },
      {
        id: 'price-backend',
        label: 'Backend',
        text: 'Rebuilt the Django side as thin views, a services layer, and presenter functions backed by about 1,540 pytest tests. Upstream data is fetched in parallel, each external call has timeouts and caching tuned to how fast its data changes, and a failed API call degrades one section instead of the whole page.',
      },
      {
        id: 'price-extensions',
        label: 'Extensions',
        text: 'Rewrote them as a component-based Angular and TypeScript app, effectively a full web app running inside the extension. Now oversee the outside development firm that builds them: direct and review their work when needed, and own releases to the Chrome, Firefox, Edge, and Safari stores.',
      },
      {
        id: 'price-delivery',
        label: 'Delivery',
        text: 'CI/CD on GitHub Actions and Docker builds assets once, ships content-hashed files to S3 behind CloudFront, and fails the build on pytest, Vitest, TypeScript, or stylelint errors. Later moved the containers and pipeline from EC2 to ECS, with smoke tests that run on every deploy.',
      },
    ],
    result: [
      {
        id: 'price-result',
        text: "Quadrupled the site's Lighthouse performance score, from 16 to 64, on PageSpeed Insights and cut sitewide load times 20% by server-rendering above-the-fold content, inlining critical CSS, deferring non-critical JavaScript and CSS, and replacing the legacy stylesheets and scripts with modular ones. Deployment time fell 25%.",
      },
    ],
    live: { url: 'https://www.price.com/', domain: 'price.com' },
    image: { name: 'price', alt: 'The price.com homepage: a cash back, price comparison and coupon search hero beside a list of today’s top cash back offers.' },
  },
  {
    id: 'work-ai-price',
    title: 'Smart Shopping Assistant: ai.price.com',
    lines: ['ai'],
    summary: 'Built the frontend for ai.price.com, a Gemini-powered shopping assistant for pricing, cash-back, and coupons.',
    problem: [
      {
        text: 'Price comparison data is abundant but overwhelming, and users needed a conversational layer that surfaces what matters and explains trade-offs in plain language.',
      },
    ],
    did: [
      {
        id: 'ai-did',
        text: 'Streamed model responses over WebSockets so answers appear as they are generated, and designed the frontend state management around them. Also made routing and smaller changes in its FastAPI backend.',
      },
    ],
    result: [{ id: 'ai-result', text: 'Click-through on AI-driven recommendations rose 15% after launch.' }],
    live: { url: 'https://ai.price.com/', domain: 'ai.price.com' },
    image: { name: 'ai-price', alt: 'The ai.price.com entry screen: a message box for Price.com AI with suggested shopping prompts below it.' },
  },
  {
    id: 'work-starbucks',
    earlier: true,
    title: 'Starbucks Branded Solutions: B2B e-commerce platform',
    lines: [],
    summary:
      'Ground-up build and launch of a B2B e-commerce platform for the Starbucks Branded Solutions division, serving businesses across the US with custom coffee and product ordering.',
    problem: [
      {
        text: 'The existing ordering process was manual and error-prone; the division needed a scalable digital channel to support growth without proportionally growing ops headcount.',
      },
    ],
    did: [
      {
        text: 'Led full-stack development (C#/Umbraco/SCSS/JavaScript), drove architecture and technology selection, and managed cross-functional delivery across design, product, and client stakeholders. Key features included product recommendations, streamlined B2B checkout, and inventory management.',
      },
    ],
    result: [{ text: 'Launched and used by businesses across the US to order custom coffee and products.' }],
    image: {
      name: 'starbucks',
      alt: 'The Starbucks Branded Solutions homepage: a coffee roaster full of beans behind the headline Join us as we engage, delight and deliver, with Join now and Sign in buttons.',
    },
  },
  {
    id: 'work-pg',
    earlier: true,
    title: 'Procter & Gamble: sales materials generator',
    lines: [],
    summary:
      "On-demand PDF generation tool for P&G's national sales team, replacing a manual multi-hour process with a self-service Angular + C# application that produces branded materials in minutes.",
    problem: [
      {
        text: 'Creating customized sales decks and leave-behinds was a multi-hour manual process that introduced frequent formatting errors and brand inconsistencies.',
      },
    ],
    did: [
      {
        text: 'Built a dynamic PDF generator using C#/iTextSharp with an Angular-driven template engine, where reps enter deal specifics, select a template, and receive print-ready output.',
      },
    ],
    result: [{ text: 'Cut materials production from hours to minutes.' }],
  },
]

export const independentProjects: IndependentProject[] = [
  {
    id: 'project-taskriver',
    title: 'TaskRiver.ai',
    summary:
      'An automation product for local service businesses covering missed-call recovery, lead capture, estimate follow-up, review requests, CRM sync, and appointment reminders.',
    url: 'https://taskriver.ai/',
    domain: 'taskriver.ai',
    image: { name: 'taskriver', alt: 'The TaskRiver.ai homepage hero beside a panel of workflows running automatically.' },
    problem: [
      {
        text: 'Local service businesses lose revenue to problems that are entirely mechanical. Calls go unanswered, estimates go un-followed-up, and reviews never get requested, because the owner is on a job site rather than at a desk.',
      },
    ],
    did: [
      { text: 'Responds to missed calls and new leads automatically, with AI handling routine replies inside owner-approved rules.' },
      { label: 'Stack', text: 'React and Vite on the frontend, FastAPI on the backend.' },
    ],
    result: [{ text: 'Live at taskriver.ai as a personal project.' }],
  },
  {
    id: 'project-wcp',
    title: 'WhatContractorsPay.com',
    summary:
      'A public database of what construction software actually costs, built on anonymous contributor submissions that are only published once the submitter is verified against a state contractor-license board.',
    url: 'https://whatcontractorspay.com/',
    domain: 'whatcontractorspay.com',
    image: { name: 'wcp', alt: 'The WhatContractorsPay.com homepage: a ledger-style hero reading What construction software actually costs.' },
    problem: [
      {
        text: 'Construction software vendors hide pricing behind sales calls, so contractors have no way to benchmark a quote before they are already in a negotiation.',
      },
    ],
    did: [
      {
        text: 'Built an anonymous submission pipeline where every price figure is stamped only after its author is checked against a state contractor-license board, keeping the data credible without exposing who submitted it.',
      },
      {
        text: 'No affiliate links and no vendor money. The incentive model is the product, so the trust guarantee had to be enforced in the data pipeline rather than in a disclosure footer.',
      },
    ],
    result: [{ text: 'Gives contractors a pricing floor to negotiate against and turns opaque vendor quotes into a comparable dataset.' }],
  },
  {
    id: 'project-family-shortlist',
    title: 'The Family Shortlist',
    summary:
      'A directory pairing Colorado dementia care facilities with CDPHE health inspection data, so families comparing options can see care quality alongside the listing itself.',
    url: 'https://thefamilyshortlist.com/',
    domain: 'thefamilyshortlist.com',
    image: { name: 'familyshortlist', alt: 'The Family Shortlist homepage: a Denver memory care placement guide with a list of counties to browse.' },
    problem: [
      {
        text: 'Families searching for dementia care are making a high-stakes decision under time pressure, and the inspection record that would inform it lives in a separate state dataset most people never find.',
      },
    ],
    did: [
      {
        text: 'Joins facility listings to CDPHE health score data so inspection history sits directly on the listing rather than a database a family has to know exists.',
      },
      {
        text: 'The audience is often making this decision during a crisis, so the interface favors plain language and scannable comparison over dense regulatory detail.',
      },
    ],
    result: [
      {
        text: 'Live at thefamilyshortlist.com, currently focused on Colorado with the data model built to extend to additional states.',
      },
    ],
  },
  {
    id: 'project-fsma-radar',
    title: 'FSMA Radar',
    summary:
      'A weekly digest for QA and food-safety managers at mid-size food manufacturers, covering the Federal Register, the eCFR, and FDA enforcement activity so Monday starts with answers instead of tabs.',
    url: 'https://fsmaradar.com/',
    domain: 'fsmaradar.com',
    image: { name: 'fsmaradar', alt: 'The FSMA Radar homepage: FDA food-safety changes, interpreted for the person responsible, with a sign-up form.' },
    problem: [
      {
        text: 'Food-safety managers are accountable for regulatory changes spread across the Federal Register, the eCFR, and FDA enforcement actions, with no single source that tells them which ones actually apply to their plant.',
      },
    ],
    did: [
      {
        text: 'An automated monitoring and summarization pipeline across those sources, filtered and edited down to a weekly issue built for readers who need a decision, not a reading list.',
      },
      {
        text: 'Written for mid-size manufacturers who carry enterprise-level compliance obligations without an enterprise regulatory affairs team.',
      },
    ],
    result: [
      {
        text: 'Replaces hours of manual source-checking each week with a single digest, and creates an auditable record of what changed and when.',
      },
    ],
  },
]

export const roles: Role[] = [
  {
    id: 'exp-director',
    role: 'Director of Engineering',
    company: 'Price.com',
    companyUrl: 'https://price.com',
    period: 'Nov 2022 – Present',
    current: true,
    description:
      'Sole technical lead for a shopping platform with 590,000 monthly active users; own architecture, platform strategy, and engineering operations, and write code throughout.',
    contributions: [
      'Work directly with the CEO and executive team on the roadmap, and oversee the outside development firm that builds the browser extensions (10,000+ users), including releases to the Chrome, Firefox, Edge, and Safari stores.',
    ],
    seeAlso: [
      { label: 'Price.com platform', href: '#work-price-platform' },
      { label: 'ai.price.com', href: '#work-ai-price' },
    ],
  },
  {
    id: 'exp-lead',
    role: 'Lead Software Engineer',
    company: 'Price.com',
    companyUrl: 'https://price.com',
    period: 'Nov 2016 – Nov 2022',
    description:
      'Led engineering efforts across frontend and browser extension development, driving architectural decisions and delivery milestones in a fast-paced startup environment.',
    contributions: [
      "Rewrote the company's browser extensions from static, unstructured JavaScript, CSS, and HTML into a component-based Angular and TypeScript app, effectively a full web app running inside the extension, and ran releases and versioning across the Chrome, Firefox, Edge, and Safari stores.",
      'Set the technical roadmap with product and executive leadership, turning business priorities into architecture decisions and delivery milestones.',
    ],
  },
  {
    id: 'exp-senior',
    role: 'Senior Web Developer',
    company: 'Marlinco and The Alchemedia Project (now part of Marlin Connections)',
    companyUrl: 'https://www.marlinconnections.net/',
    period: 'Aug 2012 – Nov 2016',
    subline: 'Marlinco, 2012–2015\u2002·\u2002The Alchemedia Project, 2015–2016',
    contributions: [
      'Developed enterprise web applications for global clients on Microsoft and LAMP stacks (C#, PHP, Python/Django, SQL Server, IIS, Apache), contributing to a 22% increase in client revenue.',
      'Automated deployment workflows and reached a 99% successful deployment rate.',
    ],
    seeAlso: [
      { label: 'Starbucks Branded Solutions', href: '#work-starbucks' },
      { label: 'Procter & Gamble', href: '#work-pg' },
    ],
  },
  {
    id: 'exp-it',
    role: 'IT Programmer',
    company: 'Springfield ReManufacturing Corp. (part of SRC Holdings)',
    companyUrl: 'https://www.srcreman.com/',
    period: 'Aug 2011 – Aug 2012',
    description: 'Developed internal tools and web applications to improve operational efficiency.',
    contributions: [
      'Built internal tools in PHP, MySQL, and JavaScript on IIS, adopted across departments and raising operational efficiency 20%.',
    ],
  },
  {
    id: 'exp-intern',
    role: 'Web Developer Intern',
    company: 'The Alchemedia Project (now part of Marlin Connections)',
    companyUrl: 'https://www.marlinconnections.net/',
    period: 'Nov 2010 – Aug 2011',
    description:
      'Built MVC-based web applications using C# and gained foundational experience in full-stack development and software architecture.',
    contributions: ['Built MVC web applications in C#, SQL Server, and JavaScript across five concurrent client projects.'],
  },
]

export const stack =
  'Python, Django, FastAPI, TypeScript, Angular, Vue, React, Stimulus, PostgreSQL, AWS (ECS, S3, CloudFront), GitHub Actions, Docker, LLM integration (Gemini, Claude), RAG'
