const path = require('path');

module.exports = {
  entry: './dev/public/js/hc-collab/hcCollab.js',
  mode: "production",
  experiments: {
    outputModule: true
  },
  output: {
    libraryTarget: 'module',
    path: path.resolve(__dirname, 'dist'),
    filename: 'hcCollab.module.min.js',
  },  
};
