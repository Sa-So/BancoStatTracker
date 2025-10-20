import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PlayingCard from './PlayingCard';
import ProbabilityDisplay from './ProbabilityDisplay';
import { User, Coins } from 'lucide-react';

interface PlayerZoneProps {
  playerNumber: number;
  name: string;
  balance: number;
  card1?: { rank: string; suit: '♠' | '♥' | '♦' | '♣' };
  card2?: { rank: string; suit: '♠' | '♥' | '♦' | '♣' };
  probabilities?: {
    win: number;
    lose: number;
    doubleLoss: number;
  };
  isActive?: boolean;
  hasBet?: boolean;
  currentBet?: number;
}

export default function PlayerZone({
  playerNumber,
  name,
  balance,
  card1,
  card2,
  probabilities,
  isActive = false,
  hasBet = false,
  currentBet = 0,
}: PlayerZoneProps) {
  return (
    <Card 
      className={`p-4 transition-all cursor-pointer hover-elevate ${isActive ? 'ring-2 ring-primary shadow-lg' : ''}`}
      data-testid={`player-zone-${playerNumber}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="font-semibold text-foreground" data-testid={`player-name-${playerNumber}`}>
              {name}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Coins className="w-3 h-3" />
              <span className="font-mono" data-testid={`player-balance-${playerNumber}`}>₹{balance}</span>
            </div>
          </div>
        </div>
        {isActive && (
          <Badge variant="default" className="bg-primary text-primary-foreground">
            Active
          </Badge>
        )}
      </div>

      <div className="flex gap-3 mb-4 justify-center">
        {card1 ? (
          <PlayingCard rank={card1.rank} suit={card1.suit} size="md" />
        ) : (
          <PlayingCard rank="A" suit="♠" size="md" faceDown />
        )}
        {card2 ? (
          <PlayingCard rank={card2.rank} suit={card2.suit} size="md" />
        ) : (
          <PlayingCard rank="K" suit="♥" size="md" faceDown />
        )}
      </div>

      {hasBet && currentBet > 0 && (
        <div className="mb-3 p-2 bg-accent/20 rounded text-center">
          <div className="text-xs text-muted-foreground">Current Bet</div>
          <div className="font-mono font-bold text-accent" data-testid={`current-bet-${playerNumber}`}>
            ₹{currentBet}
          </div>
        </div>
      )}

      {probabilities && card1 && card2 && (
        <div className="mt-4 pt-4 border-t border-border">
          <ProbabilityDisplay
            winProbability={probabilities.win}
            loseProbability={probabilities.lose}
            doubleLossProbability={probabilities.doubleLoss}
          />
        </div>
      )}
    </Card>
  );
}
