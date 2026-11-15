import Link from "next/link";
import { SystemIcon } from "./system-icon";
export interface InfoCardProps {
  readonly id?: string;
  readonly label: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly compact?: boolean;
  readonly links?: readonly { readonly href: string; readonly label: string }[];
}
export function InfoCard({
  id,
  label,
  icon,
  title,
  description,
  tags,
  compact = false,
  links,
}: Readonly<InfoCardProps>) {
  return (
    <article id={id} className={`info-card${compact ? " compact" : ""}`}>
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
      {links && (
        <div className="card-links">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label} <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
