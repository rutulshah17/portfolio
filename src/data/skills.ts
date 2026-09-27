export interface SkillGroup {
  title: string;
  tags: string[];
}

export const skillsSection = {
  index: '06 / Toolkit',
  title: 'Tools chosen for the problem.',
  intro:
    'A practical stack spanning product UI, services, streaming, cloud infrastructure, and operational visibility.',
} as const;

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    tags: ['JavaScript', 'TypeScript', 'React', 'Redux', 'Next.js', 'HTML', 'CSS'],
  },
  {
    title: 'Backend & data',
    tags: ['Node.js', 'Express', 'NestJS', 'Python', 'MongoDB', 'Oracle', 'GraphQL', 'Firebase', 'Stripe'],
  },
  {
    title: 'Platforms',
    tags: ['Kafka', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'Helm', 'ArgoCD'],
  },
  {
    title: 'Operations',
    tags: ['Prometheus', 'Grafana', 'InfluxDB', 'Jenkins', 'DroneCI', 'ELK Stack'],
  },
];
