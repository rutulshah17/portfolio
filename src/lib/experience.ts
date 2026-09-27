import {
  DAY_MS,
  YEAR_MS,
  experiencePeriods,
  experienceRoles,
  experienceStart,
} from '../data/experience';

/** Total active (non-gap) experience milliseconds at a timestamp. */
export function activeExperienceAt(timestamp: number): number {
  return experiencePeriods.reduce((total, period) => {
    const end = period.end === null ? timestamp : Math.min(timestamp, period.end);
    return total + Math.max(0, end - period.start);
  }, 0);
}

export function formatYears(totalMs: number): string {
  return `${(totalMs / YEAR_MS).toFixed(2)} years`;
}

export function formatClock(totalMs: number): string {
  const totalDays = Math.floor(totalMs / DAY_MS);
  let remainder = totalMs - totalDays * DAY_MS;
  const hours = Math.floor(remainder / (60 * 60 * 1000));
  remainder -= hours * 60 * 60 * 1000;
  const minutes = Math.floor(remainder / (60 * 1000));
  remainder -= minutes * 60 * 1000;
  const seconds = Math.floor(remainder / 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${totalDays.toLocaleString('en-CA')}d · ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

/* ------------------------------ Chart geometry ------------------------------ */

const WIDTH = 920;
const HEIGHT = 360;
const PADDING = { top: 24, right: 22, bottom: 50, left: 66 };

export interface ChartTick {
  x: number;
  y: number;
  label: string;
  anchor: 'start' | 'middle' | 'end';
}

export interface ChartModel {
  yTicks: { y: number; label: string }[];
  xTicks: ChartTick[];
  areaPath: string;
  linePath: string;
  gap: { x1: number; y1: number; x2: number; y2: number };
  rolePoints: { cx: number; cy: number; key: string; company: string; title: string; dateLabel: string }[];
  currentPoint: { cx: number; cy: number };
}

/** Pure geometry for the cumulative-experience area chart — ported 1:1 from the original. */
export function buildChartModel(now: number): ChartModel {
  const plotWidth = WIDTH - PADDING.left - PADDING.right;
  const plotHeight = HEIGHT - PADDING.top - PADDING.bottom;
  const totalYears = activeExperienceAt(now) / YEAR_MS;
  const yMax = Math.max(2, Math.ceil(totalYears / 2) * 2);
  const xScale = (timestamp: number) =>
    PADDING.left + ((timestamp - experienceStart) / (now - experienceStart)) * plotWidth;
  const yScale = (value: number) => PADDING.top + plotHeight - (value / yMax) * plotHeight;

  const yTicks: ChartModel['yTicks'] = [];
  for (let yTick = 0; yTick <= yMax; yTick += 2) {
    const y = yScale(yTick);
    yTicks.push({ y, label: String(yTick) });
  }

  const rawXTicks: { timestamp: number; label: string }[] = [
    { timestamp: experienceStart, label: 'Sep 2016' },
  ];
  for (let year = 2018; year <= new Date(now).getUTCFullYear(); year += 2) {
    rawXTicks.push({ timestamp: Date.UTC(year, 0, 1), label: String(year) });
  }
  const xTicks: ChartTick[] = rawXTicks.map((tick, index) => ({
    x: xScale(Math.min(tick.timestamp, now)),
    y: HEIGHT - 17,
    label: tick.label,
    anchor: index === 0 ? 'start' : index === rawXTicks.length - 1 ? 'end' : 'middle',
  }));

  const changeDates: number[] = [
    experienceStart,
    experiencePeriods[0].end as number,
    experiencePeriods[1].start,
  ];
  experienceRoles.forEach((role) => {
    if (role.date > experiencePeriods[1].start && role.date < now) changeDates.push(role.date);
  });
  changeDates.push(now);
  changeDates.sort((a, b) => a - b);
  const points = changeDates
    .filter((date, index) => index === 0 || date !== changeDates[index - 1])
    .map((date) => ({ x: xScale(date), y: yScale(activeExperienceAt(date) / YEAR_MS) }));
  const linePath = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
    .join(' ');
  const last = points[points.length - 1];
  const areaPath =
    `M ${points[0].x.toFixed(2)} ${yScale(0).toFixed(2)} ` +
    linePath.replace(/^M/, 'L') +
    ` L ${last.x.toFixed(2)} ${yScale(0).toFixed(2)} Z`;

  const gapStart = experiencePeriods[0].end as number;
  const gapEnd = experiencePeriods[1].start;
  const gapY = yScale(activeExperienceAt(gapStart) / YEAR_MS);

  const rolePoints = experienceRoles
    .filter((role) => role.date <= now)
    .map((role) => ({
      cx: xScale(role.date),
      cy: yScale(activeExperienceAt(role.date) / YEAR_MS),
      key: `${role.dateLabel}-${role.label}`,
      company: role.company,
      title: role.label.split('·').slice(1).join('·').trim() || role.label,
      dateLabel: role.dateLabel,
    }));

  return {
    yTicks,
    xTicks,
    areaPath,
    linePath,
    gap: { x1: xScale(gapStart), y1: gapY, x2: xScale(gapEnd), y2: gapY },
    rolePoints,
    currentPoint: { cx: last.x, cy: last.y },
  };
}

export const chartViewBox = `0 0 ${WIDTH} ${HEIGHT}`;
export const chartSize = { width: WIDTH, height: HEIGHT };
export const chartPlot = { width: WIDTH, padding: PADDING, plotHeight: HEIGHT - PADDING.top - PADDING.bottom };
