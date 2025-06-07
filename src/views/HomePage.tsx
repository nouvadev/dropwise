import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { BookOpen, LogOut, PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropList } from "@/components/domain/DropList";
import type { Drop } from "@/types/domain";

// Mock data reflecting the database schema
const mockDrops: Drop[] = [
  {
    id: "1",
    topic: "The Hidden Costs of Unstructured Code",
    url: "https://example.com/articles/unstructured-code",
    user_notes: "A must-read for the team. Highlights the importance of our new coding standards.",
    added_date: "2 days ago",
    status: "new",
    tags: [{ id: 1, name: "refactoring" }, { id: 2, name: "best-practices" }],
  },
  {
    id: "2",
    topic: "Introduction to Mindful Learning",
    url: "https://youtube.com/watch?v=mindful",
    user_notes: null,
    added_date: "1 day ago",
    status: "new",
    tags: [{ id: 3, name: "wellness" }, { id: 4, name: "learning" }],
  },
  {
    id: "3",
    topic: "Building Resilient Systems with Go",
    url: "https://example-conference.com/talks/go-resilience",
    user_notes: "Check out the section on rate limiting.",
    added_date: "1 week ago",
    status: "sent",
    tags: [{ id: 5, name: "golang" }, { id: 6, name: "architecture" }],
  },
  {
    id: "4",
    topic: "A Guide to Sustainable Productivity",
    url: "https://some-blog.com/sustainable-productivity",
    user_notes: "Finished this one. Great insights on avoiding burnout.",
    added_date: "2 weeks ago",
    status: "archived",
    tags: [{ id: 7, name: "productivity" }],
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const newDrops = mockDrops.filter((drop) => drop.status === 'new');
  const sentDrops = mockDrops.filter((drop) => drop.status === 'sent');
  const archivedDrops = mockDrops.filter((drop) => drop.status === 'archived');

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-sage/30 font-serif text-foreground">
      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-terracotta/10 rounded-full filter blur-3xl opacity-50 animate-gentle-fade-in"></div>
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-sky/10 rounded-full filter blur-3xl opacity-50 animate-gentle-fade-in animation-delay-2000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-background/70 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-terracotta" />
          <h1 className="text-2xl font-bold text-foreground">Dropwise</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Log Out</span>
        </Button>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Add New Drop Section */}
          <div className="text-center mb-10 animate-gentle-fade-in">
            <h2 className="text-3xl font-semibold mb-2">A drop a day keeps the clutter away.</h2>
            <p className="text-muted-foreground mb-4">Found something interesting? Add it to your collection.</p>
            <Button size="lg" className="bg-terracotta hover:bg-terracotta/90 text-terracotta-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow">
              <PlusCircle className="mr-2 h-5 w-5" />
              Add a New Drop
            </Button>
          </div>

          {/* Drop List with Tabs */}
          <Tabs defaultValue="new" className="w-full animate-gentle-fade-in animation-delay-200">
            <TabsList className="grid w-full grid-cols-3 bg-card/60 backdrop-blur-md border border-border/70 shadow-sm">
              <TabsTrigger value="new">New ({newDrops.length})</TabsTrigger>
              <TabsTrigger value="sent">Sent ({sentDrops.length})</TabsTrigger>
              <TabsTrigger value="archived">Archived ({archivedDrops.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="new" className="mt-6">
              <DropList drops={newDrops} />
            </TabsContent>
            <TabsContent value="sent" className="mt-6">
              <DropList drops={sentDrops} />
            </TabsContent>
            <TabsContent value="archived" className="mt-6">
              <DropList drops={archivedDrops} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default HomePage; 