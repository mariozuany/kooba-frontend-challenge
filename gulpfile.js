// Node Packages
const gulp = require('gulp');
const pump = require('pump');
const del = require('del');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const browserSync = require('browser-sync').create();
const vinylNamed = require('vinyl-named');
const through2 = require('through2');
const gulpZip = require('gulp-zip');
const gulpUglify = require('gulp-uglify');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpPostcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const gulpSass = require('gulp-sass');
const gulpStylelint = require('gulp-stylelint');
const gulpBabel = require('gulp-babel');
const gulpImagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const inlineImagesize = require('gulp-inline-imagesize');
const fileinclude = require('gulp-file-include');

// Entry point retreive from webpack
const entry = require('./webpack/entry');

// Transform Entry point into an Array for defining in gulp file
const entryArray = Object.values(entry);

// Config
const postcssPresetEnvConfig = {
    autoprefixer: { cascade: false }
};

// Paths for reuse
const exportPath = './website/dist/**/*';
const srcPath = (file, watch = false) => {
    if (file === 'scss' && watch === false) return './website/src/scss/main.scss';
    if (file === 'scss' && watch === true) return './website/src/scss/**/*.scss';
    if (file === 'js' && watch === false) return entryArray;
    if (file === 'js' && watch === true) return './website/src/js/**/*.js';
    if (file === 'html') return './website/src/**/*.html';
    if (file === 'fonts') return './website/src/fonts/**/*.*';
    if (file === 'img') return './website/src/img/**/*.{png,jpeg,jpg,svg,gif}';
    if (file === 'video') return './website/src/video/**/*.{mp4,ogv,webm}';
    console.error('Unsupported file type entered into Gulp Task Runner for Source Path');
    return null;
};

// Build distribution paths
const distPath = (file, mode = 'development', serve = false) => {
    const directory = mode === 'production' ? 'build' : 'dist';

    if (['css', 'js', 'img', 'fonts', 'video'].includes(file)) return `./website/${directory}/${file}`;
    if (file === 'html' && serve === false) return `./website/${directory}/**/*.html`;
    if (file === 'html' && serve === true) return `./website/${directory}`;

    console.error('Unsupported file type entered into Gulp Task Runner for Dist Path');

    return null;
};

/**
 * Cleaning Tasks
 */

// Clean Markup Task
const cleanMarkup = mode => () => {
    if (['development', 'production'].includes(mode)) {
        return del([distPath('html', mode)]);
    }

    return undefined;
};

// Clean Images Task
const cleanImages = mode => () => {
    if (['development', 'production'].includes(mode)) {
        return del([distPath('img', mode)]);
    }

    return undefined;
};

// Clean Video Task
const cleanVideo = mode => () => {
    if (['development', 'production'].includes(mode)) {
        return del([distPath('video', mode)]);
    }

    return undefined;
};

// Clean Styles Task
const cleanStyles = mode => () => {
    if (['development', 'production'].includes(mode)) {
        return del([distPath('css', mode)]);
    }

    return undefined;
};

// Clean Scripts Task
const cleanScripts = mode => () => {
    if (['development', 'production'].includes(mode)) {
        return del([distPath('js', mode)]);
    }

    return undefined;
};

// Clean Fonts Task
const cleanFonts = mode => () => {
    if (['development', 'production'].includes(mode)) {
        return del([distPath('fonts', mode)]);
    }

    return undefined;
};

// Clean the zip file
const cleanExport = mode => () => {
    if (['development', 'production'].includes(mode)) {
        return del(['./website.zip']);
    }

    return undefined;
};

/**
 * Building Tasks
 */

// Build Markup Tasks
const buildMarkup = mode => (done) => {
    if (['development', 'production'].includes(mode)) {
        return pump([
            gulp.src(srcPath('html')),
            fileinclude({
                prefix: '@@',
                basepath: '@file',
                indent: 'true'
            }),
            ...((mode === 'production') ? [inlineImagesize()] : []),
            gulp.dest(distPath('html', mode, true)),
            browserSync.stream()
        ], done);
    }

    return undefined;
};

