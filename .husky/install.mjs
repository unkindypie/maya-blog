// Production-only installs do not have Husky, and CI does not need local hooks.
if (
  process.env.NODE_ENV === "production" ||
  process.env.CI === "true" ||
  process.env.HUSKY === "0"
) {
  process.exit(0);
}
const { default: husky } = await import("husky");
const message = husky();
if (message) console.log(message);
