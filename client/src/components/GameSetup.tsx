import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, Coins, TrendingUp } from 'lucide-react';

interface GameSetupProps {
  onStartGame: (config: {
    numPlayers: number;
    maxBet: number;
    startingBalance: number;
  }) => void;
}

export default function GameSetup({ onStartGame }: GameSetupProps) {
  const [numPlayers, setNumPlayers] = useState(10);
  const [maxBet, setMaxBet] = useState(50);
  const [startingBalance, setStartingBalance] = useState(200);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Starting game with config:', { numPlayers, maxBet, startingBalance });
    onStartGame({ numPlayers, maxBet, startingBalance });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">Banco</h1>
          <p className="text-muted-foreground">Card Game Tracker</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="numPlayers" className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Number of Players
            </Label>
            <Input
              id="numPlayers"
              type="number"
              min={2}
              max={20}
              value={numPlayers}
              onChange={(e) => setNumPlayers(parseInt(e.target.value))}
              data-testid="input-num-players"
            />
            <p className="text-xs text-muted-foreground">Between 2 and 12 players</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxBet" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              Maximum Bet (₹)
            </Label>
            <Input
              id="maxBet"
              type="number"
              min={10}
              max={1000}
              step={10}
              value={maxBet}
              onChange={(e) => setMaxBet(parseInt(e.target.value))}
              data-testid="input-max-bet"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startingBalance" className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-accent" />
              Starting Balance (₹)
            </Label>
            <Input
              id="startingBalance"
              type="number"
              min={100}
              max={10000}
              step={50}
              value={startingBalance}
              onChange={(e) => setStartingBalance(parseInt(e.target.value))}
              data-testid="input-starting-balance"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            data-testid="button-start-game"
          >
            Start Game
          </Button>
        </form>
      </Card>
    </div>
  );
}
