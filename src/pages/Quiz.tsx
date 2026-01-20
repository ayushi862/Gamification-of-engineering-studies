
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Quiz as QuizType, Question } from "@/data/models";
import { quizzes } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  pointsEarned: number;
  handleRetry: () => void;
  handleContinue: () => void;
}

const QuizResults = ({
  score,
  totalQuestions,
  pointsEarned,
  handleRetry,
  handleContinue,
}: QuizResultsProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  return (
    <Card className="w-full max-w-3xl mx-auto animate-scale-in">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Quiz Results</CardTitle>
        <CardDescription>
          You've completed the quiz! Here's how you did.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative w-32 h-32 mb-4">
            <div className="absolute inset-0 rounded-full border-8 border-muted"></div>
            <div 
              className="absolute inset-0 rounded-full border-8 border-primary origin-center -rotate-90"
              style={{ 
                clipPath: `polygon(50% 50%, 50% 0%, ${percentage >= 50 ? '100% 0%' : `${50 + percentage / 2}% 0%`}, ${
                  percentage >= 75 
                    ? '100% 100%' 
                    : percentage >= 50 
                    ? `100% ${(percentage - 50) * 4}%` 
                    : '50% 50%'
                }, ${
                  percentage >= 75 ? `${150 - percentage * 2}% 100%` : '50% 50%'
                }, 50% 50%)`
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{percentage}%</span>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold">
              {percentage >= 80
                ? "Excellent Work! 🏆"
                : percentage >= 60
                ? "Good Job! 👏"
                : "Keep Practicing 💪"}
            </h3>
            <p className="text-muted-foreground">
              You scored {score} out of {totalQuestions} questions correctly.
            </p>
          </div>
        </div>

        <div className="bg-muted/40 rounded-lg p-4 flex justify-between items-center">
          <div>
            <h4 className="font-medium">Points Earned</h4>
            <p className="text-muted-foreground text-sm">
              Added to your profile
            </p>
          </div>
          <Badge variant="outline" className="text-lg px-3 py-1 bg-primary/10 border-primary text-primary">
            +{pointsEarned} XP
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex gap-3 flex-col sm:flex-row">
        <Button
          variant="outline"
          className="flex-1 sm:flex-initial"
          onClick={handleRetry}
        >
          Try Again
        </Button>
        <Button className="flex-1 sm:flex-initial" onClick={handleContinue}>
          Continue Learning
        </Button>
      </CardFooter>
    </Card>
  );
};

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | string[])[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pointsEarned, setPointsEarned] = useState(0);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      const foundQuiz = quizzes.find((q) => q.id === quizId);
      if (foundQuiz) {
        setQuiz(foundQuiz);
        if (foundQuiz.timeLimit) {
          setTimeRemaining(foundQuiz.timeLimit);
        }
        setUserAnswers(new Array(foundQuiz.questions.length).fill(""));
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [quizId]);

  useEffect(() => {
    let timerId: number | undefined;
    
    if (timeRemaining !== null && timeRemaining > 0 && !quizCompleted) {
      timerId = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            clearInterval(timerId);
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerId !== undefined) {
        clearInterval(timerId);
      }
    };
  }, [timeRemaining, quizCompleted]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
        <h2 className="text-2xl font-bold mb-4">Quiz not found</h2>
        <p className="text-muted-foreground mb-6">
          The quiz you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (answer: string) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newUserAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    // Calculate score
    let correctAnswers = 0;
    let earnedPoints = 0;

    quiz.questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      if (
        Array.isArray(question.correctAnswer)
          ? question.correctAnswer.includes(userAnswer as string)
          : userAnswer === question.correctAnswer
      ) {
        correctAnswers++;
        earnedPoints += question.points;
      }
    });

    setScore(correctAnswers);
    setPointsEarned(earnedPoints);
    
    // Update user points
    if (user) {
      updateUser({ points: user.points + earnedPoints });
    }
    
    setQuizCompleted(true);
    
    toast.success(`Quiz completed! You earned ${earnedPoints} points!`);
  };

  const handleRetry = () => {
    setQuizCompleted(false);
    setRevealAnswers(false);
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(quiz.questions.length).fill(""));
    if (quiz.timeLimit) {
      setTimeRemaining(quiz.timeLimit);
    }
  };

  const handleViewAnswers = () => {
    setRevealAnswers(true);
    setCurrentQuestionIndex(0);
  };

  const isAnswerCorrect = (question: Question, selectedAnswer: string): boolean => {
    if (Array.isArray(question.correctAnswer)) {
      return question.correctAnswer.includes(selectedAnswer);
    }
    return selectedAnswer === question.correctAnswer;
  };

  const isPrevDisabled = currentQuestionIndex === 0;
  const isNextDisabled = !userAnswers[currentQuestionIndex];

  if (quizCompleted && !revealAnswers) {
    return (
      <div className="container max-w-4xl mx-auto py-8">
        <QuizResults 
          score={score}
          totalQuestions={totalQuestions}
          pointsEarned={pointsEarned}
          handleRetry={handleRetry}
          handleContinue={() => navigate(-1)}
        />
        
        <div className="mt-6 text-center">
          <Button variant="link" onClick={handleViewAnswers}>
            Review Answers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 animate-fade-in">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <p className="text-muted-foreground">{quiz.description}</p>
          </div>
          {timeRemaining !== null && !quizCompleted && (
            <div
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full",
                timeRemaining < 30 ? "bg-red-500/10 text-red-500" : "bg-muted"
              )}
            >
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </Badge>
          {revealAnswers && (
            <Badge variant="outline" className="bg-muted">
              Review Mode
            </Badge>
          )}
        </div>

        <Progress value={progress} className="h-2 w-full" />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">
            {currentQuestion.text}
          </CardTitle>
          {currentQuestion.diagram && (
            <div className="mt-4 flex justify-center">
              <img
                src={currentQuestion.diagram}
                alt="Question diagram"
                className="max-h-60 object-contain border rounded-lg"
              />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQuestion.options?.map((option, idx) => (
              <div
                key={idx}
                onClick={() => !revealAnswers && handleAnswer(option)}
                className={cn(
                  "quiz-option",
                  userAnswers[currentQuestionIndex] === option && "selected",
                  revealAnswers &&
                    userAnswers[currentQuestionIndex] === option &&
                    (isAnswerCorrect(currentQuestion, option)
                      ? "correct"
                      : "incorrect"),
                  revealAnswers &&
                    userAnswers[currentQuestionIndex] !== option &&
                    isAnswerCorrect(currentQuestion, option) &&
                    "correct"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-1">{option}</div>
                  {revealAnswers && (
                    <>
                      {isAnswerCorrect(currentQuestion, option) && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {userAnswers[currentQuestionIndex] === option &&
                        !isAnswerCorrect(currentQuestion, option) && (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {revealAnswers && (
            <div className="mt-6 bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Explanation</h4>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrevQuestion}
            disabled={isPrevDisabled}
          >
            Previous
          </Button>

          {!revealAnswers && currentQuestionIndex === totalQuestions - 1 ? (
            <Button onClick={handleSubmitQuiz} disabled={isNextDisabled}>
              Submit Quiz
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} disabled={revealAnswers ? false : isNextDisabled}>
              {revealAnswers
                ? "Next Question"
                : "Save & Continue"}
            </Button>
          )}
        </CardFooter>
      </Card>

      {!revealAnswers && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>Points for this question: {currentQuestion.points}</div>
          <div className="flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            <span>You must answer to continue</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
