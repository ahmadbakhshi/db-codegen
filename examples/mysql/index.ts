import mysql from "mysql2/promise";

async function createSchema() {
  // Create connection pool
  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "dev",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  try {
    console.log("Creating schema...");

    // Drop existing tables
    await pool.query("DROP TABLE IF EXISTS child");
    await pool.query("DROP TABLE IF EXISTS parent");

    // Create parent table
    await pool.query(`
CREATE TABLE parent (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  uuid_col CHAR(36) DEFAULT (UUID()),
  smallint_col SMALLINT,
  integer_col INTEGER,
  bigint_col BIGINT,
  decimal_col DECIMAL(10, 2),
  numeric_col DECIMAL(10, 2),
  real_col FLOAT,
  double_col DOUBLE PRECISION,
  serial_col BIGINT,
  smallserial_col SMALLINT,
  bigserial_col BIGINT,
  money_col DECIMAL(19,4),
  char_col CHAR(10),
  varchar_col VARCHAR(255),
  text_col TEXT,
  bytea_col BLOB,
  date_col DATE,
  time_col TIME,
  time_tz_col TIME,
  timestamp_col TIMESTAMP,
  timestamp_tz_col TIMESTAMP,
  interval_col VARCHAR(255),
  boolean_col BOOLEAN,
  point_col POINT,
  line_col LINESTRING,
  lseg_col LINESTRING,
  box_col POLYGON,
  path_col LINESTRING,
  polygon_col POLYGON,
  circle_col POLYGON,
  cidr_col VARCHAR(45),
  inet_col VARCHAR(45),
  macaddr_col CHAR(17),
  macaddr8_col CHAR(23),
  bit_col BIT(8),
  bit_varying_col BIT(64),
  tsvector_col TEXT,
  tsquery_col TEXT,
  xml_col TEXT,
  json_col JSON,
  jsonb_col JSON,
  int_array_col JSON,
  text_array_col JSON,
  int_range_col VARCHAR(255),
  num_range_col VARCHAR(255),
  ts_range_col VARCHAR(255),
  tstz_range_col VARCHAR(255),
  date_range_col VARCHAR(255),
  mood_col ENUM('happy', 'sad', 'neutral'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT check_integer_positive CHECK (integer_col >= 0)
) ENGINE=InnoDB`);

    // Create child table
    await pool.query(`
CREATE TABLE child (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  parent_id BIGINT,
  composite_id_1 INTEGER,
  composite_id_2 VARCHAR(50),
  array_json_col JSON,
  nested_array_col JSON,
  matrix_array_col JSON,
  json_with_array JSON,
  complex_range_col JSON,
  document_col TEXT,
  document_tokens TEXT GENERATED ALWAYS AS (document_col) STORED,
  age_col INTEGER,
  age_category VARCHAR(10) GENERATED ALWAYS AS (
    CASE
      WHEN age_col < 18 THEN 'minor'
      WHEN age_col < 65 THEN 'adult'
      ELSE 'senior'
    END
  ) STORED,
  timespan_start TIMESTAMP,
  timespan_end TIMESTAMP,
  uuid_col CHAR(36) DEFAULT (UUID()),
  smallint_col SMALLINT,
  integer_col INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY child_pkey_composite (composite_id_1, composite_id_2),
  FOREIGN KEY (parent_id) REFERENCES parent(id) ON DELETE CASCADE,
  CONSTRAINT check_age_category CHECK (
    (age_col >= 0)
    AND (
      (age_col < 18 AND age_category = 'minor')
      OR (age_col >= 18 AND age_col < 65 AND age_category = 'adult')
      OR (age_col >= 65 AND age_category = 'senior')
    )
  )
) ENGINE=InnoDB`);

    // Add FULLTEXT index
    await pool.query(
      "ALTER TABLE child ADD FULLTEXT INDEX document_fulltext (document_col)"
    );

    console.log("Schema created successfully!");
  } catch (error) {
    console.error("Error creating schema:", error);
  } finally {
    await pool.end();
  }
}

// Run the schema creation
createSchema().catch(console.error);
