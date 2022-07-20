module.exports = ()=>
  $.gulp.task('serve', ()=>
    $.bs.init({
        server: $.path.serverDir
    })
  )