import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, RotateCcw } from 'lucide-react';
// import { Translations} from './TranslationToggle';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
  // const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ta'>('en');
  // const handleLanguageToggle = () => {
  //   setCurrentLanguage(prev => prev === 'en' ? 'ta' : 'en');
  // };
{/* <TranslationToggle 
                  currentLanguage={currentLanguage} 
                  onToggle={handleLanguageToggle} 
                /> */}
interface PuzzleGamesProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MemoryCard {
  id: string;
  content: string;
  matched: boolean;
  flipped: boolean;
}

interface BodyPart {
  id: string;
  name: string;
  position: { x: number; y: number };
}

interface Planet {
  id: string;
  name: string;
  correctOrder: number;
}

interface Element {
  symbol: string;
  name: string;
}

function PuzzleGames({ isOpen, onClose }: PuzzleGamesProps) {
  const [currentGame, setCurrentGame] = useState<'menu' | 'memory-cards' | 'periodic-match' | 'body-labeling' | 'solar-system'>('menu');
  const [gameCompleted, setGameCompleted] = useState(false);
  const [currentTask, setCurrentTask] = useState(1);
  const [score, setScore] = useState(0);

  // Memory Card Flip Game
  const scienceImages = ['🧪', '🔬', '🌍', '⚛️', '🧬', '🌡️', '⚡', '🌙', '☄️', '🦠'];
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  // Periodic Table Match Game
  const allElements = [
    { symbol: 'H', name: 'Hydrogen' },
    { symbol: 'He', name: 'Helium' },
    { symbol: 'Li', name: 'Lithium' },
    { symbol: 'Be', name: 'Beryllium' },
    { symbol: 'B', name: 'Boron' },
    { symbol: 'C', name: 'Carbon' },
    { symbol: 'N', name: 'Nitrogen' },
    { symbol: 'O', name: 'Oxygen' },
    { symbol: 'F', name: 'Fluorine' },
    { symbol: 'Ne', name: 'Neon' }
  ];
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);
  const [elementMatches, setElementMatches] = useState<Record<string, string>>({});

  // Human Body Labeling Game
  const allBodyParts = [
    { id: 'heart', name: 'Heart', position: { x: 50, y: 40 } },
    { id: 'brain', name: 'Brain', position: { x: 50, y: 15 } },
    { id: 'lungs', name: 'Lungs', position: { x: 45, y: 35 } },
    { id: 'stomach', name: 'Stomach', position: { x: 48, y: 50 } },
    { id: 'liver', name: 'Liver', position: { x: 55, y: 45 } },
    { id: 'kidneys', name: 'Kidneys', position: { x: 52, y: 55 } }
  ];
  const [selectedBodyParts, setSelectedBodyParts] = useState<BodyPart[]>([]);
  const [bodyAnswers, setBodyAnswers] = useState<Record<string, string>>({});

  // Solar System Quiz Game
  const allPlanets = [
    { id: 'mercury', name: 'Mercury', correctOrder: 1 },
    { id: 'venus', name: 'Venus', correctOrder: 2 },
    { id: 'earth', name: 'Earth', correctOrder: 3 },
    { id: 'mars', name: 'Mars', correctOrder: 4 },
    { id: 'jupiter', name: 'Jupiter', correctOrder: 5 },
    { id: 'saturn', name: 'Saturn', correctOrder: 6 },
    { id: 'uranus', name: 'Uranus', correctOrder: 7 },
    { id: 'neptune', name: 'Neptune', correctOrder: 8 }
  ];
  const [selectedPlanets, setSelectedPlanets] = useState<Planet[]>([]);
  const [planetOrder, setPlanetOrder] = useState<string[]>([]);

  // Randomization helper
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize games with randomized content
  const initializeMemoryGame = useCallback(() => {
    const shuffledImages = shuffleArray(scienceImages).slice(0, 5);
    const cards: MemoryCard[] = [];
    shuffledImages.forEach((image, index) => {
      cards.push(
        { id: `${image}-1`, content: image, matched: false, flipped: false },
        { id: `${image}-2`, content: image, matched: false, flipped: false }
      );
    });
    setMemoryCards(shuffleArray(cards));
    setFlippedCards([]);
    setMatchedPairs([]);
  }, []);

  const initializePeriodicGame = useCallback(() => {
    const randomElements = shuffleArray(allElements).slice(0, 5);
    setSelectedElements(randomElements);
    setElementMatches({});
  }, []);

  const initializeBodyGame = useCallback(() => {
    const randomParts = shuffleArray(allBodyParts).slice(0, 5);
    setSelectedBodyParts(randomParts);
    setBodyAnswers({});
  }, []);

  const initializeSolarGame = useCallback(() => {
    const randomPlanets = shuffleArray(allPlanets).slice(0, 5);
    setSelectedPlanets(randomPlanets);
    setPlanetOrder([]);
  }, []);

  // Game completion logic
  const completeCurrentTask = () => {
    setScore(prev => prev + 1);
    if (currentTask < 5) {
      setCurrentTask(prev => prev + 1);
      // Reinitialize current game with new random content
      switch (currentGame) {
        case 'memory-cards':
          initializeMemoryGame();
          break;
        case 'periodic-match':
          initializePeriodicGame();
          break;
        case 'body-labeling':
          initializeBodyGame();
          break;
        case 'solar-system':
          initializeSolarGame();
          break;
      }
    } else {
      setGameCompleted(true);
    }
  };

  const resetGame = () => {
    setCurrentTask(1);
    setScore(0);
    setGameCompleted(false);
    switch (currentGame) {
      case 'memory-cards':
        initializeMemoryGame();
        break;
      case 'periodic-match':
        initializePeriodicGame();
        break;
      case 'body-labeling':
        initializeBodyGame();
        break;
      case 'solar-system':
        initializeSolarGame();
        break;
    }
  };

  // Memory card game logic
  const handleCardFlip = (cardId: string) => {
    if (flippedCards.length >= 2) return;
    if (flippedCards.includes(cardId)) return;
    if (matchedPairs.includes(cardId)) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      const firstCard = memoryCards.find(c => c.id === first);
      const secondCard = memoryCards.find(c => c.id === second);

      if (firstCard && secondCard && firstCard.content === secondCard.content) {
        setMatchedPairs(prev => [...prev, first, second]);
        setFlippedCards([]);
        
        if (matchedPairs.length + 2 === memoryCards.length) {
          setTimeout(completeCurrentTask, 1000);
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  // Handle element matching
  const handleElementDrop = (symbol: string, name: string) => {
    const element = selectedElements.find(e => e.symbol === symbol);
    if (element && element.name === name) {
      setElementMatches(prev => ({ ...prev, [symbol]: name }));
      
      if (Object.keys(elementMatches).length + 1 === selectedElements.length) {
        setTimeout(completeCurrentTask, 1000);
      }
    }
  };

  // Handle body part labeling
  const handleBodyPartDrop = (partId: string, label: string) => {
    const part = selectedBodyParts.find(p => p.id === partId);
    if (part && part.name === label) {
      setBodyAnswers(prev => ({ ...prev, [partId]: label }));
      
      if (Object.keys(bodyAnswers).length + 1 === selectedBodyParts.length) {
        setTimeout(completeCurrentTask, 1000);
      }
    }
  };

  // Handle planet ordering
  const handlePlanetAdd = (planetName: string) => {
    if (!planetOrder.includes(planetName)) {
      const newOrder = [...planetOrder, planetName];
      setPlanetOrder(newOrder);
      
      if (newOrder.length === selectedPlanets.length) {
        const isCorrect = newOrder.every((planet, index) => {
          const planetData = selectedPlanets.find(p => p.name === planet);
          const expectedOrder = selectedPlanets
            .sort((a, b) => a.correctOrder - b.correctOrder)
            .map(p => p.name);
          return expectedOrder[index] === planet;
        });
        
        if (isCorrect) {
          setTimeout(completeCurrentTask, 1000);
        }
      }
    }
  };

  const renderGameMenu = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">🎮 Science Puzzle Games</h2>
        <p className="text-muted-foreground">Choose a fun game to play and learn! Each game has 5 randomized tasks.</p>
      </div>
      
      <div className="grid gap-4">
        <Button
          variant="outline"
          className="h-16 text-left justify-start p-4 hover:bg-primary/10"
          onClick={() => {
            setCurrentGame('memory-cards');
            initializeMemoryGame();
            setCurrentTask(1);
            setScore(0);
            setGameCompleted(false);
          }}
        >
          <div className="flex items-center gap-4">
            <div className="text-3xl">🧠</div>
            <div>
              <div className="font-semibold">Memory Card Flip Game</div>
              <div className="text-sm text-muted-foreground">Match pairs of science-related images</div>
            </div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-16 text-left justify-start p-4 hover:bg-primary/10"
          onClick={() => {
            setCurrentGame('periodic-match');
            initializePeriodicGame();
            setCurrentTask(1);
            setScore(0);
            setGameCompleted(false);
          }}
        >
          <div className="flex items-center gap-4">
            <div className="text-3xl">⚛️</div>
            <div>
              <div className="font-semibold">Periodic Table Match Game</div>
              <div className="text-sm text-muted-foreground">Match chemical elements with their symbols</div>
            </div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-16 text-left justify-start p-4 hover:bg-primary/10"
          onClick={() => {
            setCurrentGame('body-labeling');
            initializeBodyGame();
            setCurrentTask(1);
            setScore(0);
            setGameCompleted(false);
          }}
        >
          <div className="flex items-center gap-4">
            <div className="text-3xl">🫀</div>
            <div>
              <div className="font-semibold">Human Body Labeling Puzzle</div>
              <div className="text-sm text-muted-foreground">Place organs in correct locations</div>
            </div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-16 text-left justify-start p-4 hover:bg-primary/10"
          onClick={() => {
            setCurrentGame('solar-system');
            initializeSolarGame();
            setCurrentTask(1);
            setScore(0);
            setGameCompleted(false);
          }}
        >
          <div className="flex items-center gap-4">
            <div className="text-3xl">🪐</div>
            <div>
              <div className="font-semibold">Solar System Quiz Puzzle</div>
              <div className="text-sm text-muted-foreground">Arrange planets in correct order from the Sun</div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );

  const renderTaskHeader = (title: string, emoji: string) => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => setCurrentGame('menu')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h3 className="text-xl font-bold">{emoji} {title}</h3>
        <Button variant="ghost" size="sm" onClick={resetGame}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
      <div className="text-sm text-muted-foreground">
        Task {currentTask}/5 | Score: {score}
      </div>
    </div>
  );

  const renderCompletionMessage = () => (
    <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
      <div className="text-4xl mb-4">🎉</div>
      <h3 className="text-xl font-bold text-green-800 mb-2">Game Completed!</h3>
      <p className="text-green-700 mb-2">You scored {score} out of 5 tasks!</p>
      <p className="text-green-600 text-sm mb-4">Great job! Keep exploring science!</p>
      <div className="flex gap-2 justify-center">
        <Button onClick={() => setCurrentGame('menu')} variant="outline">
          Back to Games
        </Button>
        <Button onClick={resetGame}>
          Play Again
        </Button>
      </div>
    </div>
  );

  const renderMemoryCardGame = () => (
    <div className="space-y-4">
      {renderTaskHeader('Memory Card Flip Game', '🧠')}
      
      {gameCompleted ? renderCompletionMessage() : (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            Find and match pairs of science-related images!
          </p>

          <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
            {memoryCards.map(card => (
              <div
                key={card.id}
                className={`aspect-square rounded-lg border-2 cursor-pointer transition-all duration-300 flex items-center justify-center text-2xl ${
                  flippedCards.includes(card.id) || matchedPairs.includes(card.id)
                    ? 'bg-white border-primary'
                    : 'bg-primary/10 border-muted hover:bg-primary/20'
                }`}
                onClick={() => handleCardFlip(card.id)}
              >
                {flippedCards.includes(card.id) || matchedPairs.includes(card.id) ? card.content : '?'}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  const renderPeriodicMatchGame = () => (
    <div className="space-y-4">
      {renderTaskHeader('Periodic Table Match Game', '⚛️')}
      
      {gameCompleted ? renderCompletionMessage() : (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            Drag element names to match with their symbols!
          </p>

          <div className="grid grid-cols-5 gap-4 mb-6">
            {selectedElements.map(element => (
              <div key={element.symbol} className="text-center">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg mb-2 mx-auto">
                  {element.symbol}
                </div>
                <div 
                  className="h-8 border-2 border-dashed border-muted rounded flex items-center justify-center text-xs bg-background"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const draggedName = e.dataTransfer.getData('text/plain');
                    handleElementDrop(element.symbol, draggedName);
                  }}
                >
                  {elementMatches[element.symbol] || 'Drop here'}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {selectedElements
              .filter(element => !Object.values(elementMatches).includes(element.name))
              .map(element => (
                <Button
                  key={element.name}
                  variant="outline"
                  className="cursor-move"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', element.name)}
                >
                  {element.name}
                </Button>
              ))}
          </div>
        </>
      )}
    </div>
  );

  const renderBodyLabelingGame = () => (
    <div className="space-y-4">
      {renderTaskHeader('Human Body Labeling Puzzle', '🫀')}
      
      {gameCompleted ? renderCompletionMessage() : (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            Drag the organ names to the correct locations on the body!
          </p>

          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 h-80 rounded-lg border-2 border-dashed border-muted mx-auto max-w-sm">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-32 h-64 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full ">
              <div className="flex flex-col items-center gap-4  w-full max-w-md">
  <span 
    className="block mt-2" 
    style={{ 
      fontSize: '250px', 
      lineHeight: '1',
      width: '400px',
      textAlign: 'center'
    }}
  >
    🧍
  </span>
</div>
                {selectedBodyParts.map(part => (
                  <div
                    key={part.id}
                    className="absolute w-6 h-6 rounded-full bg-white border-2 border-muted flex items-center justify-center cursor-pointer hover:bg-muted"
                    style={{ 
                      left: `${part.position.x}%`, 
                      top: `${part.position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const draggedLabel = e.dataTransfer.getData('text/plain');
                      handleBodyPartDrop(part.id, draggedLabel);
                    }}
                  >
                    <span className="text-xs font-bold">
                      {bodyAnswers[part.id] ? bodyAnswers[part.id][0] : '?'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {selectedBodyParts
              .filter(part => !Object.values(bodyAnswers).includes(part.name))
              .map(part => (
                <Button
                  key={part.name}
                  variant="outline"
                  className="cursor-move"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', part.name)}
                >
                  {part.name}
                </Button>
              ))}
          </div>
        </>
      )}
    </div>
  );

  const renderSolarSystemGame = () => (
    <div className="space-y-4">
      {renderTaskHeader('Solar System Quiz Puzzle', '🪐')}
      
      {gameCompleted ? renderCompletionMessage() : (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            Arrange the planets in correct order from the Sun!
          </p>

          <div className="bg-gradient-to-r from-yellow-200 via-orange-200 to-purple-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">☀️</div>
              <span className="text-sm font-medium">Sun</span>
            </div>
            
            <div className="flex gap-2 min-h-16 bg-white/50 rounded-lg p-2 border-2 border-dashed border-muted">
              {planetOrder.map((planet, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    {planet[0]}
                  </div>
                  <span className="text-xs">{planet}</span>
                </div>
              ))}
              
              {planetOrder.length < selectedPlanets.length && (
                <div className="w-10 h-10 rounded-full border-2 border-dashed border-muted flex items-center justify-center text-muted-foreground">
                  ?
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {selectedPlanets
              .filter(planet => !planetOrder.includes(planet.name))
              .map(planet => (
                <Button
                  key={planet.name}
                  variant="outline"
                  onClick={() => handlePlanetAdd(planet.name)}
                >
                  {planet.name}
                </Button>
              ))}
          </div>

          {planetOrder.length === selectedPlanets.length && (
            <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
              {planetOrder.every((planet, index) => {
                const expectedOrder = selectedPlanets
                  .sort((a, b) => a.correctOrder - b.correctOrder)
                  .map(p => p.name);
                return expectedOrder[index] === planet;
              }) ? (
                <p className="text-blue-800 font-semibold">🎉 Congratulations! You placed the planets correctly!</p>
              ) : (
                <p className="text-red-800 font-semibold">❌ Oops! That's not correct, try again.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderCurrentGame = () => {
    switch (currentGame) {
      case 'memory-cards':
        return renderMemoryCardGame();
      case 'periodic-match':
        return renderPeriodicMatchGame();
      case 'body-labeling':
        return renderBodyLabelingGame();
      case 'solar-system':
        return renderSolarSystemGame();
      default:
        return renderGameMenu();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Science Puzzle Games</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {renderCurrentGame()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default PuzzleGames;