// db-codegen.config.js

/** @type {import('db-codegen').Config} */
module.exports = {
  type: "postgres", // or "mysql" or "sqlite"
  connection: {
    host: "localhost",
    port: 5432,
    database: "postgres",
    username: "postgres",
    password: "postgres",
  },
  output: {
    directory: "./generated",
    generator: [
      {
        type: "typescript",
        output: "types.filtered-tables.ts",
        tables: ["parent"],
      },
      {
        type: "typescript",
        output: "types.all-tables.ts",
      },
      {
        type: "zod",
        output: "schema.filtered-tables.ts",
        tables: ["parent", "child"],
      },
      {
        type: "zod",
        output: "schema.all-tables.ts",
      },
    ],
  },
};
