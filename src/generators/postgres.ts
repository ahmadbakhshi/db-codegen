import postgres from "postgres";

import { Column, PostgresConfig } from "../config";
import { BaseGenerator } from "./base";

export class PostgresGenerator extends BaseGenerator {
  protected pgToTsType: Record<string, string> = {
    integer: "number",
    bigint: "number",
    numeric: "number",
    decimal: "number",
    real: "number",
    "double precision": "number",
    smallint: "number",
    text: "string",
    "character varying": "string",
    varchar: "string",
    char: "string",
    boolean: "boolean",
    json: "Record<string, unknown>",
    jsonb: "Record<string, unknown>",
    timestamp: "Date",
    "timestamp with time zone": "Date",
    "timestamp without time zone": "Date",
    date: "Date",
    time: "string",
    uuid: "string",
    bytea: "Buffer",
    array: "Array<unknown>",
  };

  protected pgToZodSchema: Record<string, string> = {
    integer: "z.number()",
    bigint: "z.number()",
    numeric: "z.number()",
    decimal: "z.number()",
    real: "z.number()",
    "double precision": "z.number()",
    smallint: "z.number()",
    text: "z.string()",
    "character varying": "z.string()",
    varchar: "z.string()",
    char: "z.string()",
    boolean: "z.boolean()",
    json: "z.record(z.unknown())",
    jsonb: "z.record(z.unknown())",
    timestamp: "z.date()",
    "timestamp with time zone": "z.date()",
    "timestamp without time zone": "z.date()",
    date: "z.date()",
    time: "z.string()",
    uuid: "z.string().uuid()",
    bytea: "z.instanceof(Buffer)",
  };

  private sql: postgres.Sql<{}>;

  constructor(config: PostgresConfig) {
    super();
    this.sql = postgres(config.connection);
  }

  async fetchSchema(): Promise<Column[]> {
    try {
      const result = await this.sql<
        {
          table_name: string;
          column_name: string;
          data_type: string;
          is_nullable: string;
          column_default: string | null;
          udt_name: string;
        }[]
      >`
        SELECT 
          table_name,
          column_name,
          data_type,
          is_nullable,
          column_default,
          udt_name
        FROM information_schema.columns 
        WHERE table_schema = 'public'
        ORDER BY table_name, ordinal_position;
      `;

      // Fetch all enum types and their values in a single query
      const enumTypes = await this.sql<
        { type_name: string; enum_values: string[] }[]
      >`
        SELECT 
          t.typname as type_name,
          array_agg(e.enumlabel ORDER BY e.enumsortorder) as enum_values
        FROM pg_type t
        JOIN pg_enum e ON t.oid = e.enumtypid
        JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
        WHERE n.nspname = 'public'
        GROUP BY t.typname;
      `;

      // Cache the enum values
      enumTypes.forEach(({ type_name, enum_values }) => {
        this.enumValuesCache.set(
          this.pascalCase(type_name + "Enum"),
          enum_values
        );
      });

      return result.map((row) => ({
        table_name: row.table_name,
        column_name: row.column_name,
        data_type: row.data_type,
        is_nullable: row.is_nullable,
        column_default: row.column_default,
        udt_name: row.udt_name,
      }));
    } finally {
      await this.sql.end();
    }
  }

  getTypeScriptType(column: Column): string {
    if (column.data_type === "ARRAY") {
      const elementType =
        this.pgToTsType[column.udt_name?.replace("_", "") || ""] || "unknown";
      return `${elementType}[]`;
    }

    if (column.data_type === "USER-DEFINED") {
      const enumName = this.pascalCase(column.udt_name + "Enum");
      const enumValues = this.enumValuesCache.get(enumName || "");
      if (enumValues) return `${enumName}`;
      return this.pascalCase(column.udt_name || "");
    }

    return this.pgToTsType[column.data_type] || "unknown";
  }

  getZodType(column: Column): string {
    if (column.data_type === "ARRAY") {
      const elementType = column.udt_name?.replace("_", "") || "";
      const zodElementType = this.pgToZodSchema[elementType] || "z.unknown()";
      return `z.array(${zodElementType})`;
    }

    if (column.data_type === "USER-DEFINED") {
      const enumValues = this.enumValuesCache.get(column.udt_name || "");
      if (enumValues) {
        const formattedValues = enumValues
          .map((value) => `"${value}"`)
          .join(", ");
        return `z.enum([${formattedValues}])`;
      }
      return "z.unknown()";
    }

    return this.pgToZodSchema[column.data_type] || "z.unknown()";
  }
}
