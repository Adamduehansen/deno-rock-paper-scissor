import { Application, Body } from './deps.ts';
import { GameResult } from './gameEngine.ts';
import indexRouter from './routes/index.router.ts';
import statsRouter from './routes/stats.router.ts';
import logGameResultMiddleware from './middleware/logGameResultMiddleware.ts';
import storeGameResultMiddleware from './middleware/storeGameResultMiddleware.ts';
import { createDatabase } from './db.ts';

export interface ApplicationState {
  gameResult: GameResult;
}

export const getValueFromBody = async function (body: Body, key: string) {
  const value = await body.value;
  return value.get(key);
};

createDatabase();

const application = new Application<ApplicationState>();
application.use(logGameResultMiddleware);
application.use(storeGameResultMiddleware);
application.use(indexRouter.routes());
application.use(indexRouter.allowedMethods());
application.use(statsRouter.routes());
application.use(statsRouter.allowedMethods());

export default application;
