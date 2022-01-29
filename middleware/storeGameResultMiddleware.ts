import 'https://deno.land/x/dotenv/load.ts';
import { Context } from '../deps.ts';
import { ApplicationState, getValueFromBody } from '../server.ts';
import { connection } from '../db.ts';

const storeGameResultMiddleware = async function (
  context: Context<ApplicationState, ApplicationState>,
  next: () => Promise<unknown>
) {
  await next();
  const { gameResult } = context.state;
  if (!gameResult) {
    return;
  }
  const userId = await getValueFromBody(context.request.body(), 'user_id');
  await connection.queryObject`
    INSERT INTO game_result (user_id, win) 
    VALUES (${userId}, ${gameResult.win})
  `;
};

export default storeGameResultMiddleware;
