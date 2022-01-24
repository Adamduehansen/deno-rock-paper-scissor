import {
  assertEquals,
  assertRejects,
} from 'https://deno.land/std@0.122.0/testing/asserts.ts';
import { play, playableValue } from './gameEngine.ts';

Deno.test('Should throw error if non-playable value was given', async () => {
  await assertRejects(() => {
    return play('non-playable value', playableValue.paper);
  }, Error);
});

Deno.test(
  'Should declare player winner when playing paper over rock',
  async () => {
    // Arrange
    const playedHand = playableValue.paper.toString();

    // Act
    const result = await play(playedHand, playableValue.rock);

    // Assert
    assertEquals(result.win, true);
  }
);

Deno.test(
  'Should declare player winner when playing rock over scissor',
  async () => {
    // Arrange
    const playedHand = playableValue.rock.toString();

    // Act
    const result = await play(playedHand, playableValue.scissor);

    // Assert
    assertEquals(result.win, true);
  }
);

Deno.test(
  'Should declare player winner when playing scissor over paper',
  async () => {
    // Arrange
    const playedHand = playableValue.scissor.toString();

    // Act
    const result = await play(playedHand, playableValue.paper);

    // Assert
    assertEquals(result.win, true);
  }
);

Deno.test(
  'should declare computer winner when playing paper over rock',
  async () => {
    // Arrange
    const playedHand = playableValue.rock.toString();

    // Act
    const result = await play(playedHand, playableValue.paper);

    // Assert
    assertEquals(result.win, false);
  }
);

Deno.test(
  'should declare computer winner when playing rock over scissor',
  async () => {
    // Arrange
    const playedHand = playableValue.scissor.toString();

    // Act
    const result = await play(playedHand, playableValue.rock);

    // Assert
    assertEquals(result.win, false);
  }
);

Deno.test(
  'should declare computer winner when playing scissor over paper',
  async () => {
    // Arrange
    const playedHand = playableValue.paper.toString();

    // Act
    const result = await play(playedHand, playableValue.scissor);

    // Assert
    assertEquals(result.win, false);
  }
);

Deno.test(
  'Should declare tie when player has the same as computer',
  async () => {
    // Arrange

    // Act
    const resultRock = await play('rock', playableValue.rock);
    const resultPaper = await play('paper', playableValue.paper);
    const resultScissor = await play('scissor', playableValue.scissor);

    // Assert
    assertEquals(resultRock.win, undefined);
    assertEquals(resultPaper.win, undefined);
    assertEquals(resultScissor.win, undefined);
  }
);
