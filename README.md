# frontend software-design example
![CI](https://github.com/tooppoo/separate-model-on-front/workflows/Node.js%20CI/badge.svg?branch=main)

example of frontend software design that separates Model and View.

# concept

- There is no need to embed logic for UI directly in the UI components provided by the UI library.
- You can create UI logic that is independent of the UI library without using the UI library or its functions.
- You can use common software design techniques to create UI logic independent of the UI library. No special theory or technique is necessarily required.
- By making the logic for UI independent, you can easily test only the logic for UI.
- By making the UI logic independent, you can make the software and UI library loosely coupled.
- By making the UI logic independent, knowledge of UI become more explicit.

# usage
## initialize
install and setup dependencies with [lerna](https://github.com/lerna/lerna)
```
make
```

## launch
### launch all examples
```
yarn serve
```

### launch an example
```
yarn vue:serve
yarn react:serve
yarn jquery:serve
```

## build
### build all packages
```
yarn build
yarn build:watch
```

### build a package
```
yarn domain:cart:build
yarn vue:build
yarn react:build
yarn jquery:build
```

## test
### test all packages
```
yarn test
```

### test a package
```
yarn domain:cart:test
yarn vue:test
yarn react:test
```

# packages
## domain
examples of Models that should be core knowledge in frontend software.

for example, a shopping cart for an e-commerce site.

## vue
Vue implementation of View that relies on Model to build the UI

## react
React implementation of View that relies on Model to build the UI

## jquery
jQuery implementation of View that relies on Model to build the UI
