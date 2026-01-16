import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, BookOpen, Play, PhoneCall, BarChart3, Menu, LogOut, User, BookAIcon, BookOpenText } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import PuzzleGames from "@/pages/PuzzleGames";
import { Gamepad2 } from "lucide-react";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showGames, setShowGames] = useState(false);

  // Get current user
  const getCurrentUser = () => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  };

  const currentUser = getCurrentUser();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
    toast({
      title: "Logged out successfully",
      description: "See you soon! Stay prepared! 👋",
    });
    navigate('/login');
    // navigate('/register')
  };

  const handleGamesClick = () => {
    setShowGames(true);
    setIsMenuOpen(false); // Close mobile menu when games open
  };

  const navItems = [
    { name: "Home", path: "/", icon: Shield },
    { name: "Modules", path: "/modules", icon: BookOpen },
    { name: "Simulation", path: "/simulation", icon: Play },
    { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
    // { name: "Contact", path: "/emergency", icon: PhoneCall },
  ];

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-hero rounded-xl shadow-soft group-hover:shadow-medium transition-all duration-300">
              <BookOpenText className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">Virtual Edu</h1>
              <p className="text-xs text-muted-foreground">Education Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.name} to={item.path}>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 hover:bg-accent/50 transition-all duration-300"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* User Info & Navigation */}
          <div className="flex items-center space-x-4">
            {/* User Info */}
            {currentUser && (
              <div className="hidden sm:flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Welcome, <span className="font-medium text-foreground">{currentUser.name}</span>
                </span>
                {currentUser.type && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full capitalize">
                    {currentUser.type}
                  </span>
                )}
              </div>
            )}

            {/* Desktop Games Button */}
            <div className="hidden sm:inline">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowGames(true)}
                className="flex items-center gap-2 hover:bg-gradient-to-r hover:from-science-purple/10 hover:to-science-blue/10 bg-white/80 backdrop-blur-sm"
              >
                <Gamepad2 className="w-4 h-4" />
                <span className="hidden lg:inline text-black">Games</span>   
              </Button>
            </div>

            {/* Desktop Logout Button */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center space-x-1 hidden sm:flex"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden lg:inline">Logout</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          {/* PuzzleGames Modal */}
          <PuzzleGames isOpen={showGames} onClose={() => setShowGames(false)} />
        </div>
     
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {/* User info on mobile */}
              {currentUser && (
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg mb-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{currentUser.name}</span>
                    {currentUser.type && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full capitalize">
                        {currentUser.type}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Items */}
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start space-x-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                );
              })}

              {/* Mobile Games Button */}
              <Button
                variant="ghost"
                className="w-full justify-start space-x-2 hover:bg-gradient-to-r hover:from-science-purple/10 hover:to-science-blue/10"
                onClick={handleGamesClick}
              >
                <Gamepad2 className="h-4 w-4" />
                <span>Games</span>
              </Button>

              {/* Mobile Logout Button */}
              <Button 
                variant="ghost" 
                className="w-full justify-start space-x-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;