import nextra from "nextra";

const withNextra = nextra({ readingTime: true });

/** @type {import('next').NextConfig} */
const config = {
  trailingSlash: true,
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "Link", value: '</llms.txt>; rel="describedby"' },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        // Inline scripts are needed by static Next.js hydration and the theme.
        {
          key: "Content-Security-Policy",
          value:
            "default-src 'self'; script-src 'self' 'unsafe-inline'" +
            (process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "") +
            "; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
        },
      ],
    },
  ],
  images: { unoptimized: true },
};

export default withNextra(config);
