import { projectCards, projectLinks } from "@/lib/site-content";
import { InfoCard } from "./info-card";
export interface ProjectGridProps {
  readonly className?: string;
}
export function ProjectGrid({ className = "" }: Readonly<ProjectGridProps>) {
  return (
    <div className={`interests-grid ${className}`}>
      {projectCards.map((card, index) => (
        <InfoCard id={projectLinks[index].id} key={card.label} {...card} />
      ))}
    </div>
  );
}
