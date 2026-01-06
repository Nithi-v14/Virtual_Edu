import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dna, Heart, Eye, Brain, Microscope, Play, Pause, RotateCcw, Settings } from "lucide-react";

export const BiologySimulation = () => {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null);
  const [showUnityGame, setShowUnityGame] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const experiments = [
    {
      id: "genetics",
      title: "Genetic Inheritance",
      description: "Study DNA, chromosomes, and heredity patterns",
      icon: <Dna className="h-6 w-6" />,
      difficulty: "Advanced"
    },
    {
      id: "circulation",
      title: "Circulatory System",
      description: "Explore heart function and blood circulation",
      icon: <Heart className="h-6 w-6" />,
      difficulty: "Intermediate"
    },
    {
      id: "vision",
      title: "Human Eye Structure",
      description: "Learn about vision and eye anatomy",
      icon: <Eye className="h-6 w-6" />,
      difficulty: "Intermediate"
    },
    {
      id: "nervous",
      title: "Nervous System",
      description: "Study brain function and neural pathways",
      icon: <Brain className="h-6 w-6" />,
      difficulty: "Advanced"
    }
  ];

  const handlePlayPause = () => {
    if (showUnityGame) {
      setIsPlaying(!isPlaying);
      setIsPaused(!isPaused);
      const iframe = document.querySelector('iframe[title="Biology Virtual Lab"]') as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ 
          action: isPlaying ? 'pause' : 'play' 
        }, '*');
      }
    }
  };

  const handleReset = () => {
    if (showUnityGame) {
      setIsPlaying(false);
      setIsPaused(false);
      const iframe = document.querySelector('iframe[title="Biology Virtual Lab"]') as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ action: 'reset' }, '*');
      }
    } else {
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const handleSettings = () => {
    if (showUnityGame) {
      const iframe = document.querySelector('iframe[title="Biology Virtual Lab"]') as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ action: 'settings' }, '*');
      }
    } else {
      alert('Settings will be available when the biology lab is launched.');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-earthquake/10 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Dna className="h-6 w-6 text-earthquake" />
            <span>Biology Virtual Laboratory</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Explore living organisms, human anatomy, and biological processes through interactive simulations.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {experiments.map((experiment) => (
              <Card key={experiment.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-earthquake/10 rounded-lg">
                      {experiment.icon}
                    </div>
                    <Badge variant={experiment.difficulty === "Advanced" ? "destructive" : "secondary"}>
                      {experiment.difficulty}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2">{experiment.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{experiment.description}</p>
                  <Button 
                    size="sm" 
                    variant="earthquake"
                    onClick={() => {
                      setActiveExperiment(experiment.id);
                      setShowUnityGame(true);
                    }}
                    className="w-full"
                  >
                    Start Experiment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Unity Biology Simulation */}
      {activeExperiment && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {experiments.find(e => e.id === activeExperiment)?.title} - Unity Simulation
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant={isPaused ? "default" : "outline"}
                  size="sm"
                  onClick={handlePlayPause}
                  disabled={!showUnityGame}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSettings}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 p-4 rounded-lg">
              <CardContent className="space-y-4">
                {showUnityGame ? (
                  <div className="relative">
                    <iframe
                      src="Project/index.html"
                      className="w-full h-[600px] rounded-md border"
                      title="Biology Virtual Lab"
                    />
                    <Button
                      variant="outline"
                      className="absolute top-2 right-2 bg-background"
                      onClick={() => {
                        setShowUnityGame(false);
                        setActiveExperiment(null);
                        setIsPlaying(false);
                        setIsPaused(false);
                      }}
                    >
                      Close
                    </Button>
                    {isPaused && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="bg-background/90 backdrop-blur px-4 py-2 rounded-lg">
                          <span className="text-sm font-medium">Biology Lab Paused</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    className="w-full mt-4"
                    onClick={() => setShowUnityGame(true)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Launch Virtual Lab
                  </Button>
                )}
              </CardContent>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};