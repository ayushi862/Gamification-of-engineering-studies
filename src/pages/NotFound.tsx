
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-pulse-glow"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 text-primary">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 3L4 7.5L12 12L20 7.5L12 3Z"
                  className="fill-primary"
                />
                <path
                  d="M4 12L12 16.5L20 12"
                  className="stroke-primary"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 16.5L12 21L20 16.5"
                  className="stroke-primary"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeOpacity="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! The page you're looking for cannot be found.
        </p>
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link to="/">Return to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to="/courses">Explore Courses</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
