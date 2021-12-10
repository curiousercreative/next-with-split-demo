const withSplit = require('next-with-split')({
  splits: {
   canary: {
     path: '/',
     hosts: {
       original: 'https://next-with-split-demo.vercel.app',
       canary: 'https://next-with-split-demo-git-canary-curiousercreative.vercel.app',
     },
   },
 },
});

module.exports = withSplit({
  reactStrictMode: true,
});
