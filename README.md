# generate-cordova-package

programmatically generate a Cordova package from interactive user input - with no templates involved - Cordova app or plugin with JavaScript only at this point

**Author:** Christopher J. Brody

**LICENSE:** MIT, with commercial license option

## Important TODO items

### Generated code

- factor some codegen tokens out to existing or separate tokens module

### Testing

- detect presence of extra `\r` character in test snapshots, to ensure it does not show up again (potential mutation of the `/\r\n/g` regexp was not detected by Stryker Mutator 3.0.2)
- integration testing of `bin/cli.js`

### dependencies

- find an improved tool or solution for linting with both prettier-standard formatter & standard eslint coding rules
- fix or replace fs-tree to avoid need for bluebird in dependencies
- some of the existing lib helpers should be extracted into external helper packages
- some package dependencies and subdependencies are badly outdated
- extra-ugly npm console messages come from super-old core-js version (these were hidden during initial development with Yarn)
