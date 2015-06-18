module.exports = function(grunt) {

	var paths = {
		assets: {
			js: 'js/',
			css: 'SASS/'
		},
		output: {
			js: '../site/scripts/',
			css: '../site/css/',
			img: '../site/img/'
		}
	};

	var uglifyFiles = {};
	uglifyFiles[paths.output.js + 'script.js'] = [paths.output.js + 'script.js'];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
        	dev: {
		      src: [paths.assets.js + 'plugins.js', paths.assets.js + 'script.js', paths.assets.js + 'dev.js'],
		      dest: paths.output.js + 'script.js'
		    },
            dist: {
		      src: [paths.assets.js + 'plugins.js', paths.assets.js + 'script.js'],
		      dest: paths.output.js + 'script.js'
		    }
        },
        
        jshint: {
		  files: [paths.assets.js + '*.js'],
		},

		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: uglifyFiles
			}
		},
		
		imagemin: {
		    dynamic: {
		    	options: {
			        optimizationLevel: 7
			    },
		        files: [{
		            expand: true,
		            cwd: paths.output.img,
		            src: ['**/*.{png,jpg,gif}'],
		            dest: paths.output.img
		        }]
		    }
		},

		compass: {
			dist: {
	        	options: {
	        		sassDir: 'SASS',
	        		cssDir: paths.output.css,
	        		environment: 'production',
	        		outputStyle: 'compressed'
	        	},
	        },
	        force: {
	        	options: {
		        	force: true,
		        	sassDir: 'SASS',
	        		cssDir: paths.output.css,
	        		environment: 'production',
	        		outputStyle: 'compressed'
	        	}
	        }
	    },
	    
	    autoprefixer: {
			single_file: {
				options: {
					browsers: ['last 2 versions', 'ie 8', 'ie 9']
				},
				src: paths.output.css + 'style.css',
				dest: paths.output.css +'style.css'
		    },
		},
		
		watch: {
			options: {
		        livereload: true,
		    },
		    scripts: {
		    	files: paths.assets.js + '{,*/}*.js',
		        tasks: ['jshint', 'concat:dev'],
		        options: {
		        	style: 'compressed',
		            spawn: false,
		        },
		    },
		    sass: {
			    files: [paths.assets.css + '**/*.{scss,sass}'],
			    tasks: ['compass', 'autoprefixer'],
			    options: {
			        spawn: false,
			    }
			}
		}

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('default', ['jshint', 'concat:dev', 'compass:force', 'autoprefixer', 'watch']);
    grunt.registerTask('deploy', ['concat:dist', 'uglify', 'imagemin', 'compass', 'autoprefixer']);

};