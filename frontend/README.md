# PricePredictor

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## Development server

**DEPREACATED:** Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Use ```npm run <lang>```, i.e. ```npm run de```

## Build production version
Use ```npm run prod-lang```. This will create a seperate folder for each language in the dist/price-predictor folde.

## Run the project will local http-server
- Install http-server: ```npm install -g http-server```
- Run ```http-server dist/price-predictor``` from the root folder "frontend"

## Extract languages
Run ```npm run lang```. This will create a messages.xlf file in the assets/i18n folder which is used as a standard for language support.

**NOTICE:** this will override the existing file. Any changes will be lost. Be aware, if anything changes, this might break the other messages files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
