import ProbabilityDisplay from '../ProbabilityDisplay';
import { Card } from '@/components/ui/card';

export default function ProbabilityDisplayExample() {
  return (
    <div className="flex gap-8 p-8 bg-background">
      <Card className="p-4 w-64">
        <h3 className="text-sm font-semibold mb-4">Full Display</h3>
        <ProbabilityDisplay 
          winProbability={45.5}
          loseProbability={42.3}
          doubleLossProbability={12.2}
        />
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-4">Compact Display</h3>
        <ProbabilityDisplay 
          winProbability={60.0}
          loseProbability={30.0}
          doubleLossProbability={10.0}
          compact
        />
      </Card>
    </div>
  );
}
