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
}
export function SpecRow({
  label,
  value,
  detail,
  href,
  wide,
}: Readonly<SpecRowProps>) {
  return (
    <div className={`spec-row${wide ? " spec-wide" : ""}`}>
      <dt>{label}</dt>
      <dd>
        {href ? (
          <a className="spec-value spec-link" href={href}>
            {value} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className="spec-value">{value}</span>
        )}
        {detail && <span className="spec-detail">{detail}</span>}
      </dd>
    </div>
  );
}
