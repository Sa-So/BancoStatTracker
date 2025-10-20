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

export default function DealingDialog({ open, onClose, phase, players, onDealCards }: DealingDialogProps) {
  const [cards, setCards] = useState<Array<{ rank: string; suit: '♠' | '♥' | '♦' | '♣' }>>(
    players.map(() => ({ rank: '', suit: '♠' }))
  );

  const updateCard = (index: number, rank: string, suit: '♠' | '♥' | '♦' | '♣') => {
    const newCards = [...cards];
    newCards[index] = { rank, suit };
    setCards(newCards);
  };

  const handleConfirm = () => {
    if (cards.every(c => c.rank)) {
      onDealCards(cards);
      setCards(players.map(() => ({ rank: '', suit: '♠' })));
      onClose();
    }
  };

  const isValid = cards.every(c => c.rank);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Deal {phase === 'first' ? 'First' : 'Second'} Card to Each Player
          </DialogTitle>
          <DialogDescription>
            Enter the {phase === 'first' ? 'first' : 'second'} card for each player in order
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {players.map((player, idx) => (
            <Card key={player.id} className="p-4">
              <CardInput
                label={`${player.name}'s ${phase === 'first' ? 'First' : 'Second'} Card`}
                rank={cards[idx].rank}
                suit={cards[idx].suit}
                onRankChange={(rank) => updateCard(idx, rank, cards[idx].suit)}
                onSuitChange={(suit) => updateCard(idx, cards[idx].rank, suit)}
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
