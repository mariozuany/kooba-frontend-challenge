Kooba Frontend Challenge
===

You've made to the Kooba technical challenge... Nice one!

> **Time limit**
> Please spend no more than 3 hours at a maxmum on this task. If you don't get it finished within that time it's not a problem.

# The brief

Using HTML, CSS (SCSS preferably) and Javascript, we would like you to recreate the following design, including a slider (carousel) element: https://drive.google.com/file/d/1TyEe1LjMjv_fp6m3j7d9MncZRaaJbgln/view?usp=sharing

* The content should always fill the entire viewport. If the viewport size is too small to show everything, the page should scroll.
* The slider should automatically progress to the next slide every 5 seconds. No manual slider control is needed.
* No mobile design is provided, but please try to ensure things display well on mobile (you can retain or drop the slider functionality for small screens - it's up to you)
* As the slider progresses, the first slide disappears to the left and another slide enters from the right (you can repeat the three slides that are in the design).

# Some tips

* We're looking for solid use of code style best practices
* Use any packages or libraries you like for slider functionality or write the code yourself. Whatever you choose, make sure it's something you are comfortable with.
* Whatever you build should work properly in the latest versions of Chrome, Firefox and Safari. IE is not important here (Hooray!)
* Creativity - We would love to see your creativity shine: animations, microinteractions, general inventiveness. Go wild!
* We would love to see ES6 used if you're writing Javascript

When you're ready to deliver, you can run `npm run export`, and send the generated zip file to ronan.mccormack@kooba.ie

If you have any questions about this assignment, feel free to get in touch with me: ronan.mccormack@kooba.ie

---
---
---
# Kooba Frontend base project #
You can use our base project by cloning this repo, although if you'd rather not, that's fine too.

## Gulp 4 + Webpack 4 + Babel + BrowserSync ##

For Live reloading, Browsersync has been used. For ES6 Transpilation, Babel has been used. For SourceMaps, Gulp & Webpack both have been used. Sass/CSS Workflow.

## Setup

- Clone this project
- Install all [packages](./package.json) with `npm install`

## Usage

- **Build the Project and Serve locally (for Development)** - `npm run dev` or `yarn run dev`. The Development port is `3000`. Build directory is `/dist`
- **Build the Project and Serve locally (for Production)** - `npm start` or `yarn start`. The Production port is `8000`. Build directory is `/build`
- **Exporting the Project to zip file** - `npm run export` or `yarn run export`

## Appendix

- **Tooling** - Gulpfile Lives in `gulpfile.js` and Webpack config files live within `webpack` folder.
- **Source Files** - Lives in `website/src` folder
- **Compiled Files for development** - Generated into `website/dist` folder.
- **Compiled Files for production** - Generated into `website/build` folder.
- **Exported Project** - The exported project is imported from `website` folder and gets exported as `website.zip` to project root

