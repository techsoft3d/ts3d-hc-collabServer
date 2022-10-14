const path = require('path');

module.exports = {
  entry: './dev/public/js/hc-collab/hcCollab.js',
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'hcCollab.min.js',
    library: 'hcCollab', //add this line to enable re-use
  },
};
