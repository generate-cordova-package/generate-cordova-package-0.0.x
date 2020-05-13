# generate-cordova-package

programmatically generate a Cordova app or native plugin package from interactive user input - with no templates involved

**Author:** Christopher J. Brody

**LICENSE:** MIT, with commercial license option

## General motivation

This should help avoid some potential copyright issues with using templates from various sources.

## Important TODO items

### Functional

- demo app for generated plugin should be optional
- make it optional to generate a pure-JavaScript plugin in addition to native plugin for Android & iOS
- allow different names for JavaScript module object name vs window object name
- more improvements to flexibility in generated `js-module` element in `plugin.xml`

### Cleanup

- factor some `const` tokens & internal codegen helper functions out to existing or separate tokens modules, especially for the JavaScript codegen
- factor some more duplicated code out of `lib/cordova-app`, `lib/cordova-plugin`, and `lib/cordova-plugin/demo-app`

### Testing

- integration testing of `bin/cli.js`

### dependencies

- find an improved tool or solution for linting with both prettier-standard formatter & standard eslint coding rules
- fix or replace fs-tree to avoid need for bluebird in dependencies
- some of the existing lib helpers should be extracted into external helper packages
- some package dependencies and subdependencies are badly outdated
- extra-ugly npm console messages come from super-old core-js version (these were hidden during initial development with Yarn)
