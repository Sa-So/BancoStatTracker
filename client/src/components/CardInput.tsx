import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface CardInputProps {
  label: string;
  rank: string;
  suit: '♠' | '♥' | '♦' | '♣';
  onRankChange: (rank: string) => void;
  onSuitChange: (suit: '♠' | '♥' | '♦' | '♣') => void;
  testId?: string;
}

const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITS: Array<'♠' | '♥' | '♦' | '♣'> = ['♠', '♥', '♦', '♣'];

export default function CardInput({ label, rank, suit, onRankChange, onSuitChange, testId }: CardInputProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      <div className="grid grid-cols-2 gap-2">
        <Select value={rank} onValueChange={onRankChange}>
          <SelectTrigger data-testid={testId ? `${testId}-rank` : undefined}>
            <SelectValue placeholder="Rank" />
          </SelectTrigger>
          <SelectContent>
            {RANKS.map(r => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={suit} onValueChange={(v) => onSuitChange(v as any)}>
          <SelectTrigger data-testid={testId ? `${testId}-suit` : undefined}>
            <SelectValue placeholder="Suit" />
          </SelectTrigger>
          <SelectContent>
            {SUITS.map(s => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
