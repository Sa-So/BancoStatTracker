import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CardInput from './CardInput';
import { Card } from '@/components/ui/card';

interface DealingDialogProps {
  open: boolean;
  onClose: () => void;
  phase: 'first' | 'second';
  players: Array<{ id: number; name: string }>;
  onDealCards: (cards: Array<{ rank: string; suit: '♠' | '♥' | '♦' | '♣' }>) => void;
}

const SUITS: Array<'♠' | '♥' | '♦' | '♣'> = ['♠', '♥', '♦', '♣'];

const getRandomSuit = () => SUITS[Math.floor(Math.random() * SUITS.length)];

export default function DealingDialog({ open, onClose, phase, players, onDealCards }: DealingDialogProps) {
  const [ranks, setRanks] = useState<string[]>(players.map(() => ''));

  const updateRank = (index: number, rank: string) => {
    const newRanks = [...ranks];
    newRanks[index] = rank;
    setRanks(newRanks);
  };

  const handleConfirm = () => {
    if (ranks.every(r => r)) {
      const cards = ranks.map(rank => ({ rank, suit: getRandomSuit() }));
      onDealCards(cards);
      setRanks(players.map(() => ''));
      onClose();
    }
  };

  const isValid = ranks.every(r => r);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Deal {phase === 'first' ? 'First' : 'Second'} Card to Each Player
          </DialogTitle>
          <DialogDescription>
            Enter the {phase === 'first' ? 'first' : 'second'} card rank for each player in order
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {players.map((player, idx) => (
            <Card key={player.id} className="p-4">
              <CardInput
                label={`${player.name}'s ${phase === 'first' ? 'First' : 'Second'} Card`}
                rank={ranks[idx]}
                onRankChange={(rank) => updateRank(idx, rank)}
                testId={`player-${player.id}-${phase}`}
              />
            </Card>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={onClose} className="flex-1" data-testid="button-cancel-deal">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!isValid}
            className="flex-1"
            data-testid="button-confirm-deal"
          >
            Confirm Cards
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
