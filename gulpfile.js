const { src, dest, watch, series, parallel } = require('gulp');

// Dependencias de CSS y SASS
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcesmaps = require('gulp-sourcemaps');
const nanocss = require('cssnano');

//Dependecias Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

function css ( done ) {
  
    //Compilar Sass

    //Paso 1: identificar el archivo, Paso 2: identificarla, Paso 3: Guardar el .css
    src('src/scss/app.scss')
        .pipe( sourcesmaps.init())
        .pipe( sass(  ) )
        .pipe( postcss([ autoprefixer(), nanocss() ]) )
        .pipe( sourcesmaps.write('.') )
        .pipe( dest('build/css') )

     done();   
}

function imagenes () {
    return src('src/img/**/*')
          .pipe( imagemin({ optimizationLevel: 3 }) )
          .pipe(dest('build/img'))
}

function versionWebp (){
    return src('src/img/**/*.{png,jpg}')
            .pipe(webp())
            .pipe(dest('build/img'))
}

function dev (){
    watch('src/scss/**/*.scss', css)
    watch('src/img/**/*', imagenes)
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.default = series( imagenes, versionWebp, css, dev );

//series - Se inicia en orden primero se ejecuta una y al finalizar ejecuta la siguiente
//parallel - Se ejecutan todas las funciones al mismo tiempo