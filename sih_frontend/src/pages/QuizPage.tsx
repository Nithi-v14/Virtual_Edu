import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Star, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchQuizQuestions, submitQuiz, QuizSubmissionPayload, QuizModule } from "@/api/quizApi";

type Language = "en" | "ta" | "hi";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer?: number;
}

interface BackendQuizQuestion {
  id: number;
  question: string;
  options: string[];
}

const QuizPage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management - must be before any early returns
  const [language, setLanguage] = useState<Language>("en");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [module, setModule] = useState<QuizModule | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [submittedAnswers, setSubmittedAnswers] = useState<{questionId: number, selectedOption: number, isCorrect?: boolean}[]>([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Constants
  const LEVEL = "beginner";
  const LIMIT = 10;
  const X_USER_ID = 1; // TODO: Replace with JWT user id

  // Fetch module and questions from backend
  useEffect(() => {
    if (!moduleId) return;
    
    setLoading(true);
    
    // Create a fallback module object since backend doesn't have module endpoint
    const fallbackModule: QuizModule = {
      id: parseInt(moduleId),
      title: `Module ${moduleId}`,
      description: "Quiz Module",
      difficulty: "beginner",
      estimatedTime: "10 minutes",
      icon: "📚",
      color: "blue"
    };
    
    // Only fetch questions since module endpoint doesn't exist
    fetchQuizQuestions(LEVEL, language, LIMIT, moduleId, X_USER_ID)
      .then((questionsData: BackendQuizQuestion[]) => {
        setModule(fallbackModule);
        // Convert backend format to frontend format
        const convertedQuestions: QuizQuestion[] = questionsData.map(q => ({
          id: q.id,
          question: q.question,
          options: q.options,
          // correctAnswer will be determined from backend response
        }));
        setQuestions(convertedQuestions);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching quiz data:', error);
        toast({
          title: "Failed to load quiz",
          description: "Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
      });
  }, [language, moduleId, toast]);
  
  if (!moduleId) {
    navigate('/modules');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
        <Card className="p-6">
          <div className="text-center">Loading quiz...</div>
        </Card>
      </div>
    );
  }

  if (!module || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
        <Card className="p-6">
          <div className="text-center">
            <p>No quiz questions available for this module.</p>
            <Button onClick={() => navigate('/modules')} className="mt-4">
              Back to Modules
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;
  const starsEarned = Math.floor((score / 100) * 3);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted({});
    setShowResult(false);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (submitted[currentIndex]) return;
    const newAnswers = { ...answers, [currentIndex]: optionIndex };
    setAnswers(newAnswers);
  };

  const handleSubmitAnswer = async () => {
    if (answers[currentIndex] === undefined || submitted[currentIndex]) return;

    try {
      const payload: QuizSubmissionPayload = {
        level: LEVEL,
        answers: [{
          questionId: questions[currentIndex].id,
          selectedOption: answers[currentIndex] + 1, // Convert to 1-based index
        }],
      };

      const result = await submitQuiz(X_USER_ID, payload);
      
      // Update submitted state
      setSubmitted(prev => ({ ...prev, [currentIndex]: true }));
      setShowResult(true);
      
      // Update question with correct answer from backend response
      const updatedQuestions = [...questions];
      const isCorrect = result.correctAnswers > 0; // If backend says it's correct
      updatedQuestions[currentIndex] = {
        ...updatedQuestions[currentIndex],
        correctAnswer: isCorrect ? answers[currentIndex] + 1 : 
          // For wrong answers, we don't know the correct answer from backend, so set to -1
          -1
      };
      setQuestions(updatedQuestions);
      
      if (isCorrect) {
        toast({
          title: "🎉 Congratulations!",
          description: "Correct answer! Well done!",
          className: "bg-success/10 border-success text-success-foreground"
        });
      } else {
        toast({
          title: "❌ Oops, Incorrect!",
          description: "Don't worry, keep learning!",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast({
        title: "Error submitting answer",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setShowResult(false);
      setCurrentIndex(prev => prev + 1);
    } else {
      completeQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setShowResult(false);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const completeQuiz = async () => {
    try {
      // Use the existing submit endpoint instead of complete endpoint
      const payload: QuizSubmissionPayload = {
        level: LEVEL,
        answers: Object.entries(answers).map(([index, option]) => ({
          questionId: questions[Number(index)].id,
          selectedOption: option + 1, // Convert to 1-based index
        })),
      };

      // Use submit endpoint since complete doesn't exist
      const result = await submitQuiz(X_USER_ID, payload);
      
      // Backend returns: { totalQuestions, correctAnswers, score }
      setScore(result.score || 0);
      setCorrectAnswersCount(result.correctAnswers || 0);

      setQuizCompleted(true);
      
      // Calculate stars based on score
      const calculatedStars = Math.floor((result.score / 100) * 3);
      
      // Save completion to localStorage
      const completedModules = JSON.parse(localStorage.getItem('completedModules') || '{}');
      completedModules[moduleId!] = {
        completed: true,
        stars: calculatedStars,
        score: result.score || 0
      };
      localStorage.setItem('completedModules', JSON.stringify(completedModules));

      toast({
        title: "🎊 Quiz Completed!",
        description: `You earned ${calculatedStars} out of 3 stars!`,
      });
    } catch (error) {
      console.error('Error completing quiz:', error);
      // Fallback completion - calculate locally
      const localScore = Math.round((Object.keys(answers).length / totalQuestions) * 100);
      setScore(localScore);
      setCorrectAnswersCount(Object.keys(answers).length);
      setQuizCompleted(true);
    }
  };

  const handleNextModule = () => {
    const moduleOrder = ['earthquake', 'fire', 'flood'];
    const currentModuleIndex = moduleOrder.indexOf(moduleId!);
    
    if (currentModuleIndex < moduleOrder.length - 1) {
      const nextModuleId = moduleOrder[currentModuleIndex + 1];
      navigate(`/quiz/${nextModuleId}`);
    } else {
      navigate('/modules');
    }
  };

  const stars = Math.floor((score / 100) * 3);

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
        <Card className="disaster-card max-w-md mx-auto text-center space-y-6 p-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Quiz Complete!</h2>
            <div className="text-6xl">{module.icon}</div>
            <h3 className="text-xl font-semibold">{module.title}</h3>
            
            {/* Stars Display */}
            <div className="flex justify-center space-x-2">
              {[1, 2, 3].map((star) => (
                <Star
                  key={star}
                  className={`h-12 w-12 ${
                    star <= stars
                      ? 'text-yellow-400 fill-yellow-400 animate-pulse'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-medium">
                Score: {score}%
              </p>
              <p className="text-muted-foreground">
                {correctAnswersCount} out of {totalQuestions} correct
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            {moduleId !== 'flood' && (
              <Button 
                onClick={handleNextModule}
                className="w-full bg-primary text-primary-foreground"
              >
                Next Module
              </Button>
            )}
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/modules')}
              className="w-full"
            >
              Back to Modules
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/modules')}
            className="mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Modules
          </Button>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-3xl">{module.icon}</span>
                {module.title}
              </h1>
              <p className="text-muted-foreground">{module.description}</p>
            </div>
            
            {/* Language Selector */}
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ta">தமிழ்</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Question {currentIndex + 1} of {totalQuestions}</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          {/* Star Progress */}
          <div className="flex justify-center space-x-2 mt-4">
            {[1, 2, 3].map((star) => (
              <Star
                key={star}
                className={`h-8 w-8 ${
                  star <= Math.floor((Object.values(answers).filter((answer, index) =>
                    answer === questions[index]?.correctAnswer
                  ).length / Math.max(totalQuestions, 1)) * 3)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Question Numbers Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 text-foreground">Questions</h3>
              <div className="grid grid-cols-5 lg:grid-cols-1 gap-2">
                {questions.map((_, index) => (
                  <Button
                    key={index}
                    variant={currentIndex === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentIndex(index)}
                    className={`relative ${
                      submitted[index] 
                        ? answers[index] + 1 === questions[index].correctAnswer
                          ? 'bg-green-100 border-green-500 text-green-700'
                          : 'bg-red-100 border-red-500 text-red-700'
                        : ''
                    }`}
                  >
                    Q{index + 1}
                    {submitted[index] && (
                      <div className="absolute -top-1 -right-1">
                        {answers[index] + 1 === questions[index].correctAnswer ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <X className="h-3 w-3 text-red-600" />
                        )}
                      </div>
                    )}
                  </Button>
                ))}
              </div>
              <Button
                onClick={completeQuiz}
                disabled={Object.keys(submitted).length < totalQuestions}
                className="w-full mt-4 bg-primary text-primary-foreground"
              >
                Finish Quiz
              </Button>
            </Card>
          </div>

          {/* Main Quiz Area */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              <div className="space-y-6">
                {/* Question */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    {currentQuestion.question}
                  </h2>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`w-full text-left justify-start p-4 h-auto ${
                        submitted[currentIndex] && answers[currentIndex] === index
                          ? answers[currentIndex] + 1 === currentQuestion.correctAnswer
                            ? 'bg-green-100 border-green-500 text-green-700'
                            : 'bg-red-100 border-red-500 text-red-700'
                          : answers[currentIndex] === index
                          ? 'bg-accent'
                          : 'hover:bg-accent'
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={submitted[currentIndex]}
                    >
                      <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>

                {/* Result Feedback */}
                {showResult && submitted[currentIndex] && answers[currentIndex] !== undefined && (
                  <div className={`p-4 rounded-lg border ${
                    answers[currentIndex] + 1 === currentQuestion.correctAnswer
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center space-x-2">
                      {answers[currentIndex] + 1 === currentQuestion.correctAnswer ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <X className="h-5 w-5 text-red-600" />
                      )}
                      <span className={`font-medium ${
                        answers[currentIndex] + 1 === currentQuestion.correctAnswer
                          ? 'text-green-700'
                          : 'text-red-700'
                      }`}>
                        {answers[currentIndex] + 1 === currentQuestion.correctAnswer
                          ? '🎉 Correct! Well done!'
                          : '❌ Incorrect. Don\'t worry, keep learning!'
                        }
                      </span>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={answers[currentIndex] === undefined || submitted[currentIndex]}
                    className="bg-primary text-primary-foreground"
                  >
                    Submit
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={!submitted[currentIndex]}
                    className="bg-primary text-primary-foreground"
                  >
                    {currentIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next'}
                    {currentIndex < totalQuestions - 1 && (
                      <ChevronRight className="h-4 w-4 ml-2" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;