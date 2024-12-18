#!/usr/bin/env node

// bin/db-typegen.js
require("../dist/cli")
  .run()
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
