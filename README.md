Noah
====

Stein IAS' Web Development Template

## Set up
- Need to ensure you have everything on your machine
	- Ruby 
	- Grunt
	- etc
- To install the gems we do 'gem install bundler' the install the bundle 'bundle install'
- 'npm install' to install everything (mighe need sudo)
- 'grunt' to run it


## What SASS goes where?
- The modules directory is reserved for Sass code that doesn't cause Sass to actually output CSS. Things like mixin declarations, functions, and variables.
- The partials directory is where most of the CSS is constructed. The base styles are predefined at top level and then deeper folders are created as per your project requirements.

 
## Need to sort
- Colour names? - http://chir.ag/projects/name-that-color/ - sort order
- rems or ems for fonts?
- Compress images - imagemin
- Smaller SASS stylesheets or one with stuff in eg variables (breakpoints, colours)
- prefixer
- uglify
- Gitignore
- Build/Deployments tasks?


