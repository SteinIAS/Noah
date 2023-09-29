import '../scss/style.scss';

// Dynamically importing all scss files using require.context
// const scssContext = require.context('styles', true, /\.scss$/);
// scssContext.keys().forEach(scssContext);

const Noah = function init() {
  document.addEventListener('DOMContentLoaded', () => {
    // everything goes here
    alert('script loaded');
  });
};

Noah();
