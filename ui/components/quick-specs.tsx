import type { ReactNode } from "react";
import { SystemIcon } from "./system-icon";

export interface QuickSpecsProps {
  readonly title: string;
  readonly footer: string;
  readonly status: string;
  readonly children: ReactNode;
}
export function QuickSpecs({
  title,
  footer,
  status,
  children,
}: Readonly<QuickSpecsProps>) {
  return (
    <aside className="quick-specs" aria-label="Quick system specs">
      <h2>
        <SystemIcon name="terminal" /> {title}
      </h2>
      <dl>{children}</dl>
      <div className="specs-footer">
        <span>{footer}</span>
        <span>● {status}</span>
      </div>
    </aside>
  );
}
export interface SpecRowProps {
  readonly label: string;
  readonly value: string;
  readonly detail?: string;
  readonly href?: string;
  readonly wide?: boolean;
  readonly alongside?: readonly string[];
}
export function SpecRow({
  label,
  value,
  detail,
  href,
  wide,
  alongside,
}: Readonly<SpecRowProps>) {
  const isExternal = href !== undefined && /^https?:\/\//.test(href);
  return (
    <div className={`spec-row${wide ? " spec-wide" : ""}`}>
      <dt>{label}</dt>
      <dd className={alongside?.length ? "spec-pair" : undefined}>
        <div className="spec-values">
          {href ? (
            <a
              className="spec-value spec-link"
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              {value} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="spec-value">{value}</span>
          )}
          {detail && <span className="spec-detail">{detail}</span>}
        </div>
        {Boolean(alongside?.length) && (
          <>
            <span className="spec-divider" aria-hidden="true">
              /
            </span>
            <div className="spec-alongside">
              {alongside?.map((value) => (
                <span key={value}>{value}</span>
              ))}
            </div>
          </>
        )}
      </dd>
    </div>
  );
}
