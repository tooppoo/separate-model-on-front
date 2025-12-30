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
This project uses [pnpm](https://pnpm.io/) and [Turbo](https://turbo.build/) for monorepo management.

Install dependencies:
```bash
pnpm install
```

## launch
### launch an example
```bash
pnpm react dev
pnpm vue dev
pnpm jquery dev
```

## test
### test all packages
```bash
pnpm test
```

### test domain package
```bash
pnpm domain test
```

# packages
## domain
Core domain models and business logic for the shopping cart application, independent of any UI framework.

Includes:
- **Model**: Cart items, value objects (price, count, state, etc.)
- **Controller**: Interaction layer (CartInteraction) for business operations
- **Infrastructure**: Repository implementations (on-memory storage)

## react
React implementation using the domain layer. Built with Vite and TypeScript.

## vue
Vue 3 implementation using the domain layer. Built with Vite and TypeScript.

## jquery
jQuery implementation using the domain layer. Built with Vite and TypeScript.

# architecture
This project demonstrates clean architecture principles:

1. **Domain Layer** (`@example/domain`): Framework-agnostic business logic
   - Models define the core domain entities and value objects
   - Controllers handle business operations and interactions
   - Infrastructure provides repository implementations

2. **View Layer** (react/vue/jquery): UI implementations that depend only on the domain layer
   - Each framework implementation uses the same domain models
   - Views are responsible only for rendering and user interaction
   - Business logic is delegated to the domain layer

This separation allows:
- Testing business logic without UI frameworks
- Switching UI frameworks without changing business logic
- Reusing domain logic across different implementations
- Better maintainability and explicit domain knowledge
