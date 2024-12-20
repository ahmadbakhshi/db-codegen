import { Command } from "commander";
import { cosmiconfig } from "cosmiconfig";

import { Config } from "./config";
import { generateTypesAndSchemas } from "./generator";

export async function run() {
  const program = new Command();

  program
    .name("db-codegen")
    .description("Generate TypeScript types and Zod schemas from database")
    .version(require("../package.json").version)
    .option("-c, --config <path>", "path to config file")
    .option("--host <host>", "database host")
    .option("--port <port>", "database port")
    .option("--db <database>", "database name")
    .option("--user <username>", "database username")
    .option("--pass <password>", "database password")
    .option("--type <type>", "database type (postgres, mysql, or sqlite)")
    .option("--out-dir <path>", "output directory")
    .parse(process.argv);

  const opts = program.opts();

  // Load config file
  const explorer = cosmiconfig("db-codegen");
  let config: Config;

  if (opts.config) {
    const result = await explorer.load(opts.config);
    if (!result) {
      throw new Error(`Could not load config file: ${opts.config}`);
    }
    config = result.config;
  } else {
    const result = await explorer.search();
    if (!result) {
      throw new Error("No configuration file found");
    }
    config = result.config;
  }

  // Override config with CLI options
  if (opts.type) {
    config.type = opts.type as any;
  }

  if (opts.host || opts.port || opts.db || opts.user || opts.pass) {
    if (config.type === "postgres" || config.type === "mysql") {
      if (opts.host) config.connection.host = opts.host;
      if (opts.port) config.connection.port = parseInt(opts.port, 10);
      if (opts.db) config.connection.database = opts.db;
      if (opts.user) config.connection.username = opts.user;
      if (opts.pass) config.connection.password = opts.pass;
    }
  }

  if (opts.outDir) {
    config.output.directory = opts.outDir;
  }

  try {
    await generateTypesAndSchemas(config);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}
