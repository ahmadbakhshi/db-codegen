import { Config, MySQLConfig, PostgresConfig } from "../config";
import { MySQLGenerator } from "./mysql";
import { PostgresGenerator } from "./postgres";

function isPostgresConfig(config: Config): config is PostgresConfig {
  return config.type === "postgres";
}

function isMySQLConfig(config: Config): config is MySQLConfig {
  return config.type === "mysql";
}

// function isSQLiteConfig(config: Config): config is SQLiteConfig {
//   return config.type === "sqlite";
// }

export function createGenerator(config: Config) {
  if (isPostgresConfig(config)) {
    return new PostgresGenerator(config);
  }

  if (isMySQLConfig(config)) {
    return new MySQLGenerator(config);
  }

  // if (isSQLiteConfig(config)) {
  //   return new SQLiteGenerator(config);
  // }

  throw new Error(`Unsupported database type: ${(config as any).type}`);
}

export { PostgresGenerator, MySQLGenerator };
