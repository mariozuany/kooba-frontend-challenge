# Kooba Frontend base project #
## Gulp 4 + Webpack 4 + Babel + BrowserSync ##

For Live reloading, Browsersync has been used. For ES6 Transpilation, Babel has been used. For SourceMaps, Gulp & Webpack both have been used. Sass/CSS Workflow.

## Setup

- Install [Node](https://nodejs.org/)
- Use *Npm* that comes with Node pre-installed
- Install Gulp globally through `npm install -g gulp@next`
- Install Webpack globally through `npm install -g webpack`
- Clone this project
- `cd` to the cloned project
- Update the remote git repository to the relevant project eg. `git remote set-url origin https://koobafe@bitbucket.org/koobafe/climate-focus.git`
- Install all [packages](./package.json) with `npm install`

## Usage

- **Build the Project and Serve locally (for Development)** - `npm run dev` or `yarn run dev`. The Development port is `3000`. Build directory is `/dist`
- **Build the Project and Serve locally (for Production)** - `npm start` or `yarn start`. The Production port is `8000`. Build directory is `/build`
- **Exporting the Project to zip file** - `npm run export` or `yarn run export`

Important Note: **Don't** run these npm scripts simultaneously.

## Appendix

- **Tooling** - Gulpfile Lives in `gulpfile.js` and Webpack config files live within `webpack` folder.
- **Source Files** - Lives in `website/src` folder
- **Compiled Files for development** - Generated into `website/dist` folder.
- **Compiled Files for production and sharing with backend** - Generated into `public/build` folder.
- **Exported Project** - The exported project is imported from `website` folder and gets exported as `website.zip` to project root

## Performance (Lighthouse)

This is the result of performance tests (97%) within [Lighthouse](https://developers.google.com/web/tools/lighthouse/) for Production Mode.
![97% Performance][perf]

For Development mode it's [96% respectively](https://i.imgur.com/07TVen7.png).

[perf]: https://i.imgur.com/1KBt91t.png
