import { Context } from '../deps.ts';
import { ApplicationState, getValueFromBody } from '../server.ts';

const storeGameResultMiddleware = async function (
  context: Context<ApplicationState, ApplicationState>,
  next: () => Promise<unknown>
) {
  await next();
  const { gameResult } = context.state;
  const userId = await getValueFromBody(context.request.body(), 'user_id');
  console.log(`Player id is ${userId}`);
};

export default storeGameResultMiddleware;
