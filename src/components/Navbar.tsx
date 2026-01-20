
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Sun, Moon, LogOut, ChevronDown, User } from "lucide-react";
import { Link } from "react-router-dom";

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Navbar = ({ sidebarOpen, setSidebarOpen }: NavbarProps) => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="border-b bg-background sticky top-0 z-30 w-full">
      <div className="flex h-16 items-center px-4 md:px-6 lg:px-8">
        <Button
          variant="ghost"
          size="icon"
          className="mr-4 md:mr-6"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="relative w-8 h-8 mr-2">
              <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-pulse-glow"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 text-primary">
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
            <span className="font-bold text-lg hidden sm:inline-block gradient-text">
              EngiQuest Academy
            </span>
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="mr-2"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 flex items-center gap-2">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium">{user.username}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">Level {user.level}</span>
                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
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
                      >
                        <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-.89 4.5A5.96 5.96 0 0 0 12 9.5c1.31 0 2.42.67 3.5 1.5" />
                        <path d="M15.5 13a2.5 2.5 0 0 1 4.96-.46 2.5 2.5 0 0 1 .89 4.5A5.96 5.96 0 0 1 12 17.5c-1.31 0-2.42-.67-3.5-1.5" />
                        <path d="M8.5 13a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-.89 4.5A5.96 5.96 0 0 0 12 17.5c1.31 0 2.42-.67 3.5-1.5" />
                        <path d="M12 4.5a2.5 2.5 0 0 1 4.96-.46 2.5 2.5 0 0 1 .89 4.5A5.96 5.96 0 0 1 12 9.5c-1.31 0-2.42.67-3.5 1.5" />
                      </svg> Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive flex items-center gap-2 cursor-pointer">
                  <LogOut className="h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default" size="sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
