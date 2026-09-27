interface SectionHeadProps {
  index: string;
  title: string;
  titleId?: string;
}

export default function SectionHead({ index, title, titleId }: SectionHeadProps) {
  return (
    <div className="section-head">
      <span className="section-index">{index}</span>
      <h2 id={titleId}>{title}</h2>
    </div>
  );
}
