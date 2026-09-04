export type Role = {
  org: string;
  title: string;
  dates: string;
  place: string;
  logo?: string;
  bullets: string[];
};

export const roles: Role[] = [
  {
    org: 'Shopify',
    title: 'Software Engineer Intern, Analytics Engineering',
    dates: 'Jan 2026 – Present',
    place: 'Bellevue, WA',
    logo: '/shopify.svg',
    bullets: [
      'Cut about 25% (2 days) of BigQuery slot time per rebuild off a company-wide GMV metric by consolidating pipeline logic into a centralized data model, with 99.99% reconciliation accuracy over 5.2 billion orders.',
      'Implemented dbt versioning across 400+ data models, introducing backwards compatibility for downstream consumers.',
      'Built 3 dbt pipelines reconciling internal AI usage against vendor billing data, uncovering a JSON parsing bug that was undercounting company-wide AI spend by $800K/year.',
      'Built a training pipeline for a BigQuery ML (ARIMA) anomaly-detection model that alerts on unparseable UA strings before they corrupt order event attribution.',
    ],
  },
  {
    org: 'Tesla',
    title: 'Data Engineer Intern, Energy, Residential Service Engineering',
    dates: 'Jun 2025 – Sep 2025',
    place: 'Palo Alto, CA',
    logo: '/tesla.png',
    bullets: [
      'Built production SQL pipelines to deploy 15 new autoticketing workflows, increasing Powerwall 3 automated failure reporting by 16% and Powerwall 2 by 29%.',
      'Uncovered and drove a critical investigation of a Powerwall 2 failure mode affecting 27% of returned units.',
      'Automated ticket closure for 6 Powerwall failure modes when in-fleet units self-recovered, saving support teams 1,000+ hours of investigation.',
    ],
  },
  {
    org: 'USAFacts',
    title: 'Data Analyst Intern, Product',
    dates: 'Jun 2024 – Sep 2024',
    place: 'Bellevue, WA',
    logo: '/usafacts.png',
    bullets: [
      'Owned end-to-end design, build, and deployment of a custom barcode visualization template with the Flourish SDK and D3.js.',
      'Increased user engagement by 22% across 51 interactive product pages by rewriting content, building cleaner visualizations, and QA testing.',
    ],
  },
  {
    org: 'Recognize',
    title: 'UW iSchool capstone, company-sponsored',
    dates: 'Jan 2025 – Jun 2025',
    place: 'University of Washington',
    logo: '/Recognize_logo.png',
    bullets: [
      'Led end-to-end development of a manager dashboard for employee recognition and engagement, highlighted by the University of Washington iSchool.',
      'Built a Rails backend that feeds OpenAI o4-mini, generating insights for 3 dashboard components.',
      'Simplified state management across 11 components by refactoring the frontend to React Context.',
    ],
  },
];

export const education = {
  org: 'University of Washington iSchool',
  title: 'B.S. Informatics, concentration in Data Science',
  dates: 'Jun 2026',
  place: 'Seattle, WA',
  note: 'GPA 3.9 / 4.0. Coursework in data structures, databases, advanced data science, AI, client- and server-side development, and recommender systems.',
};
