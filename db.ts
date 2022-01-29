import 'https://deno.land/x/dotenv/load.ts';
import * as postgres from 'https://deno.land/x/postgres@v0.14.2/mod.ts';

const databaseUrl = Deno.env.get('DATABASE_URL')!;
const pool = new postgres.Pool(databaseUrl, 3, true);

export const connection = await pool.connect();

export const createDatabase = async function () {
  try {
    await connection.queryObject`
      CREATE TABLE IF NOT EXISTS game_result (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        win BOOLEAN
      )
    `;
  } finally {
    connection.release();
  }
};
