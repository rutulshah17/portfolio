export interface Job {
  period: string;
  title: string;
  current: boolean;
  company: string;
  description: string;
}

export const experienceSection = {
  index: '05 / Experience',
  title: 'Building through every layer.',
  currentLabel: 'NOW',
  signal: {
    kicker: 'Experience signal',
    title: 'Engineering, in motion.',
    copy: 'From the first TD co-op in September 2016 to today, with the study-term gap kept visible.',
    liveLabel: 'Still growing',
    chartTitle: 'Cumulative engineering experience since September 2016',
    chartDescription:
      'An area chart that rises during the TD Bank co-op, stays flat through the 2017 study term, then rises continuously from the RBC co-op to the present.',
    chartCaption: 'Cumulative active engineering experience · years',
    rolesLabel: 'Role milestones',
  },
} as const;

export const jobs: Job[] = [
  {
    period: 'Jan 2026 — Present',
    title: 'Lead Full Stack Developer',
    current: true,
    company: 'RBC · Multi Asset Trade Analytics',
    description:
      'Leading development of a platform for pre-trade insights, index analytics, FX price movement, and news sentiment. Building responsive interfaces with React and Next.js, scalable services with NestJS and Python, and real-time communication across REST, WebSockets, and SSR.',
  },
  {
    period: 'Nov 2021 — Jan 2026',
    title: 'Full Stack Engineer',
    current: false,
    company: 'Paymentus · Small Business Center',
    description:
      'Delivered payment experiences across digital wallets, scheduled payments, ACH, future-dated payments, and cards. Built React and TypeScript frontends, Node.js services, Kafka pipelines, monitoring, CI/CD, and cloud-native deployment workflows.',
  },
  {
    period: 'Jul 2020 — Nov 2021',
    title: 'Software Engineer, Financial Crime',
    current: false,
    company: 'RBC',
    description:
      'Developed and maintained time-series data tooling for trade-alert workflows, automated ingestion from diverse sources, integrated APIs, supported migrations, and created operational dashboards.',
  },
  {
    period: 'Jan 2018 — Jul 2020',
    title: 'Production Support Specialist',
    current: false,
    company: 'RBC · Mainframe Systems',
    description:
      'Resolved production batch failures against SLAs, improved support processes, mentored new team members, and optimized batch schedules across multiple mainframe systems.',
  },
  {
    period: 'Sept 2017 — Dec 2017',
    title: 'Software Engineer Co-op',
    current: false,
    company: 'RBC · Global Systems Management',
    description:
      'Streamlined data collection by building APIs, created a server‑aware path‑finding algorithm for data authenticity, automated a quarterly workflow saving three weeks of manual effort, and enhanced newsletter UX to be fully responsive.',
  },
  {
    period: 'Sept 2016 — Dec 2016',
    title: 'Software Engineer Co-op',
    current: false,
    company: 'RBC · TD Bank',
    description:
      'Built internal APIs and automation, worked with the ELK stack, and delivered user-facing improvements in agile engineering teams.',
  },
];

/* ------------------------- Cumulative experience signal ------------------------- */

export const DAY_MS = 24 * 60 * 60 * 1000;
export const YEAR_MS = 365.2425 * DAY_MS;

export interface ExperiencePeriod {
  start: number;
  end: number | null;
}

export interface ExperienceRole {
  date: number;
  dateLabel: string;
  label: string;
  company: string;
}

export const experienceStart = Date.UTC(2016, 8, 1);

export const experiencePeriods: ExperiencePeriod[] = [
  { start: Date.UTC(2016, 8, 1), end: Date.UTC(2017, 0, 1) },
  { start: Date.UTC(2017, 8, 1), end: null },
];

export const experienceRoles: ExperienceRole[] = [
  { date: Date.UTC(2016, 8, 1), dateLabel: 'Sep 2016', label: 'TD Bank · Co-op', company: 'TD Bank' },
  { date: Date.UTC(2017, 8, 1), dateLabel: 'Sep 2017', label: 'RBC · Co-op', company: 'RBC' },
  { date: Date.UTC(2018, 0, 1), dateLabel: 'Jan 2018', label: 'RBC · Production Support', company: 'RBC' },
  { date: Date.UTC(2020, 6, 1), dateLabel: 'Jul 2020', label: 'RBC · Software Engineer', company: 'RBC' },
  { date: Date.UTC(2021, 10, 1), dateLabel: 'Nov 2021', label: 'Paymentus · Full Stack Engineer', company: 'Paymentus' },
  { date: Date.UTC(2026, 0, 1), dateLabel: 'Jan 2026', label: 'RBC · Lead Full Stack Developer', company: 'RBC' },
];
