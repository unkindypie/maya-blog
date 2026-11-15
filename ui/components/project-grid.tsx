import type { ReactNode } from "react";
export interface ProjectGridProps {
  readonly children: ReactNode;
  readonly className?: string;
}
export function ProjectGrid({
  children,
  className = "",
}: Readonly<ProjectGridProps>) {
  return (
    <div className={`interests-grid project-grid ${className}`}>{children}</div>
  );
}
