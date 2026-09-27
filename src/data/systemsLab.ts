export const labSection = {
  index: '03 / Systems lab',
  title: 'See the system recover.',
  intro:
    'A compact, hands-on view of resilient product engineering: trigger a controlled failure, inspect the architecture, and try a command line for the curious.',
} as const;

/* ---------------------------------- Chaos drill ---------------------------------- */

export type ServiceId = 'ui' | 'gateway' | 'primary' | 'fallback';
export type ServiceHealth = 'active' | 'failed' | 'recovered' | 'idle';
export type LogState = 'active' | 'done' | 'pending';
export type ChaosStatusState = 'healthy' | 'incident';

/** Maps a service health value to its CSS class — no if/else on health anywhere. */
export const serviceHealthClass: Record<ServiceHealth, string> = {
  active: 'active',
  failed: 'failed',
  recovered: 'recovered',
  idle: '',
};

/** Maps a log state to its CSS class. */
export const logStateClass: Record<LogState, string> = {
  active: 'active',
  done: 'done',
  pending: '',
};

export interface ChaosService {
  id: ServiceId;
  node: string;
  label: string;
}

export const chaosServices: ChaosService[] = [
  { id: 'ui', node: 'UI', label: 'React' },
  { id: 'gateway', node: 'GW', label: 'Gateway' },
  { id: 'primary', node: 'API', label: 'Primary' },
  { id: 'fallback', node: 'FB', label: 'Fallback' },
];

export const chaosLogLabels: string[] = [
  'Fault injected',
  'Alert triggered',
  'Circuit opened',
  'Traffic rerouted',
  'Service restored',
];

export interface ChaosStep {
  number: string;
  heading: string;
  detail: string;
  status: string;
  statusState: ChaosStatusState;
  services: Record<ServiceId, ServiceHealth>;
  logs: LogState[];
}

export const chaosPanel = {
  kicker: 'Resilience drill',
  title: 'Break the system—safely',
  copy: 'Inject a controlled API failure, then watch detection, containment, traffic rerouting, and recovery unfold.',
  note: 'Browser-simulated resilience drill · no service is affected',
  runLabel: 'Break the system →',
  runningLabel: 'Recovery in progress…',
  rerunLabel: 'Run drill again →',
  serviceMapLabel:
    'Illustrative health state for interface, gateway, primary, and fallback services',
} as const;

export const chaosIdle = {
  number: '00 / Ready',
  heading: 'Traffic is flowing normally.',
  detail:
    'The primary service is healthy. Start the drill to introduce a fault without touching a real system.',
  status: 'All systems nominal',
  statusState: 'healthy' as ChaosStatusState,
  services: { ui: 'active', gateway: 'active', primary: 'active', fallback: 'idle' } as Record<
    ServiceId,
    ServiceHealth
  >,
  logs: ['pending', 'pending', 'pending', 'pending', 'pending'] as LogState[],
};

/**
 * Every drill phase is a full declaration — service health, log states, and
 * status come straight from the map. Adding a phase means adding one entry.
 */
export const chaosSteps: ChaosStep[] = [
  {
    number: '01 / Fault injected',
    heading: 'The primary API stops responding.',
    detail:
      'A controlled fault creates the failure condition. The rest of the system is still accepting traffic.',
    status: 'Primary service unavailable',
    statusState: 'incident',
    services: { ui: 'active', gateway: 'active', primary: 'failed', fallback: 'idle' },
    logs: ['active', 'pending', 'pending', 'pending', 'pending'],
  },
  {
    number: '02 / Detection',
    heading: 'Observability catches the change.',
    detail:
      'Health checks fail and the monitoring path raises an actionable signal instead of waiting for users to report it.',
    status: 'Incident detected',
    statusState: 'incident',
    services: { ui: 'active', gateway: 'active', primary: 'failed', fallback: 'idle' },
    logs: ['done', 'active', 'pending', 'pending', 'pending'],
  },
  {
    number: '03 / Containment',
    heading: 'The circuit breaker opens.',
    detail:
      'Requests stop piling onto the unhealthy dependency, containing the failure and protecting the wider service.',
    status: 'Failure contained',
    statusState: 'incident',
    services: { ui: 'active', gateway: 'active', primary: 'failed', fallback: 'idle' },
    logs: ['done', 'done', 'active', 'pending', 'pending'],
  },
  {
    number: '04 / Continuity',
    heading: 'Traffic moves to the fallback.',
    detail:
      'The gateway switches to a safe alternate path, preserving a useful experience while the primary recovers.',
    status: 'Fallback serving traffic',
    statusState: 'incident',
    services: { ui: 'active', gateway: 'active', primary: 'failed', fallback: 'active' },
    logs: ['done', 'done', 'done', 'active', 'pending'],
  },
  {
    number: '05 / Recovery',
    heading: 'The primary service returns.',
    detail:
      'Health checks pass, the circuit closes, and normal routing resumes without a manual refresh.',
    status: 'Recovered · normal routing',
    statusState: 'healthy',
    services: { ui: 'active', gateway: 'active', primary: 'recovered', fallback: 'idle' },
    logs: ['done', 'done', 'done', 'done', 'done'],
  },
];

