# db-codegen

<img src="./public/db-codegen.png" alt="db-codegen" width="300"/>

`db-codegen` is a tool to generate TypeScript types and Zod schemas from your database schema

## Supported Database

- [x] postgres
- [x] mysql
- [x] sqlite
- [ ] mssql

## Supported Generators

- [x] TypeScript
- [x] Zod
- [ ] Valibot
- [ ] TypeBox

## Installation

To install `db-codegen`, run:

```bash
npm install db-codegen
```

## Usage

1. Create a configuration file in your project root:

   ```js
   // db-codegen.config.js

   /** @type {import('db-codegen').Config} */
   module.exports = {
     type: "postgresql", // or "mysql" or "sqlite"
     connection: {
       host: "localhost",
       port: 5432,
       database: "postgres",
       username: "postgres",
       password: "postgres",
     },
     output: {
       directory: "src/generated",
       generator: [
         { type: "typescript", output: "types.ts" },
         { type: "zod", output: "schema.ts" },
       ],
       prettierConfig: "../../prettier.config.mjs",
     },
   };
   ```

2. Add a script to your `package.json` to run the code generator:

   ```json
   {
     "scripts": {
       "db:codegen": "db-codegen --config ./db-codegen.config.js"
     }
   }
   ```

3. Run the code generator:

   ```bash
   npm run db:codegen
   ```

This will generate TypeScript types and Zod schemas in the specified output directory.

## Configuration

The configuration file should export an object of type `Config`. Here are the available options:

- `type`: The type of database (`"postgresql"`, `"mysql"`, or `"sqlite"`).
- `connection`: The connection details for your database.
  - For PostgreSQL and MySQL:
    - `host`: The database host.
    - `port`: The database port.
    - `database`: The database name.
    - `username`: The database username.
    - `password`: The database password.
  - For SQLite:
    - `filename`: The path to the SQLite database file.
- `output`: The output configuration.
  - `directory`: The directory where the generated files will be saved.
  - `generator`: An array of generators to use.
    - `type`: The type of generator (`"typescript"` or `"zod"`).
    - `output`: The name of the output file.
  - `prettierConfig`: (Optional) The path to a Prettier configuration file.

## License

This project is licensed under the MIT License.
