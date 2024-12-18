import mysql from "mysql2/promise";

import { Column, MySQLConfig } from "../config";
import { BaseGenerator } from "./base";

export class MySQLGenerator extends BaseGenerator {
  protected pgToTsType: Record<string, string> = {
    int: "number",
    tinyint: "number",
    smallint: "number",
    mediumint: "number",
    bigint: "number",
    decimal: "number",
    float: "number",
    double: "number",
    varchar: "string",
    char: "string",
    text: "string",
    mediumtext: "string",
    longtext: "string",
    boolean: "boolean",
    date: "Date",
    datetime: "Date",
    timestamp: "Date",
    time: "string",
    json: "Record<string, unknown>",
    blob: "Buffer",
    enum: "string",
  };

  protected pgToZodSchema: Record<string, string> = {
    int: "z.number()",
    tinyint: "z.number()",
    smallint: "z.number()",
    mediumint: "z.number()",
    bigint: "z.number()",
    decimal: "z.number()",
    float: "z.number()",
    double: "z.number()",
    varchar: "z.string()",
    char: "z.string()",
    text: "z.string()",
    mediumtext: "z.string()",
    longtext: "z.string()",
    boolean: "z.boolean()",
    date: "z.date()",
    datetime: "z.date()",
    timestamp: "z.date()",
    time: "z.string()",
    json: "z.record(z.unknown())",
    blob: "z.instanceof(Buffer)",
    enum: "z.string()",
  };

  private config: MySQLConfig;
  private connection: mysql.Connection | null = null;

  constructor(config: MySQLConfig) {
    super();
    this.config = config;
  }

  async fetchSchema(): Promise<Column[]> {
    try {
      this.connection = await mysql.createConnection({
        host: this.config.connection.host,
        port: this.config.connection.port,
        user: this.config.connection.username,
        password: this.config.connection.password,
        database: this.config.connection.database,
      });

      const [rows] = await this.connection.execute(
        `
        SELECT 
          table_name,
          column_name,
          data_type,
          is_nullable,
          column_default,
          column_type
        FROM information_schema.columns 
        WHERE table_schema = ?
        ORDER BY table_name, ordinal_position
      `,
        [this.config.connection.database]
      );

      return (rows as any[]).map((row) => ({
        table_name: row.TABLE_NAME,
        column_name: row.COLUMN_NAME,
        data_type: row.DATA_TYPE.toLowerCase(),
        is_nullable: row.IS_NULLABLE,
        column_default: row.COLUMN_DEFAULT,
        udt_name: row.COLUMN_TYPE,
      }));
    } finally {
      if (this.connection) {
        await this.connection.end();
      }
    }
  }

  getTypeScriptType(column: Column): string {
    // Handle ENUM types
    if (column.data_type === "enum") {
      const enumValues = this.parseEnumValues(column.udt_name || "");
      return enumValues.map((v) => `'${v}'`).join(" | ");
    }

    // Handle boolean represented as TINYINT(1)
    if (column.data_type === "tinyint" && column.udt_name === "tinyint(1)") {
      return "boolean";
    }

    return this.pgToTsType[column.data_type] || "unknown";
  }

  getZodType(column: Column): string {
    // Handle ENUM types
    if (column.data_type === "enum") {
      const enumValues = this.parseEnumValues(column.udt_name || "");
      return `z.enum([${enumValues.map((v) => `'${v}'`).join(", ")}])`;
    }

    // Handle boolean represented as TINYINT(1)
    if (column.data_type === "tinyint" && column.udt_name === "tinyint(1)") {
      return "z.boolean()";
    }

    return this.pgToZodSchema[column.data_type] || "z.unknown()";
  }

  private parseEnumValues(enumType: string): string[] {
    // Parse enum values from MySQL enum type definition
    // e.g., "enum('value1','value2')" -> ["value1", "value2"]
    const match = enumType.match(/^enum\((.*)\)$/);
    if (!match) return [];

    return match[1].split(",").map((v) => v.trim().replace(/^'|'$/g, ""));
  }
}
