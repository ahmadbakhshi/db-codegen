// db-codegen.config.js

/** @type {import('db-codegen').Config} */
module.exports = {
  type: "mysql", // or "mysql" or "sqlite"
  connection: {
    host: "localhost",
    port: 3306,
    database: "dev",
    username: "root",
    password: "mysql",
  },
  output: {
    directory: "./generated",
    generator: [
      {
        type: "typescript",
        output: "types.ts",
      },
      {
        type: "zod",
        output: "schema.ts",
      },
    ],
  },
};
