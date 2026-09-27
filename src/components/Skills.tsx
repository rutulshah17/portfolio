import { skillGroups, skillsSection } from '../data/skills';
import SectionHead from './SectionHead';

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <SectionHead index={skillsSection.index} title={skillsSection.title} />
        <div className="skill-layout">
          <p className="skill-intro">{skillsSection.intro}</p>
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="tags">
                  {group.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
