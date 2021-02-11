# frontend software-design example
![CI](https://github.com/tooppoo/separate-model-on-front/workflows/Node.js%20CI/badge.svg?branch=main)

example of frontend software design that separates Model and View.

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

# concept
- There is no need to embed UI logic in UI components.
- There is no need to use the functions of the UI library to make UI logic independent.
- Making UI logic independent is enable in general ways.
- By making UI logic independent, testing become easier.
- By making UI logic independent, your software and UI library become loosely coupled.
- By Making UI logic independent, UI knowledge can become more explicit

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
