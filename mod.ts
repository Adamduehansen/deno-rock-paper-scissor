import {
  Application,
  Router,
  Body,
} from 'https://deno.land/x/oak@v10.1.0/mod.ts';
import * as log from 'https://deno.land/std@0.122.0/log/mod.ts';
import { play, getRandomPlayableHand } from './gameEngine.ts';

const getValueFromBody = async function (body: Body) {
  const value = await body.value;
  const playedValue = value.get('text');
  return playedValue;
};

const port = Number(Deno.env.get('PORT')) || 8080;
const application = new Application();
const router = new Router();

router.get('/', (context) => {
  context.response.body = 'Rock, papper, scissor API.';
});

router.post('/', async (context) => {
  const playedValue = await getValueFromBody(context.request.body());
  const computerHand = getRandomPlayableHand();

  try {
    const result = await play(playedValue, computerHand);
    if (result.win) {
      context.response.body = `Computer played ${result.computerHand}, you win! 🥳`;
    } else if (result.win === undefined) {
      context.response.body = `Computer played ${result.computerHand}, its a tie! 🥸`;
    } else {
      context.response.body = `Computer played ${result.computerHand}, you loose! 😭`;
    }
  } catch (error) {
    context.response.body = error.message;
  }
});

application.use(router.routes());

if (import.meta.main) {
  log.info(`Starting rock paper scissor server on port ${port}...`);
  await application.listen({
    port: port,
  });
}
