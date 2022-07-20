global.$ = {
    gulp: require('gulp'),
    glp: require('gulp-load-plugins')(),
    bs: require('browser-sync'),
    sass:require('gulp-sass')(require('sass')),
    path:{
        serverDir:'./app/dist',
        collect: require('./gulp/config/collect.js'),
        src:{
            html:'./app/src/*.{html,pug,jade}',
            css:'./app/src/styles/*.scss',
            js:'./app/src/js/*.js',
            font:'./app/src/fonts/*.*',
            img:'./app/src/images/*.*',
            video:'./app/src/videos/*.*'
        },
        build:{
            html:'./app/dist/',
            css:'./app/dist/styles/',
            js:'./app/dist/js/',
            font:'./app/dist/fonts',
            img:'./app/dist/images/',
            video:'./app/dist/videos'
        },
        watch:{
            html:['./app/src/*.{html,pug,jade}','./app/src/**/*.{html,pug,jade}'],
            css:['./app/src/styles/*.scss','./app/src/styles/**/*.scss'],
            js:'./app/src/js/**/*.js',
            font:'./app/src/fonts/*.*',
            img:'./app/src/images/*.*',
            video:'./app/src/videos/*.*'
        }
    }
}

$.path.collect.forEach(task => require(task)());
$.gulp.task('default', $.gulp.series($.gulp.parallel('html','css','js','watch','serve','video','img','font')))