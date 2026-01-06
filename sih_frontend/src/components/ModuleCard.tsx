import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Award, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  participants: number;
  progress: number;
  variant: "earthquake" | "fire" | "flood";
  isCompleted?: boolean;
}

const ModuleCard = ({
  id,
  title,
  description,
  icon,
  difficulty,
  duration,
  participants,
  progress,
  variant,
  isCompleted = false,
}: ModuleCardProps) => {
  const gradientClass = {
    earthquake: "from-earthquake/10 to-warning/5",
    fire: "from-fire/10 to-secondary/5",
    flood: "from-flood/10 to-primary/5",
  };

  const buttonVariant = variant as "earthquake" | "fire" | "flood";

  return (
    <Card className={`group hover:shadow-medium transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-br ${gradientClass[variant]} border-${variant}/20`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl bg-gradient-${variant} text-white shadow-soft`}>
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <Badge variant="outline" className="text-xs mt-1">
                {difficulty}
              </Badge>
            </div>
          </div>
          {isCompleted && (
            <Badge variant="secondary" className="bg-success text-white">
              <Award className="h-3 w-3 mr-1" />
              Complete
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* {progress > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )} */}

        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />+
            <span>{duration}</span>
          </div>
          {/* <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{participants.toLocaleString()} learners</span>
          </div> */}
        </div>

        <div className="flex space-x-2 pt-2">
          <Link to={`/quiz/${id}`} className="flex-1">
            <Button variant={buttonVariant} className="w-full group">
              {isCompleted ? "Review Quiz" : "Start Learning"}
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleCard;