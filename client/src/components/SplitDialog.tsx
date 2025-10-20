import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import PlayingCard from './PlayingCard';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface SplitDialogProps {
  open: boolean;
  onClose: () => void;
  originalCard1: { rank: string; suit: '♠' | '♥' | '♦' | '♣' };
  originalCard2: { rank: string; suit: '♠' | '♥' | '♦' | '♣' };
  newPair1: Array<{ rank: string; suit: '♠' | '♥' | '♦' | '♣' }>;
  newPair2: Array<{ rank: string; suit: '♠' | '♥' | '♦' | '♣' }>;
  onSelectPair: (pairIndex: 1 | 2) => void;
}

export default function SplitDialog({
  open,
  onClose,
  originalCard1,
  originalCard2,
  newPair1,
  newPair2,
  onSelectPair,
}: SplitDialogProps) {
  const [selectedPair, setSelectedPair] = useState<'pair1' | 'pair2'>('pair1');

  const handleConfirm = () => {
    console.log('Selected pair:', selectedPair);
    onSelectPair(selectedPair === 'pair1' ? 1 : 2);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Split Cards - Choose Your Pair</DialogTitle>
          <DialogDescription>
            Select which pair of cards you want to play with
          </DialogDescription>
        </DialogHeader>

        <RadioGroup value={selectedPair} onValueChange={(value) => setSelectedPair(value as 'pair1' | 'pair2')}>
          <div className="space-y-4">
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedPair === 'pair1' ? 'border-primary bg-primary/5' : 'border-border'
              }`}
              onClick={() => setSelectedPair('pair1')}
            >
              <div className="flex items-center gap-3 mb-3">
                <RadioGroupItem value="pair1" id="pair1" />
                <Label htmlFor="pair1" className="font-semibold cursor-pointer">
                  Pair 1
                </Label>
              </div>
              <div className="flex gap-3 justify-center">
                <PlayingCard rank={originalCard1.rank} suit={originalCard1.suit} size="md" />
                {newPair1.map((card, idx) => (
                  <PlayingCard key={idx} rank={card.rank} suit={card.suit} size="md" />
                ))}
              </div>
            </div>

            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedPair === 'pair2' ? 'border-primary bg-primary/5' : 'border-border'
              }`}
              onClick={() => setSelectedPair('pair2')}
            >
              <div className="flex items-center gap-3 mb-3">
                <RadioGroupItem value="pair2" id="pair2" />
                <Label htmlFor="pair2" className="font-semibold cursor-pointer">
                  Pair 2
                </Label>
              </div>
              <div className="flex gap-3 justify-center">
                <PlayingCard rank={originalCard2.rank} suit={originalCard2.suit} size="md" />
                {newPair2.map((card, idx) => (
                  <PlayingCard key={idx} rank={card.rank} suit={card.suit} size="md" />
                ))}
              </div>
            </div>
          </div>
        </RadioGroup>

        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={onClose} className="flex-1" data-testid="button-cancel-split">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="flex-1" data-testid="button-confirm-split">
            Confirm Selection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
