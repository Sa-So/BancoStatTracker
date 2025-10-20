import { useState } from 'react';
import PlayerActionDialog from '../PlayerActionDialog';
import { Button } from '@/components/ui/button';

export default function PlayerActionDialogExample() {
  const [open, setOpen] = useState(false);

  const mockPlayer = {
    id: 1,
    name: 'Player 1',
    balance: 500,
    card1: { rank: '7', suit: '♠' as const },
    card2: { rank: 'K', suit: '♥' as const },
    probabilities: {
      win: 45.5,
      lose: 42.3,
      doubleLoss: 12.2,
    },
  };

  return (
    <div className="p-8 bg-background">
      <Button onClick={() => setOpen(true)}>Open Player Action Dialog</Button>
      <PlayerActionDialog
        open={open}
        onClose={() => setOpen(false)}
        player={mockPlayer}
        maxBet={50}
        onBet={(amount, card) => console.log('Bet:', amount, 'Drawn:', card)}
        onSkip={() => console.log('Skip')}
        onSplit={(cards, pair) => console.log('Split cards:', cards, 'Selected pair:', pair)}
      />
    </div>
  );
}
