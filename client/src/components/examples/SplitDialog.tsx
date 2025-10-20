import { useState } from 'react';
import SplitDialog from '../SplitDialog';
import { Button } from '@/components/ui/button';

export default function SplitDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8 bg-background">
      <Button onClick={() => setOpen(true)}>Open Split Dialog</Button>
      <SplitDialog
        open={open}
        onClose={() => setOpen(false)}
        originalCard1={{ rank: '7', suit: '♠' }}
        originalCard2={{ rank: '7', suit: '♥' }}
        newPair1={[
          { rank: 'K', suit: '♦' },
          { rank: '3', suit: '♣' },
        ]}
        newPair2={[
          { rank: 'A', suit: '♠' },
          { rank: 'Q', suit: '♥' },
        ]}
        onSelectPair={(pairIndex) => console.log('Selected pair:', pairIndex)}
      />
    </div>
  );
}
