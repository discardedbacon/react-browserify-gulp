# React, Browserify & Gulp

The package is desined to be a scaffolding tool for building a web application with [React](http://facebook.github.io/react/), [Gulp](http://gulpjs.com/) and [Broserfiy](http://browserify.org/) and [Sass](http://sass-lang.com/). [BrowserSync](http://www.browsersync.io/) is also built into the package so that you'll be able to confirm every code changes in a browser window on the fly.

## Dependencies
- [Node/NPM](http://nodejs.org/)
- Ruby/Gems
- Sass
- Gulp

## How to Install
Download the package, and place all the files on the root level of your project's directory. Then do the following:

1. Install Node.js modules.
`$ npm install`

2. Run gulp and start writing your codes.
`$ gulp`

BrowserSync will launch a local web server, open a new browser window/tab and load a barebone html template (index.html).

Keep your source Javascript files in **/src/js** and source SCSS files in **/src/scss**.

Compiled/minified JS will become **/www/js/app.js**, and generated CSS will be **/www/css/style.css**.

## Credits
Some parts of Gulpfile.js are based on a [Mozilla Foundatin blog article](https://hacks.mozilla.org/2014/08/browserify-and-gulp-with-react/) by Kevin Ngo and Robert Nyman.

##License
Each Node.js module may have different terms of use.
