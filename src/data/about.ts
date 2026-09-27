export const about = {
  index: '01 / About',
  title: 'From the interface to the infrastructure.',
  note: ['Full-stack scope.', 'Production mindset.', 'Collaborative leadership.'],
  paragraphs: [
    'I’m a full stack developer specializing in the MERN ecosystem, real-time data streaming, infrastructure automation, and observability.',
    'I work across product, architecture, and delivery—translating complex business requirements into high-quality software, mentoring developers, and raising the engineering bar through thoughtful design and review.',
  ],
} as const;

export interface Capability {
  num: string;
  title: string;
  copy: string;
}

export const focusSection = {
  index: '02 / Focus',
  title: 'Systems designed to perform.',
  capabilities: [
    {
      num: 'A / 01',
      title: 'High-performance product interfaces',
      copy: 'Responsive React and Next.js experiences for complex, data-dense workflows.',
    },
    {
      num: 'A / 02',
      title: 'Real-time backend architecture',
      copy: 'Scalable services and communication patterns across REST, WebSockets, SSR, and Kafka.',
    },
    {
      num: 'A / 03',
      title: 'Reliable delivery at scale',
      copy: 'Automated infrastructure, deployment pipelines, monitoring, and production support.',
    },
  ] as Capability[],
} as const;
