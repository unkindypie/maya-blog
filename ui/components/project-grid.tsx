import { projectCards } from "@/lib/site-content";
import { InfoCard } from "./info-card";
export interface ProjectGridProps {
  readonly className?: string;
}
export function ProjectGrid({ className = "" }: Readonly<ProjectGridProps>) {
  return (
    <div className={`interests-grid ${className}`}>
      {projectCards.map((card) => (
        <InfoCard key={card.label} {...card} />
      ))}
    </div>
  );
}
