# Tree Shaking

> Tree shaking is a technique to eliminate unused code in JavaScript applications, optimizing bundle size and performance.

## Overview
Tree shaking is a form of dead code elimination specifically applied to JavaScript modules. It exists to improve application performance by reducing the amount of code that needs to be loaded and executed, thus speeding up load times and reducing resource consumption.

## Core Idea / Mental Model
- Tree shaking works by analyzing the dependency graph of a project to identify and remove code that is not used in the final application.
- It relies on the static structure of ES6 modules, which allows for precise determination of unused exports.

## Key Features & Benefits
- **Reduced Bundle Size**: Minimizes the amount of code sent to the client, leading to faster load times.
- **Improved Performance**: Less code to parse and execute, enhancing runtime performance.
- **Cleaner Codebase**: Encourages developers to write modular and reusable code.

## Trade-offs & Pitfalls
- **Requires ES6 Modules**: Tree shaking is most effective with ES6 module syntax; CommonJS modules are not fully supported.
- **Complexity in Configuration**: Incorrect configuration can lead to unexpected results, such as removing necessary code.
- **Limited by Side Effects**: Code with side effects can prevent effective tree shaking if not properly annotated.

## When to Use / When to Avoid
- **Use**: When building large-scale applications with multiple dependencies to optimize load times and performance.
- **Avoid**: In small projects where the overhead of configuration outweighs the benefits, or when using module systems not compatible with tree shaking.

## Real-World Examples & Modern Alternatives
- **Tools**: Webpack, Rollup, and Parcel are popular bundlers that support tree shaking.
- **Alternatives**: Code splitting and lazy loading can be used alongside tree shaking for further optimization.

## Common Misconceptions
- **"Tree shaking works with all module systems"**: It primarily works with ES6 modules.
- **"Tree shaking automatically removes all unused code"**: It requires proper configuration and understanding of module side effects.

## Related Topics
- Code Splitting
- Lazy Loading
- Module Bundlers
- Dead Code Elimination
- ES6 Modules

## References
- [MDN Web Docs on Tree Shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking)  
- [Webpack Documentation on Tree Shaking](https://webpack.js.org/guides/tree-shaking/)