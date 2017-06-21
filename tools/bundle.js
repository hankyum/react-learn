import webpack from 'webpack';
import webpackConfig from './webpack.config';

const bundler = webpack(webpackConfig);
let bundlerRunCount = 0;

function onComplete(err, stats) {
  if (err) {
    return reject(err);
  }

  console.log(stats.toString(webpackConfig[0].stats));

  if (++bundlerRunCount === (global.WATCH ? webpackConfig.length : 1)) {
  }
}

if (global.WATCH) {
  bundler.watch(200, onComplete);
} else {
  bundler.run(onComplete);
}

