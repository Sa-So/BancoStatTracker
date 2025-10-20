import { useState } from 'react';
import DealingDialog from '../DealingDialog';
import { Button } from '@/components/ui/button';

export default function DealingDialogExample() {
  const [open, setOpen] = useState(false);

  const mockPlayers = [
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Player 2' },
    { id: 3, name: 'Player 3' },
    { id: 4, name: 'Player 4' },
  ];

  return (
    <div className="p-8 bg-background">
      <Button onClick={() => setOpen(true)}>Open Dealing Dialog</Button>
      <DealingDialog
        open={open}
        onClose={() => setOpen(false)}
        phase="first"
        players={mockPlayers}
        onDealCards={(cards) => console.log('Dealt cards:', cards)}
      />
    </div>
  );
}
