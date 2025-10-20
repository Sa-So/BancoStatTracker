import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ProbabilityDisplayProps {
  winProbability: number;
  loseProbability: number;
  doubleLossProbability: number;
  compact?: boolean;
}

export default function ProbabilityDisplay({ 
  winProbability, 
  loseProbability, 
  doubleLossProbability,
  compact = false 
}: ProbabilityDisplayProps) {
  if (compact) {
    return (
      <div className="flex gap-3 text-xs font-mono">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-win" />
          <span className="text-win-foreground bg-win px-1.5 py-0.5 rounded" data-testid="prob-win">
            {winProbability.toFixed(1)}%
          </span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingDown className="w-3 h-3 text-destructive" />
          <span className="text-destructive-foreground bg-destructive px-1.5 py-0.5 rounded" data-testid="prob-lose">
            {loseProbability.toFixed(1)}%
          </span>
        </div>
        <div className="flex items-center gap-1">
          <AlertTriangle className="w-3 h-3 text-destructive" />
          <span className="text-destructive-foreground bg-destructive px-1.5 py-0.5 rounded" data-testid="prob-double-loss">
            {doubleLossProbability.toFixed(1)}%
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3" data-testid="probability-display">
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-win" />
            <span className="text-foreground">Win</span>
          </div>
          <span className="font-mono font-semibold text-win" data-testid="prob-win">
            {winProbability.toFixed(1)}%
          </span>
        </div>
        <Progress value={winProbability} className="h-2 bg-muted" indicatorClassName="bg-win" />
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-destructive" />
            <span className="text-foreground">Lose</span>
          </div>
          <span className="font-mono font-semibold text-destructive" data-testid="prob-lose">
            {loseProbability.toFixed(1)}%
          </span>
        </div>
        <Progress value={loseProbability} className="h-2 bg-muted" indicatorClassName="bg-destructive" />
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-foreground">Double Loss</span>
          </div>
          <span className="font-mono font-semibold text-destructive" data-testid="prob-double-loss">
            {doubleLossProbability.toFixed(1)}%
          </span>
        </div>
        <Progress value={doubleLossProbability} className="h-2 bg-muted" indicatorClassName="bg-destructive" />
      </div>
    </div>
  );
}
