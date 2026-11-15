import { getPublicCommits, type PublicCommit } from "@/lib/github-activity";

export interface GitHubActivityProps {
  readonly username: string;
  readonly emptyText: string;
  readonly unavailableText: string;
  readonly linkLabel: string;
}

export async function GitHubActivity({
  username,
  emptyText,
  unavailableText,
  linkLabel,
}: Readonly<GitHubActivityProps>) {
  let commits: PublicCommit[] = [];
  let unavailable = false;
  try {
    commits = await getPublicCommits(username);
  } catch {
    unavailable = true;
    console.warn("GitHub public activity is temporarily unavailable.");
  }
  return (
    <div className="github-activity">
      {commits.length ? (
        <ul>
          {commits.map((commit) => (
            <li key={`${commit.repository}:${commit.sha}`}>
              <a href={commit.href} target="_blank" rel="noopener noreferrer">
                <span className="activity-meta">
                  <span>{commit.repository}</span>
                  <time dateTime={commit.date}>
                    {new Date(commit.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </time>
                </span>
                <span className="activity-message">{commit.message}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="activity-empty">
          {unavailable ? unavailableText : emptyText}
        </p>
      )}
      <a
        className="activity-profile"
        href={`https://github.com/${encodeURIComponent(username)}?tab=overview`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkLabel} <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
