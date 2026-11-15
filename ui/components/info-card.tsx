import { SystemIcon } from "./system-icon";
export interface InfoCardProps {
  readonly label: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly compact?: boolean;
}
export function InfoCard({
  label,
  icon,
  title,
  description,
  tags,
  compact = false,
}: Readonly<InfoCardProps>) {
  return (
    <article className={`info-card${compact ? " compact" : ""}`}>
      <div className="card-eyebrow">
        <span>{label}</span>
        <SystemIcon name={icon} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="card-tags">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}
