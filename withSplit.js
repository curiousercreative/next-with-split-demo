/* eslint-disable */

// see https://github.com/aiji42/next-with-split for underlying package documentation
const BRANCH_HOST_MAP = {
  canary: 'next-with-split-demo-git-canary-curiousercreative.vercel.app',
  'canary-staging': 'next-with-split-demo-git-canary-staging-curiousercreative.vercel.app',
  main: 'next-with-split-demo.vercel.app',
  staging: 'next-with-split-demo-git-staging-curiousercreative.vercel.app',
};
const SPLITS = {
  canary ({ branch, hostname }) {
    return {
      canary: {
        path: process.env.NEXT_SPLIT_CANARY_PATH || process.env.NEXT_SPLIT_PATH,
        hosts: {
          main: {
            host: `https://${BRANCH_HOST_MAP.main}`,
            weight: Number(process.env.NEXT_SPLIT_CANARY_WEIGHT_MAIN),
          },
          canary: {
            host: `https://${BRANCH_HOST_MAP.canary}`,
            weight: Number(process.env.NEXT_SPLIT_CANARY_WEIGHT_CANARY),
          },
        },
      },
    };
  },
  canaryStaging ({ branch, hostname }) {
    return {
      canary: {
        path: process.env.NEXT_SPLIT_CANARY_PATH || process.env.NEXT_SPLIT_PATH,
        hosts: {
          staging: {
            host: `https://${BRANCH_HOST_MAP.staging}`,
            weight: Number(process.env.NEXT_SPLIT_CANARY_WEIGHT_MAIN),
          },
          'canary-staging': {
            host: `https://${BRANCH_HOST_MAP['canary-staging']}`,
            weight: Number(process.env.NEXT_SPLIT_CANARY_WEIGHT_CANARY),
          },
        },
      },
    };
  },
};

module.exports = function ({ baseBranch, branch, hostname, split }) {
  hostname = hostname || BRANCH_HOST_MAP[branch];
  const isOriginal = branch === baseBranch;
  const splitFn = SPLITS[split];

  if (typeof splitFn !== 'function') {
    throw new Error(`Did not find split function for ${split}. Split testing will not run`);
    return {};
  }

  return {
    currentBranch: branch,
    hostname,
    isOriginal,
    splits: isOriginal ? splitFn({ branch, hostname }) : {},
  };
};
