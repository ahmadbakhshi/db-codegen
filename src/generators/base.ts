import prettier from "prettier";

import { Column } from "../config";

export abstract class BaseGenerator {
  protected abstract pgToTsType: Record<string, string>;
  protected abstract pgToZodSchema: Record<string, string>;

  async formatWithPrettier(
    content: string,
    configPath?: string
  ): Promise<string> {
    try {
      const prettierConfig = configPath
        ? await prettier.resolveConfig(configPath)
        : await prettier.resolveConfig(process.cwd());

      return prettier.format(content, {
        ...prettierConfig,
        parser: "typescript",
      });
    } catch (error) {
      console.warn(
        "Failed to format with prettier, using unformatted output:",
        error
      );
      return content;
    }
  }

  generateTypeScriptContent(tableMap: Map<string, Column[]>): string {
    let output = "// Generated types for database\n\n";

    // Generate interfaces for each table
    for (const [tableName, tableColumns] of tableMap.entries()) {
      output += `export interface ${this.pascalCase(tableName)} {\n`;
      for (const column of tableColumns) {
        const tsType = this.getTypeScriptType(column);
        const nullable = column.is_nullable === "YES";
        const comment = column.column_default
          ? ` // Default: ${column.column_default}`
          : "";

        output += `  ${this.camelCase(column.column_name)}: ${tsType}${
          nullable ? " | null" : ""
        };${comment}\n`;
      }
      output += "}\n\n";
    }

    // Generate global interfaces
    output += "export interface DB {\n";
    for (const [tableName, _] of tableMap.entries()) {
      output += `  ${this.camelCase(tableName)}: ${this.pascalCase(tableName)}[];\n`;
    }
    output += "}\n\n";

    output += "export interface DBRecord {\n";
    for (const [tableName, _] of tableMap.entries()) {
      output += `  ${this.camelCase(tableName)}: ${this.pascalCase(tableName)};\n`;
    }
    output += "}\n\n";

    return output;
  }

  generateZodContent(tableMap: Map<string, Column[]>): string {
    let output = '// Generated Zod schemas\nimport { z } from "zod";\n\n';

    // Generate schemas for each table
    for (const [tableName, tableColumns] of tableMap.entries()) {
      // Base schema
      output += `export const ${this.camelCase(tableName)}Schema = z.object({\n`;
      for (const column of tableColumns) {
        const zodType = this.getZodType(column);
        const nullable = column.is_nullable === "YES";
        const comment = column.column_default
          ? ` // Default: ${column.column_default}`
          : "";

        output += `  ${this.camelCase(column.column_name)}: ${zodType}${
          nullable ? ".nullable()" : ""
        },${comment}\n`;
      }
      output += "});\n\n";

      // Insert schema (all fields optional except required ones)
      output += `export const ${this.camelCase(tableName)}InsertSchema = z.object({\n`;
      for (const column of tableColumns) {
        const zodType = this.getZodType(column);
        const isOptional =
          column.column_default !== null || column.is_nullable === "YES";
        const comment = column.column_default
          ? ` // Default: ${column.column_default}`
          : "";

        output += `  ${this.camelCase(column.column_name)}: ${zodType}${
          isOptional ? ".optional()" : ""
        },${comment}\n`;
      }
      output += "});\n\n";

      // Update schema (all fields optional)
      output += `export const ${this.camelCase(tableName)}UpdateSchema = z.object({\n`;
      for (const column of tableColumns) {
        const zodType = this.getZodType(column);
        const comment = column.column_default
          ? ` // Default: ${column.column_default}`
          : "";

        output += `  ${this.camelCase(column.column_name)}: ${zodType}.optional(),${comment}\n`;
      }
      output += "});\n\n";

      // Add type exports
      output += `export type ${this.pascalCase(tableName)} = z.infer<typeof ${this.camelCase(
        tableName
      )}Schema>;\n`;
      output += `export type ${this.pascalCase(tableName)}Insert = z.infer<typeof ${this.camelCase(
        tableName
      )}InsertSchema>;\n`;
      output += `export type ${this.pascalCase(tableName)}Update = z.infer<typeof ${this.camelCase(
        tableName
      )}UpdateSchema>;\n\n`;
    }

    // Generate global schemas
    output += "export const dbSchema = z.object({\n";
    for (const [tableName, _] of tableMap.entries()) {
      output += `  ${this.camelCase(tableName)}: z.array(${this.camelCase(
        tableName
      )}Schema),\n`;
    }
    output += "});\n\n";

    output += "export const dbRecordSchema = z.object({\n";
    for (const [tableName, _] of tableMap.entries()) {
      output += `  ${this.camelCase(tableName)}: ${this.camelCase(tableName)}Schema,\n`;
    }
    output += "});\n\n";

    output += "export const dbInsertSchema = z.object({\n";
    for (const [tableName, _] of tableMap.entries()) {
      output += `  ${this.camelCase(tableName)}: ${this.camelCase(
        tableName
      )}InsertSchema,\n`;
    }
    output += "});\n\n";

    output += "export const dbUpdateSchema = z.object({\n";
    for (const [tableName, _] of tableMap.entries()) {
      output += `  ${this.camelCase(tableName)}: ${this.camelCase(
        tableName
      )}UpdateSchema,\n`;
    }
    output += "});\n\n";

    output += "export type DB = z.infer<typeof dbSchema>;\n";
    output += "export type DBRecord = z.infer<typeof dbRecordSchema>;\n";
    output += "export type DBInsert = z.infer<typeof dbInsertSchema>;\n";
    output += "export type DBUpdate = z.infer<typeof dbUpdateSchema>;\n";

    return output;
  }

  public pascalCase(str: string): string {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

  public camelCase(str: string): string {
    return str
      .split("_")
      .reduce(
        (result, word, index) =>
          result +
          (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)),
        ""
      );
  }

  abstract getTypeScriptType(column: Column): string;
  abstract getZodType(column: Column): string;
  abstract fetchSchema(): Promise<Column[]>;
}
