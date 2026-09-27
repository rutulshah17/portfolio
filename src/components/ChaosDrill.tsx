import { useEffect, useRef, useState } from 'react';
import {
  chaosIdle,
  chaosLogLabels,
  chaosPanel,
  chaosServices,
  chaosSteps,
  logStateClass,
  serviceHealthClass,
} from '../data/systemsLab';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const STEP_MS = 1050;

export default function ChaosDrill() {
  const [stepIndex, setStepIndex] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const reduceMotion = usePrefersReducedMotion();

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => clearTimer, []);

  const finish = () => {
    clearTimer();
    setRunning(false);
  };

  const run = () => {
    clearTimer();
    setRunning(true);
    setStepIndex(0);
    if (reduceMotion) {
      setStepIndex(chaosSteps.length - 1);
      setRunning(false);
      return;
    }
    timerRef.current = window.setInterval(() => {
      setStepIndex((current) =>
        current === null || current >= chaosSteps.length - 1 ? chaosSteps.length - 1 : current + 1,
      );
    }, STEP_MS);
  };

  // When the drill reaches its final declared phase, stop the timer.
  useEffect(() => {
    if (running && stepIndex === chaosSteps.length - 1) finish();
  }, [running, stepIndex]);

  const current = stepIndex === null ? chaosIdle : chaosSteps[stepIndex];
  const buttonLabel = running
    ? chaosPanel.runningLabel
    : stepIndex === null
      ? chaosPanel.runLabel
      : chaosPanel.rerunLabel;

  return (
    <article className="chaos-panel" aria-labelledby="chaos-title">
      <div className="lab-panel-head">
        <div>
          <span className="lab-kicker">{chaosPanel.kicker}</span>
          <h3 id="chaos-title">{chaosPanel.title}</h3>
        </div>
        <span className="demo-status" data-state={current.statusState}>
          {current.status}
        </span>
      </div>
      <p className="chaos-copy">{chaosPanel.copy}</p>
      <div className="service-map" aria-label={chaosPanel.serviceMapLabel}>
        {chaosServices.map((service) => (
          <div
            key={service.id}
            className={`service ${serviceHealthClass[current.services[service.id]]}`.trim()}
          >
            <span className="service-node">{service.node}</span>
            <span className="service-label">{service.label}</span>
          </div>
        ))}
      </div>
      <div className="incident-console" aria-live="polite">
        <div className="incident-detail">
          <span className="incident-detail-num">{current.number}</span>
          <h4>{current.heading}</h4>
          <p>{current.detail}</p>
        </div>
        <ol className="incident-log" aria-label="Recovery sequence">
          {chaosLogLabels.map((label, i) => (
            <li key={label} className={logStateClass[current.logs[i]]}>
              {label}
            </li>
          ))}
        </ol>
      </div>
      <div className="chaos-bottom">
        <span className="chaos-note">{chaosPanel.note}</span>
        <button id="chaosRun" className="chaos-run" type="button" onClick={run} disabled={running}>
          {buttonLabel}
        </button>
      </div>
    </article>
  );
}
