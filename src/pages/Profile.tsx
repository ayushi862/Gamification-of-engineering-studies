
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Github,
  Globe,
  LogOut,
  Mail,
  MessageSquare,
  Star,
  Trophy,
} from "lucide-react";
import { achievements, userStats } from "@/data/mockData";

interface StatCardProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  className?: string;
}

const StatCard = ({ value, label, icon, className }: StatCardProps) => (
  <div className={`bg-card rounded-lg p-4 flex ${className}`}>
    <div className="mr-4">{icon}</div>
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  </div>
);

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) return null;

  const currentLevel = user.level;
  const nextLevelPoints = currentLevel * 300;
  const progressPercentage = Math.min((user.points / nextLevelPoints) * 100, 100);

  return (
    <div className="container mx-auto max-w-7xl pb-12 animate-fade-in">
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="relative mb-8">
          <div className="h-40 rounded-t-lg bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20"></div>
          <div className="absolute -bottom-16 left-8 flex items-end">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback className="text-4xl">
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{user.username}</h1>
              {user.role === "admin" && (
                <Badge className="bg-primary text-primary-foreground">Admin</Badge>
              )}
            </div>
            <p className="text-muted-foreground">Member since {new Date(user.joinDate).toLocaleDateString()}</p>
            <div className="flex items-center gap-2 text-sm mt-1">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Edit className="h-4 w-4" /> Edit Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-destructive hover:text-destructive"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        {/* Profile Level Bar */}
        <div className="bg-card rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-bold">Level {currentLevel}</span>
              <Badge variant="outline">{user.points.toLocaleString()} XP</Badge>
            </div>
            <span className="text-sm text-muted-foreground">
              {user.points.toLocaleString()} / {nextLevelPoints.toLocaleString()} XP to Level{" "}
              {currentLevel + 1}
            </span>
          </div>
          <div className="relative">
            <Progress value={progressPercentage} className="h-3" />
            {progressPercentage >= 99.5 && (
              <div className="absolute top-0 right-0 mt-2 animate-bounce-small">
                <Badge className="bg-primary text-white">Level Up!</Badge>
              </div>
            )}
          </div>
        </div>

        {/* Tabs for different sections */}
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          defaultValue="overview" 
          className="space-y-8 mt-8"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <StatCard
                value={userStats.streak}
                label="Day Streak"
                icon={<Calendar className="h-6 w-6 text-primary" />}
              />
              <StatCard
                value={userStats.quizzesCompleted}
                label="Quizzes Completed"
                icon={<CheckCircle className="h-6 w-6 text-primary" />}
              />
              <StatCard
                value={`${userStats.averageScore}%`}
                label="Average Score"
                icon={<Star className="h-6 w-6 text-primary" />}
              />
              <StatCard
                value={`${userStats.hoursStudied} hrs`}
                label="Study Time"
                icon={<Clock className="h-6 w-6 text-primary" />}
              />
            </div>

            {/* Recent Achievements */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Recent Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.slice(0, 3).map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`rounded-lg border p-4 transition-all ${
                      achievement.unlocked
                        ? "bg-primary/5 border-primary/20"
                        : "bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.unlocked ? "bg-primary/10" : "bg-muted"
                        }`}
                      >
                        <Trophy
                          className={`h-6 w-6 ${
                            achievement.unlocked
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {achievement.description}
                        </p>
                        {!achievement.unlocked && achievement.progress !== undefined && (
                          <div className="mt-2 space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>
                                {achievement.progress}/{achievement.maxProgress}
                              </span>
                            </div>
                            <Progress
                              value={
                                (achievement.progress / (achievement.maxProgress || 1)) * 100
                              }
                              className="h-1"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Learning Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Top Subject</span>
                    <span>{userStats.topSubject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quiz Accuracy</span>
                    <span>{Math.round((userStats.quizzesCorrect / userStats.quizzesCompleted) * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Courses Started</span>
                    <span>3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Courses Completed</span>
                    <span>1</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold">Study Habits</h2>
                <div className="h-36 w-full bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Interactive chart coming soon
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`rounded-lg border p-5 transition-all relative overflow-hidden ${
                    achievement.unlocked
                      ? "badge-progress"
                      : "bg-muted/30"
                  }`}
                  style={{
                    "--progress-width": achievement.unlocked ? "100%" : "0%",
                  } as React.CSSProperties}
                >
                  {achievement.unlocked && (
                    <div
                      className="absolute bottom-0 left-0 h-1 bg-primary"
                      style={{ width: "100%" }}
                    ></div>
                  )}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        achievement.unlocked ? "bg-primary/10" : "bg-muted"
                      }`}
                    >
                      <Trophy
                        className={`h-8 w-8 ${
                          achievement.unlocked
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        {achievement.unlocked ? (
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                            Unlocked
                          </Badge>
                        ) : (
                          <Badge variant="outline">In Progress</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mt-1">
                        {achievement.description}
                      </p>
                      <p className="text-xs mt-2 text-muted-foreground">
                        {achievement.criteria}
                      </p>

                      {!achievement.unlocked && achievement.progress !== undefined && (
                        <div className="mt-3 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                          <Progress
                            value={(achievement.progress / (achievement.maxProgress || 1)) * 100}
                            className="h-1.5"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recent Activity</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: <Trophy className="h-6 w-6 text-primary" />,
                    title: "Achievement Unlocked",
                    details: "First Steps",
                    time: "2 hours ago",
                  },
                  {
                    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
                    title: "Quiz Completed",
                    details: "Basic Circuit Elements Quiz with 80% score",
                    time: "Yesterday",
                  },
                  {
                    icon: <Star className="h-6 w-6 text-yellow-500" />,
                    title: "Points Earned",
                    details: "+150 XP for completing module",
                    time: "2 days ago",
                  },
                  {
                    icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
                    title: "Forum Post",
                    details: "Replied to 'Help with Kirchhoff's Laws'",
                    time: "3 days ago",
                  },
                  {
                    icon: <Calendar className="h-6 w-6 text-purple-500" />,
                    title: "Streak Milestone",
                    details: "5-day study streak achieved",
                    time: "5 days ago",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="bg-muted rounded-full p-3">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <span className="text-xs text-muted-foreground">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {item.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-bold mb-4">Connected Accounts</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Github className="h-5 w-5" />
                      <div>
                        <h3 className="font-medium">GitHub</h3>
                        <p className="text-xs text-muted-foreground">
                          Connect to share projects
                        </p>
                      </div>
                    </div>
                    <Button size="sm">Connect</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5" />
                      <div>
                        <h3 className="font-medium">LinkedIn</h3>
                        <p className="text-xs text-muted-foreground">
                          Connect for achievement sharing
                        </p>
                      </div>
                    </div>
                    <Button size="sm">Connect</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
