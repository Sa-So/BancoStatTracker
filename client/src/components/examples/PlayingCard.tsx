import PlayingCard from '../PlayingCard';

export default function PlayingCardExample() {
  return (
    <div className="flex gap-4 p-8 bg-background">
      <PlayingCard rank="A" suit="♠" size="sm" />
      <PlayingCard rank="K" suit="♥" size="md" />
      <PlayingCard rank="Q" suit="♦" size="lg" />
      <PlayingCard rank="7" suit="♣" size="md" faceDown />
    </div>
  );
}
