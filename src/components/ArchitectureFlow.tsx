import { useEffect, useRef, useState } from 'react';
import {
  flowCycleMs,
  flowIndexById,
  flowNodeById,
  flowNodes,
  flowOrder,
  flowPanel,
  type FlowNodeId,
} from '../data/systemsLab';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function ArchitectureFlow() {
  const [activeId, setActiveId] = useState<FlowNodeId>('kafka');
  const [locked, setLocked] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const timerRef = useRef<number | null>(null);

  // Auto-highlight nodes one by one until the user takes over (or motion is reduced).
  useEffect(() => {
    if (locked || reduceMotion) return;
    timerRef.current = window.setInterval(() => {
      setActiveId((current) => flowOrder[(flowIndexById[current] + 1) % flowOrder.length]);
    }, flowCycleMs);
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, [locked, reduceMotion]);

  const active = flowNodeById[activeId];

  return (
    <article className="flow-panel" aria-labelledby="flow-title">
      <span className="lab-kicker">{flowPanel.kicker}</span>
      <h3 id="flow-title">{flowPanel.title}</h3>
      <div className="flow-track" aria-label={flowPanel.trackLabel}>
        {flowNodes.map((node) => (
          <div className="flow-step" key={node.id}>
            <button
              className={`flow-node${node.id === activeId ? ' active' : ''}`}
              type="button"
              data-flow={node.detailKey}
              aria-pressed={node.id === activeId}
              onClick={() => {
                setLocked(true);
                setActiveId(node.id);
              }}
              onMouseEnter={() => {
                if (!locked) setActiveId(node.id);
              }}
              onFocus={() => {
                setLocked(true);
                setActiveId(node.id);
              }}
            >
              {node.num}
            </button>
            <span className="flow-name">{node.name}</span>
          </div>
        ))}
      </div>
      <p className="flow-detail" aria-live="polite">
        <strong>{active.detailKey}</strong> {active.detail}
      </p>
    </article>
  );
}
