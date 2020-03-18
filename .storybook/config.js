/*
 * Adding scss to storybook?
Hi @omaracrystal here is how I did it:
in the .storybook/config.jsfiles, add the import with the correct loaders inlined:

import '!style-loader!css-loader!sass-loader!./scss-loader.scss';

Then add/import all the styles you need in the scss-loader.scss file:

$font-path: '../projects/lib/src/theming/fonts/OpenSans/';

@import '../projects/lib/src/theming/reset.scss';
@import '../projects/lib/src/theming/main.scss';

html {
  font-family: $font-name;
  font-size: $font-size--small;
}

The solution proposed by @kroeder works as long as your using components from an Angular application but for libraries, you cannot add the styles property in the angular.json file
*/
