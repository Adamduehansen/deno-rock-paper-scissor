import * as postgres from 'https://deno.land/x/postgres@v0.14.2/mod.ts';
import 'https://deno.land/x/dotenv/load.ts';
import { Context } from '../deps.ts';
import { ApplicationState, getValueFromBody } from '../server.ts';

const databaseUrl = Deno.env.get('DATABASE_URL')!;
const pool = new postgres.Pool(databaseUrl, 3, true);

const connection = await pool.connect();
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

const storeGameResultMiddleware = async function (
  context: Context<ApplicationState, ApplicationState>,
  next: () => Promise<unknown>
) {
  await next();
  const { gameResult } = context.state;
  const userId = await getValueFromBody(context.request.body(), 'user_id');
  await connection.queryObject`
    INSERT INTO game_result (user_id, win) 
    VALUES (${userId}, ${gameResult.win})
  `;
};

export default storeGameResultMiddleware;
