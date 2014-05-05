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
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        }
    });
    grunt.registerTask('default',['watch']);
};
