<div align="center">
    <h1>GD API</h1>
    <p>
        <a href="https://voctal.dev/discord"><img src="https://img.shields.io/discord/1336303640725553213?color=5865F2&logo=discord&logoColor=white" alt="Discord server" /></a>
        <a href="https://www.npmjs.com/package/@voctal/gdapi"><img src="https://img.shields.io/npm/v/@voctal/gdapi.svg?maxAge=3600" alt="npm version" /></a>
        <a href="https://www.npmjs.com/package/@voctal/gdapi"><img src="https://img.shields.io/npm/dt/@voctal/gdapi.svg?maxAge=3600" alt="npm downloads" /></a>
        <a href="https://github.com/voctal/gdapi/commits/main"><img alt="Last commit" src="https://img.shields.io/github/last-commit/voctal/gdapi?logo=github&logoColor=ffffff" /></a>
    </p>
</div>

## About

GD API is a module that allows you to easily interact with the Geometry Dash private API. The module documentation is available at [https://docs.voctal.dev](https://docs.voctal.dev/docs/packages/gdapi/stable).

This module does not include all features of the Geometry Dash API, such as endpoints that require user passwords. However, you can combine it with the knowledge from the [unofficial GD docs](https://wyliemaster.github.io/gddocs) to access everything if needed.

## Installation

Node.js 22 or newer is required.

```sh
npm install @voctal/gdapi@latest
```

## Example usage

```js
import { GDAPI } from "@voctal/gdapi";

const gdapi = new GDAPI();

// Get RobTop account
const user = await gdapi.getUserById(71);
console.log(user);
```

## Links

- [Documentation](https://docs.voctal.dev/docs/packages/gdapi/stable)
- [Unofficial GD docs](https://wyliemaster.github.io/gddocs)
- [Discord server](https://voctal.dev/discord)
- [GitHub](https://github.com/voctal/gdapi)
- [npm](https://npmjs.com/package/@voctal/gdapi)
- [Voctal](https://voctal.dev)
- [Geometry Dash](https://www.geometrydash.com)

## Help

Need help with the module? Ask on our [support server!](https://voctal.dev/discord)
