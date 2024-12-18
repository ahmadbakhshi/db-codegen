export { createGenerator } from "./generators";
export type {
  Config,
  PostgresConfig,
  MySQLConfig,
  SQLiteConfig,
  DatabaseType,
  Column,
} from "./config";
export { generateTypesAndSchemas } from "./generator";
export { run } from "./cli";
