import { Fragment } from 'react';
import { about } from '../data/about';
import SectionHead from './SectionHead';

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <SectionHead index={about.index} title={about.title} />
        <div className="about-grid">
          <p className="about-note">
            {about.note.map((line, i) => (
              <Fragment key={i}>
                {line}
                <br />
              </Fragment>
            ))}
          </p>
          <div className="about-copy">
            {about.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
