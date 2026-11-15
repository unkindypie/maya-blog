import nextra from "nextra";

const withNextra = nextra({ readingTime: true });

/** @type {import('next').NextConfig} */
const config = {
  trailingSlash: true,
  headers: async () => [
    {
      source: "/:path*",
      headers: [{ key: "Link", value: '</llms.txt>; rel="describedby"' }],
    },
  ],
  images: { unoptimized: true },
};

export default withNextra(config);
