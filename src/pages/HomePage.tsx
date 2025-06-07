import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { BookOpen, LogOut, PlusCircle, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropList } from "@/features/drops/components/DropList";
import type { Drop } from "@/types/domain";
import { AddDropDialog } from "@/features/drops/components/AddDropDialog";
import { useEffect, useState } from "react";
import api from "@/services/api";

const HomePage = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [drops, setDrops] = useState<Drop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrops = async () => {
      try {
        setLoading(true);
        const response = await api.get<Drop[] | { drops: Drop[] }>("/drops");
        
        // Handle both direct array response and object-wrapped response
        const dropsData = Array.isArray(response.data) ? response.data : response.data.drops;
        
        setDrops(dropsData || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch drops. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrops();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAddDrop = (newDrop: Drop) => {
    setDrops((prevDrops) => [newDrop, ...prevDrops]);
  };

  const handleUpdateDrop = (updatedDrop: Drop) => {
    setDrops((prevDrops) =>
      prevDrops.map((drop) => (drop.id === updatedDrop.id ? updatedDrop : drop))
    );
  };

  const handleDeleteDrop = async (dropId: string) => {
    try {
      await api.delete(`/drops/${dropId}`);
      setDrops((prevDrops) => prevDrops.filter((drop) => drop.id !== dropId));
    } catch (err) {
      // TODO: Show a toast notification for better user experience
      console.error("Failed to delete drop:", err);
      setError("Failed to delete the drop. Please try again.");
    }
  };

  const newDrops = drops.filter((drop) => drop.status === 'new');
  const sentDrops = drops.filter((drop) => drop.status === 'sent');
  const archivedDrops = drops.filter((drop) => drop.status === 'archived');

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
            <AddDropDialog onDropAdded={handleAddDrop} />
          </div>

          {/* Drop List with Tabs */}
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-terracotta" />
            </div>
          ) : error ? (
            <div className="text-center py-16 text-destructive">
              <p>{error}</p>
            </div>
          ) : (
            <Tabs defaultValue="new" className="w-full animate-gentle-fade-in animation-delay-200">
              <TabsList className="grid w-full grid-cols-3 bg-card/60 backdrop-blur-md border border-border/70 shadow-sm">
                <TabsTrigger value="new">New ({newDrops.length})</TabsTrigger>
                <TabsTrigger value="sent">Sent ({sentDrops.length})</TabsTrigger>
                <TabsTrigger value="archived">Archived ({archivedDrops.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="new" className="mt-6">
                <DropList 
                  drops={newDrops} 
                  onDropUpdated={handleUpdateDrop} 
                  onDropDeleted={handleDeleteDrop} 
                />
              </TabsContent>
              <TabsContent value="sent" className="mt-6">
                <DropList 
                  drops={sentDrops} 
                  onDropUpdated={handleUpdateDrop} 
                  onDropDeleted={handleDeleteDrop} 
                />
              </TabsContent>
              <TabsContent value="archived" className="mt-6">
                <DropList 
                  drops={archivedDrops} 
                  onDropUpdated={handleUpdateDrop} 
                  onDropDeleted={handleDeleteDrop} 
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage; 