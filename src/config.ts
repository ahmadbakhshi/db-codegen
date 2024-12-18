export type DatabaseType = "postgresql" | "sqlite" | "mysql";

interface BaseConfig {
  type: DatabaseType;
  output: {
    directory: string;
    generator: { type: "zod" | "typescript"; output: string }[];
    prettierConfig?: string;
  };
}

export interface PostgresConfig extends BaseConfig {
  type: "postgresql";
  connection: {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
  };
}

export interface SQLiteConfig extends BaseConfig {
  type: "sqlite";
  connection: {
    filename: string;
  };
}

export interface MySQLConfig extends BaseConfig {
  type: "mysql";
  connection: {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
  };
}

export type Config = PostgresConfig | SQLiteConfig | MySQLConfig;

export type Column = {
  table_name: string;
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string | null;
  udt_name?: string;
};
