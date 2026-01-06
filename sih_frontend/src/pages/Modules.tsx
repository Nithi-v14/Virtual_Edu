import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ModuleCard from "@/components/ModuleCard";
import { Mountain, Flame, Waves, Atom, FlaskConical, Sigma, BookOpen, Search, Filter, Monitor, Microscope, Calculator, Globe, Dna } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { translations } from "@/data/translations";

type Language = 'english' | 'tamil' | 'hindi';

const Modules = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('english');
  const t = translations[currentLanguage];

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const allModules = useMemo(() => [
    // Grade 6-8 Modules
    {
      id: "basic-science-6-8",
      title: "Basic Science Concepts",
      description: "Explore fundamental science concepts including plants, animals, and natural phenomena through interactive activities.",
      icon: <Microscope className="h-6 w-6" />,
      difficulty: "Beginner" as const,
      duration: "20 min",
      participants: 22500,
      progress: 0,
      variant: "earthquake" as const,
      isCompleted: false,
      category: "6-8"
    },
    {
      id: "basic-math-6-8",
      title: "Basic Mathematics",
      description: "Learn arithmetic, fractions, decimals, and basic geometry through fun problem-solving activities.",
      icon: <Calculator className="h-6 w-6" />,
      difficulty: "Beginner" as const,
      duration: "25 min",
      participants: 28900,
      progress: 0,
      variant: "fire" as const,
      isCompleted: false,
      category: "6-8"
    },
    {
      id: "intro-computer-6-8",
      title: "Introduction to Computers",
      description: "Discover basics of computers, internet safety, and simple programming concepts through interactive lessons.",
      icon: <Monitor className="h-6 w-6" />,
      difficulty: "Beginner" as const,
      duration: "30 min",
      participants: 19750,
      progress: 0,
      variant: "flood" as const,
      isCompleted: false,
      category: "6-8"
    },
    {
      id: "earth-science-6-8",
      title: "Earth & Environment",
      description: "Study our planet, weather patterns, rocks, minerals, and environmental conservation.",
      icon: <Globe className="h-6 w-6" />,
      difficulty: "Beginner" as const,
      duration: "22 min",
      participants: 16800,
      progress: 0,
      variant: "earthquake" as const,
      isCompleted: false,
      category: "6-8"
    },
    
    // Grade 9-10 Modules
    {
      id: "physics-basics-9-10",
      title: "Physics Fundamentals",
      description: "Master motion, forces, light, sound, and electricity through virtual experiments and simulations.",
      icon: <Atom className="h-6 w-6" />,
      difficulty: "Intermediate" as const,
      duration: "35 min",
      participants: 21300,
      progress: 0,
      variant: "fire" as const,
      isCompleted: false,
      category: "9-10"
    },
    {
      id: "chemistry-basics-9-10",
      title: "Chemistry Essentials",
      description: "Explore atoms, molecules, chemical reactions, and acids & bases through safe virtual lab experiments.",
      icon: <FlaskConical className="h-6 w-6" />,
      difficulty: "Intermediate" as const,
      duration: "40 min",
      participants: 18600,
      progress: 0,
      variant: "flood" as const,
      isCompleted: false,
      category: "9-10"
    },
    {
      id: "biology-9-10",
      title: "Life Sciences",
      description: "Study living organisms, human body systems, genetics, and evolution through interactive models.",
      icon: <Dna className="h-6 w-6" />,
      difficulty: "Intermediate" as const,
      duration: "30 min",
      participants: 20150,
      progress: 0,
      variant: "earthquake" as const,
      isCompleted: false,
      category: "9-10"
    },
    {
      id: "advanced-math-9-10",
      title: "Advanced Mathematics",
      description: "Tackle algebra, coordinate geometry, trigonometry, and statistics with step-by-step guidance.",
      icon: <Sigma className="h-6 w-6" />,
      difficulty: "Intermediate" as const,
      duration: "45 min",
      participants: 17950,
      progress: 0,
      variant: "fire" as const,
      isCompleted: false,
      category: "9-10"
    },
    {
      id: "computer-science-9-10",
      title: "Computer Science Basics",
      description: "Learn programming fundamentals, data structures, and problem-solving with coding exercises.",
      icon: <Monitor className="h-6 w-6" />,
      difficulty: "Intermediate" as const,
      duration: "50 min",
      participants: 14200,
      progress: 0,
      variant: "flood" as const,
      isCompleted: false,
      category: "9-10"
    },

    // Grade 11-12 Modules (Updated existing ones)
    {
      id: "Physics Fundamentals",
      title: t.earthquakeTitle,
      description: t.earthquakeDescription,
      icon: <Atom className="h-6 w-6" />,
      difficulty: "Advanced" as const,
      duration: "60 min",
      participants: 15420,
      progress: 0,
      variant: "earthquake" as const,
      isCompleted: false,
      category: "11-12"
    },
    {
      id: "Chemistry Basics",
      title: t.fireTitle, 
      description: t.fireDescription,
      icon: <FlaskConical className="h-6 w-6" />,
      difficulty: "Advanced" as const,
      duration: "55 min",
      participants: 12680,
      progress: 0,
      variant: "fire" as const,
      isCompleted: false,
      category: "11-12"
    },
    {
      id: "biology-11-12",
      title: "Advanced Zoology", 
      description: "Study genetics, molecular biology, and advanced life sciences through interactive models and simulations.",
      icon: <Dna className="h-6 w-6" />,
      difficulty: "Advanced" as const,
      duration: "45 min",
      participants: 14850,
      progress: 0,
      variant: "earthquake" as const,
      isCompleted: false,
      category: "11-12"
    },
    {
      id: "botany-11-12",
      title: "Advanced Botany",
      description: "Explore plant anatomy, physiology, and botanical sciences through virtual laboratory experiments.",
      icon: <Microscope className="h-6 w-6" />,
      difficulty: "Advanced" as const,
      duration: "40 min",
      participants: 12400,
      progress: 0,
      variant: "fire" as const,
      isCompleted: false,
      category: "11-12"
    }
  ], [t]);

  const [modules, setModules] = useState(allModules);

  useEffect(() => {
    setModules(allModules);
  }, [allModules]);

  useEffect(() => {
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '{}');
    
    setModules(prevModules => 
      prevModules.map(module => {
        const completedData = completedModules[module.id];
        if (completedData) {
          return {
            ...module,
            isCompleted: completedData.completed,
            progress: completedData.score,
          };
        }
        return module;
      })
    );
  }, [currentLanguage, allModules]);

  const categories = [
    { id: "all", label: t.allModulesCategory, count: modules.length },
    { id: "6-8", label: t.naturalDisastersCategory, count: modules.filter(m => m.category === "6-8").length },
    { id: "9-10", label: t.humanMadeCategory, count: modules.filter(m => m.category === "9-10").length },
    { id: "11-12", label: t.secondary, count: modules.filter(m=>m.category=="11-12").length },
  ];

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 via-white to-green-600 py-16">
        <div className="absolute top-4 right-4">
          <Select onValueChange={(value: Language) => handleLanguageChange(value)} defaultValue={currentLanguage}>
            <SelectTrigger className="w-[180px] bg-white/20 text-white border-white/30">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">हिंदी</SelectItem>
              <SelectItem value="tamil">தமிழ்</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-blue-800">
            <BookOpen className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {t.modulesTitle}
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              {t.modulesSubtitle}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <span>{category.label}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module, index) => (
            <div
              key={module.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ModuleCard {...module} />
            </div>
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              {t.noModulesFound}
            </h3>
            <p className="text-muted-foreground">
              {t.noModulesSuggestion}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modules;