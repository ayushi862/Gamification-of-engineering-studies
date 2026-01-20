
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Award, BookOpen, Calendar, Clock, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { achievements, courses, leaderboard, userStats } from "@/data/mockData";

const Dashboard = () => {
  const { user } = useAuth();
  const currentLevel = user?.level || 1;
  const nextLevelPoints = currentLevel * 300; // Points needed for next level
  const currentPoints = user?.points || 0;
  const progressPercentage = Math.min((currentPoints / nextLevelPoints) * 100, 100);

  // Get courses in progress
  const inProgressCourses = courses.slice(0, 2);
  
  // Get top leaderboard entries
  const topLeaderboard = leaderboard.slice(0, 3);
  
  // Get a few achievements
  const displayAchievements = achievements.slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Welcome back, {user?.username}!</h1>
        <Button asChild>
          <Link to="/courses">
            <BookOpen className="mr-2 h-4 w-4" /> Continue Learning
          </Link>
        </Button>
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xl font-bold">{currentLevel}</span>
                  </div>
                  <div className="absolute -right-1 -bottom-1 bg-primary rounded-full w-5 h-5 flex items-center justify-center text-xs text-white">
                    {currentLevel + 1}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">{currentPoints} / {nextLevelPoints} XP</div>
                  <Progress value={progressPercentage} className="h-2 mt-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Learning Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-8 w-8 mr-3 text-primary" />
              <div>
                <div className="text-2xl font-bold">{userStats.streak} days</div>
                <p className="text-xs text-muted-foreground">Keep it up!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quizzes Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Trophy className="h-8 w-8 mr-3 text-primary" />
              <div>
                <div className="text-2xl font-bold">{userStats.quizzesCompleted}</div>
                <p className="text-xs text-muted-foreground">
                  {userStats.quizzesCorrect} correct ({Math.round((userStats.quizzesCorrect / userStats.quizzesCompleted) * 100)}%)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Time Studied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-8 w-8 mr-3 text-primary" />
              <div>
                <div className="text-2xl font-bold">{userStats.hoursStudied} hrs</div>
                <p className="text-xs text-muted-foreground">
                  Last 30 days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Continue Learning</h2>
          <Link to="/courses" className="text-sm text-primary hover:underline">
            See all courses
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {inProgressCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="object-cover w-full h-full"
                />
                <Badge className="absolute top-3 left-3">
                  {course.difficulty}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle>
                  <Link to={`/courses/${course.id}`} className="hover:text-primary">
                    {course.title}
                  </Link>
                </CardTitle>
                <CardDescription>{course.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to={`/courses/${course.id}`}>Continue</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom row with achievements and leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements section */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Achievements</CardTitle>
              <Link to="/profile" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {displayAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${achievement.unlocked ? 'bg-primary/10' : 'bg-muted'}`}>
                    <Award className={`h-6 w-6 ${achievement.unlocked ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{achievement.title}</h3>
                      {achievement.unlocked ? (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                          Unlocked
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-muted text-muted-foreground">
                          In Progress
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    {!achievement.unlocked && achievement.progress !== undefined && (
                      <Progress 
                        value={(achievement.progress / (achievement.maxProgress || 1)) * 100} 
                        className="h-1 mt-1" 
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard section */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Leaderboard</CardTitle>
              <Link to="/leaderboards" className="text-sm text-primary hover:underline">
                Full Rankings
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topLeaderboard.map((entry, index) => (
                <div key={entry.userId} className="flex items-center">
                  <div className="w-8 text-center font-bold text-lg text-muted-foreground">
                    {index + 1}
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-muted mx-3">
                    <img src={entry.avatar} alt={entry.username} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{entry.username}</div>
                    <div className="text-xs text-muted-foreground">Level {entry.level}</div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-right">
                          <div className="font-semibold">{entry.points.toLocaleString()} XP</div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3 mr-1" />
                            {entry.streak} days
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{entry.streak}-day streak</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
              
              {/* Current user position */}
              <div className="pt-3 border-t">
                <div className="flex items-center">
                  <div className="w-8 text-center font-bold text-lg text-primary">
                    4
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary mx-3">
                    <img src={user?.avatar} alt={user?.username} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{user?.username} <span className="text-xs text-muted-foreground">(You)</span></div>
                    <div className="text-xs text-muted-foreground">Level {user?.level}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{user?.points?.toLocaleString()} XP</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      {userStats.streak} days
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
