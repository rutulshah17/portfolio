import { experienceSection, jobs } from '../data/experience';
import SectionHead from './SectionHead';
import ExperienceSignal from './ExperienceSignal';

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <SectionHead index={experienceSection.index} title={experienceSection.title} />
        <div className="timeline">
          {jobs.map((job) => (
            <article className="job" key={job.title}>
              <div className="period">{job.period}</div>
              <div>
                <h3>
                  {job.title}
                  {job.current && <span className="current">{experienceSection.currentLabel}</span>}
                </h3>
                <p className="company">{job.company}</p>
                <p>{job.description}</p>
              </div>
            </article>
          ))}
        </div>
        <ExperienceSignal />
      </div>
    </section>
  );
}
