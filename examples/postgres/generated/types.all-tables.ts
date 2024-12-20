// Generated types for database

export interface Child {
  parent_id: number | null;
  composite_id_1: number | null;
  composite_id_2: string | null;
  array_json_col: Record<string, unknown>[] | null;
  nested_array_col: unknown[] | null;
  matrix_array_col: unknown[] | null;
  json_with_array: Record<string, unknown> | null;
  complex_range_col: unknown[] | null;
  document_col: string | null;
  document_tokens: unknown | null;
  age_col: number | null;
  age_category: string | null;
  timespan: unknown | null;
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

export interface ChildTypes {
  parent_id: number | null;
  composite_id_1: number | null;
  composite_id_2: string | null;
  array_json_col: Record<string, unknown>[] | null;
  nested_array_col: unknown[] | null;
  matrix_array_col: unknown[] | null;
  json_with_array: Record<string, unknown> | null;
  complex_range_col: unknown[] | null;
  document_col: string | null;
  document_tokens: unknown | null;
  age_col: number | null;
  age_category: string | null;
  timespan: unknown | null;
  id: number; // Default: nextval('parent_types_id_seq'::regclass)
  uuid_col: string | null; // Default: gen_random_uuid()
  smallint_col: number | null;
  integer_col: number | null;
  bigint_col: number | null;
  decimal_col: number | null;
  numeric_col: number | null;
  real_col: number | null;
  double_col: number | null;
  serial_col: number; // Default: nextval('parent_types_serial_col_seq'::regclass)
  smallserial_col: number; // Default: nextval('parent_types_smallserial_col_seq'::regclass)
  bigserial_col: number; // Default: nextval('parent_types_bigserial_col_seq'::regclass)
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
  created_at: Date | null; // Default: CURRENT_TIMESTAMP
  updated_at: Date | null; // Default: CURRENT_TIMESTAMP
}

export interface EmailVerificationCode {
  id: string;
  user_id: string | null;
  email: string;
  code: string;
  expires_at: Date;
}

export interface Migrations {
  version: number;
  name: string | null;
  md5: string | null;
  run_at: Date | null;
}

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

export interface ParentTypes {
  id: number; // Default: nextval('parent_types_id_seq'::regclass)
  uuid_col: string | null; // Default: gen_random_uuid()
  smallint_col: number | null;
  integer_col: number | null;
  bigint_col: number | null;
  decimal_col: number | null;
  numeric_col: number | null;
  real_col: number | null;
  double_col: number | null;
  serial_col: number; // Default: nextval('parent_types_serial_col_seq'::regclass)
  smallserial_col: number; // Default: nextval('parent_types_smallserial_col_seq'::regclass)
  bigserial_col: number; // Default: nextval('parent_types_bigserial_col_seq'::regclass)
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
  created_at: Date | null; // Default: CURRENT_TIMESTAMP
  updated_at: Date | null; // Default: CURRENT_TIMESTAMP
}

export interface PasswordResetToken {
  id: string;
  user_id: string | null;
  expires_at: Date;
}

export interface Session {
  id: string;
  user_id: string | null;
  expires_at: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  provider: string | null;
  provider_id: string | null;
  password: string | null;
  avatar: string | null;
  email_verified: boolean; // Default: false
  created_at: Date; // Default: CURRENT_TIMESTAMP
  updated_at: Date; // Default: CURRENT_TIMESTAMP
  is_deleted: boolean; // Default: false
  is_super_admin: boolean; // Default: false
  is_suspended: boolean; // Default: false
}

export enum MoodEnum {
  HAPPY = "happy",
  SAD = "sad",
  NEUTRAL = "neutral",
}
