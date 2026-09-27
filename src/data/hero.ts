export interface ConsoleLine {
  kind: 'dim' | 'hot';
  arrow?: string;
  text: string;
}

export const hero = {
  eyebrow: 'Lead Full Stack Developer · Associate Director',
  nameFirst: 'Rutul',
  nameLast: 'Shah',
  lede: 'I build scalable, real-time products where complex systems meet clear, responsive interfaces—currently shaping multi-asset trade analytics at RBC.',
  primaryAction: { href: '#experience', label: 'Explore my work', arrow: '↓' },
  resumeAction: { label: 'Download résumé' },
  portraitAlt: 'Portrait of Rutul Shah',
  consoleLines: [
    { kind: 'dim', text: '$ focus --current' },
    { kind: 'hot', arrow: '→', text: 'multi-asset analytics' },
    { kind: 'hot', arrow: '→', text: 'real-time architecture' },
    { kind: 'hot', arrow: '→', text: 'product engineering' },
    { kind: 'dim', text: 'status: shipping reliable systems_' },
  ] as ConsoleLine[],
} as const;
