import prettier from "prettier";
import { Column, Config } from "../config";

export abstract class BaseGenerator {
  protected abstract pgToTsType: Record<string, string>;
  protected abstract pgToZodSchema: Record<string, string>;
  enumValuesCache: Map<string, string[]> = new Map();

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

        output += `  ${column.column_name}: ${tsType}${
          nullable ? " | null" : ""
        };${comment}\n`;
      }
      output += "}\n\n";
    }

    // Generate global interfaces using tableColumnsMap to avoid duplicates

    return output;
  }

  generateZodContent(tableMap: Map<string, Column[]>): string {
    let output = '// Generated Zod schemas\nimport { z } from "zod";\n\n';

    // Second pass: Generate schemas for tables using the deduplicated map
    for (const [tableName, tableColumns] of tableMap.entries()) {
      // Base schema
      output += `export const ${this.camelCase(tableName)}Schema = z.object({\n`;
      for (const column of tableColumns) {
        const zodType = this.getZodType(column);
        const nullable = column.is_nullable === "YES";
        const comment = column.column_default
          ? ` // Default: ${column.column_default}`
          : "";

        output += `  ${column.column_name}: ${zodType}${
          nullable ? ".nullable()" : ""
        },${comment}\n`;
      }
      output += "});\n\n";
    }

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

  filterTableMap(
    tableMap: Map<string, Column[]>,
    tables?: string[]
  ): Map<string, Column[]> {
    // If no tables specified in config, return all tables
    if (!tables || tables.length === 0) {
      return tableMap;
    }

    // Create new Map with only the configured tables
    const filteredMap = new Map<string, Column[]>();
    for (const tableName of tables) {
      if (tableMap.has(tableName)) {
        filteredMap.set(tableName, tableMap.get(tableName)!);
      } else {
        console.warn(
          `Table "${tableName}" specified in config not found in database`
        );
      }
    }
    return filteredMap;
  }

  generateEnumTypes(_type: Config["type"]): string {
    const enumDefinitions: string[] = [];

    for (const [enumName, enumValues] of this.enumValuesCache.entries()) {
      console.log("🚀 ~ enumName:", enumName);
      // Generate TypeScript enum
      const enumDefinition = `export enum ${this.pascalCase(enumName)} {
  ${enumValues
    .map((value) => `${this.formatEnumKey(value)} = "${value}"`)
    .join(",\n  ")}
}`;

      enumDefinitions.push(enumDefinition);
    }

    return enumDefinitions.join("\n\n");
  }

  private formatEnumKey(value: string): string {
    // Convert enum value to a valid TypeScript enum key
    // Replace special characters and spaces with underscores
    // Ensure it starts with a letter
    let key = value
      .replace(/[^a-zA-Z0-9_]/g, "_")
      .replace(/^(\d)/, "_$1")
      .toUpperCase();

    // Ensure the key is a valid identifier
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) {
      key = "_" + key;
    }

    return key;
  }

  abstract getTypeScriptType(column: Column): string;
  abstract getZodType(column: Column): string;
  abstract fetchSchema(): Promise<Column[]>;
}
