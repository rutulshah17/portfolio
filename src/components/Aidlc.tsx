import { Fragment, useState } from 'react';
import { aidlcSection, aidlcStepOrder, aidlcSteps, type AidlcStepId } from '../data/aidlc';
import SectionHead from './SectionHead';

export default function Aidlc() {
  const [activeId, setActiveId] = useState<AidlcStepId>('align');

  return (
    <section id="aidlc" aria-labelledby="aidlc-title">
      <div className="wrap">
        <SectionHead index={aidlcSection.index} title={aidlcSection.title} titleId="aidlc-title" />
        <div className="aidlc-intro">
          <span className="about-note">
            {aidlcSection.note.map((line, i) => (
              <Fragment key={i}>
                {line}
                <br />
              </Fragment>
            ))}
          </span>
          <p>
            {aidlcSection.introBefore}
            <strong>{aidlcSection.introEmphasis}</strong>
            {aidlcSection.introAfter}
          </p>
        </div>
        <div className="aidlc-model">
          <div className="aidlc-steps" role="tablist" aria-label={aidlcSection.stepsLabel}>
            {aidlcStepOrder.map((id) => {
              const step = aidlcSteps[id];
              const isActive = id === activeId;
              return (
                <button
                  key={id}
                  className={`aidlc-step${isActive ? ' active' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="aidlcDetail"
                  data-aidlc={id}
                  onClick={() => setActiveId(id)}
                >
                  <span className="aidlc-step-num">{step.num}</span>
                  <span>{step.label}</span>
                </button>
              );
            })}
          </div>
          <div className="aidlc-detail" id="aidlcDetail" role="tabpanel" aria-live="polite">
            {aidlcStepOrder.map((id) => {
              const step = aidlcSteps[id];
              const isActive = id === activeId;
              return (
                <div key={id} className={`aidlc-phase${isActive ? ' active' : ''}`} aria-hidden={!isActive}>
                  <span className="aidlc-detail-index">{step.index}</span>
                  <h3>{step.heading}</h3>
                  <p className="aidlc-detail-copy">{step.copy}</p>
                  <div className="aidlc-lenses">
                    <div className="aidlc-lens">
                      <span>{aidlcSection.humanLabel}</span>
                      <p>{step.human}</p>
                    </div>
                    <div className="aidlc-lens">
                      <span>{aidlcSection.aiLabel}</span>
                      <p>{step.ai}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="aidlc-principles" aria-label={aidlcSection.principlesLabel}>
          {aidlcSection.principles.map((principle) => (
            <span key={principle}>{principle}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