// Build Images Task
const buildImages = mode => (done) => {
    if (['development', 'production'].includes(mode)) {
        return pump([
            gulp.src(srcPath('img')),
            gulpImagemin([
                gulpImagemin.gifsicle(),
                gulpImagemin.jpegtran(),
                gulpImagemin.optipng(),
                gulpImagemin.svgo(),
                imageminPngquant(),
                imageminJpegRecompress()
            ]),
            gulp.dest(distPath('img', mode)),
            browserSync.stream()
        ], done);
    }

    return undefined;
};

// Build Video Task
const buildVideo = mode => (done) => {
    if (['development', 'production'].includes(mode)) {
        return pump([
            gulp.src(srcPath('video')),
            gulp.dest(distPath('video', mode)),
            browserSync.stream()
        ], done);
    }

    return undefined;
};

// Build Styles Task
const buildStyles = mode => (done) => {
    let outputStyle;
    if (mode === 'development') outputStyle = 'nested';
    else if (mode === 'production') outputStyle = 'compressed';
    else outputStyle = undefined;

    const postcssPlugins = [
        postcssPresetEnv(postcssPresetEnvConfig)
    ];

    if (['development', 'production'].includes(mode)) {
        return pump([
            gulp.src(srcPath('scss')),
            gulpSourcemaps.init({ loadMaps: true }),
            gulpSass({ outputStyle }),
            gulpPostcss(postcssPlugins),
            gulpSourcemaps.write('./'),
            gulp.dest(distPath('css', mode)),
            browserSync.stream()
        ], done);
    }

    return undefined;
};

// Build Styles Task
const lintStyles = mode => (done) => {
    if (['development', 'production'].includes(mode)) {
        return pump([
            gulp.src(srcPath('scss', true)),
            gulpStylelint({
                reporters: [
                    { formatter: 'string', console: true }
                ],
                debug: true
            }),
        ], done, (err) => {
            console.log('pipe finished', err);
        });
    }

    return undefined;
};

// Build Scripts Task
const buildScripts = mode => (done) => {
    let streamMode;
    if (mode === 'development') streamMode = require('./webpack/config.development.js');
    else if (mode === 'production') streamMode = require('./webpack/config.production.js');
    else streamMode = undefined;

    if (['development', 'production'].includes(mode)) {
        return pump([
            gulp.src(srcPath('js')),
            vinylNamed(),
            webpackStream(streamMode, webpack),
            gulpSourcemaps.init({ loadMaps: true }),
            through2.obj(function (file, enc, cb) {
                const isSourceMap = /\.map$/.test(file.path);
                if (!isSourceMap) this.push(file);
                cb();
            }),
            gulpBabel({ presets: ['@babel/preset-env'] }),
            ...((mode === 'production') ? [gulpUglify()] : []),
            gulpSourcemaps.write('./'),
            gulp.dest(distPath('js', mode)),
            browserSync.stream()
        ], done);
    }

    return undefined;
};

// Build Scripts Task
const buildFonts = mode => (done) => {
    if (['development', 'production'].includes(mode)) {
        return pump([
            gulp.src(srcPath('fonts')),
            gulp.dest(distPath('fonts', mode)),
            browserSync.stream()
        ], done);
    }

    return undefined;
};

/**
 * Generic Task for all Main Gulp Build/Export Tasks
 */

