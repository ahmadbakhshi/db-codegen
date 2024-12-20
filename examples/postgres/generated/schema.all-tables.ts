// Generated Zod schemas
import { z } from "zod";

export const childSchema = z.object({
  parent_id: z.number().nullable(),
  composite_id_1: z.number().nullable(),
  composite_id_2: z.string().nullable(),
  array_json_col: z.array(z.record(z.unknown())).nullable(),
  nested_array_col: z.array(z.unknown()).nullable(),
  matrix_array_col: z.array(z.unknown()).nullable(),
  json_with_array: z.record(z.unknown()).nullable(),
  complex_range_col: z.array(z.unknown()).nullable(),
  document_col: z.string().nullable(),
  document_tokens: z.unknown().nullable(),
  age_col: z.number().nullable(),
  age_category: z.string().nullable(),
  timespan: z.unknown().nullable(),
  id: z.number(), // Default: nextval('parent_id_seq'::regclass)
  uuid_col: z.string().uuid().nullable(), // Default: gen_random_uuid()
  smallint_col: z.number().nullable(),
  integer_col: z.number().nullable(),
  bigint_col: z.number().nullable(),
  decimal_col: z.number().nullable(),
  numeric_col: z.number().nullable(),
  real_col: z.number().nullable(),
  double_col: z.number().nullable(),
  serial_col: z.number(), // Default: nextval('parent_serial_col_seq'::regclass)
  smallserial_col: z.number(), // Default: nextval('parent_smallserial_col_seq'::regclass)
  bigserial_col: z.number(), // Default: nextval('parent_bigserial_col_seq'::regclass)
  money_col: z.unknown().nullable(),
  char_col: z.unknown().nullable(),
  varchar_col: z.string().nullable(),
  text_col: z.string().nullable(),
  bytea_col: z.instanceof(Buffer).nullable(),
  date_col: z.date().nullable(),
  time_col: z.unknown().nullable(),
  time_tz_col: z.unknown().nullable(),
  timestamp_col: z.date().nullable(),
  timestamp_tz_col: z.date().nullable(),
  interval_col: z.unknown().nullable(),
  boolean_col: z.boolean().nullable(),
  point_col: z.unknown().nullable(),
  line_col: z.unknown().nullable(),
  lseg_col: z.unknown().nullable(),
  box_col: z.unknown().nullable(),
  path_col: z.unknown().nullable(),
  polygon_col: z.unknown().nullable(),
  circle_col: z.unknown().nullable(),
  cidr_col: z.unknown().nullable(),
  inet_col: z.unknown().nullable(),
  macaddr_col: z.unknown().nullable(),
  macaddr8_col: z.unknown().nullable(),
  bit_col: z.unknown().nullable(),
  bit_varying_col: z.unknown().nullable(),
  tsvector_col: z.unknown().nullable(),
  tsquery_col: z.unknown().nullable(),
  xml_col: z.unknown().nullable(),
  json_col: z.record(z.unknown()).nullable(),
  jsonb_col: z.record(z.unknown()).nullable(),
  int_array_col: z.array(z.unknown()).nullable(),
  text_array_col: z.array(z.string()).nullable(),
  int_range_col: z.unknown().nullable(),
  num_range_col: z.unknown().nullable(),
  ts_range_col: z.unknown().nullable(),
  tstz_range_col: z.unknown().nullable(),
  date_range_col: z.unknown().nullable(),
  mood_col: z.unknown().nullable(),
  created_at: z.date().nullable(), // Default: CURRENT_TIMESTAMP
  updated_at: z.date().nullable(), // Default: CURRENT_TIMESTAMP
});

