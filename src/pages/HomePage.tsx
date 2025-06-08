import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { LogOut, Loader2, Tag, ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
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
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrops = async () => {
      try {
        setLoading(true);
        const response = await api.get<Drop[] | { drops: Drop[] }>("/drops");
        
        // Handle both direct array response and object-wrapped response
        const dropsData = Array.isArray(response.data) ? response.data : response.data.drops;
        
        setDrops(dropsData || []);

        if (dropsData) {
          const tags = new Set(dropsData.flatMap(drop => drop.tags || []));
          setAllTags(['All', ...Array.from(tags)]);
        }

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
    if (newDrop.tags) {
        const newTags = newDrop.tags.filter(tag => !allTags.includes(tag));
        if (newTags.length > 0) {
            setAllTags(prevTags => [...prevTags, ...newTags]);
        }
    }
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

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
  };

  const filteredDrops = selectedTag && selectedTag !== 'All'
    ? drops.filter(drop => drop.tags && drop.tags.includes(selectedTag))
    : drops;

  const newDrops = filteredDrops.filter((drop) => drop.status === 'new');
  const sentDrops = filteredDrops.filter((drop) => drop.status === 'sent');
  const archivedDrops = filteredDrops.filter((drop) => drop.status === 'archived');

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-sage/30 font-serif text-foreground">
      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-terracotta/10 rounded-full filter blur-3xl opacity-50 animate-gentle-fade-in"></div>
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-sky/10 rounded-full filter blur-3xl opacity-50 animate-gentle-fade-in animation-delay-2000"></div>
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-sage/10 rounded-full filter blur-3xl opacity-50 animate-gentle-fade-in animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-background/80 backdrop-blur-lg border-b border-border/20 shadow-sm">
        <div className="flex items-center gap-3">
          <img src="/file.svg" alt="Dropwise Logo" className="w-8 h-8" />
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dropwise</h1>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Add New Drop Section */}
          <div className="text-center mb-12 animate-gentle-fade-in">
            <h2 className="text-4xl font-bold tracking-tight mb-3">A drop a day keeps the clutter away.</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">Found something interesting? Add it to your collection and clear your mind.</p>
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
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-4">
                <TabsList className="grid w-full grid-cols-3 sm:w-auto bg-background/60 backdrop-blur-md border border-border/30 shadow-inner-sm rounded-lg">
                  <TabsTrigger value="new" className="py-2.5 text-sm font-semibold data-[state=active]:bg-card data-[state=active]:text-terracotta data-[state=active]:shadow-md">New ({newDrops.length})</TabsTrigger>
                  <TabsTrigger value="sent" className="py-2.5 text-sm font-semibold data-[state=active]:bg-card data-[state=active]:text-terracotta data-[state=active]:shadow-md">Sent ({sentDrops.length})</TabsTrigger>
                  <TabsTrigger value="archived" className="py-2.5 text-sm font-semibold data-[state=active]:bg-card data-[state=active]:text-terracotta data-[state=active]:shadow-md">Archived ({archivedDrops.length})</TabsTrigger>
                </TabsList>
                
                {allTags.length > 1 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto flex items-center justify-between gap-2 bg-background/60 backdrop-blur-md border-border/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4" />
                          <span>{selectedTag && selectedTag !== 'All' ? `Tag: ${selectedTag}` : "Filter by Tag"}</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full sm:w-56 bg-card/80 backdrop-blur-lg border-border/50">
                      <DropdownMenuRadioGroup value={selectedTag || 'All'} onValueChange={handleSelectTag}>
                        {allTags.map(tag => (
                          <DropdownMenuRadioItem key={tag} value={tag}>{tag}</DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              <TabsContent value="new" className="mt-2">
                <DropList 
                  drops={newDrops} 
                  onDropUpdated={handleUpdateDrop} 
                  onDropDeleted={handleDeleteDrop} 
                />
              </TabsContent>
              <TabsContent value="sent" className="mt-2">
                <DropList 
                  drops={sentDrops} 
                  onDropUpdated={handleUpdateDrop} 
                  onDropDeleted={handleDeleteDrop} 
                />
              </TabsContent>
              <TabsContent value="archived" className="mt-2">
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