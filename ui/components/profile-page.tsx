import Link from "next/link";
import {
  contact,
  interests,
  now,
  profile,
  specs,
  tools,
} from "@/lib/site-content";
import { InfoCard } from "./info-card";
import { SystemIcon } from "./system-icon";
export interface ProfilePageProps {
  readonly className?: string;
}
export function ProfilePage({ className = "" }: Readonly<ProfilePageProps>) {
  return (
    <div className={`profile-page ${className}`}>
      <section className="profile-hero">
        <div>
          <div className="command-line">
            <span>cat /dev/maya &gt;&gt; stdout</span>
            <b>::</b>
            <small>workspace 1</small>
          </div>
          <h1>
            {profile.title} <span>{profile.face}</span>
          </h1>
          <div className="identity-badges">
            {profile.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
          <p className="profile-lead">{profile.intro}</p>
          <p className="profile-detail">{profile.detail}</p>
        </div>
        <aside className="quick-specs" aria-label="Quick system specs">
          <h2>
            <SystemIcon name="terminal" /> QUICK_SPECS.SH
          </h2>
          <dl>
            {specs.map(({ label, value, detail, href }) => (
              <div className="spec-row" key={label}>
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
            ))}
          </dl>
          <div className="specs-footer">
            <span>personal workspace</span>
            <span>● local</span>
          </div>
        </aside>
      </section>
      <section>
        <div className="section-heading">
          <h2>
            <span>##</span> what&apos;s in my terminal
          </h2>
          <small>cat ~/.config/mvim/init.lua</small>
        </div>
        <div className="hardware-grid">
          {tools.map((card) => (
            <InfoCard key={card.label} {...card} compact />
          ))}
        </div>
      </section>
      <section>
        <div className="section-heading">
          <h2>
            <span>##</span> things i keep working on
          </h2>
          <small>~/projects/</small>
        </div>
        <div className="interests-grid">
          {interests.map((card) => (
            <InfoCard key={card.label} {...card} />
          ))}
        </div>
      </section>
      <div className="profile-bottom">
        <section className="now-panel">
          <div className="section-heading">
            <h2>
              <span>◷</span> /now
            </h2>
            <small>things in progress</small>
          </div>
          <ul>
            {now.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link href="/blog">
            Read my notes <span aria-hidden="true">↗</span>
          </Link>
        </section>
        <section className="connect-panel">
          <div className="section-heading">
            <h2>
              <span>@</span> connect
            </h2>
            <small>say hi</small>
          </div>
          <a href={contact.github}>
            <span>github.com/unkindypie</span>
            <span aria-hidden="true">↗</span>
          </a>
          <a href={`mailto:${contact.email}`}>
            <span>{contact.email}</span>
            <span aria-hidden="true">↗</span>
          </a>
          <Link href="/blog">
            blog / notes to future me <span>↗</span>
          </Link>
          <Link href="/dotfiles">
            dotfiles / make it feel like mine <span>↗</span>
          </Link>
          <Link href="/projects">
            projects / things i&apos;m building <span>↗</span>
          </Link>
          <div className="terminal-note">
            <span>~/maya $</span> welcome to my little corner of the internet.
          </div>
        </section>
      </div>
    </div>
  );
}
