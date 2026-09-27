import { labSection } from '../data/systemsLab';
import SectionHead from './SectionHead';
import ChaosDrill from './ChaosDrill';
import ArchitectureFlow from './ArchitectureFlow';
import Terminal from './Terminal';

export default function SystemsLab() {
  return (
    <section id="lab" aria-labelledby="lab-title">
      <div className="wrap">
        <SectionHead index={labSection.index} title={labSection.title} titleId="lab-title" />
        <p className="lab-intro">{labSection.intro}</p>
        <div className="systems-lab">
          <ChaosDrill />
          <ArchitectureFlow />
          <Terminal />
        </div>
      </div>
    </section>
  );
}
