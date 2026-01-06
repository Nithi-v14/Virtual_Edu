import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Cylinder } from '@react-three/drei';
import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Settings, Calculator, PieChart, TrendingUp, Shapes } from 'lucide-react';

export const FloodSimulation = () => {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null);
  const [showUnityGame, setShowUnityGame] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const experiments = [
    {
      id: "algebra",
      title: "Algebraic Equations",
      description: "Solve linear and quadratic equations",
      icon: <Calculator className="h-6 w-6" />,
      difficulty: "Intermediate"
    },
    {
      id: "geometry",
      title: "Geometric Shapes",
      description: "Explore area, perimeter, and volume calculations",
      icon: <Shapes className="h-6 w-6" />,
      difficulty: "Advanced"
    },
    {
      id: "statistics",
      title: "Data Analysis",
      description: "Learn about mean, median, and data visualization",
      icon: <PieChart className="h-6 w-6" />,
      difficulty: "Intermediate"
    },
    {
      id: "trigonometry",
      title: "Trigonometric Functions",
      description: "Study sine, cosine, and tangent relationships",
      icon: <TrendingUp className="h-6 w-6" />,
      difficulty: "Advanced"
    }
  ];

  const handlePlayPause = () => {
    if (showUnityGame) {
      setIsPlaying(!isPlaying);
      setIsPaused(!isPaused);
      // Send message to Unity iframe to play/pause
      const iframe = document.querySelector('iframe[title="Mathematics Virtual Lab"]') as HTMLIFrameElement;
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
      // Send reset message to Unity iframe
      const iframe = document.querySelector('iframe[title="Mathematics Virtual Lab"]') as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ action: 'reset' }, '*');
      }
    } else {
      // Reset without Unity game loaded
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const handleSettings = () => {
    if (showUnityGame) {
      // Send settings message to Unity iframe
      const iframe = document.querySelector('iframe[title="Mathematics Virtual Lab"]') as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ action: 'settings' }, '*');
      }
    } else {
      // Show settings dialog or notification when Unity not loaded
      alert('Settings will be available when the mathematics lab is launched.');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-flood/10 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-flood" />
            <span>Mathematics Problem Solver</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Practice algebra, geometry, and problem-solving through interactive mathematical challenges.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {experiments.map((experiment) => (
              <Card key={experiment.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-flood/10 rounded-lg">
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
                    variant="flood"
                    onClick={() => {
                      setActiveExperiment(experiment.id);
                      setShowUnityGame(true);
                    }}
                    className="w-full"
                  >
                    Start Problem
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Unity Mathematics Simulation */}
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
                      title="Mathematics Virtual Lab"
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
                          <span className="text-sm font-medium">Mathematics Lab Paused</span>
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