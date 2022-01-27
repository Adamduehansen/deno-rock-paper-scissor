import { Application, Body } from './deps.ts';
import { GameResult } from './gameEngine.ts';
import router from './routes/index.router.ts';
import logGameResultMiddleware from './middleware/logGameResultMiddleware.ts';
import storeGameResultMiddleware from './middleware/storeGameResultMiddleware.ts';

export interface ApplicationState {
  gameResult: GameResult;
}

export const getValueFromBody = async function (body: Body, key: string) {
  const value = await body.value;
  return value.get(key);
};

const application = new Application<ApplicationState>();
application.use(logGameResultMiddleware);
application.use(storeGameResultMiddleware);
application.use(router.routes());

export default application;
