import type { ReactNode } from "react";

export interface ProfileSectionProps {
  readonly title: string;
  readonly detail?: string;
  readonly grid: "hardware" | "interests";
  readonly children: ReactNode;
}
export function ProfileSection({
  title,
  detail,
  grid,
  children,
}: Readonly<ProfileSectionProps>) {
  return (
    <section>
      <div className="section-heading">
        <h2>
          <span aria-hidden="true">##</span> {title}
        </h2>
        {detail && <small>{detail}</small>}
      </div>
      <div className={`${grid}-grid`}>{children}</div>
    </section>
  );
}
