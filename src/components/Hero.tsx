import { Fragment, type ReactNode } from 'react';
import { hero, type ConsoleLine } from '../data/hero';
import heroPhoto from '../assets/hero.jpg';
import resumePdf from '../assets/resume.pdf';

/** Renderer lookup per console-line kind — no branching on kind. */
const consoleLineRenderers: Record<ConsoleLine['kind'], (line: ConsoleLine) => ReactNode> = {
  dim: (line) => <p className="dim">{line.text}</p>,
  hot: (line) => (
    <p>
      <span className="hot">{line.arrow}</span> {line.text}
    </p>
  ),
};

function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14" />
    </svg>
  );
}

export default function Hero() {
  return (
    <header className="wrap hero">
      <div>
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>
          {hero.nameFirst}
          <br />
          {hero.nameLast}
          <span>.</span>
        </h1>
        <p className="hero-lede">{hero.lede}</p>
        <div className="actions">
          <a className="btn primary" href={hero.primaryAction.href}>
            {hero.primaryAction.label} <span aria-hidden="true">{hero.primaryAction.arrow}</span>
          </a>
          <a className="btn" href={resumePdf} download="Rutul Shah - Sr Full Stack Engineer.pdf">
            {hero.resumeAction.label}
            <DownloadIcon />
          </a>
        </div>
      </div>
      <div className="hero-aside">
        <div className="portrait-frame">
          <img className="portrait" src={heroPhoto} alt={hero.portraitAlt} />
          <div className="console" aria-hidden="true">
            <div className="console-bar">
              <i />
              <i />
              <i />
            </div>
            {hero.consoleLines.map((line, i) => (
              <Fragment key={i}>{consoleLineRenderers[line.kind](line)}</Fragment>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
