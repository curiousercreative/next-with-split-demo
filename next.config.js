const withSplit = require('next-with-split')({
  splits: {
   canary: {
     hosts: {
       original: 'https://next-with-split-demo.vercel.app/',
       canary: 'https://next-with-split-demo-git-canary.vercel.app/',
     },
   },
 },
});

module.exports = withSplit({
  reactStrictMode: true,
});
