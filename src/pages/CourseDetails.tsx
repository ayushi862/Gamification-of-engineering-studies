
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  CheckCircle,
  ChevronLeft,
  Clock,
  Lock,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Course, Module } from "@/data/models";
import { courses } from "@/data/mockData";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      const foundCourse = courses.find((c) => c.id === courseId);
      if (foundCourse) {
        setCourse(foundCourse);
        setActiveModule(foundCourse.modules[0].id);
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/courses">Back to Courses</Link>
        </Button>
      </div>
    );
  }

  const handleEnroll = () => {
    toast.success(`You've enrolled in ${course.title}!`);
    if (user) {
      const pointsReward = 25; // Points for enrolling
      updateUser({ points: user.points + pointsReward });
      toast("You earned 25 XP for enrolling!", {
        description: "Keep learning to earn more points!",
        duration: 5000,
      });
    }
  };

  const handleModuleClick = (module: Module) => {
    if (!module.unlocked) {
      toast.error("You need to complete the previous modules first!");
      return;
    }
    setActiveModule(module.id);
  };

  const startQuiz = (quizId: string) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/courses">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <p className="text-sm text-muted-foreground">Back to courses</p>
      </div>

      {/* Course Header */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground mt-2">{course.description}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{course.difficulty}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{course.rating}/5</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{course.enrolledCount} students</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>~8 hours</span>
            </div>
          </div>

          <div>
            <Button size="lg" onClick={handleEnroll} className="mr-4">
              <BookOpen className="mr-2 h-4 w-4" /> Enroll Now
            </Button>
            <Button size="lg" variant="outline">
              <PlayCircle className="mr-2 h-4 w-4" /> Preview
            </Button>
          </div>
        </div>

        <div>
          <div className="rounded-lg overflow-hidden border aspect-video">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Course Content */}
      <Tabs defaultValue="curriculum" className="mt-8">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="curriculum" className="mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4 order-2 md:order-1 md:col-span-2">
              {activeModule && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    {course.modules.find((m) => m.id === activeModule)?.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {course.modules.find((m) => m.id === activeModule)?.description}
                  </p>

                  <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-semibold">Lessons</h3>
                    <div className="space-y-3">
                      {course.modules
                        .find((m) => m.id === activeModule)
                        ?.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="p-4 border rounded-lg flex justify-between items-center hover:bg-accent/50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <PlayCircle
                                className={`h-5 w-5 ${
                                  lesson.completed
                                    ? "text-green-500"
                                    : "text-primary"
                                }`}
                              />
                              <div>
                                <p className="font-medium">{lesson.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  ~15 min • {lesson.pointsReward} XP
                                </p>
                              </div>
                            </div>
                            {lesson.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Button size="sm">Start</Button>
                            )}
                          </div>
                        ))}
                    </div>

                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-3">Module Quiz</h3>
                      <div className="p-4 border rounded-lg bg-accent/20">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">
                              {
                                course.modules.find((m) => m.id === activeModule)
                                  ?.title
                              }{" "}
                              Quiz
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Test your knowledge and earn points
                            </p>
                          </div>
                          <Button
                            onClick={() =>
                              startQuiz(
                                course.modules.find((m) => m.id === activeModule)
                                  ?.quizId || ""
                              )
                            }
                          >
                            Take Quiz
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="order-1 md:order-2">
              <div className="border rounded-lg p-4 sticky top-20">
                <h3 className="font-semibold mb-3">Course Progress</h3>
                <Progress value={25} className="h-2 mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  2 of 8 lessons completed
                </p>

                <div className="space-y-2">
                  <h3 className="font-semibold">Course Content</h3>
                  <p className="text-sm text-muted-foreground">
                    {course.modules.length} modules •{" "}
                    {course.modules.reduce(
                      (acc, module) => acc + module.lessons.length,
                      0
                    )}{" "}
                    lessons
                  </p>
                </div>

                <Accordion
                  type="single"
                  collapsible
                  className="mt-4"
                  defaultValue={activeModule || undefined}
                >
                  {course.modules.map((module) => (
                    <AccordionItem key={module.id} value={module.id}>
                      <AccordionTrigger
                        onClick={() => handleModuleClick(module)}
                        className={`${
                          !module.unlocked && "text-muted-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-left">
                          {!module.unlocked && (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span>{module.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-4 space-y-3 pt-2">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className={`flex items-center gap-2 text-sm py-1 px-2 rounded hover:bg-accent/50 cursor-pointer ${
                                !module.unlocked && "text-muted-foreground"
                              }`}
                            >
                              {lesson.completed ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <PlayCircle className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span>{lesson.title}</span>
                            </div>
                          ))}
                          <div
                            className={`flex items-center gap-2 text-sm py-1 px-2 rounded hover:bg-accent/50 cursor-pointer ${
                              !module.unlocked && "text-muted-foreground"
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary"
                            >
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                              <polyline points="14 2 14 8 20 8" />
                              <path d="M8.5 13.5l2 2 5-5" />
                            </svg>
                            <span>Module Quiz</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                <p className="text-muted-foreground">
                  {course.description} This comprehensive course will take you through
                  all the fundamental concepts and practical applications of {course.title.toLowerCase()}.
                  You'll learn through interactive lessons, hands-on exercises, and challenging quizzes
                  that will reinforce your understanding.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>
                        Understanding {course.category} principle #{i}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Basic understanding of engineering concepts</li>
                  <li>Familiarity with mathematical principles</li>
                  <li>Access to a computer for practical exercises</li>
                </ul>
              </div>
            </div>

            <div>
              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-bold">Course Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Points</span>
                    <span className="font-medium">{course.totalPoints} XP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completion Time</span>
                    <span className="font-medium">~8 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prerequisites</span>
                    <span className="font-medium">None</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{course.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Difficulty</span>
                    <Badge>{course.difficulty}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-semibold">
                          {String.fromCharCode(64 + i)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">Student {i}</h4>
                        <div className="flex items-center gap-1">
                          {Array(5)
                            .fill(0)
                            .map((_, idx) => (
                              <Star
                                key={idx}
                                className={`h-4 w-4 ${
                                  idx < 5 - (i % 2)
                                    ? "text-yellow-500"
                                    : "text-muted"
                                }`}
                                fill={
                                  idx < 5 - (i % 2)
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            ))}
                          <span className="text-sm text-muted-foreground ml-1">
                            {i} month{i > 1 ? "s" : ""} ago
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-muted-foreground">
                      This course was very informative and well-structured. The
                      gamification elements made learning enjoyable and I
                      appreciated the practical exercises. {i === 1 && "Highly recommended!"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Student Ratings</h3>
                  <div className="flex items-center">
                    <span className="mr-1 font-bold text-lg">
                      {course.rating}
                    </span>
                    <Star fill="currentColor" className="h-5 w-5 text-yellow-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-sm min-w-5">{stars}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="bg-yellow-500 h-full"
                          style={{
                            width: `${
                              stars === 5
                                ? 75
                                : stars === 4
                                ? 20
                                : stars === 3
                                ? 5
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground min-w-8">
                        {stars === 5
                          ? "75%"
                          : stars === 4
                          ? "20%"
                          : stars === 3
                          ? "5%"
                          : "0%"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="w-full">Leave a Review</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetails;
