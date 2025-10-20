import BettingControls from '../BettingControls';

export default function BettingControlsExample() {
  return (
    <div className="p-8 bg-background max-w-md">
      <BettingControls
        maxBet={50}
        playerBalance={500}
        canSplit={true}
        splitCost={10}
        onBet={(amount) => console.log('Bet:', amount)}
        onSkip={() => console.log('Skip')}
        onSplit={() => console.log('Split')}
      />
    </div>
  );
}
