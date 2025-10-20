import GameBoard from '../GameBoard';

export default function GameBoardExample() {
  return (
    <GameBoard
      numPlayers={4}
      maxBet={50}
      startingBalance={500}
    />
  );
}
