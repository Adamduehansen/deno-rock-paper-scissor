import { Application, log } from './deps.ts';
import router from './index.router.ts';
import { GameResult } from './gameEngine.ts';
import logGameResultMiddleware from './logGameResultMiddleware.ts';

export interface ApplicationState {
  gameResult: GameResult;
}

const port = Number(Deno.env.get('PORT')) || 8080;

const application = new Application<ApplicationState>();

application.use(logGameResultMiddleware);

application.use(router.routes());

if (import.meta.main) {
  log.info(`Starting rock paper scissor server on port ${port}...`);
  await application.listen({
    port: port,
  });
}
