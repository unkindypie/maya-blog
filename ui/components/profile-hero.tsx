import type { ReactNode } from "react";

export interface ProfileHeroProps {
  readonly children: ReactNode;
}
export function ProfileHero({ children }: Readonly<ProfileHeroProps>) {
  return <section className="profile-hero">{children}</section>;
}

export interface ProfileIntroProps {
  readonly title: string;
  readonly face?: string;
  readonly badges: readonly string[];
  readonly command: string;
  readonly workspace: string;
  readonly children: ReactNode;
}
export function ProfileIntro({
  title,
  face,
  badges,
  command,
  workspace,
  children,
}: Readonly<ProfileIntroProps>) {
  return (
    <div>
      <div className="command-line">
        <span>{command}</span>
        <b aria-hidden="true">::</b>
        <small>{workspace}</small>
      </div>
      <h1>
        {title}
        {face && (
          <>
            {" "}
            <span>{face}</span>
          </>
        )}
      </h1>
      <div className="identity-badges">
        {badges.map((badge) => (
          <span key={badge}>{badge}</span>
        ))}
      </div>
      <div className="profile-copy">{children}</div>
    </div>
  );
}
