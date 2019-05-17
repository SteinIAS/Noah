const resolve = require('path').resolve;
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const mix = require('laravel-mix');
const glob = require('glob');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const argv = require('minimist')(process.argv.slice(2));
const tailwindcss = require('tailwindcss');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const globAll = require('glob-all');

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

class TailwindExtractor {
	static extract(content) {
		return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
	}
}

// If you are running the site with a different webserver change this to the URL of the site e.g. localhost:8888
const proxy = argv.env && argv.env.proxy ? argv.env.proxy : 'localhost:8888';
const rules = [
	{
		test: /\.scss/,
		use: 'import-glob-loader'
	}
];
const plugins = [];
if (process.env.NODE_ENV === 'development') {
	rules.push({
		test: /\.(js|vue)/,
		exclude: /node_modules/,
		use: 'eslint-loader'
	});
}
if (process.env.NODE_ENV === 'optimizeImgs') {
	plugins.push(
		new ImageminPlugin({
			cacheFolder: resolve(`./${paths.assets.img}cache`),
			externalImages: {
				sources: glob.sync(`${paths.assets.img}**/*.{png,svg,jpg,gif,jpeg,webp}`, {
					ignore: `${paths.assets.img}cache/*.{png,svg,jpg,gif,jpeg,webp}`
				}),
				destination: `../${paths.output.img.replace('/img', '')}/`
			},
			disable: false,
			pngquant: {
				quality: '95-100'
			},
			svgo: {
				plugins: [{ removeTitles: false }, { inlineStyles: { onlyMatchedOnce: false } }]
			}
		})
	);
} else if (process.env.NODE_ENV === 'compileSvgs') {
	plugins.push(
		new SVGSpritemapPlugin({
			src: `../${paths.output.img}/symbols/*.svg`,
			filename: `${paths.output.img}/svg-symbols/svg-symbols.svg`,
			prefix: '',
			svgo: false
		})
	);
}

if (process.env.NODE_ENV === 'production') {
	plugins.push(
		new PurgecssPlugin({
			// Specify the locations of any files you want to scan for class names.
			paths: globAll.sync([
				path.join(__dirname, `../${paths.assets.html}**/*.php`),
				path.join(__dirname, `../${paths.assets.html}**/*.html`)
			]),
			extractors: [
				{
					extractor: TailwindExtractor,

					// Specify the file extensions to include when scanning for
					// class names.
					extensions: ['html', 'js', 'php', 'vue']
				}
			],
			whitelistPatterns: [/^pa-/],
			whitelistPatternsChildren: []
		})
	);
}

mix.setPublicPath('../').webpackConfig({
	module: {
		rules
	},
	plugins
});

const disallowEnvs = ['optimizeImgs', 'compileSvgs'];
if (disallowEnvs.indexOf(process.env.NODE_ENV) < 0) {
	mix
		.sass(`${paths.assets.css}style.scss`, paths.output.css)
		.options({
			processCssUrls: false,
			postCss: [tailwindcss('./tailwind.config.js')]
		})
		.js(`${paths.assets.js}script.js`, paths.output.js);
}

if (process.env.NODE_ENV === 'development') {
	mix.browserSync({
		proxy,
		files: [
			`../${paths.output.css}/style.css`,
			`../${paths.output.js}/script.js`,
			`../${paths.assets.html}Views/**/*.{php,html,cshtml}`,
			`../${paths.assets.html}index.{php,html,cshtml}`
		]
	});
}