// Generic Task
const genericTask = (mode, context = 'building') => {
    let port;
    let modeName;

    if (mode === 'development') {
        port = '3000';
        modeName = 'Development Mode';
    } else if (mode === 'production') {
        port = '8000';
        modeName = 'Production Mode';
    } else {
        port = undefined;
        modeName = undefined;
    }

    // Combine all booting tasks into one array!
    const allBootingTasks = [
        Object.assign(cleanMarkup(mode), { displayName: `Booting Markup Task: Clean - ${modeName}` }),
        Object.assign(buildMarkup(mode), { displayName: `Booting Markup Task: Build - ${modeName}` }),
        Object.assign(cleanImages(mode), { displayName: `Booting Images Task: Clean - ${modeName}` }),
        Object.assign(buildImages(mode), { displayName: `Booting Images Task: Build - ${modeName}` }),
        Object.assign(cleanVideo(mode), { displayName: `Booting Video Task: Clean - ${modeName}` }),
        Object.assign(buildVideo(mode), { displayName: `Booting Video Task: Build - ${modeName}` }),
        Object.assign(cleanScripts(mode), { displayName: `Booting Scripts Task: Clean - ${modeName}` }),
        Object.assign(buildScripts(mode), { displayName: `Booting Scripts Task: Build - ${modeName}` }),
        Object.assign(cleanStyles(mode), { displayName: `Booting Styles Task: Clean - ${modeName}` }),
        Object.assign(lintStyles(mode), { displayName: `Booting Styles Task: Lint - ${modeName}` }),
        Object.assign(buildStyles(mode), { displayName: `Booting Styles Task: Build - ${modeName}` }),
        Object.assign(cleanFonts(mode), { displayName: `Booting Fonts Task: Clean - ${modeName}` }),
        Object.assign(buildFonts(mode), { displayName: `Booting Fonts Task: Build - ${modeName}` })
    ];

    // Browser Loading & Watching
    const browserLoadingWatching = (done) => {
        browserSync.init({
            port,
            directory: true,
            server: distPath('html', mode, true)
        });

        // Watch - Markup
        gulp.watch(srcPath('html'), true)
            .on('all', gulp.series(
                Object.assign(cleanMarkup(mode), { displayName: `Watching Markup Task: Clean - ${modeName}` }),
                Object.assign(buildMarkup(mode), { displayName: `Watching Markup Task: Build - ${modeName}` }),
            ), browserSync.reload);
        done();

        // Watch - Images
        gulp.watch(srcPath('img', true))
            .on('all', gulp.series(
                Object.assign(cleanImages(mode), { displayName: `Watching Images Task: Clean - ${modeName}` }),
                Object.assign(buildImages(mode), { displayName: `Watching Images Task: Build - ${modeName}` }),
            ), browserSync.reload);

        // Watch - Video
        gulp.watch(srcPath('video', true))
            .on('all', gulp.series(
                Object.assign(cleanVideo(mode), { displayName: `Watching Video Task: Clean - ${modeName}` }),
                Object.assign(buildVideo(mode), { displayName: `Watching Video Task: Build - ${modeName}` }),
            ), browserSync.reload);

        // Watch - Scripts
        gulp.watch(srcPath('js', true))
            .on('all', gulp.series(
                // Object.assign(cleanScripts(mode), { displayName: `Watching Scripts Task: Clean - ${modeName}` }),
                Object.assign(buildScripts(mode), { displayName: `Watching Scripts Task: Build - ${modeName}` }),
            ), browserSync.reload);

        // Watch - Styles
        gulp.watch(srcPath('scss', true))
            .on('all', gulp.series(
                Object.assign(cleanStyles(mode), { displayName: `Watching Styles Task: Clean - ${modeName}` }),
                Object.assign(lintStyles(mode), { displayName: `Watching Styles Task: Lint - ${modeName}` }),
                Object.assign(buildStyles(mode), { displayName: `Watching Styles Task: Build - ${modeName}` }),
            ), browserSync.reload);

        // Watch - Fonts
        gulp.watch(srcPath('fonts', true))
            .on('all', gulp.series(
                Object.assign(cleanFonts(mode), { displayName: `Watching Fonts Task: Clean - ${modeName}` }),
                Object.assign(buildFonts(mode), { displayName: `Watching Fonts Task: Build - ${modeName}` }),
            ), browserSync.reload);
    };

    // Exporting Zip
    const exportingZip = (done) => {
        pump([
            gulp.src(exportPath),
            gulpZip('./website.zip'),
            gulp.dest('./')
        ], done);
    };

    // Returning Tasks based on Building Context
    if (context === 'building') {
        return [
            ...allBootingTasks,
            Object.assign(browserLoadingWatching, {
                displayName: `Browser Loading & Watching Task - ${modeName}`
            })
        ];
    }

    // Returning Tasks based on Exporting Context
    if (context === 'exporting') {
        return [
            cleanExport(mode),
            ...allBootingTasks,
            Object.assign(exportingZip, { displayName: `Exporting Zip Task - ${modeName}` })
        ];
    }

    // No Side-Effects Please
    return undefined;
};

/**
 * Main Gulp Build/Export Tasks that are inserted within `package.json`
 */

// Default (`npm start` or `yarn start`) => Production
gulp.task('default', gulp.series(...genericTask('production', 'building')));

// Dev (`npm run dev` or `yarn run dev`) => Development
gulp.task('dev', gulp.series(...genericTask('development', 'building')));

// Export (`npm run export` or `yarn run export`)
gulp.task('export', gulp.series(...genericTask('production', 'exporting')));
