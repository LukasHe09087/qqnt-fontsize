const path = require('path');
module.exports = function override(config, env) {
  // console.log(config);

  // Even in production mode, we want the CSS inlined instead of put in a different file
  // Remove the CSS extract plugin because we want CSS injected directly in
  // the greasemonkey script
  config.plugins = config.plugins.filter(x => !x || x.constructor.name !== 'MiniCssExtractPlugin');
  (config.module.rules.find(x => !!x.oneOf).oneOf || []).forEach(x => {
    if (x.test && x.test.constructor === RegExp && 'test.css'.match(x.test)) {
      try {
        x.use = x.use.filter(y => !y.loader.includes('css-extract'));
        x.use.unshift(require.resolve('style-loader'));
      } catch (e) {
        // If we fail to replace a `css-extract` move on silently
        // This will happen if, for example, it has already been replaced
      }
    }
  });
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
  });
  Object.assign(config.output, { path: path.resolve(process.cwd(), 'build'), filename: 'static/js/[name].js' });

  // use export function
  config = {
    ...config,
    experiments: {
      outputModule: true,
    },
    output: { library: { type: 'module' } },
  };
  return config;
};
