
module.exports = function(config) {
    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        basePath: '',

        frameworks: ['jasmine'],

        files: [
            'www/bower_components/angular/angular.min.js',
            'www/bower_components/angular-route/angular-route.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'www/scripts/bundle.js',
            'tests/**/*.js'
        ],

        exclude: [],

        browsers: [
            'PhantomJS'
        ],

        reporters: ['junit','progress', 'coverage'],

        preprocessors: { 'www/scripts/bundle.js': ['coverage'] },

        coverageReporter : {
            type : 'html',
            dir : 'tests/coverage/'
        },

        singleRun: false,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO

    });
};
