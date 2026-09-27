import { useMemo } from 'react';
import { experienceRoles, experienceSection } from '../data/experience';
import { useNow } from '../hooks/useNow';
import {
  activeExperienceAt,
  buildChartModel,
  chartPlot,
  chartSize,
  chartViewBox,
  formatClock,
  formatYears,
} from '../lib/experience';

export default function ExperienceSignal() {
  const now = useNow(1000);
  const totalMs = activeExperienceAt(now);
  const yearsText = formatYears(totalMs);
  const clockText = formatClock(totalMs);
  const model = useMemo(() => buildChartModel(now), [now]);
  const signal = experienceSection.signal;

  return (
    <div className="experience-signal" aria-labelledby="experience-signal-title">
      <div className="experience-signal-copy">
        <span className="lab-kicker">{signal.kicker}</span>
        <h3 id="experience-signal-title">{signal.title}</h3>
        <p>{signal.copy}</p>
        <div
          className="experience-total"
          aria-live="off"
          aria-label={`${yearsText} of active engineering experience, or ${clockText}`}
        >
          <strong className="experience-years">{yearsText}</strong>
          <span className="experience-clock">{clockText}</span>
          <span className="experience-live">{signal.liveLabel}</span>
        </div>
      </div>
      <div>
        <figure className="experience-chart">
          <div className="chart-stage">
          <svg viewBox={chartViewBox} role="img" aria-labelledby="experienceChartTitle experienceChartDesc">
            <title id="experienceChartTitle">{signal.chartTitle}</title>
            <desc id="experienceChartDesc">{signal.chartDescription}</desc>
            <g>
              {model.yTicks.map((tick) => (
                <g key={tick.label}>
                  <line
                    x1={chartPlot.padding.left}
                    y1={tick.y}
                    x2={chartPlot.width - chartPlot.padding.right}
                    y2={tick.y}
                    className="chart-grid"
                  />
                  <text
                    x={chartPlot.padding.left - 14}
                    y={tick.y + 5}
                    textAnchor="end"
                    className="chart-axis-label"
                  >
                    {tick.label}
                  </text>
                </g>
              ))}
              {model.xTicks.map((tick) => (
                <g key={tick.label}>
                  <line
                    x1={tick.x}
                    y1={chartPlot.padding.top}
                    x2={tick.x}
                    y2={chartPlot.padding.top + chartPlot.plotHeight}
                    className="chart-grid"
                  />
                  <text x={tick.x} y={tick.y} textAnchor={tick.anchor} className="chart-axis-label">
                    {tick.label}
                  </text>
                </g>
              ))}
              <path d={model.areaPath} className="chart-area" />
              <path d={model.linePath} className="chart-line" />
              <line
                x1={model.gap.x1}
                y1={model.gap.y1}
                x2={model.gap.x2}
                y2={model.gap.y2}
                className="chart-gap"
              />
              {model.rolePoints.map((point) => (
                <circle key={point.key} cx={point.cx} cy={point.cy} r={5} className="chart-point" />
              ))}
              <circle
                cx={model.currentPoint.cx}
                cy={model.currentPoint.cy}
                r={6}
                className="chart-point current-point"
              />
            </g>
          </svg>
            {model.rolePoints.map((point) => (
              <span
                key={point.key}
                className="chart-tip-anchor"
                style={{
                  left: `${(point.cx / chartSize.width) * 100}%`,
                  top: `${(point.cy / chartSize.height) * 100}%`,
                }}
                tabIndex={0}
                role="img"
                aria-label={`${point.company}, ${point.title}, ${point.dateLabel}`}
              >
                <span className="chart-tip">
                  <strong>{point.company}</strong>
                  <span>
                    {point.title} · {point.dateLabel}
                  </span>
                </span>
              </span>
            ))}
          </div>
          <figcaption className="chart-caption">{signal.chartCaption}</figcaption>
        </figure>
        <div className="experience-roles" aria-label={signal.rolesLabel}>
          {experienceRoles.map((role) => (
            <div className="experience-role" key={role.label}>
              <time dateTime={new Date(role.date).toISOString().slice(0, 10)}>{role.dateLabel}</time>
              <span>{role.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
