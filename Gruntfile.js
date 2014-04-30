module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-sass');
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    // includePaths: require('node-bourbon').with('other/path', 'another/path')
                    // - or -
                    includePaths: require('node-neat').with(require('node-bourbon'))
                },
                files: {
                    'app/css/output.css': 'app/sass/app.scss'
                }
            }
        }
    });
};
