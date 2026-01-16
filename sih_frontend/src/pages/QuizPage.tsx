import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Star, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { quizModules } from "@/data/quizData";

type Language = 'english' | 'tamil' | 'hindi';

const QuizPage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentLanguage, setCurrentLanguage] = useState<Language>('english');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);
  const [stars, setStars] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState<{ [key: number]: boolean }>({});

  const module = quizModules.find(m => m.id === moduleId);
  
  if (!module) {
    navigate('/modules');
    return null;
  }
 const uploadQuestions = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:8080/admin/questions/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
  };

  const questions = module.questions[currentLanguage];
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const correctAnswers = Object.values(answers).filter((answer, index) => 
    answer === questions[index]?.correctAnswer
  ).length;

  const starsEarned = Math.floor((correctAnswers / totalQuestions) * 3);

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = { ...answers, [currentQuestionIndex]: optionIndex };
    setAnswers(newAnswers);
  };

  const handleSubmitAnswer = () => {
    if (answers[currentQuestionIndex] === undefined) return;

    setSubmittedAnswers(prev => ({ ...prev, [currentQuestionIndex]: true }));
    setShowResult(true);
    
    const isCorrect = answers[currentQuestionIndex] === currentQuestion.correctAnswer;
    
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
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setShowResult(false);
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      completeQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setShowResult(false);
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const completeQuiz = () => {
    setQuizCompleted(true);
    setStars(starsEarned);
    
    // Save completion to localStorage
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '{}');
    completedModules[moduleId!] = {
      completed: true,
      stars: starsEarned,
      score: Math.round((correctAnswers / totalQuestions) * 100)
    };
    localStorage.setItem('completedModules', JSON.stringify(completedModules));

    toast({
      title: "🎊 Quiz Completed!",
      description: `You earned ${starsEarned} out of 3 stars!`,
    });
  };

  const handleNextModule = () => {
    const moduleOrder = ['earthquake', 'fire', 'flood'];
    const currentIndex = moduleOrder.indexOf(moduleId!);
    
    if (currentIndex < moduleOrder.length - 1) {
      const nextModuleId = moduleOrder[currentIndex + 1];
      navigate(`/quiz/${nextModuleId}`);
      
      // Reset quiz state
      setCurrentQuestionIndex(0);
      setAnswers({});
      setQuizCompleted(false);
      setStars(0);
      setSubmittedAnswers({});
    } else {
      navigate('/modules');
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

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
                    star <= starsEarned
                      ? 'text-yellow-400 fill-yellow-400 animate-pulse'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-medium">
                Score: {Math.round((correctAnswers / totalQuestions) * 100)}%
              </p>
              <p className="text-muted-foreground">
                {correctAnswers} out of {totalQuestions} correct
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
            <Select value={currentLanguage} onValueChange={(value: Language) => handleLanguageChange(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="tamil">தமிழ்</SelectItem>
                <SelectItem value="hindi">हिंदी</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
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
                  star <= Math.floor((correctAnswers / totalQuestions) * 3)
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
                    variant={currentQuestionIndex === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`relative ${
                      submittedAnswers[index] 
                        ? answers[index] === questions[index].correctAnswer
                          ? 'bg-green-100 border-green-500 text-green-700'
                          : 'bg-red-100 border-red-500 text-red-700'
                        : ''
                    }`}
                  >
                    Q{index + 1}
                    {submittedAnswers[index] && (
                      <div className="absolute -top-1 -right-1">
                        {answers[index] === questions[index].correctAnswer ? (
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
                disabled={Object.keys(submittedAnswers).length < totalQuestions}
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
                        submittedAnswers[currentQuestionIndex] && answers[currentQuestionIndex] === index
                          ? answers[currentQuestionIndex] === currentQuestion.correctAnswer
                            ? 'bg-green-100 border-green-500 text-green-700'
                            : 'bg-red-100 border-red-500 text-red-700'
                          : answers[currentQuestionIndex] === index
                          ? 'bg-accent'
                          : 'hover:bg-accent'
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={submittedAnswers[currentQuestionIndex]}
                    >
                      <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>

                {/* Result Feedback */}
                {showResult && submittedAnswers[currentQuestionIndex] && answers[currentQuestionIndex] !== undefined && (
                  <div className={`p-4 rounded-lg border ${
                    answers[currentQuestionIndex] === currentQuestion.correctAnswer
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center space-x-2">
                      {answers[currentQuestionIndex] === currentQuestion.correctAnswer ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <X className="h-5 w-5 text-red-600" />
                      )}
                      <span className={`font-medium ${
                        answers[currentQuestionIndex] === currentQuestion.correctAnswer
                          ? 'text-green-700'
                          : 'text-red-700'
                      }`}>
                        {answers[currentQuestionIndex] === currentQuestion.correctAnswer
                          ? '🎉 Correct! Well done!'
                          : '❌ Incorrect. The correct answer is: ' + currentQuestion.options[currentQuestion.correctAnswer]
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
                    disabled={currentQuestionIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={answers[currentQuestionIndex] === undefined || submittedAnswers[currentQuestionIndex]}
                    className="bg-primary text-primary-foreground"
                  >
                    Submit
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={!submittedAnswers[currentQuestionIndex]}
                    className="bg-primary text-primary-foreground"
                  >
                    {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next'}
                    {currentQuestionIndex < totalQuestions - 1 && (
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