import { useState } from 'react';
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import GameSetup from "@/components/GameSetup";
import GameBoard from "@/components/GameBoard";

function App() {
  // TODO: remove mock state - this will be replaced with real state management
  const [gameConfig, setGameConfig] = useState<{
    numPlayers: number;
    maxBet: number;
    startingBalance: number;
  } | null>(null);

  const handleStartGame = (config: {
    numPlayers: number;
    maxBet: number;
    startingBalance: number;
  }) => {
    console.log('Game configuration set:', config);
    setGameConfig(config);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {!gameConfig ? (
          <GameSetup onStartGame={handleStartGame} />
        ) : (
          <GameBoard
            numPlayers={gameConfig.numPlayers}
            maxBet={gameConfig.maxBet}
            startingBalance={gameConfig.startingBalance}
          />
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
