export enum PlayableValue {
  rock = 'rock',
  paper = 'paper',
  scissor = 'scissor',
}

export interface GameResult {
  win: boolean;
  computerHand: PlayableValue;
}

const isPlayableValue = function (value: string): boolean {
  return value in PlayableValue;
};

const isPlayerWinner = function (
  playerValue: PlayableValue,
  computerValue: PlayableValue
): boolean {
  if (
    playerValue === PlayableValue.paper &&
    computerValue === PlayableValue.rock
  ) {
    return true;
  } else if (
    playerValue === PlayableValue.rock &&
    computerValue === PlayableValue.scissor
  ) {
    return true;
  } else if (
    playerValue === PlayableValue.scissor &&
    computerValue === PlayableValue.paper
  ) {
    return true;
  } else {
    return false;
  }
};

export const play = function (
  playerValue: string,
  computerValue: PlayableValue
): Promise<GameResult> {
  return new Promise<GameResult>((resolve, reject) => {
    if (!isPlayableValue(playerValue)) {
      reject(
        new Error(
          `Value ${playerValue} is not a playable value. Use 'rock', 'paper' or 'scissor'`
        )
      );
    } else {
      resolve({
        win: isPlayerWinner(
          PlayableValue[playerValue as keyof typeof PlayableValue],
          computerValue
        ),
        computerHand: computerValue,
      });
    }
  });
};

export const getRandomPlayableHand = function (): PlayableValue {
  return PlayableValue.scissor;
};
