export type DatabaseType = "postgres" | "mysql";

interface BaseConfig {
  type: DatabaseType;
  output: {
    directory: string;
    generator: {
      type: "zod" | "typescript";
      output: string;
      tables?: string[];
    }[];
    prettierConfig?: string;
  };
}

export interface PostgresConfig extends BaseConfig {
  type: "postgres";
  connection: {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
  };
}

// export interface SQLiteConfig extends BaseConfig {
//   type: "sqlite";
//   connection: {
//     filename: string;
//   };
// }

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

export type Config = PostgresConfig | MySQLConfig;

export type Column = {
  table_name: string;
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string | null;
  udt_name?: string;
  enum_values?: string[]; // Add this line
};

export interface ComplexTypeColumn {
  name: string;
  type: string;
}

export interface ComplexType {
  name: string;
  columns: ComplexTypeColumn[];
}