/* ------------------------------ Architecture flow ------------------------------ */

export type FlowNodeId = 'kafka' | 'services' | 'websocket' | 'ui';

export interface FlowNode {
  id: FlowNodeId;
  num: string;
  name: string;
  /** Label rendered in the detail heading (<strong>), e.g. "WebSocket" for the "Socket" node. */
  detailKey: string;
  detail: string;
}

export const flowPanel = {
  kicker: 'Interactive architecture',
  title: 'From event to interface',
  trackLabel: 'Select a layer to inspect',
} as const;

export const flowNodes: FlowNode[] = [
  {
    id: 'kafka',
    num: '01',
    name: 'Kafka',
    detailKey: 'Kafka',
    detail:
      'At Paymentus, Kafka pipelines supported payment workflows across digital wallets, ACH, cards, and scheduled payments.',
  },
  {
    id: 'services',
    num: '02',
    name: 'Services',
    detailKey: 'Services',
    detail:
      'At RBC, NestJS and Python services power multi-asset pre-trade insights, index analytics, and FX analysis.',
  },
  {
    id: 'websocket',
    num: '03',
    name: 'Socket',
    detailKey: 'WebSocket',
    detail: 'At RBC, WebSockets move real-time updates into responsive trade analytics experiences.',
  },
  {
    id: 'ui',
    num: '04',
    name: 'React UI',
    detailKey: 'UI',
    detail:
      'React and Next.js at RBC—and React with TypeScript at Paymentus—turn dense workflows into clear product interfaces.',
  },
];

/** Keyed lookup — the detail panel renders flowNodeById[activeId], never a switch. */
export const flowNodeById: Record<FlowNodeId, FlowNode> = Object.fromEntries(
  flowNodes.map((node) => [node.id, node]),
) as Record<FlowNodeId, FlowNode>;

export const flowOrder: FlowNodeId[] = flowNodes.map((node) => node.id);

export const flowIndexById: Record<FlowNodeId, number> = Object.fromEntries(
  flowNodes.map((node, index) => [node.id, index]),
) as Record<FlowNodeId, number>;

export const flowCycleMs = 2400;

/* ---------------------------------- Terminal ---------------------------------- */

export type TerminalAction = { kind: 'print'; text: string } | { kind: 'clear' };

export const terminalPanel = {
  kicker: 'Meet me at the terminal',
  title: 'Ask the portfolio',
  hint: 'Type',
  hintCommand: 'help',
  hintSuffix: 'to see available commands.',
  tryPrefix: 'try:',
  suggestions: ['whoami'],
  placeholder: 'whoami',
  inputLabel: 'Terminal command',
  notFound: 'Command not found. Type help.',
} as const;

/** Every command maps to an action descriptor — no if/else chain on the command. */
export const terminalCommands: Record<string, TerminalAction> = {
  help: { kind: 'print', text: 'Commands: whoami · rutul --skills · focus · clear' },
  whoami: {
    kind: 'print',
    text: 'Rutul Shah — Lead Full Stack Developer building real-time financial products.',
  },
  'rutul --skills': {
    kind: 'print',
    text: 'React · Next.js · NestJS · Python · Kafka · AWS · Kubernetes',
  },
  focus: {
    kind: 'print',
    text: 'Multi-asset analytics · streaming architecture · product engineering',
  },
  clear: { kind: 'clear' },
};
