import type { SeoPage } from "@/lib/seo";

export interface SocialCardProps {
  readonly page: SeoPage;
}
export function SocialCard({ page }: Readonly<SocialCardProps>) {
  const home = page.canonicalPath === "/";
  const title = page.socialTitle ?? page.title;
  const section = page.date ? "blog/" : home ? "about.md" : page.path.slice(1);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#161215",
        color: "#e9e0e4",
        fontFamily: "JetBrains Mono",
        padding: 28,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          border: "2px solid #4e444a",
          borderRadius: 18,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#231e21",
            padding: "18px 28px",
            borderBottom: "1px solid #4e444a",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="36" height="36" viewBox="0 0 32 32">
              <path
                d="m3 5 7 4h12l7-4-3 12v7a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4v-7L3 5Z"
                fill="#f5c2e7"
              />
              <circle cx="12" cy="19" r="2" fill="#231e21" />
              <circle cx="20" cy="19" r="2" fill="#231e21" />
              <path
                d="M14 24Q16 27 18 24"
                stroke="#231e21"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            <span style={{ color: "#f5c2e7", fontSize: 22 }}>~/maya/</span>
          </div>
          <div
            style={{
              display: "flex",
              background: "#f5c2e7",
              color: "#472441",
              borderRadius: 4,
              padding: "8px 14px",
              fontSize: 20,
            }}
          >
            {section}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "36px 42px",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#d9b9ff",
              fontSize: 18,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {page.category ??
              (home
                ? "systems engineering / personal projects"
                : "configs, code & things i make")}
          </div>
          <div
            style={{
              display: "flex",
              color: "#ffe7f5",
              fontSize: title.length > 55 ? 46 : home ? 76 : 56,
              lineHeight: 1.12,
              letterSpacing: home ? -2 : 0,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              color: "#d1c3ca",
              fontSize: 24,
              lineHeight: 1.45,
            }}
          >
            {page.socialDescription ?? page.description}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 28px",
            borderTop: "1px solid #4e444a",
            background: "#1e1a1d",
            fontSize: 18,
          }}
        >
          <span style={{ color: "#f5c2e7" }}>maya-is.engineer</span>
          <span style={{ color: "#9a8d94" }}>
            {page.date ?? "code, configs & cozy terminals"}
          </span>
        </div>
      </div>
    </div>
  );
}
