import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PlayerZone from './PlayerZone';
import BettingControls from './BettingControls';
import DeckStatus from './DeckStatus';
import SplitDialog from './SplitDialog';
import PlayingCard from './PlayingCard';
import { RotateCcw, Play } from 'lucide-react';

// TODO: remove mock functionality
interface GameBoardProps {
  numPlayers: number;
  maxBet: number;
  startingBalance: number;
}

export default function GameBoard({ numPlayers, maxBet, startingBalance }: GameBoardProps) {
  // TODO: remove mock state - this will be replaced with real game state from backend
  const [gamePhase, setGamePhase] = useState<'dealing-first' | 'dealing-second' | 'playing'>('dealing-first');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [remainingCards, setRemainingCards] = useState(52);
  const [revealedCards, setRevealedCards] = useState<Array<{ rank: string; suit: string }>>([]);
  const [showSplitDialog, setShowSplitDialog] = useState(false);
  
  // TODO: remove mock players data
  const [players] = useState(
    Array.from({ length: numPlayers }, (_, i) => ({
      id: i + 1,
      name: `Player ${i + 1}`,
      balance: startingBalance,
      card1: gamePhase !== 'dealing-first' ? { rank: ['A', 'K', '7', 'Q', '3', '9', 'J', '5'][i], suit: ['♠', '♥', '♦', '♣'][i % 4] as '♠' | '♥' | '♦' | '♣' } : undefined,
      card2: gamePhase === 'playing' ? { rank: ['K', '3', 'Q', 'A', '8', '2', '10', '6'][i], suit: ['♥', '♦', '♣', '♠'][i % 4] as '♠' | '♥' | '♦' | '♣' } : undefined,
      probabilities: gamePhase === 'playing' ? {
        win: 45 + Math.random() * 20,
        lose: 35 + Math.random() * 20,
        doubleLoss: 8 + Math.random() * 12,
      } : undefined,
    }))
  );

  const handleDealFirstCards = () => {
    console.log('Dealing first cards to all players');
    setGamePhase('dealing-second');
    setRemainingCards(52 - numPlayers);
  };

  const handleDealSecondCards = () => {
    console.log('Dealing second cards to all players');
    setGamePhase('playing');
    setRemainingCards(52 - (numPlayers * 2));
  };

  const handleBet = (amount: number) => {
    console.log(`Player ${currentPlayerIndex + 1} bets ₹${amount}`);
    // TODO: remove mock - implement real bet logic
    const drawnCard = { rank: 'K', suit: '♥' };
    setRevealedCards([...revealedCards, drawnCard]);
    setRemainingCards(remainingCards - 1);
    setCurrentPlayerIndex((currentPlayerIndex + 1) % numPlayers);
  };

  const handleSkip = () => {
    console.log(`Player ${currentPlayerIndex + 1} skips`);
    setCurrentPlayerIndex((currentPlayerIndex + 1) % numPlayers);
  };

  const handleSplit = () => {
    console.log(`Player ${currentPlayerIndex + 1} splits`);
    setShowSplitDialog(true);
  };

  const handleSelectPair = (pairIndex: 1 | 2) => {
    console.log(`Player ${currentPlayerIndex + 1} selected pair ${pairIndex}`);
    // TODO: remove mock - implement real split logic
  };

  const handleNewRound = () => {
    console.log('Starting new round');
    setGamePhase('dealing-first');
    setCurrentPlayerIndex(0);
    setRemainingCards(52);
    setRevealedCards([]);
  };

  const currentPlayer = players[currentPlayerIndex];
  const canSplit = currentPlayer?.card1?.rank === currentPlayer?.card2?.rank;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-serif font-bold text-primary">Banco Game</h1>
          <Button variant="outline" onClick={handleNewRound} data-testid="button-new-round">
            <RotateCcw className="w-4 h-4 mr-2" />
            New Round
          </Button>
        </div>

        {gamePhase === 'dealing-first' && (
          <div className="flex justify-center mb-8">
            <div className="text-center space-y-4">
              <h2 className="text-xl font-semibold">Deal First Card to Each Player</h2>
              <Button size="lg" onClick={handleDealFirstCards} data-testid="button-deal-first">
                <Play className="w-4 h-4 mr-2" />
                Deal First Cards
              </Button>
            </div>
          </div>
        )}

        {gamePhase === 'dealing-second' && (
          <div className="flex justify-center mb-8">
            <div className="text-center space-y-4">
              <h2 className="text-xl font-semibold">Deal Second Card to Each Player</h2>
              <Button size="lg" onClick={handleDealSecondCards} data-testid="button-deal-second">
                <Play className="w-4 h-4 mr-2" />
                Deal Second Cards
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {players.map((player, idx) => (
                <PlayerZone
                  key={player.id}
                  playerNumber={player.id}
                  name={player.name}
                  balance={player.balance}
                  card1={player.card1}
                  card2={player.card2}
                  probabilities={player.probabilities}
                  isActive={gamePhase === 'playing' && idx === currentPlayerIndex}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <DeckStatus
              remainingCards={remainingCards}
              totalCards={52}
              revealedCards={revealedCards}
            />

            {gamePhase === 'playing' && currentPlayer && (
              <BettingControls
                maxBet={maxBet}
                playerBalance={currentPlayer.balance}
                canSplit={canSplit}
                splitCost={10}
                onBet={handleBet}
                onSkip={handleSkip}
                onSplit={handleSplit}
              />
            )}

            {revealedCards.length > 0 && revealedCards[revealedCards.length - 1] && (
              <div className="p-4 bg-card rounded-lg border border-card-border">
                <h3 className="text-sm font-semibold mb-3 text-center">Last Drawn Card</h3>
                <div className="flex justify-center">
                  <PlayingCard
                    rank={revealedCards[revealedCards.length - 1].rank}
                    suit={revealedCards[revealedCards.length - 1].suit as '♠' | '♥' | '♦' | '♣'}
                    size="md"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {currentPlayer && (
        <SplitDialog
          open={showSplitDialog}
          onClose={() => setShowSplitDialog(false)}
          originalCard1={currentPlayer.card1 || { rank: 'A', suit: '♠' }}
          originalCard2={currentPlayer.card2 || { rank: 'A', suit: '♥' }}
          newPair1={[
            { rank: 'K', suit: '♦' },
            { rank: '3', suit: '♣' },
          ]}
          newPair2={[
            { rank: 'Q', suit: '♠' },
            { rank: '7', suit: '♥' },
          ]}
          onSelectPair={handleSelectPair}
        />
      )}
    </div>
  );
}