export const childTypesSchema = z.object({
  parent_id: z.number().nullable(),
  composite_id_1: z.number().nullable(),
  composite_id_2: z.string().nullable(),
  array_json_col: z.array(z.record(z.unknown())).nullable(),
  nested_array_col: z.array(z.unknown()).nullable(),
  matrix_array_col: z.array(z.unknown()).nullable(),
  json_with_array: z.record(z.unknown()).nullable(),
  complex_range_col: z.array(z.unknown()).nullable(),
  document_col: z.string().nullable(),
  document_tokens: z.unknown().nullable(),
  age_col: z.number().nullable(),
  age_category: z.string().nullable(),
  timespan: z.unknown().nullable(),
  id: z.number(), // Default: nextval('parent_types_id_seq'::regclass)
  uuid_col: z.string().uuid().nullable(), // Default: gen_random_uuid()
  smallint_col: z.number().nullable(),
  integer_col: z.number().nullable(),
  bigint_col: z.number().nullable(),
  decimal_col: z.number().nullable(),
  numeric_col: z.number().nullable(),
  real_col: z.number().nullable(),
  double_col: z.number().nullable(),
  serial_col: z.number(), // Default: nextval('parent_types_serial_col_seq'::regclass)
  smallserial_col: z.number(), // Default: nextval('parent_types_smallserial_col_seq'::regclass)
  bigserial_col: z.number(), // Default: nextval('parent_types_bigserial_col_seq'::regclass)
  money_col: z.unknown().nullable(),
  char_col: z.unknown().nullable(),
  varchar_col: z.string().nullable(),
  text_col: z.string().nullable(),
  bytea_col: z.instanceof(Buffer).nullable(),
  date_col: z.date().nullable(),
  time_col: z.unknown().nullable(),
  time_tz_col: z.unknown().nullable(),
  timestamp_col: z.date().nullable(),
  timestamp_tz_col: z.date().nullable(),
  interval_col: z.unknown().nullable(),
  boolean_col: z.boolean().nullable(),
  point_col: z.unknown().nullable(),
  line_col: z.unknown().nullable(),
  lseg_col: z.unknown().nullable(),
  box_col: z.unknown().nullable(),
  path_col: z.unknown().nullable(),
  polygon_col: z.unknown().nullable(),
  circle_col: z.unknown().nullable(),
  cidr_col: z.unknown().nullable(),
  inet_col: z.unknown().nullable(),
  macaddr_col: z.unknown().nullable(),
  macaddr8_col: z.unknown().nullable(),
  bit_col: z.unknown().nullable(),
  bit_varying_col: z.unknown().nullable(),
  tsvector_col: z.unknown().nullable(),
  tsquery_col: z.unknown().nullable(),
  xml_col: z.unknown().nullable(),
  json_col: z.record(z.unknown()).nullable(),
  jsonb_col: z.record(z.unknown()).nullable(),
  int_array_col: z.array(z.unknown()).nullable(),
  text_array_col: z.array(z.string()).nullable(),
  int_range_col: z.unknown().nullable(),
  num_range_col: z.unknown().nullable(),
  ts_range_col: z.unknown().nullable(),
  tstz_range_col: z.unknown().nullable(),
  date_range_col: z.unknown().nullable(),
  created_at: z.date().nullable(), // Default: CURRENT_TIMESTAMP
  updated_at: z.date().nullable(), // Default: CURRENT_TIMESTAMP
});

export const emailVerificationCodeSchema = z.object({
  id: z.string(),
  user_id: z.string().nullable(),
  email: z.string(),
  code: z.string(),
  expires_at: z.date(),
});

export const migrationsSchema = z.object({
  version: z.number(),
  name: z.string().nullable(),
  md5: z.string().nullable(),
  run_at: z.date().nullable(),
});

export const parentSchema = z.object({
  id: z.number(), // Default: nextval('parent_id_seq'::regclass)
  uuid_col: z.string().uuid().nullable(), // Default: gen_random_uuid()
  smallint_col: z.number().nullable(),
  integer_col: z.number().nullable(),
  bigint_col: z.number().nullable(),
  decimal_col: z.number().nullable(),
  numeric_col: z.number().nullable(),
  real_col: z.number().nullable(),
  double_col: z.number().nullable(),
  serial_col: z.number(), // Default: nextval('parent_serial_col_seq'::regclass)
  smallserial_col: z.number(), // Default: nextval('parent_smallserial_col_seq'::regclass)
  bigserial_col: z.number(), // Default: nextval('parent_bigserial_col_seq'::regclass)
  money_col: z.unknown().nullable(),
  char_col: z.unknown().nullable(),
  varchar_col: z.string().nullable(),
  text_col: z.string().nullable(),
  bytea_col: z.instanceof(Buffer).nullable(),
  date_col: z.date().nullable(),
  time_col: z.unknown().nullable(),
  time_tz_col: z.unknown().nullable(),
  timestamp_col: z.date().nullable(),
  timestamp_tz_col: z.date().nullable(),
  interval_col: z.unknown().nullable(),
  boolean_col: z.boolean().nullable(),
  point_col: z.unknown().nullable(),
  line_col: z.unknown().nullable(),
  lseg_col: z.unknown().nullable(),
  box_col: z.unknown().nullable(),
  path_col: z.unknown().nullable(),
  polygon_col: z.unknown().nullable(),
  circle_col: z.unknown().nullable(),
  cidr_col: z.unknown().nullable(),
  inet_col: z.unknown().nullable(),
  macaddr_col: z.unknown().nullable(),
  macaddr8_col: z.unknown().nullable(),
  bit_col: z.unknown().nullable(),
  bit_varying_col: z.unknown().nullable(),
  tsvector_col: z.unknown().nullable(),
  tsquery_col: z.unknown().nullable(),
  xml_col: z.unknown().nullable(),
  json_col: z.record(z.unknown()).nullable(),
  jsonb_col: z.record(z.unknown()).nullable(),
  int_array_col: z.array(z.unknown()).nullable(),
  text_array_col: z.array(z.string()).nullable(),
  int_range_col: z.unknown().nullable(),
  num_range_col: z.unknown().nullable(),
  ts_range_col: z.unknown().nullable(),
  tstz_range_col: z.unknown().nullable(),
  date_range_col: z.unknown().nullable(),
  mood_col: z.unknown().nullable(),
  created_at: z.date().nullable(), // Default: CURRENT_TIMESTAMP
  updated_at: z.date().nullable(), // Default: CURRENT_TIMESTAMP
});

