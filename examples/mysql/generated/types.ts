// Generated types for database

export interface Child {
  id: number;
  parent_id: number | null;
  composite_id_1: number | null;
  composite_id_2: string | null;
  array_json_col: Record<string, unknown> | null;
  nested_array_col: Record<string, unknown> | null;
  matrix_array_col: Record<string, unknown> | null;
  json_with_array: Record<string, unknown> | null;
  complex_range_col: Record<string, unknown> | null;
  document_col: string | null;
  document_tokens: string | null;
  age_col: number | null;
  age_category: string | null;
  timespan_start: Date | null;
  timespan_end: Date | null;
  uuid_col: string | null; // Default: uuid()
  smallint_col: number | null;
  integer_col: number | null;
  created_at: Date | null; // Default: CURRENT_TIMESTAMP
  updated_at: Date | null; // Default: CURRENT_TIMESTAMP
}

export interface Parent {
  id: number;
  uuid_col: string | null; // Default: uuid()
  smallint_col: number | null;
  integer_col: number | null;
  bigint_col: number | null;
  decimal_col: number | null;
  numeric_col: number | null;
  real_col: number | null;
  double_col: number | null;
  serial_col: number | null;
  smallserial_col: number | null;
  bigserial_col: number | null;
  money_col: number | null;
  char_col: string | null;
  varchar_col: string | null;
  text_col: string | null;
  bytea_col: Buffer | null;
  date_col: Date | null;
  time_col: string | null;
  time_tz_col: string | null;
  timestamp_col: Date | null;
  timestamp_tz_col: Date | null;
  interval_col: string | null;
  boolean_col: boolean | null;
  point_col: unknown | null;
  line_col: unknown | null;
  lseg_col: unknown | null;
  box_col: unknown | null;
  path_col: unknown | null;
  polygon_col: unknown | null;
  circle_col: unknown | null;
  cidr_col: string | null;
  inet_col: string | null;
  macaddr_col: string | null;
  macaddr8_col: string | null;
  bit_col: unknown | null;
  bit_varying_col: unknown | null;
  tsvector_col: string | null;
  tsquery_col: string | null;
  xml_col: string | null;
  json_col: Record<string, unknown> | null;
  jsonb_col: Record<string, unknown> | null;
  int_array_col: Record<string, unknown> | null;
  text_array_col: Record<string, unknown> | null;
  int_range_col: string | null;
  num_range_col: string | null;
  ts_range_col: string | null;
  tstz_range_col: string | null;
  date_range_col: string | null;
  mood_col: MoodColEnum | null;
  created_at: Date | null; // Default: CURRENT_TIMESTAMP
  updated_at: Date | null; // Default: CURRENT_TIMESTAMP
}

export enum MoodColEnum {
  HAPPY = "happy",
  SAD = "sad",
  NEUTRAL = "neutral",
}
