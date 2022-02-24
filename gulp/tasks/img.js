import webp from "gulp-webp";
import imagemin from "gulp-imagemin"

export const img = ()=>{
    return app.gulp.src(app.path.src.img, { sourcemaps:true})
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title:"Img ",
            messange:"Error: <%= error.message %>"
        })) 
    )
    .pipe(app.plugins.newer(app.path.build.img))
    .pipe(
        app.plugins.if(
            app.isBuild,
            webp()
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            app.gulp.dest(app.path.build.img)
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            app.gulp.src(app.path.src.img)
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            app.plugins.newer(app.path.build.img)
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            imagemin({
                progressive: true, 
                svgoPlugins: [{removeViewBox:false}],
                interlaced: true,
                optimizationLevel: 3,
            })
        )
    )
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.plugins.newer(app.path.build.img))
    .pipe(app.gulp.dest(app.path.build.img))
    .pipe(app.plugins.bs.stream())
}