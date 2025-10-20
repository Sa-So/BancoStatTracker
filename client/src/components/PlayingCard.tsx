interface PlayingCardProps {
  rank: string;
  suit: '♠' | '♥' | '♦' | '♣';
  size?: 'sm' | 'md' | 'lg';
  faceDown?: boolean;
}

export default function PlayingCard({ rank, suit, size = 'md', faceDown = false }: PlayingCardProps) {
  const isRed = suit === '♥' || suit === '♦';
  
  const sizeClasses = {
    sm: 'w-14 h-20 text-lg',
    md: 'w-20 h-28 text-2xl',
    lg: 'w-24 h-36 text-3xl',
  };

  if (faceDown) {
    return (
      <div className={`${sizeClasses[size]} rounded-md border-2 border-card-border bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md`}>
        <div className="text-primary-foreground text-4xl opacity-30">♠</div>
      </div>
    );
  }

  return (
    <div 
      className={`${sizeClasses[size]} rounded-md border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-50 flex flex-col items-center justify-between p-2 shadow-md`}
      data-testid={`card-${rank}${suit}`}
    >
      <div className={`font-bold ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
        {rank}
      </div>
      <div className={`${isRed ? 'text-red-600' : 'text-gray-900'} ${size === 'lg' ? 'text-5xl' : size === 'md' ? 'text-4xl' : 'text-2xl'}`}>
        {suit}
      </div>
      <div className={`font-bold ${isRed ? 'text-red-600' : 'text-gray-900'} rotate-180`}>
        {rank}
      </div>
    </div>
  );
}
