const splitIsActive = process.env.NEXT_SPLIT_ACTIVE;
const splits = require('./withSplit.js')({
  baseBranch: process.env.NEXT_PUBLIC_APP_ENV === 'production' ? 'main' : 'staging',
  branch: process.env.VERCEL_GIT_COMMIT_REF,
  split: process.env.NEXT_PUBLIC_APP_ENV === 'production' ? 'canary' : 'canaryStaging',
});
const withSplit = splitIsActive ? require('next-with-split')(splits) : x => x;

module.exports = withSplit({
  reactStrictMode: true,
});
