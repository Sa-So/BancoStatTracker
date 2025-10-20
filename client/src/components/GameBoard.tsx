import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PlayerZone from './PlayerZone';
import DeckStatus from './DeckStatus';
import PlayerActionDialog from './PlayerActionDialog';
import DealingDialog from './DealingDialog';
import PlayingCard from './PlayingCard';
import { RotateCcw, Play } from 'lucide-react';

interface Player {
  id: number;
  name: string;
  balance: number;
  card1?: { rank: string; suit: '♠' | '♥' | '♦' | '♣' };
  card2?: { rank: string; suit: '♠' | '♥' | '♦' | '♣' };
  probabilities?: {
    win: number;
    lose: number;
    doubleLoss: number;
  };
}

interface GameBoardProps {
  numPlayers: number;
  maxBet: number;
  startingBalance: number;
}

export default function GameBoard({ numPlayers, maxBet, startingBalance }: GameBoardProps) {
  const [gamePhase, setGamePhase] = useState<'dealing-first' | 'dealing-second' | 'playing'>('dealing-first');
  const [players, setPlayers] = useState<Player[]>(
    Array.from({ length: numPlayers }, (_, i) => ({
      id: i + 1,
      name: `Player ${i + 1}`,
      balance: startingBalance,
    }))
  );
  const [remainingCards, setRemainingCards] = useState(52);
  const [revealedCards, setRevealedCards] = useState<Array<{ rank: string; suit: string }>>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showDealingDialog, setShowDealingDialog] = useState(false);

  const calculateProbabilities = (card1: { rank: string }, card2: { rank: string }, deckComposition: Map<string, number>) => {
    const rankValues: { [key: string]: number } = {
      'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13
    };
    
    const val1 = rankValues[card1.rank];
    const val2 = rankValues[card2.rank];
    const min = Math.min(val1, val2);
    const max = Math.max(val1, val2);
    
    let winCount = 0;
    let loseCount = 0;
    let doubleLossCount = 0;
    let totalRemaining = 0;
    
    deckComposition.forEach((count, rank) => {
      const value = rankValues[rank];
      totalRemaining += count;
      
      if (value > min && value < max) {
        winCount += count;
      } else if (value === min || value === max) {
        doubleLossCount += count;
      } else {
        loseCount += count;
      }
    });
    
    if (totalRemaining === 0) {
      return { win: 0, lose: 0, doubleLoss: 0 };
    }
    
    return {
      win: (winCount / totalRemaining) * 100,
      lose: (loseCount / totalRemaining) * 100,
      doubleLoss: (doubleLossCount / totalRemaining) * 100,
    };
  };

  const getDeckComposition = () => {
    const composition = new Map<string, number>();
    const allRanks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    
    allRanks.forEach(rank => composition.set(rank, 4));
    
    players.forEach(player => {
      if (player.card1) {
        composition.set(player.card1.rank, (composition.get(player.card1.rank) || 0) - 1);
      }
      if (player.card2) {
        composition.set(player.card2.rank, (composition.get(player.card2.rank) || 0) - 1);
      }
    });
    
    revealedCards.forEach(card => {
      composition.set(card.rank, (composition.get(card.rank) || 0) - 1);
    });
    
    return composition;
  };

  const updatePlayerProbabilities = () => {
    const deckComposition = getDeckComposition();
    setPlayers(prevPlayers => 
      prevPlayers.map(player => {
        if (player.card1 && player.card2) {
          return {
            ...player,
            probabilities: calculateProbabilities(player.card1, player.card2, deckComposition),
          };
        }
        return player;
      })
    );
  };

  const handleDealFirstCards = (cards: Array<{ rank: string; suit: '♠' | '♥' | '♦' | '♣' }>) => {
    setPlayers(prevPlayers =>
      prevPlayers.map((player, idx) => ({
        ...player,
        card1: cards[idx],
      }))
    );
    setGamePhase('dealing-second');
    setRemainingCards(52 - numPlayers);
  };

  const handleDealSecondCards = (cards: Array<{ rank: string; suit: '♠' | '♥' | '♦' | '♣' }>) => {
    setPlayers(prevPlayers =>
      prevPlayers.map((player, idx) => ({
        ...player,
        card2: cards[idx],
      }))
    );
    setGamePhase('playing');
    setRemainingCards(52 - (numPlayers * 2));
    setTimeout(updatePlayerProbabilities, 100);
  };

  const handlePlayerClick = (player: Player) => {
    if (gamePhase === 'playing' && player.card1 && player.card2) {
      setSelectedPlayer(player);
    }
  };

  const handleBet = (amount: number, drawnCard: { rank: string; suit: '♠' | '♥' | '♦' | '♣' }) => {
    if (!selectedPlayer || !selectedPlayer.card1 || !selectedPlayer.card2) return;
    
    const rankValues: { [key: string]: number } = {
      'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13
    };
    
    const val1 = rankValues[selectedPlayer.card1.rank];
    const val2 = rankValues[selectedPlayer.card2.rank];
    const drawnVal = rankValues[drawnCard.rank];
    const min = Math.min(val1, val2);
    const max = Math.max(val1, val2);
    
    let balanceChange = 0;
    if (drawnVal > min && drawnVal < max) {
      balanceChange = amount;
    } else if (drawnVal === min || drawnVal === max) {
      balanceChange = -amount * 2;
    } else {
      balanceChange = -amount;
    }
    
    setPlayers(prevPlayers =>
      prevPlayers.map(p =>
        p.id === selectedPlayer.id
          ? { ...p, balance: p.balance + balanceChange }
          : p
      )
    );
    
    setRevealedCards(prev => [...prev, drawnCard]);
    setRemainingCards(prev => prev - 1);
    updatePlayerProbabilities();
    setSelectedPlayer(null);
  };

  const handleSkip = () => {
    setSelectedPlayer(null);
  };

  const handleSplit = (splitCards: Array<{ rank: string; suit: '♠' | '♥' | '♦' | '♣' }>, selectedPairIndex: number) => {
    if (!selectedPlayer || !selectedPlayer.card1 || !selectedPlayer.card2) return;
    
    const pair1Cards = [selectedPlayer.card1, splitCards[0], splitCards[1]];
    const pair2Cards = [selectedPlayer.card2, splitCards[2], splitCards[3]];
    
    const selectedPair = selectedPairIndex === 1 ? pair1Cards : pair2Cards;
    
    setPlayers(prevPlayers =>
      prevPlayers.map(p =>
        p.id === selectedPlayer.id
          ? {
              ...p,
              balance: p.balance - 10,
              card1: selectedPair[1],
              card2: selectedPair[2],
            }
          : p
      )
    );
    
    setRevealedCards(prev => [...prev, ...splitCards]);
    setRemainingCards(prev => prev - 4);
    updatePlayerProbabilities();
    setSelectedPlayer(null);
  };

  const handleNewRound = () => {
    setGamePhase('dealing-first');
    setPlayers(prevPlayers =>
      prevPlayers.map(p => ({
        ...p,
        card1: undefined,
        card2: undefined,
        probabilities: undefined,
      }))
    );
    setRemainingCards(52);
    setRevealedCards([]);
    setSelectedPlayer(null);
  };

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
              <Button size="lg" onClick={() => setShowDealingDialog(true)} data-testid="button-deal-first">
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
              <Button size="lg" onClick={() => setShowDealingDialog(true)} data-testid="button-deal-second">
                <Play className="w-4 h-4 mr-2" />
                Deal Second Cards
              </Button>
            </div>
          </div>
        )}

        {gamePhase === 'playing' && (
          <div className="mb-6 p-4 bg-primary/10 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Click on any player to take their turn</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {players.map((player) => (
                <div key={player.id} onClick={() => handlePlayerClick(player)}>
                  <PlayerZone
                    playerNumber={player.id}
                    name={player.name}
                    balance={player.balance}
                    card1={player.card1}
                    card2={player.card2}
                    probabilities={player.probabilities}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <DeckStatus
              remainingCards={remainingCards}
              totalCards={52}
              revealedCards={revealedCards}
            />

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

      {selectedPlayer && (
        <PlayerActionDialog
          open={!!selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
          player={selectedPlayer}
          maxBet={maxBet}
          onBet={handleBet}
          onSkip={handleSkip}
          onSplit={handleSplit}
        />
      )}

      <DealingDialog
        open={showDealingDialog}
        onClose={() => setShowDealingDialog(false)}
        phase={gamePhase === 'dealing-first' ? 'first' : 'second'}
        players={players}
        onDealCards={gamePhase === 'dealing-first' ? handleDealFirstCards : handleDealSecondCards}
      />
    </div>
  );
}
