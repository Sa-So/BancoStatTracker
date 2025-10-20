import { Card } from '@/components/ui/card';
import { Layers } from 'lucide-react';

interface DeckStatusProps {
  remainingCards: number;
  totalCards: number;
  revealedCards?: Array<{ rank: string; suit: string }>;
}

export default function DeckStatus({ remainingCards, totalCards, revealedCards = [] }: DeckStatusProps) {
  const percentage = (remainingCards / totalCards) * 100;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Deck Status</h3>
        </div>
        <div className="text-right">
          <div className="font-mono text-2xl font-bold text-primary" data-testid="remaining-cards">
            {remainingCards}
          </div>
          <div className="text-xs text-muted-foreground">of {totalCards} cards</div>
        </div>
      </div>

      <div className="w-full bg-muted rounded-full h-3 mb-4">
        <div 
          className="bg-primary h-3 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {revealedCards.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-xs font-semibold text-muted-foreground mb-2">
            Recently Revealed ({revealedCards.length})
          </h4>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
            {revealedCards.slice(-10).map((card, idx) => (
              <div 
                key={idx}
                className="px-2 py-1 bg-muted rounded text-xs font-mono"
                data-testid={`revealed-card-${idx}`}
              >
                {card.rank}{card.suit}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
