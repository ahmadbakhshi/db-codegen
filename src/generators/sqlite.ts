import { open } from "sqlite";
import sqlite3 from "sqlite3";

import { Column, SQLiteConfig } from "../config";
import { BaseGenerator } from "./base";

export class SQLiteGenerator extends BaseGenerator {
  protected pgToTsType: Record<string, string> = {
    INTEGER: "number",
    REAL: "number",
    TEXT: "string",
    BLOB: "Buffer",
    NUMERIC: "number",
    BOOLEAN: "boolean",
    DATE: "Date",
    DATETIME: "Date",
    VARCHAR: "string",
  };

  protected pgToZodSchema: Record<string, string> = {
    INTEGER: "z.number()",
    REAL: "z.number()",
    TEXT: "z.string()",
    BLOB: "z.instanceof(Buffer)",
    NUMERIC: "z.number()",
    BOOLEAN: "z.boolean()",
    DATE: "z.date()",
    DATETIME: "z.date()",
    VARCHAR: "z.string()",
  };

  private config: SQLiteConfig;

  constructor(config: SQLiteConfig) {
    super();
    this.config = config;
  }

  async fetchSchema(): Promise<Column[]> {
    const db = await open({
      filename: this.config.connection.filename,
      driver: sqlite3.Database,
    });

    try {
      // Get all tables
      const tables = await db.all(
        `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`
      );

      const columns: Column[] = [];

      // Get columns for each table
      for (const table of tables) {
        const tableInfo = await db.all(`PRAGMA table_info('${table.name}')`);

        for (const col of tableInfo) {
          columns.push({
            table_name: table.name,
            column_name: col.name,
            data_type: this.normalizeDataType(col.type),
            is_nullable: col.notnull ? "NO" : "YES",
            column_default: col.dflt_value,
            udt_name: col.type,
          });
        }
      }

      return columns;
    } finally {
      await db.close();
    }
  }

  getTypeScriptType(column: Column): string {
    return this.pgToTsType[column.data_type] || "unknown";
  }

  getZodType(column: Column): string {
    return this.pgToZodSchema[column.data_type] || "z.unknown()";
  }

  private normalizeDataType(type: string): string {
    // SQLite type names can include length specifications or other modifiers
    // e.g., "VARCHAR(255)" -> "VARCHAR"
    const baseType = type.split("(")[0].toUpperCase();

    // Map some common type aliases
    const typeMap: Record<string, string> = {
      INT: "INTEGER",
      VARCHAR: "TEXT",
      CHAR: "TEXT",
      FLOAT: "REAL",
      DOUBLE: "REAL",
    };

    return typeMap[baseType] || baseType;
  }
}
