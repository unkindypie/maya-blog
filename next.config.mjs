import nextra from "nextra";

const withNextra = nextra({ readingTime: true });

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default withNextra(config);
