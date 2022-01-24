export enum playableValue {
  rock = 'rock',
  paper = 'paper',
  scissor = 'scissor',
}

export interface GameResult {
  win?: boolean;
  computerHand: playableValue;
}

const isPlayableValue = function (value: string): boolean {
  return value in playableValue;
};

const isPlayerWinner = function (
  playerValue: playableValue,
  computerValue: playableValue
): boolean | undefined {
  if (
    playerValue === playableValue.paper &&
    computerValue === playableValue.rock
  ) {
    return true;
  } else if (
    playerValue === playableValue.rock &&
    computerValue === playableValue.scissor
  ) {
    return true;
  } else if (
    playerValue === playableValue.scissor &&
    computerValue === playableValue.paper
  ) {
    return true;
  } else if (playerValue === computerValue) {
    return undefined;
  } else {
    return false;
  }
};

export const play = function (
  playerValue: string,
  computerValue: playableValue
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
          playableValue[playerValue as keyof typeof playableValue],
          computerValue
        ),
        computerHand: computerValue,
      });
    }
  });
};

export const getRandomPlayableHand = function (): playableValue {
  const index = Math.floor(Math.random() * Object.keys(playableValue).length);
  const key = Object.keys(playableValue)[index];
  return playableValue[key as keyof typeof playableValue];
};
