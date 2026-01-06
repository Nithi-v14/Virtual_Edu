import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Award, 
  Target,
  Calendar,
  Clock,
  Shield,
  Phone,
  BookOpen,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Get current user data from localStorage
  const getCurrentUser = () => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  };

  const currentUser = getCurrentUser();
  
  // Default dashboard data structure
  const defaultDashboardData = {
    overallScore: 0,
    modulesCompleted: 0,
    totalModules: 9,
    timeSpent: "0h 0m",
    streak: 0,
    rank: 0,
    totalUsers: 1247,
    badges: [],
    recentActivity: [],
    weeklyProgress: [
      { day: "Mon", modules: 0, quizzes: 0 },
      { day: "Tue", modules: 0, quizzes: 0 },
      { day: "Wed", modules: 0, quizzes: 0 },
      { day: "Thu", modules: 0, quizzes: 0 },
      { day: "Fri", modules: 0, quizzes: 0 },
      { day: "Sat", modules: 0, quizzes: 0 },
      { day: "Sun", modules: 0, quizzes: 0 },
    ]
  };

  // Initialize dashboard data based on user progress with proper fallbacks
  const dashboardData = currentUser?.progress ? {
    ...defaultDashboardData,
    ...currentUser.progress,
    badges: currentUser.progress.badges || [],
    recentActivity: currentUser.progress.recentActivity || [],
    weeklyProgress: currentUser.progress.weeklyProgress || defaultDashboardData.weeklyProgress
  } : defaultDashboardData;

  // Default badges available to earn
  const availableBadges = [
    { name: "Math Wizard", icon: "🏆", earned: false, date: null },
    { name: "Science Explore", icon: "🔬", earned: false, date: null },
    { name: "Chemistry Genius", icon: "👨‍🔬", earned: false, date: null },
    { name: "Quick Learner", icon: "📖", earned: false, date: null },
    { name: "Biology Expert", icon: "🧬", earned: false, date: null },
  ];

  const displayBadges = (dashboardData.badges && dashboardData.badges.length > 0) ? dashboardData.badges : availableBadges;

  const leaderboard = [
    { rank: 1, name: "Nithish", score: 98, avatar: "PS" },
    { rank: 2, name: "Pavithraa", score: 95, avatar: "AP" },
    { rank: 3, name: "Sanjay", score: 93, avatar: "SK" },
    { rank: 4, name: "Lithika", score: 92, avatar: "RS" },
    { rank: 5, name: "Tharun", score: 91, avatar: "KR" },
    { rank: 6, name: "Yuvarajan", score: 90, avatar: "KR" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 via-white to-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-blue-800">
            <BarChart3 className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {currentUser?.name ? `Welcome back, ${currentUser.name}!` : 'Learning Dashboard'}
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              {dashboardData.overallScore === 0 
                ? "Start your journey! Complete modules and quizzes to track your progress."
                : "Track your progress, earn badges, and compete with peers in disaster preparedness education"
              }
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overall Score</p>
                  <p className="text-3xl font-bold text-primary">{dashboardData.overallScore}/100</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
              <Progress value={dashboardData.overallScore} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Modules Done</p>
                  <p className="text-3xl font-bold text-success">
                    {dashboardData.modulesCompleted}/{dashboardData.totalModules}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-success" />
              </div>
              <Progress 
                value={(dashboardData.modulesCompleted / dashboardData.totalModules) * 100} 
                className="mt-3" 
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Learning Streak</p>
                  <p className="text-3xl font-bold text-warning">{dashboardData.streak} days</p>
                </div>
                <Zap className="h-8 w-8 text-warning" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">Keep it up! 🔥</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Class Rank</p>
                  <p className="text-3xl font-bold text-secondary">
                    #{dashboardData.rank}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                of {dashboardData.totalUsers} students
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dashboardData.recentActivity.length === 0 ? (
                  <div className="py-8 text-center">
                    <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-foreground mb-2">No Activity Yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start learning by completing modules and taking quizzes!
                    </p>
                    <Link to="/modules">
                      <Button variant="outline" size="sm">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Start Learning
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dashboardData.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            activity.type === 'quiz' ? 'bg-primary/20 text-primary' :
                            activity.type === 'module' ? 'bg-success/20 text-success' :
                            'bg-warning/20 text-warning'
                          }`}>
                            {activity.type === 'quiz' && <BookOpen className="h-4 w-4" />}
                            {activity.type === 'module' && <Target className="h-4 w-4" />}
                            {activity.type === 'simulation' && <Zap className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">{activity.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {activity.score && (
                            <Badge variant="secondary">{activity.score}%</Badge>
                          )}
                          {activity.progress && (
                            <Badge variant="secondary">Complete</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Weekly Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  This Week's Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.weeklyProgress.map((day) => (
                    <div key={day.day} className="flex items-center justify-between">
                      <span className="text-sm font-medium w-12">{day.day}</span>
                      <div className="flex-1 mx-4">
                        <div className="flex space-x-2">
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground mb-1">Modules</div>
                            <div className="h-2 bg-muted rounded-full">
                              <div 
                                className="h-2 bg-primary rounded-full transition-all duration-300"
                                style={{ width: `${(day.modules / 3) * 100}%` }}
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground mb-1">Quizzes</div>
                            <div className="h-2 bg-muted rounded-full">
                              <div 
                                className="h-2 bg-success rounded-full transition-all duration-300"
                                style={{ width: `${(day.quizzes / 4) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground w-8">
                        {day.modules + day.quizzes}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {displayBadges.map((badge, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        badge.earned 
                          ? 'border-success/30 bg-success/10' 
                          : 'border-muted bg-muted/30'
                      }`}
                    >
                      <div className={`text-2xl mb-1 ${!badge.earned && 'grayscale'}`}>
                        {badge.icon}
                      </div>
                      <p className={`text-xs font-medium ${
                        badge.earned ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {badge.name}
                      </p>
                      {badge.earned && badge.date && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(badge.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Class Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <div key={user.rank} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          user.rank === 1 ? 'bg-warning text-white' :
                          user.rank === 2 ? 'bg-muted text-foreground' :
                          user.rank === 3 ? 'bg-secondary/30 text-secondary' :
                          'bg-muted/50 text-muted-foreground'
                        }`}>
                          {user.rank === (dashboardData.rank || 999) ? '👤' : user.rank}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${
                            user.rank === (dashboardData.rank || 999) ? 'text-primary' : ''
                          }`}>
                            {user.name}
                          </p>
                        </div>
                      </div>
                      <Badge variant={user.rank <= 3 ? "default" : "secondary"}>
                        {user.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/modules" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Button>
                </Link>
                <Link to="/simulation" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Zap className="h-4 w-4 mr-2" />
                    Try Simulation
                  </Button>
                </Link>
                <Link to="/emergency" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                     Contacts
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;