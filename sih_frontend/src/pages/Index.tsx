import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PreparednessScore from "@/components/PreparednessScore";
import ModuleCard from "@/components/ModuleCard";
import { ArrowRight,Microscope,Calculator, Monitor ,Shield, BookOpen, Target,Atom, FlaskConical, Sigma, Dna ,Zap,Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-disaster-education.jpg";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { translations } from "@/data/translations";

type Language = 'english' | 'tamil' | 'hindi';

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('english');
  const t = translations[currentLanguage];

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
  };
  // Mock data - in a real app, this would come from your backend
  const preparednessData = {
    score: 0,
    totalQuizzes: 30,
    completedQuizzes: 0,
    badges: ["Math Wizard", "Science Explore", "Chemistry Genius","Biology Expert","Quick Learner"],
  };

  const featuredModules = [
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
  ];

  const stats = [
    { label: "Active Learners", value: "50,000+", icon: Users },
    { label: "Schools Connected", value: "1,200+", icon: Globe },
    { label: "Lives Potentially Saved", value: "∞", icon: Shield },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="absolute top-8 right-8 z-10">
            <Select value={currentLanguage} onValueChange={(value: Language) => handleLanguageChange(value)}>
              <SelectTrigger className="w-40 bg-white/20 border-white/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="tamil">தமிழ்</SelectItem>
                <SelectItem value="hindi">हिंदी</SelectItem>
                <SelectItem value="odia">ଓଡ଼ିଆ</SelectItem>
                <SelectItem value="kannada">ಕನ್ನಡ</SelectItem>
                <SelectItem value="telugu">తెలుగు</SelectItem>
                <SelectItem value="malayalam">മലയാളം</SelectItem>
                <SelectItem value="bengali">বাংলা</SelectItem>
                <SelectItem value="marathi">मराठी</SelectItem>
                <SelectItem value="gujarati">ગુજરાતી</SelectItem>
                <SelectItem value="punjabi">ਪੰਜਾਬੀ</SelectItem>
                <SelectItem value="assamese">অসমীয়া</SelectItem>
                <SelectItem value="urdu">اردو</SelectItem>
                <SelectItem value="sanskrit">संस्कृतम्</SelectItem>
                <SelectItem value="nepali">नेपाली</SelectItem>
                <SelectItem value="bhutanese">འབྲུག་ཡིག</SelectItem>
                <SelectItem value="maithili">मैथिली</SelectItem>
                <SelectItem value="dogri">डोगरी</SelectItem>
                <SelectItem value="kashmiri">कश्मीरी</SelectItem>
                <SelectItem value="manipuri">মণিপুরী</SelectItem>
                <SelectItem value="sindhi">سنڌي</SelectItem>
                <SelectItem value="konkani">कोंकणी</SelectItem>
                <SelectItem value="bodo">बड़ो</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left animate-slide-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {t.heroTitle1}
                <span className="block text-secondary">{t.heroTitle2}</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {t.heroSubtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/modules">
                  <Button variant="secondary" size="lg" className="animate-pulse-glow">
                    <BookOpen className="h-5 w-5" />
                    {t.startLearning}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/simulation">
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <Zap className="h-5 w-5" />
                    {t.trySimulation}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Preparedness Score Card */}
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <PreparednessScore {...preparednessData} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="text-center animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-hero rounded-full mb-4 shadow-medium">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Featured Modules */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t.featuredModulesTitle}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.featuredModulesSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredModules.map((module, index) => (
              <div 
                key={module.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ModuleCard {...module} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/modules">
              <Button variant="hero" size="lg">
                <Target className="h-5 w-5" />
                {t.viewAllModules}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {t.ctaTitle}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t.ctaSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button variant="secondary" size="lg">
                {t.viewDashboard}
              </Button>
            </Link>
            <Link to="/emergency">
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                {t.emergencyContacts}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
