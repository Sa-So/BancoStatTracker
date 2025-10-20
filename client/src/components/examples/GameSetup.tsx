import GameSetup from '../GameSetup';

export default function GameSetupExample() {
  return (
    <GameSetup
      onStartGame={(config) => console.log('Game started with:', config)}
    />
  );
}
