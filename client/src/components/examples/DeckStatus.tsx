import DeckStatus from '../DeckStatus';

export default function DeckStatusExample() {
  const mockRevealed = [
    { rank: 'A', suit: '♠' },
    { rank: 'K', suit: '♥' },
    { rank: '7', suit: '♦' },
    { rank: 'Q', suit: '♣' },
    { rank: '3', suit: '♠' },
  ];

  return (
    <div className="p-8 bg-background max-w-sm">
      <DeckStatus 
        remainingCards={38}
        totalCards={52}
        revealedCards={mockRevealed}
      />
    </div>
  );
}
