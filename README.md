<!-- Plugins for compatibility with the use of `import()`
https://babeljs.io/docs/en/next/babel-plugin-syntax-dynamic-import.html

Plugins for performance
https://babeljs.io/docs/en/next/babel-plugin-transform-runtime.html

Plugins for writing
`export default "someModule"`
https://www.npmjs.com/package/babel-plugin-add-module-exports

Plugins for removing propTypes as it benefits bandwidth
https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types -->

# Steps to use it as your project

clone the repository.

open _package.json_ and change all the property you need to change:

- name
- description
- author
- license
- repository
- _other you want to change_

run `npx semantic-release-cli setup` to configure your CI pipeline.

Obviously `npm i`

### Hooks and CI

CI runs for branch **master** and **develop**

Git-Hooks: pre-push on **master** execute `npm run build && npm run build-storybook`, on **develop** execute `npm run build`

# CI

Add [semantic-release](https://github.com/semantic-release/semantic-release) to manage versioning and publish on npm.
`npx semantic-release-cli setup`
CI is done with GithubAction, so when semantic-release ask what CI env, choose other.
It gives you 2 tokens (GH_TOKENS and NPM_TOKENS) that need to be added as secret in github repo.

Semantic-release work with body of commit: look [here](https://github.com/semantic-release/semantic-release#commit-message-format) for how to use it.

Or look in [official conventional commits](https://www.conventionalcommits.org)

# Eslint & Prettier

Eslint from [here](https://eslint.org/docs/user-guide/getting-started#installation-and-usage), I just use `npx eslint --init`

Integrate Eslint with Prettier from [here](https://prettier.io/docs/en/integrating-with-linters.html#eslint).

Now everytime I run eslint (eg `npx eslint --fix src`) prettier runs to fixing simple format errors.

EDIT: **I don't need prettier at all**, it usually conflicts with eslint config leading to indentations problems etc.

EDIT:EDIT: **I need both**, they are similar but achieve different [goals](https://prettier.io/docs/en/comparison.html).

# StoryBook

I've mantain the same project structure from `npx -p @storybook/cli sb init --type react`.

I've add a _webpack.config_ for use sass [official doc](https://storybook.js.org/docs/configurations/custom-webpack-config/)

# Gived Up

Probably what I'm trying to do is bad execute.
The fact that I use JavaScript for developing and TypeScript for type definitions is a huge pain, mostly because I don't know how to integrate Storybook with that kind of project setup. That said a lot of library do this double work, keeping js only for developement and ts for exposing types to Typescript and IDEs.
[stackoverflow small disussion about this kind of problem](https://stackoverflow.com/questions/50463048/react-with-typescript-should-the-use-of-typescript-replace-proptypes-definition)
Also is worth mentioning that strip off proptypes leave any JS project that use the library unable to type check which is sad.

# Thing Discovered Step by Step:

- in package.json the field `files` let you specify what files/folder to publish [stackoverflow](https://stackoverflow.com/questions/40795836/how-do-you-use-the-files-and-directories-properties-in-package-json)
- in package.json the field `main` let you specify where your file with all the exports is. Default to `index.js` at root level [offical doc](https://docs.npmjs.com/files/package.json#main)
- [browserslist](https://github.com/browserslist/browserslist) is used by many tools (among them @babel/preset-env) to polyfill target browsers. Can be declared as file or directly in package.json. I copied the browserlist of default CRA. About different [enviroment](https://www.npmjs.com/package/browserslist#configuring-for-different-environments)
- \*.d.ts files are equivalent to header file (\*.h) in C, as far as I understand they aren't mandatory but they're useful. They match exactly like .h files in C, so <_FileName_>.js needs <_FileName_>.d.ts.
- Inspired by [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap/tree/master/tools) use a node script to build the library
- One problem I found is duplication between PropTypes and \*.d.ts, they almost do the same thing: the first check types at runtime, the other at compile time. PropTypes should not be present in the library once published (don't know why but anyone does this way), so they're useful just for developement. Since I don't find anything (that really convice me) for generate .d.ts from PropTypes or viceversa, I stick with just \*.d.ts and no PropTypes. This way you can use this library in a TypeScript project with checking, in a JavaScript project you don't get the checking but at least the suggestions from your IDE.
- I'm starting to notice the same problem as before, I'm duplicating my imports between index.js and index.d.ts and when exported as library only the \*.d.ts are used. I suspect I need them for developing (with Storybook) EDIT: YES I NEED IT FOR DEV.

# Dev Dependency

## Building

- [@babel/cli](https://babeljs.io/docs/en/babel-cli)
- [@babel/core](https://babeljs.io/docs/en/next/babel-core.html)
- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env): Do some crazy stuff for browser support.
- [@babel/preset-react](https://www.npmjs.com/package/@babel/preset-react): Allow to transpile react.
<!-- - [@babel/plugin-proposal-export-namespace-from](https://www.npmjs.com/package/@babel/plugin-proposal-export-namespace-from): Let you write `export * as someIdentifier from "someModule";`
- [@babel/plugin-proposal-export-default-from](https://www.npmjs.com/package/@babel/plugin-proposal-export-default-from): Let you write `export someIdentifier from "someModule";`
`export someIdentifier, { namedIdentifier } from "someModule";` -->
<!--
- [@react-bootstrap/babel-preset](https://www.npmjs.com/package/@react-bootstrap/babel-preset): a preset configuration of babel. Go into this project node_modules/@react-bootstrap/babel-preset/index.js to see what babel plugin it use -->
<!-- - [cherry-pick](https://www.npmjs.com/package/cherry-pick): build tool for generate proxy directories with package.json -->
- [execa](https://www.npmjs.com/package/execa): utility for better interaction with shell commands
- [fs-extra](https://www.npmjs.com/package/fs-extra): utility for better interaction with filesystem
- [@storybook/addon-actions](https://www.npmjs.com/package/@storybook/addon-actions): See action (eg click)
- [@storybook/addon-docs](https://www.npmjs.com/package/@storybook/addon-docs): Auto generate Docs
- [@storybook/addon-knobs](https://www.npmjs.com/package/@storybook/addon-knobs): Let you change property dynamically from UI
- [@storybook/addon-links](https://www.npmjs.com/package/@storybook/addon-links): Allow to link between stories, useful for mocking a use flow (not our use case)
- [@storybook/addons](https://www.npmjs.com/package/@storybook/addons): Let you load Addons, nothing fancy here.
- [@storybook/react](https://www.npmjs.com/package/@storybook/react)
- [@storybook/storybook-deployer](https://www.npmjs.com/package/@storybook/storybook-deployer): Let you easily deploy on gh-pages.
<!-- - [webpack](https://webpack.js.org/): to bundle minified version of the library, browser distributable -->
