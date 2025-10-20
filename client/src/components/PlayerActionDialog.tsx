import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PlayingCard from './PlayingCard';
import ProbabilityDisplay from './ProbabilityDisplay';
import { Coins, SkipForward, Split, CheckCircle } from 'lucide-react';

interface PlayerActionDialogProps {
  open: boolean;
  onClose: () => void;
  player: {
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
  };
  maxBet: number;
  onBet: (amount: number, drawnCard: { rank: string; suit: '♠' | '♥' | '♦' | '♣' }) => void;
  onSkip: () => void;
  onSplit: (splitCards: Array<{ rank: string; suit: '♠' | '♥' | '♦' | '♣' }>, selectedPairIndex: number) => void;
}

const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITS: Array<'♠' | '♥' | '♦' | '♣'> = ['♠', '♥', '♦', '♣'];

const getRandomSuit = () => SUITS[Math.floor(Math.random() * SUITS.length)];

export default function PlayerActionDialog({
  open,
  onClose,
  player,
  maxBet,
  onBet,
  onSkip,
  onSplit,
}: PlayerActionDialogProps) {
  const [action, setAction] = useState<'bet' | 'skip' | 'split'>('bet');
  const [betAmount, setBetAmount] = useState('');
  const [drawnRank, setDrawnRank] = useState('');
  
  // For split action
  const [splitCard1Rank, setSplitCard1Rank] = useState('');
  const [splitCard2Rank, setSplitCard2Rank] = useState('');
  const [splitCard3Rank, setSplitCard3Rank] = useState('');
  const [splitCard4Rank, setSplitCard4Rank] = useState('');
  const [selectedPair, setSelectedPair] = useState<1 | 2>(1);

  const canSplit = player.card1?.rank === player.card2?.rank;
  const effectiveMaxBet = Math.min(maxBet, player.balance);

  const handleConfirm = () => {
    if (action === 'bet') {
      const amount = parseInt(betAmount);
      if (amount > 0 && amount <= effectiveMaxBet && drawnRank) {
        onBet(amount, { rank: drawnRank, suit: getRandomSuit() });
        resetForm();
        onClose();
      }
    } else if (action === 'skip') {
      onSkip();
      resetForm();
      onClose();
    } else if (action === 'split') {
      if (splitCard1Rank && splitCard2Rank && splitCard3Rank && splitCard4Rank) {
        onSplit([
          { rank: splitCard1Rank, suit: getRandomSuit() },
          { rank: splitCard2Rank, suit: getRandomSuit() },
          { rank: splitCard3Rank, suit: getRandomSuit() },
          { rank: splitCard4Rank, suit: getRandomSuit() },
        ], selectedPair);
        resetForm();
        onClose();
      }
    }
  };

  const resetForm = () => {
    setAction('bet');
    setBetAmount('');
    setDrawnRank('');
    setSplitCard1Rank('');
    setSplitCard2Rank('');
    setSplitCard3Rank('');
    setSplitCard4Rank('');
    setSelectedPair(1);
  };

  const isValid = () => {
    if (action === 'bet') {
      const amount = parseInt(betAmount);
      return amount > 0 && amount <= effectiveMaxBet && drawnRank;
    } else if (action === 'skip') {
      return true;
    } else if (action === 'split') {
      return splitCard1Rank && splitCard2Rank && splitCard3Rank && splitCard4Rank && player.balance >= 10;
    }
    return false;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{player.name}'s Turn</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Player Cards */}
          <div className="flex gap-4 justify-center p-4 bg-muted/30 rounded-lg">
            {player.card1 && <PlayingCard rank={player.card1.rank} suit={player.card1.suit} size="lg" />}
            {player.card2 && <PlayingCard rank={player.card2.rank} suit={player.card2.suit} size="lg" />}
          </div>

          {/* Balance */}
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Current Balance</div>
            <div className="text-3xl font-mono font-bold text-accent">₹{player.balance}</div>
          </div>

          {/* Probabilities */}
          {player.probabilities && (
            <div className="p-4 bg-card rounded-lg border border-card-border">
              <h3 className="text-sm font-semibold mb-3">Probabilities</h3>
              <ProbabilityDisplay
                winProbability={player.probabilities.win}
                loseProbability={player.probabilities.lose}
                doubleLossProbability={player.probabilities.doubleLoss}
              />
            </div>
          )}

          {/* Action Selection */}
          <div className="flex gap-2">
            <Button
              variant={action === 'bet' ? 'default' : 'outline'}
              onClick={() => setAction('bet')}
              className="flex-1"
              data-testid="select-bet"
            >
              <Coins className="w-4 h-4 mr-2" />
              Bet
            </Button>
            <Button
              variant={action === 'skip' ? 'default' : 'outline'}
              onClick={() => setAction('skip')}
              className="flex-1"
              data-testid="select-skip"
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Skip
            </Button>
            {canSplit && (
              <Button
                variant={action === 'split' ? 'default' : 'outline'}
                onClick={() => setAction('split')}
                className="flex-1"
                disabled={player.balance < 10}
                data-testid="select-split"
              >
                <Split className="w-4 h-4 mr-2" />
                Split (₹10)
              </Button>
            )}
          </div>

          {/* Action-specific inputs */}
          {action === 'bet' && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="betAmount">Bet Amount (₹)</Label>
                <Input
                  id="betAmount"
                  type="number"
                  min={0}
                  max={effectiveMaxBet}
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder={`Max: ₹${effectiveMaxBet}`}
                  data-testid="input-bet-amount"
                />
              </div>
              <div className="space-y-2">
                <Label>Card Drawn (Rank)</Label>
                <Select value={drawnRank} onValueChange={setDrawnRank}>
                  <SelectTrigger data-testid="select-drawn-rank">
                    <SelectValue placeholder="Select Rank" />
                  </SelectTrigger>
                  <SelectContent>
                    {RANKS.map(rank => (
                      <SelectItem key={rank} value={rank}>{rank}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {action === 'split' && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Enter the 4 card ranks dealt (2 on each original card)</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Pair 1 - Card 1</Label>
                  <Select value={splitCard1Rank} onValueChange={setSplitCard1Rank}>
                    <SelectTrigger data-testid="select-split-card1-rank">
                      <SelectValue placeholder="Rank" />
                    </SelectTrigger>
                    <SelectContent>
                      {RANKS.map(rank => <SelectItem key={rank} value={rank}>{rank}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Pair 1 - Card 2</Label>
                  <Select value={splitCard2Rank} onValueChange={setSplitCard2Rank}>
                    <SelectTrigger data-testid="select-split-card2-rank">
                      <SelectValue placeholder="Rank" />
                    </SelectTrigger>
                    <SelectContent>
                      {RANKS.map(rank => <SelectItem key={rank} value={rank}>{rank}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Pair 2 - Card 1</Label>
                  <Select value={splitCard3Rank} onValueChange={setSplitCard3Rank}>
                    <SelectTrigger data-testid="select-split-card3-rank">
                      <SelectValue placeholder="Rank" />
                    </SelectTrigger>
                    <SelectContent>
                      {RANKS.map(rank => <SelectItem key={rank} value={rank}>{rank}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Pair 2 - Card 2</Label>
                  <Select value={splitCard4Rank} onValueChange={setSplitCard4Rank}>
                    <SelectTrigger data-testid="select-split-card4-rank">
                      <SelectValue placeholder="Rank" />
                    </SelectTrigger>
                    <SelectContent>
                      {RANKS.map(rank => <SelectItem key={rank} value={rank}>{rank}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <Label className="text-sm font-semibold mb-2 block">Choose which pair to keep</Label>
                <div className="flex gap-3">
                  <Button
                    variant={selectedPair === 1 ? 'default' : 'outline'}
                    onClick={() => setSelectedPair(1)}
                    className="flex-1"
                    data-testid="select-pair-1"
                  >
                    Pair 1
                  </Button>
                  <Button
                    variant={selectedPair === 2 ? 'default' : 'outline'}
                    onClick={() => setSelectedPair(2)}
                    className="flex-1"
                    data-testid="select-pair-2"
                  >
                    Pair 2
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Confirm Button */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1" data-testid="button-cancel-action">
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!isValid()}
              className="flex-1"
              data-testid="button-confirm-action"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm {action === 'bet' ? 'Bet' : action === 'skip' ? 'Skip' : 'Split'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
