<div align="center">

# Test Trello REST API

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Trello-like REST API written in [TypeScript](https://www.typescriptlang.org/) using [NestJS](https://nestjs.com/), [PostgreSQL](https://www.postgresql.org/), [Prisma](https://www.prisma.io/)

Authentication with [JWT](https://jwt.io/) access tokens

</div>

## How to launch (execute in root of repository destination)

1. Install dependencies:

```sh
npm i
```

2. Rename `.env.example` to `.env` and fill fields:

```sh
mv .env.example .env
```

* `.env` fields:

    ```
    SECRET_KEY: secret for JWT tokens signature

    ACCESS_TOKEN_EXPIRE: access tokens expiry with time literal (e.g. 300s or 5m)

    DATABASE_URL: database URL
    ```

3. Run DB migrations:

```sh
npm run migrate
```
## Misc

* [DB structure](https://dbdiagram.io/d/Test-Trello-API-677c1ab332a2da11cf22b432)

* Drop DB:

```sh
npm run reset
```

