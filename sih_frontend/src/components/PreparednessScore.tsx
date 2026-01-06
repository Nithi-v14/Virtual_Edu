import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, TrendingUp } from "lucide-react";

interface PreparednessScoreProps {
  score: number;
  totalQuizzes: number;
  completedQuizzes: number;
  badges: string[];
}

const PreparednessScore = ({ 
  score, 
  totalQuizzes, 
  completedQuizzes, 
  badges 
}: PreparednessScoreProps) => {
  const percentage = (score / 100) * 100;
  
  const getScoreLevel = (score: number) => {
    if (score >= 80) return { level: "Expert", color: "success", icon: Trophy };
    if (score >= 60) return { level: "Advanced", color: "warning", icon: TrendingUp };
    return { level: "Learning", color: "secondary", icon: Target };
  };

  const { level, color, icon: Icon } = getScoreLevel(score);

  return (
    <Card className="w-full bg-gradient-to-br from-card to-accent/5 border-accent/20 shadow-medium">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <Icon className="h-5 w-5 text-accent" />
            <span>Progress Tracking</span>
          </span>
          <Badge 
            variant="outline" 
            className={`${color === 'success' ? 'border-success text-success' : 
                        color === 'warning' ? 'border-warning text-warning' : 
                        'border-secondary text-secondary'}`}
          >
            {level}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Score</span>
            <span className="font-semibold text-lg">{score}/100</span>
          </div>
          <Progress value={percentage} className="h-3" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Quizzes Completed</p>
            <p className="font-semibold text-lg">{completedQuizzes}/{totalQuizzes}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Badges Earned</p>
            <p className="font-semibold text-lg">{badges.length}</p>
          </div>
        </div>

        {badges.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Recent Badges</p>
            <div className="flex flex-wrap gap-1">
              {badges.slice(0, 3).map((badge, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              ))}
              {badges.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{badges.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PreparednessScore;