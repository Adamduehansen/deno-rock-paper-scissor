import { Context, log } from '../deps.ts';
import { ApplicationState } from '../server.ts';

const logGameResultMiddleware = async function (
  context: Context<ApplicationState, ApplicationState>,
  next: () => Promise<unknown>
) {
  await next();
  const { gameResult } = context.state;
  if (!gameResult) {
    return;
  }
  log.info(`Game played - did player win? ${gameResult.win}`);
};

export default logGameResultMiddleware;
