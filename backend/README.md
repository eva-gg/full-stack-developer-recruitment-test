# Backend

## Before you begin

* Node version: `14`.
* npm version: `6`.

## Installation

```bash
npm i
```

## Tests

```bash
npm run test

# Watch
npm run test -- --watch
```

## Usage

Generate the json file needed by the frontend.

```bash
npm run generate

# Equivalent to 
npm run build
npm run start -- ../location.json ../frontend/src/calendar.json
```