import { focusSection } from '../data/about';
import SectionHead from './SectionHead';

export default function Capabilities() {
  return (
    <section aria-labelledby="systems-title">
      <div className="wrap">
        <SectionHead index={focusSection.index} title={focusSection.title} titleId="systems-title" />
        <div className="capabilities">
          {focusSection.capabilities.map((capability) => (
            <article className="capability" key={capability.num}>
              <span className="cap-num">{capability.num}</span>
              <h3>{capability.title}</h3>
              <p>{capability.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
