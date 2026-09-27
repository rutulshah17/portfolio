export type AidlcStepId = 'align' | 'design' | 'build' | 'verify' | 'evolve';

export interface AidlcStep {
  id: AidlcStepId;
  num: string;
  label: string;
  index: string;
  heading: string;
  copy: string;
  human: string;
  ai: string;
}

export const aidlcSection = {
  index: '04 / AIDLC',
  title: 'AI in the loop. People in charge.',
  note: ['An evolving delivery model.', 'Shared across disciplines.', 'Grounded in judgment.'],
  introBefore:
    'At RBC, I’m part of the AIDLC initiative—evolving the traditional software development lifecycle by bringing ',
  introEmphasis: 'stakeholders and AI into every phase',
  introAfter: ', from defining the problem through learning in production.',
  stepsLabel: 'AIDLC phases',
  principlesLabel: 'AIDLC principles',
  principles: ['Context before generation', 'Evidence over confidence', 'Human ownership throughout'],
  humanLabel: 'Human judgment',
  aiLabel: 'AI leverage',
} as const;

/**
 * Lookup map of phases — the detail panel renders aidlcSteps[activeId].
 * Adding a phase means adding one entry here and one id to AidlcStepId.
 */
export const aidlcSteps: Record<AidlcStepId, AidlcStep> = {
  align: {
    id: 'align',
    num: '01',
    label: 'Align',
    index: '01 / Align',
    heading: 'Start with shared intent.',
    copy: 'Bring business context, user needs, constraints, and success measures together before a solution takes shape.',
    human: 'Stakeholders define what matters and engineers make the trade-offs explicit.',
    ai: 'Synthesize context, expose ambiguity, and turn discovery into a clearer starting point.',
  },
  design: {
    id: 'design',
    num: '02',
    label: 'Design',
    index: '02 / Design',
    heading: 'Explore before committing.',
    copy: 'Turn intent into boundaries, contracts, and an architecture the team can explain, challenge, and operate.',
    human: 'Engineers own the decisions, risks, and consequences of the design.',
    ai: 'Compare approaches, surface edge cases, and accelerate early technical exploration.',
  },
  build: {
    id: 'build',
    num: '03',
    label: 'Build',
    index: '03 / Build',
    heading: 'Accelerate the repeatable work.',
    copy: 'Move from design to working software with smaller feedback loops and more time for the hard decisions.',
    human: 'Developers guide implementation, review every change, and protect system coherence.',
    ai: 'Assist with scaffolding, tests, documentation, refactoring, and targeted implementation.',
  },
  verify: {
    id: 'verify',
    num: '04',
    label: 'Verify',
    index: '04 / Verify',
    heading: 'Prove it, don’t just produce it.',
    copy: 'Treat correctness, security, accessibility, and operability as evidence to gather—not assumptions to make.',
    human: 'Teams set the acceptance bar and decide whether the evidence is strong enough to ship.',
    ai: 'Broaden test paths, identify gaps, and help connect requirements to validation.',
  },
  evolve: {
    id: 'evolve',
    num: '05',
    label: 'Evolve',
    index: '05 / Evolve',
    heading: 'Learn from the system in use.',
    copy: 'Carry production signals and stakeholder feedback into the next decision instead of treating release as the finish line.',
    human: 'Product and engineering interpret outcomes, own accountability, and choose what changes next.',
    ai: 'Help surface patterns across feedback, incidents, telemetry, and delivery history.',
  },
};

export const aidlcStepOrder: AidlcStepId[] = ['align', 'design', 'build', 'verify', 'evolve'];
