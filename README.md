![Noah](https://s4.postimg.org/7xnyqg9m5/Noahs-_Ark.jpg)

Noah
====

Stein IAS' Web Development Template

## Set up
- Need to ensure you have everything on your machine
- Install [node](https://nodejs.org/download/) and ensure npm is in your system path
- Run `npm install --global gulp`
- Run `npm install` to install everything (might need sudo)

## Let's develop
- Run `gulp` to watch for changes to project files and initialise a browser-sync server
- Run `gulp sprites` if you want to manually check if you have SVGs in your img folder and run svg to sprite task
- Run `gulp deploy` if you're transferring the site files to a server to run concatentation and minification tasks


## What SASS goes where?
- The modules directory is reserved for Sass code that doesn't cause Sass to actually output CSS. Things like mixin declarations, functions, and variables.
- The partials directory is where most of the CSS is constructed. The base styles are predefined at top level and then deeper folders are created as per your project requirements.


## Naming the folders
We currently have two folders assets and site.
To help assist with the BE implementation we can rename the folders to match the project e.g.

- Noah.Assets
- Noah.Site

## FAQ's

- I need to run PHP/C# etc / I already have the site running and don't need a new browser sync server?
    + We can tell browser sync about our site by updating the proxy variable on line :29 of gulpfile.js, this should equal the URL of the site you have running e.g. localhost:8888
- I've added some css/scripts to the folder but it's not showing up in Git or other people?
    + By default all assets below `/css` or `/scripts` are ignored so that they don't show up as changes when updating source files. To solve this any libraries needed should go in a subdirectory called vendor e.g. `/css/vendor/myLibrary.css` or `/scripts/vendor/jquery.min.js`

## To do list


