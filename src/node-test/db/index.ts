import { Pool } from 'pg';

export const pool = new Pool({
  host: 'localhost',
  database: 'Weather',
  port: 5432,
  user: 'admin',
  password: 'admin',
  idleTimeoutMillis: 30000
})
