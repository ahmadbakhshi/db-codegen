// Generated types for database

export interface Parent {
  id: number; // Default: nextval('parent_id_seq'::regclass)
  uuid_col: string | null; // Default: gen_random_uuid()
  smallint_col: number | null;
  integer_col: number | null;
  bigint_col: number | null;
  decimal_col: number | null;
  numeric_col: number | null;
  real_col: number | null;
  double_col: number | null;
  serial_col: number; // Default: nextval('parent_serial_col_seq'::regclass)
  smallserial_col: number; // Default: nextval('parent_smallserial_col_seq'::regclass)
  bigserial_col: number; // Default: nextval('parent_bigserial_col_seq'::regclass)
  money_col: unknown | null;
  char_col: unknown | null;
  varchar_col: string | null;
  text_col: string | null;
  bytea_col: Buffer | null;
  date_col: Date | null;
  time_col: unknown | null;
  time_tz_col: unknown | null;
  timestamp_col: Date | null;
  timestamp_tz_col: Date | null;
  interval_col: unknown | null;
  boolean_col: boolean | null;
  point_col: unknown | null;
  line_col: unknown | null;
  lseg_col: unknown | null;
  box_col: unknown | null;
  path_col: unknown | null;
  polygon_col: unknown | null;
  circle_col: unknown | null;
  cidr_col: unknown | null;
  inet_col: unknown | null;
  macaddr_col: unknown | null;
  macaddr8_col: unknown | null;
  bit_col: unknown | null;
  bit_varying_col: unknown | null;
  tsvector_col: unknown | null;
  tsquery_col: unknown | null;
  xml_col: unknown | null;
  json_col: Record<string, unknown> | null;
  jsonb_col: Record<string, unknown> | null;
  int_array_col: unknown[] | null;
  text_array_col: string[] | null;
  int_range_col: unknown | null;
  num_range_col: unknown | null;
  ts_range_col: unknown | null;
  tstz_range_col: unknown | null;
  date_range_col: unknown | null;
  mood_col: MoodEnum | null;
  created_at: Date | null; // Default: CURRENT_TIMESTAMP
  updated_at: Date | null; // Default: CURRENT_TIMESTAMP
}

export enum MoodEnum {
  HAPPY = "happy",
  SAD = "sad",
  NEUTRAL = "neutral",
}
