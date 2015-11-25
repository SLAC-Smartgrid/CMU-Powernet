var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var DeepMerge = require('deep-merge');
//var nodemon = require('nodemon');

var deepmerge = DeepMerge(function(target, source, key) {
  if(target instanceof Array) {
    return [].concat(target, source);
  }
  return source;
});

// generic
var defaultConfig = {

};

if(process.env.NODE_ENV !== 'production') {
  defaultConfig.debug = true;
}

function config(overrides) {
  return deepmerge(defaultConfig, overrides || {});
}

// frontend 
var frontendConfig = config({
  entry: {
    nvdcharts : __dirname + '/public/js/nvdcharts/index.js',
    mapwidget : __dirname + '/public/js/mapwidget/index.js'
  },
  output: {
    path: path.join(__dirname, '/public/dist/js'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        },
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader", query: { mimetype: "image/png" }}
    ]
  },
});

//backend

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

// var backendConfig = config({
//   entry: './src/main.js',
//   target: 'node',
//   output: {
//     path: path.join(__dirname, 'build'),
//     filename: 'backend.js'
//   },
//   node: {
//     __dirname: true,
//     __filename: true
//   },
//   externals: nodeModules,
//   plugins: [
//     new webpack.IgnorePlugin(/\.(css|less)$/),
//     new webpack.BannerPlugin('require("source-map-support").install();',
//                              { raw: true, entryOnly: false })
//   ]
// });

// tasks

function onBuild(done) {
  return function(err, stats) {
    if(err) {
      console.log('Error', err);
    }
    else {
      console.log(stats.toString());
    }

    if(done) {
      done();
    }
  }
}

gulp.task('frontend-build', function(done) {
  webpack(frontendConfig).run(onBuild(done));
});

gulp.task('frontend-watch', function() {
  webpack(frontendConfig).watch(100, onBuild());
});

// gulp.task('backend-build', function(done) {
//   webpack(backendConfig).run(onBuild(done));
// });

// gulp.task('backend-watch', function() {
//   webpack(backendConfig).watch(100, function(err, stats) {
//     onBuild()(err, stats);
//     nodemon.restart();
//   });
// });

// gulp.task('build', ['frontend-build', 'backend-build']);
// gulp.task('watch', ['frontend-watch', 'backend-watch']);

// gulp.task('run', ['frontend-watch'], function() {
//   nodemon({
//     execMap: {
//       js: 'node'
//     },
//     script: path.join(__dirname, 'build/backend'),
//     ignore: ['*'],
//     watch: ['foo/'],
//     ext: 'noop'
//   }).on('restart', function() {
//     console.log('Restarted!');
//   });
// });
