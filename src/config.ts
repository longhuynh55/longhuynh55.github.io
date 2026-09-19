// Central identity config — edit this file to update your name, role,
// statement, socials and experience shown on the homepage.

export const site = {
  name: 'Liêu Hoài Phúc',
  role: 'Data Analyst',
  location: 'Ho Chi Minh City, Vietnam',
  email: 'phuclieu03@gmail.com',
  phone: '0931430750',

  // Social URLs — handles below (@longhuynh55, in/hoài-phúc-liêu-598321145) must match these hrefs.
  socials: {
    github: 'https://github.com/longhuynh55',
    linkedin: 'https://www.linkedin.com/in/ho%C3%A0i-ph%C3%BAc-li%C3%AAu-598321145/',
  },

  // Hero statement (20–35 words) + meta description fallback.
  statement:
    'I build data systems that turn operations into decisions — from warehouse layers and automated reporting to methodical experiments and research.',
  bio: 'Liêu Hoài Phúc — Data Analyst in Ho Chi Minh City. Experience, methodical Lab experiments, research and writing on data analytics.',

  // Experience feature on the homepage.
  experience: [
    {
      role: 'Data Analyst',
      company: 'CASK',
      location: 'Ho Chi Minh City',
      period: '01/2026 – 05/2026',
      highlights: [
        {
          text: 'Automated recurring SQL, Excel, Power BI and Python reporting workflows, reducing manual effort.',
          // Optional evidence link — rendered only when a public artifact exists.
          // href: '/blog/cask-lessons',  // e.g. generalized CASK article when published
        },
        { text: 'Built data warehouse and reporting layers consolidating operational datasets into standardized analytics tables.' },
        { text: 'Defined reusable KPI logic and validation checks, and delivered stakeholder Power BI dashboards.' },
      ],
    },
  ],

  // About & Contact section.
  about: {
    perspective:
      "I'm a Data Analyst in Ho Chi Minh City working across the stack — SQL, Python, dbt and BigQuery, with Power BI for reporting. At CASK I maintained warehouse and reporting layers and automated recurring workflows. Now I'm developing two Lab ideas methodically alongside a first-author research paper. I write about what I learn, and I'm open to Data Analyst roles where evidence and clear communication matter.",
    capabilityGroups: [
      {
        label: 'Analysis & Reporting',
        skills: ['SQL', 'Power BI', 'DAX', 'Power Query', 'Excel', 'KPI dashboards'],
      },
      {
        label: 'Programming & Automation',
        skills: ['Python', 'Pandas', 'Polars', 'PySpark', 'R', 'Report automation'],
      },
      {
        label: 'Statistics & Modeling',
        skills: ['Hypothesis testing', 'Predictive modeling', 'EDA', 'Bayesian forecasting'],
      },
      {
        label: 'Data Engineering',
        skills: ['dbt', 'BigQuery', 'Airflow', 'Dagster', 'PostgreSQL', 'Data modeling'],
      },
      {
        label: 'Cloud & AI Tooling',
        skills: ['Google Cloud', 'Docker', 'GitHub Actions', 'Looker Studio', 'AI-assisted development'],
      },
    ],
  },
};
