import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Coins, SkipForward, Split } from 'lucide-react';

interface BettingControlsProps {
  maxBet: number;
  playerBalance: number;
  canSplit: boolean;
  splitCost?: number;
  onBet: (amount: number) => void;
  onSkip: () => void;
  onSplit: () => void;
}

export default function BettingControls({
  maxBet,
  playerBalance,
  canSplit,
  splitCost = 10,
  onBet,
  onSkip,
  onSplit,
}: BettingControlsProps) {
  const [betAmount, setBetAmount] = useState(0);
  
  const effectiveMaxBet = Math.min(maxBet, playerBalance);

  const handleBet = () => {
    if (betAmount > 0 && betAmount <= effectiveMaxBet) {
      console.log('Bet placed:', betAmount);
      onBet(betAmount);
    }
  };

  const handleSkip = () => {
    console.log('Turn skipped');
    onSkip();
  };

  const handleSplit = () => {
    if (playerBalance >= splitCost) {
      console.log('Split action triggered');
      onSplit();
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Coins className="w-5 h-5 text-accent" />
        Betting Controls
      </h3>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Bet Amount</span>
            <span className="font-mono text-2xl font-bold text-accent" data-testid="bet-amount-display">
              ₹{betAmount}
            </span>
          </div>
          <Slider
            value={[betAmount]}
            onValueChange={(value) => setBetAmount(value[0])}
            max={effectiveMaxBet}
            step={5}
            className="w-full"
            data-testid="bet-slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹0</span>
            <span>Max: ₹{effectiveMaxBet}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Button
            onClick={handleBet}
            disabled={betAmount === 0 || betAmount > effectiveMaxBet}
            className="w-full"
            size="lg"
            data-testid="button-bet"
          >
            <Coins className="w-4 h-4 mr-2" />
            Bet ₹{betAmount}
          </Button>

          <Button
            onClick={handleSkip}
            variant="outline"
            className="w-full"
            size="lg"
            data-testid="button-skip"
          >
            <SkipForward className="w-4 h-4 mr-2" />
            Skip (Free)
          </Button>

          {canSplit && (
            <Button
              onClick={handleSplit}
              variant="secondary"
              disabled={playerBalance < splitCost}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              size="lg"
              data-testid="button-split"
            >
              <Split className="w-4 h-4 mr-2" />
              Split (₹{splitCost})
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
