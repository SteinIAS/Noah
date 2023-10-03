import '../scss/style.scss';

// Dynamically importing all scss files using require.context if they are not imported in style.scss
// const scssContext = require.context('styles', true, /\.scss$/);
// scssContext.keys().forEach(scssContext);

// Blindly copy all images over to the dist folder if any images are used in the js files and webpack doesn't pick them.
// const imageContext = require.context('../img/', true, /\.(png|jpg|jpeg|svg)$/);
// imageContext.keys().forEach(imageContext);

const Noah = function init() {
  document.addEventListener('DOMContentLoaded', () => {
    // everything goes here
  });
};

Noah();
