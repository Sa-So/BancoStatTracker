import PlayerZone from '../PlayerZone';

export default function PlayerZoneExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 bg-background max-w-4xl">
      <PlayerZone
        playerNumber={1}
        name="Player 1"
        balance={500}
        card1={{ rank: '7', suit: '♠' }}
        card2={{ rank: 'K', suit: '♥' }}
        probabilities={{
          win: 45.5,
          lose: 42.3,
          doubleLoss: 12.2,
        }}
        isActive={true}
        hasBet={true}
        currentBet={25}
      />
      <PlayerZone
        playerNumber={2}
        name="Player 2"
        balance={350}
        card1={{ rank: 'A', suit: '♦' }}
        card2={{ rank: 'Q', suit: '♣' }}
        probabilities={{
          win: 60.0,
          lose: 30.0,
          doubleLoss: 10.0,
        }}
      />
    </div>
  );
}
