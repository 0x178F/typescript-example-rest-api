# Typescript Rest Api
An example REST-API built with Typescript, Express, MongoDB.

## Requirements

Install all dependencies, edit the .env file.

```sh
npm install
```

## Dev

```
npm run dev
```

## Testing

```
npm test
```

## Technologies

- Node.js
- TypeScript
- MongoDB
- Express.js

## Folder Structure

```sh

├── .env
├── README.md
├── jest.config.js
├── package-lock.json
├── package.json
├── src
│   ├── __tests__
│   │   ├── auth.test.ts
│   │   └── user.test.ts
│   ├── app.ts
│   ├── config
│   │   ├── index.ts
│   │   └── server.ts
│   ├── controller
│   │   ├── auth.ts
│   │   └── user.ts
│   ├── loader
│   │   ├── connect.ts
│   │   └── server.ts
│   ├── logger
│   │   └── index.ts
│   ├── middleware
│   │   ├── authenticate.ts
│   │   └── validate.ts
│   ├── model
│   │   └── user.ts
│   ├── router
│   │   ├── auth.ts
│   │   ├── index.ts
│   │   └── user.ts
│   ├── service
│   │   └── user.ts
│   ├── utils
│   │   └── jwt.ts
│   └── validators
│       ├── auth.ts
│       └── user.ts
└── tsconfig.json
```
