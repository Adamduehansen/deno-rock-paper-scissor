import { Router, Status } from '../deps.ts';
import { getValueFromBody } from '../server.ts';
import { connection } from '../db.ts';

const router = new Router({
  prefix: '/stats',
});

router.post('/', async (context) => {
  const userId = await getValueFromBody(context.request.body(), 'user_id');
  if (!userId) {
    context.response.status = Status.BadRequest;
  }

  const gameResults = await connection.queryObject<{
    total: number;
    win: number;
    lost: number;
    tie: number;
  }>(`
    SELECT
      count(*) AS total,
      sum(case when win = true then 1 else 0 end) AS win,
      sum(case when win = false then 1 else 0 end) AS lost,
      sum(case when win is null then 1 else 0 end) AS tie
    FROM game_result
  `);

  const { total, win, lost, tie } = gameResults.rows[0];

  context.response.body = `Game stats: ${total} total game, ${win} win, ${lost} lost, ${tie} tie`;
});

export default router;
