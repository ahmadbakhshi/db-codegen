import { Pool } from "pg";

async function createSchema() {
  const pool = new Pool({
    connectionString: "postgresql://postgres:postgres@localhost:5432/postgres",
  });

  try {
    console.log("Creating schema...");

    await pool.query(`
-- Drop tables if they exist
DROP TYPE IF EXISTS mood CASCADE;
DROP TABLE IF EXISTS parent CASCADE;
DROP TABLE IF EXISTS child CASCADE;

-- Create custom enum type
CREATE TYPE mood AS ENUM ('happy', 'sad', 'neutral');


-- Create parent table with all possible base types
CREATE TABLE parent (
  -- Identifiers
  id BIGSERIAL PRIMARY KEY,
  uuid_col UUID DEFAULT gen_random_uuid(),
  -- Numeric types
  smallint_col SMALLINT,
  integer_col INTEGER,
  bigint_col BIGINT,
  decimal_col DECIMAL(10, 2),
  numeric_col NUMERIC(10, 2),
  real_col REAL,
  double_col DOUBLE PRECISION,
  serial_col SERIAL,
  smallserial_col SMALLSERIAL,
  bigserial_col BIGSERIAL,
  money_col MONEY,
  -- Character types
  char_col CHAR(10),
  varchar_col VARCHAR(255),
  text_col TEXT,
  -- Binary data
  bytea_col BYTEA,
  -- Date/Time types
  date_col DATE,
  time_col TIME,
  time_tz_col TIME WITH TIME ZONE,
  timestamp_col TIMESTAMP,
  timestamp_tz_col TIMESTAMP WITH TIME ZONE,
  interval_col INTERVAL,
  -- Boolean type
  boolean_col BOOLEAN,
  -- Geometric types
  point_col POINT,
  line_col LINE,
  lseg_col LSEG,
  box_col BOX,
  path_col PATH,
  polygon_col POLYGON,
  circle_col CIRCLE,
  -- Network address types
  cidr_col CIDR,
  inet_col INET,
  macaddr_col MACADDR,
  macaddr8_col MACADDR8,
  -- Bit string types
  bit_col BIT(8),
  bit_varying_col BIT VARYING(8),
  -- Text search types
  tsvector_col TSVECTOR,
  tsquery_col TSQUERY,
  -- XML type
  xml_col XML,
  -- JSON types
  json_col JSON,
  jsonb_col JSONB,
  -- Arrays
  int_array_col INTEGER[],
  text_array_col TEXT[],
  -- Range types
  int_range_col INT4RANGE,
  num_range_col NUMRANGE,
  ts_range_col TSRANGE,
  tstz_range_col TSTZRANGE,
  date_range_col DATERANGE,
  -- Custom types
  mood_col mood,
  -- Utility columns
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT check_integer_positive CHECK (integer_col >= 0)
);

-- Create child table with foreign key reference and additional type combinations
CREATE TABLE child (
  -- Note: id column is inherited from parent
  parent_id BIGINT REFERENCES parent(id) ON DELETE CASCADE,
  -- Composite primary key example
  composite_id_1 INTEGER,
  composite_id_2 VARCHAR(50),
  -- Additional type combinations
  array_json_col JSON[],
  nested_array_col INTEGER[][],
  matrix_array_col INTEGER[3][3],
  json_with_array JSONB,
  complex_range_col TSTZRANGE[],
  -- Full text search columns
  document_col TEXT,
  document_tokens TSVECTOR GENERATED ALWAYS AS (to_tsvector('english', document_col)) STORED,
  -- Computed columns
  age_col INTEGER,
  age_category TEXT GENERATED ALWAYS AS (
    CASE
      WHEN age_col < 18 THEN 'minor'
      WHEN age_col < 65 THEN 'adult'
      ELSE 'senior'
    END
  ) STORED,
  -- Exclusion constraint example
  timespan TSTZRANGE,
  -- Inheritance test
  LIKE parent INCLUDING DEFAULTS INCLUDING CONSTRAINTS,
  -- Additional constraints
  CONSTRAINT child_pkey_composite UNIQUE (composite_id_1, composite_id_2),
  CONSTRAINT child_timespan_excl EXCLUDE USING GIST (timespan WITH &&),
  -- Check constraint with multiple columns
  CONSTRAINT check_age_category CHECK (
    (age_col >= 0)
    AND (
      age_col < 18 AND age_category = 'minor'
      OR age_col >= 18 AND age_col < 65 AND age_category = 'adult'
      OR age_col >= 65 AND age_category = 'senior'
    )
  )
);`);

    console.log("Schema created successfully!");
  } catch (error) {
    console.error("Error creating schema:", error);
  } finally {
    await pool.end();
  }
}

// Run the schema creation
createSchema().catch(console.error);
