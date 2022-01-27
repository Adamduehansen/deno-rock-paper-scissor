import { Application } from './deps.ts';
import { GameResult } from './gameEngine.ts';
import router from './routes/index.router.ts';
import logGameResultMiddleware from './middleware/logGameResultMiddleware.ts';

export interface ApplicationState {
  gameResult: GameResult;
}

const application = new Application<ApplicationState>();
application.use(logGameResultMiddleware);
application.use(router.routes());

export default application;