export const parentTypesSchema = z.object({
  id: z.number(), // Default: nextval('parent_types_id_seq'::regclass)
  uuid_col: z.string().uuid().nullable(), // Default: gen_random_uuid()
  smallint_col: z.number().nullable(),
  integer_col: z.number().nullable(),
  bigint_col: z.number().nullable(),
  decimal_col: z.number().nullable(),
  numeric_col: z.number().nullable(),
  real_col: z.number().nullable(),
  double_col: z.number().nullable(),
  serial_col: z.number(), // Default: nextval('parent_types_serial_col_seq'::regclass)
  smallserial_col: z.number(), // Default: nextval('parent_types_smallserial_col_seq'::regclass)
  bigserial_col: z.number(), // Default: nextval('parent_types_bigserial_col_seq'::regclass)
  money_col: z.unknown().nullable(),
  char_col: z.unknown().nullable(),
  varchar_col: z.string().nullable(),
  text_col: z.string().nullable(),
  bytea_col: z.instanceof(Buffer).nullable(),
  date_col: z.date().nullable(),
  time_col: z.unknown().nullable(),
  time_tz_col: z.unknown().nullable(),
  timestamp_col: z.date().nullable(),
  timestamp_tz_col: z.date().nullable(),
  interval_col: z.unknown().nullable(),
  boolean_col: z.boolean().nullable(),
  point_col: z.unknown().nullable(),
  line_col: z.unknown().nullable(),
  lseg_col: z.unknown().nullable(),
  box_col: z.unknown().nullable(),
  path_col: z.unknown().nullable(),
  polygon_col: z.unknown().nullable(),
  circle_col: z.unknown().nullable(),
  cidr_col: z.unknown().nullable(),
  inet_col: z.unknown().nullable(),
  macaddr_col: z.unknown().nullable(),
  macaddr8_col: z.unknown().nullable(),
  bit_col: z.unknown().nullable(),
  bit_varying_col: z.unknown().nullable(),
  tsvector_col: z.unknown().nullable(),
  tsquery_col: z.unknown().nullable(),
  xml_col: z.unknown().nullable(),
  json_col: z.record(z.unknown()).nullable(),
  jsonb_col: z.record(z.unknown()).nullable(),
  int_array_col: z.array(z.unknown()).nullable(),
  text_array_col: z.array(z.string()).nullable(),
  int_range_col: z.unknown().nullable(),
  num_range_col: z.unknown().nullable(),
  ts_range_col: z.unknown().nullable(),
  tstz_range_col: z.unknown().nullable(),
  date_range_col: z.unknown().nullable(),
  created_at: z.date().nullable(), // Default: CURRENT_TIMESTAMP
  updated_at: z.date().nullable(), // Default: CURRENT_TIMESTAMP
});

export const passwordResetTokenSchema = z.object({
  id: z.string(),
  user_id: z.string().nullable(),
  expires_at: z.date(),
});

export const sessionSchema = z.object({
  id: z.string(),
  user_id: z.string().nullable(),
  expires_at: z.date(),
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  provider: z.string().nullable(),
  provider_id: z.string().nullable(),
  password: z.string().nullable(),
  avatar: z.string().nullable(),
  email_verified: z.boolean(), // Default: false
  created_at: z.date(), // Default: CURRENT_TIMESTAMP
  updated_at: z.date(), // Default: CURRENT_TIMESTAMP
  is_deleted: z.boolean(), // Default: false
  is_super_admin: z.boolean(), // Default: false
  is_suspended: z.boolean(), // Default: false
});