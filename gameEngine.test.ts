import {
  assertEquals,
  assertRejects,
} from 'https://deno.land/std@0.122.0/testing/asserts.ts';
import { play, PlayableValue } from './gameEngine.ts';

Deno.test('Should throw error if non-playable value was given', async () => {
  await assertRejects(() => {
    return play('non-playable value', PlayableValue.paper);
  }, Error);
});

Deno.test(
  'Should declare player winner when playing paper over rock',
  async () => {
    // Arrange
    const playedHand = PlayableValue.paper.toString();

    // Act
    const result = await play(playedHand, PlayableValue.rock);

    // Assert
    assertEquals(result.win, true);
  }
);

Deno.test(
  'Should declare player winner when playing rock over scissor',
  async () => {
    // Arrange
    const playedHand = PlayableValue.rock.toString();

    // Act
    const result = await play(playedHand, PlayableValue.scissor);

    // Assert
    assertEquals(result.win, true);
  }
);

Deno.test(
  'Should declare player winner when playing scissor over paper',
  async () => {
    // Arrange
    const playedHand = PlayableValue.scissor.toString();

    // Act
    const result = await play(playedHand, PlayableValue.paper);

    // Assert
    assertEquals(result.win, true);
  }
);

Deno.test(
  'should declare computer winner when playing paper over rock',
  async () => {
    // Arrange
    const playedHand = PlayableValue.rock.toString();

    // Act
    const result = await play(playedHand, PlayableValue.paper);

    // Assert
    assertEquals(result.win, false);
  }
);

Deno.test(
  'should declare computer winner when playing rock over scissor',
  async () => {
    // Arrange
    const playedHand = PlayableValue.scissor.toString();

    // Act
    const result = await play(playedHand, PlayableValue.rock);

    // Assert
    assertEquals(result.win, false);
  }
);

Deno.test(
  'should declare computer winner when playing scissor over paper',
  async () => {
    // Arrange
    const playedHand = PlayableValue.paper.toString();

    // Act
    const result = await play(playedHand, PlayableValue.scissor);

    // Assert
    assertEquals(result.win, false);
  }
);
