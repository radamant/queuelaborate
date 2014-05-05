module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    // includePaths: require('node-bourbon').with('other/path', 'another/path')
                    // - or -
                    includePaths: require('node-neat').with(require('node-bourbon'))
                },
                files: {
                    'app/css/app.css': 'app/sass/app.scss'
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            html_js: {
                files: ['app/**/*.js', 'app/**/*.html'],
                tasks: []
            }
        }
    });
    grunt.registerTask('default',['watch']);
};
