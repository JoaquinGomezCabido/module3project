module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dist: {
				files: {
					"dev/css/styles.css": "src/scss/styles.scss",
				},
			},
		},
		htmlbuild: {
			dist: {
				src: "./src/index.html",
				dest: "./dev/",
				options: {
					beautify: true,
					relative: true,
					basePath: false,
					sections: {
						layout: {
							header: "./src/templates/header.html",
						},
					},
				},
			},
		},
		watch: {
			html: {
				files: ["./src/**/*.html"],
				tasks: ["htmlbuild"],
			},
			css: {
				files: "src/scss/**/*.scss",
				tasks: ["sass"],
			},
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: ["dev/css/*.css", "dev/js/*.js", "dev/*.html"],
				},
				options: {
					watchTask: true,
					server: "./dev",
				},
			},
		},
	});
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-browser-sync");
	grunt.loadNpmTasks("grunt-html-build");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.registerTask("default", ["browserSync", "watch"]);
};
