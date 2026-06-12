// Cloudflare Pages CI sets CF_PAGES; Workers Builds sets WORKERS_CI instead
// https://developers.cloudflare.com/workers/ci-cd/builds/configuration/
export const isCloudflareBuild = Boolean(
  process.env.CF_PAGES || process.env.WORKERS_CI,
);

export const branch =
  process.env.CF_PAGES_BRANCH || process.env.WORKERS_CI_BRANCH;
