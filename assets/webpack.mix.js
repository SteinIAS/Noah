const ImageminPlugin = require('imagemin-webpack-plugin').default;
const mix = require('laravel-mix');
const glob = require('glob');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const argv = require('minimist')(process.argv.slice(2));

const paths = {
    assets: {
        js: 'js/',
        css: 'sass/',
        img: 'img/',
        html: 'site/'
    },
    output: {
        js: 'site/scripts',
        css: 'site/css',
        img: 'site/img'
    }
};

// If you are running the site with a different webserver change this to the URL of the site e.g. localhost:8888
const proxy = (argv.env && argv.env.proxy) ? argv.env.proxy : 'localhost:8888';
let rules = [{
    test: /\.scss/,
    use: 'import-glob-loader'
}];
let plugins = [];
if (process.env.NODE_ENV === 'development') {
    rules.push({
        test: /\.(js|vue)/,
        exclude: /node_modules/,
        use: 'eslint-loader'
    });
}
if (process.env.NODE_ENV === 'optimize') {
    plugins.push(new ImageminPlugin({
        externalImages: {
            sources: glob.sync(paths.assets.img + '*.{png,svg,jpg,gif,jpeg,webp}'),
            destination: '../' + paths.output.img.replace("/img", "") + '/'
        },
        disable: false,
        pngquant: {
            quality: '95-100'
        },
        svgo: {
            plugins: [
                { removeTitles: false },
                { inlineStyles: { onlyMatchedOnce: false } },
            ]
        }
    }));
} else {
    plugins.push(new SVGSpritemapPlugin({
        src: '../' + paths.output.img + '/*.svg',
        filename: paths.output.img + '/svg-symbols/svg-symbols.svg',
        prefix: '',
        svgo: false
    }));
}
mix
    .setPublicPath('../')
    .webpackConfig({
        module: {
            rules: rules
        },
        plugins: plugins
    });

if (process.env.NODE_ENV !== 'optimize') {
    mix.sass(paths.assets.css + 'style.scss', paths.output.css)
        .js(paths.assets.js + 'script.js', paths.output.js);
}



if (process.env.NODE_ENV === 'development') {
    mix.browserSync({
        proxy: proxy,
        files: [
            '../' + paths.output.css + '/style.css',
            '../' + paths.output.js + '/script.js',
            '../' + paths.assets.html + 'Views/*.{php,html,cshtml}',
            '../' + paths.assets.html + 'index.{php,html,cshtml}'
        ]
    });
}
// gulp.task('sprites', function() {
// 	return gulp.src(paths.output.img + '*.svg').pipe(svgSymbols({
// 		templates: ['default-svg'],
// 		svgClassname: 'svg-icon-lib'
// 	})).pipe(gulp.dest(paths.output.img + '/svgsprite/'));
// });

//     gulp.watch(paths.output.img + '*.svg', ['sprites']);
