const config = {
  entry: `${__dirname}/src/index.js`,
  output: {
    path: `${__dirname}/client/js`,
    filename: 'bundle.js'
  },
  mode: 'development'
};

module.exports = config;
