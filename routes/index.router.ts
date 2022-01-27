import { Router, Body } from '../deps.ts';
import { play, getRandomPlayableHand } from '../gameEngine.ts';

const getValueFromBody = async function (body: Body) {
  const value = await body.value;
  const playedValue = value.get('text');
  return playedValue;
};

const router = new Router();

router.get('/', (context) => {
  context.response.body = 'Rock, papper, scissor API.';
});

router.post('/', async (context) => {
  const playedValue = await getValueFromBody(context.request.body());
  const computerHand = getRandomPlayableHand();

  try {
    const result = await play(playedValue, computerHand);
    context.state.gameResult = result;
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

export default router;
