import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface CardInputProps {
  label: string;
  rank: string;
  onRankChange: (rank: string) => void;
  testId?: string;
}

const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export default function CardInput({ label, rank, onRankChange, testId }: CardInputProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      <Select value={rank} onValueChange={onRankChange}>
        <SelectTrigger data-testid={testId ? `${testId}-rank` : undefined}>
          <SelectValue placeholder="Select Rank" />
        </SelectTrigger>
        <SelectContent>
          {RANKS.map(r => (
            <SelectItem key={r} value={r}>{r}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
