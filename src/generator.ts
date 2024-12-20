import * as fs from "fs";
import { join } from "path";

import { Config } from "./config";
import { createGenerator } from "./generators";

export async function generateTypesAndSchemas(config: Config) {
  const generator = createGenerator(config);
  const columns = await generator.fetchSchema();

  // Create table map
  const tableMap = new Map();
  for (const column of columns) {
    if (!tableMap.has(column.table_name)) {
      tableMap.set(column.table_name, []);
    }
    tableMap.get(column.table_name)!.push(column);
  }

  // Generate files based on config
  for (const gen of config.output.generator) {
    const outputPath = join(process.cwd(), config.output.directory, gen.output);

    let content = "";
    if (gen.type === "typescript") {
      const filteredTableMap = generator.filterTableMap(tableMap, gen.tables);
      content = generator.generateTypeScriptContent(filteredTableMap);
      content += generator.generateEnumTypes(config.type);
    } else if (gen.type === "zod") {
      const filteredTableMap = generator.filterTableMap(tableMap, gen.tables);
      content = generator.generateZodContent(filteredTableMap);
    }

    // Format with prettier if configured
    const formattedContent = await generator.formatWithPrettier(
      content,
      config.output.prettierConfig
    );

    // Ensure directory exists
    fs.mkdirSync(join(process.cwd(), config.output.directory), {
      recursive: true,
    });

    // Write file
    fs.writeFileSync(outputPath, formattedContent);
    console.log(`Generated ${gen.type} output at ${outputPath}`);
  }
}
