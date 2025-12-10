[![npm version](https://img.shields.io/npm/v/@itrocks/account?logo=npm)](https://www.npmjs.org/package/@itrocks/account)
[![npm downloads](https://img.shields.io/npm/dm/@itrocks/account)](https://www.npmjs.org/package/@itrocks/account)
[![GitHub](https://img.shields.io/github/last-commit/itrocks-ts/account?color=2dba4e&label=commit&logo=github)](https://github.com/itrocks-ts/account)
[![issues](https://img.shields.io/github/issues/itrocks-ts/account)](https://github.com/itrocks-ts/account/issues)
[![discord](https://img.shields.io/discord/1314141024020467782?color=7289da&label=discord&logo=discord&logoColor=white)](https://25.re/ditr)

# account

Business entity representing a client or user account with login credentials.

*This documentation was written by an artificial intelligence and may contain errors or approximations.
It has not yet been fully reviewed by a human. If anything seems unclear or incomplete,
please feel free to contact the author of this package.*

## Installation

```bash
npm i @itrocks/account
```

`@itrocks/account` is usually installed together with the it.rocks
framework and other business‑level packs, but it can also be used on its
own in any TypeScript/Node.js project.

## Usage

`Account` is a small business entity that models a user or client
account identified by a `login` and protected by a `password`.

The class is already decorated to work seamlessly with the it.rocks
ecosystem:

- it is **storable** (through `@itrocks/store`) so it can be persisted
  and retrieved like any other entity,
- it has a **representative field** (`login`) used by
  `@itrocks/class-view` when displaying instances,
- its `password` field is configured through `@itrocks/password` to be
  handled as a password (hashing, masking in views, etc.).

### Minimal example

```ts
import { Account } from '@itrocks/account'

const account = new Account()

account.login    = 'alice'
account.password = 's3cr3t'

// Persist with your usual store mechanism (for example via @itrocks/store)
// await store.save(account)
```

This is enough to create an account that can later be retrieved by the
data store and used by higher‑level modules such as authentication or
session handling.

### Example with it.rocks actions

In a typical it.rocks application, `Account` is used together with
action‑based modules like
[@itrocks/new](https://github.com/itrocks-ts/new) and
[@itrocks/edit](https://github.com/itrocks-ts/edit) to expose HTML and
JSON endpoints for managing user accounts.

```ts
import { Account } from '@itrocks/account'
import { New }     from '@itrocks/new'
import type { Request } from '@itrocks/action-request'

// Business entity
class UserAccount extends Account {}

// Action used to create new accounts
const newAccount = new New<UserAccount>()

// HTML endpoint: renders a sign‑up form
async function newAccountHtml (request: Request<UserAccount>) {
	return newAccount.html(request)
}

// JSON endpoint: form description for SPA / mobile applications
async function newAccountJson (request: Request<UserAccount>) {
	return newAccount.json(request)
}
```

From an HTTP framework (Fastify, Express, …), you normally transform the
incoming request into a `Request<UserAccount>` with
`@itrocks/action-request`, then delegate the rendering or JSON handling
to the `New` action as above.

## API

### `class Account`

Core business entity describing a generic account with credentials.

#### Properties

##### `login: string`

- **Required** field used to identify the account (username, email,
  client code, …).
- Also used as the **representative value** of the account in list and
  detail views.

Typical values: `"alice"`, `"bob@example.com"`, `"CUST-00123"`.

##### `password: string`

- Stores the password chosen by the user.
- Decorated so that higher‑level components handle it as a secret
  (hashing, masking, non‑searchable field in grids, etc.).

You usually set this field from a plain‑text password in your UI layer;
the password module or surrounding infrastructure takes care of hashing
and secure storage.

## Typical use cases

- **User registration** – store login/password pairs when a new user
  signs up, using `Account` as the backing entity for your sign‑up
  form.
- **Authentication backend** – keep authenticated users linked to an
  `Account` instance so you can later access business‑level information
  (owner, permissions, preferences) from the account record.
- **Client or partner portal** – model external parties (customers,
  suppliers, partners) who need their own login/password access to a
  portal or dashboard.
- **Shared account abstraction** – reuse the same `Account` class across
  multiple projects or services to keep a consistent representation of
  login credentials while delegating UI and routing to other packages.
