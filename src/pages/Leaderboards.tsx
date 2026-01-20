
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Medal, Search, Trophy, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { leaderboard } from "@/data/mockData";

const Leaderboards = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState("all-time");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredLeaderboard = leaderboard.filter(entry => 
    entry.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Leaderboards</h1>
        <p className="text-muted-foreground">
          See how you rank against other learners
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1 flex justify-center md:justify-start">
          <div className="relative">
            <div className="aspect-square w-32 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full opacity-10 animate-pulse-glow"></div>
              <Trophy className="h-16 w-16 text-yellow-500" />
            </div>
          </div>
        </div>
        
        <div className="col-span-2 md:col-span-3 grid grid-cols-3 gap-4">
          <div className="bg-card shadow-sm rounded-lg p-4 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Top Points</h3>
              <p className="text-2xl font-bold">2,540</p>
              <p className="text-xs text-muted-foreground mt-1">ElectroWhiz</p>
            </div>
            <Users className="absolute right-2 bottom-2 h-16 w-16 text-primary/10" />
          </div>
          
          <div className="bg-card shadow-sm rounded-lg p-4 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Longest Streak</h3>
              <p className="text-2xl font-bold">15 days</p>
              <p className="text-xs text-muted-foreground mt-1">ElectroWhiz</p>
            </div>
            <Calendar className="absolute right-2 bottom-2 h-16 w-16 text-primary/10" />
          </div>
          
          <div className="bg-card shadow-sm rounded-lg p-4 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Highest Level</h3>
              <p className="text-2xl font-bold">Level 12</p>
              <p className="text-xs text-muted-foreground mt-1">ElectroWhiz</p>
            </div>
            <Medal className="absolute right-2 bottom-2 h-16 w-16 text-primary/10" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-4 md:items-center">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-time">All Time</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative max-w-sm w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Level</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-right">Streak</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeaderboard.map((entry) => (
              <TableRow
                key={entry.userId}
                className={user?.id === entry.userId ? "bg-primary/5" : undefined}
              >
                <TableCell className="font-medium text-center">
                  {entry.position === 1 && (
                    <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500/10">
                      <Trophy className="h-3 w-3 text-yellow-500" />
                    </div>
                  )}
                  {entry.position === 2 && (
                    <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-300/20">
                      <Trophy className="h-3 w-3 text-slate-400" />
                    </div>
                  )}
                  {entry.position === 3 && (
                    <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-600/10">
                      <Trophy className="h-3 w-3 text-amber-600" />
                    </div>
                  )}
                  {entry.position && entry.position > 3 && (
                    <span>{entry.position}</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={entry.avatar} alt={entry.username} />
                      <AvatarFallback>
                        {entry.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium flex items-center gap-1">
                        {entry.username}
                        {user?.id === entry.userId && (
                          <Badge variant="outline" className="ml-1 text-xs">You</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span className="font-medium">{entry.level}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {entry.points.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span>{entry.streak} days</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">Page 1 of 1</div>
        <Button variant="outline" size="sm" disabled>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Leaderboards;
