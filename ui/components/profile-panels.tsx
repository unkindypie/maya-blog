import type { ReactNode } from "react";
import Link from "next/link";

export interface ProfilePanelsProps {
  readonly children: ReactNode;
}
export function ProfilePanels({ children }: Readonly<ProfilePanelsProps>) {
  return <div className="profile-bottom">{children}</div>;
}
export interface ProfilePanelProps {
  readonly variant: "now" | "connect";
  readonly title: string;
  readonly icon: string;
  readonly note: string;
  readonly children: ReactNode;
  readonly prompt?: string;
  readonly footer?: string;
}
export function ProfilePanel({
  variant,
  title,
  icon,
  note,
  children,
  prompt,
  footer,
}: Readonly<ProfilePanelProps>) {
  return (
    <section className={`${variant}-panel`}>
      <div className="section-heading">
        <h2>
          <span aria-hidden="true">{icon}</span> {title}
        </h2>
        <small>{note}</small>
      </div>
      {children}
      {footer && (
        <div className="terminal-note">
          {prompt && <span>{prompt} </span>}
          {footer}
        </div>
      )}
    </section>
  );
}
export interface ProfileLinkProps {
  readonly href: string;
  readonly label: string;
}
export function ProfileLink({ href, label }: Readonly<ProfileLinkProps>) {
  return (
    <Link href={href}>
      <span>{label}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
