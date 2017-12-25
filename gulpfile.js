let svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    gulp = require('gulp'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace');

gulp.task('svgSpriteBuild', function(){
    return gulp.src('assets/i/icons/*.svg')
    // minify svg
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // remove all fill, style and stroke declarations in out shapes
        .pipe(cheerio({
            run: function($){
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg",
                    render: {
                        scss: {
                            dest: '../../../sass/_sprite.scss',
                            template: "assets/sass/templates/_sprite_template.scss"
                        }
                    }
                }
            }
        }))
    .pipe(gulp.dest('assets/i/sprite/'));
});
