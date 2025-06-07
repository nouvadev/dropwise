import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, LogOut, Plus, Link as LinkIcon, Edit, Trash2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

// "read-it-later" konseptine uygun sahte veriler
const mockDrops = [
  {
    id: "d1",
    type: "article",
    title: "The Psychology of Color in Marketing and Branding",
    source: "smashingmagazine.com",
    createdAt: "2 saat önce",
  },
  {
    id: "d2",
    type: "video",
    title: "Figma for Beginners: A Complete Tutorial",
    source: "youtube.com",
    createdAt: "Dün",
  },
  {
    id: "d3",
    type: "tweet",
    title: "A thread on how to build a side project in public...",
    source: "twitter.com",
    createdAt: "3 gün önce",
  },
    {
    id: "d4",
    type: "recipe",
    title: "Authentic Italian Tiramisu Recipe",
    source: "allrecipes.com",
    createdAt: "1 hafta önce",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-sage-DEFAULT/20 font-serif text-foreground">
      {/* Arka plan için organik şekiller */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-terracotta/10 rounded-full filter blur-3xl opacity-50 animate-gentle-fade-in"></div>
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-sky/10 rounded-full filter blur-3xl opacity-50 animate-gentle-fade-in animation-delay-2000"></div>
      </div>
      
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background/50 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-terracotta" />
            <h1 className="text-2xl font-bold text-foreground">Dropwise</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Çıkış Yap</span>
        </Button>
      </header>
      
      {/* Ana İçerik */}
      <main className="p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Yeni Drop Ekleme */}
          <div className="text-center mb-8 animate-gentle-fade-in">
             <h2 className="text-3xl font-semibold mb-2">Okuma listenize ekleyin.</h2>
             <p className="text-muted-foreground mb-4">İlginç bir makale, video veya tarif mi buldunuz? Kaydedin.</p>
             <Button size="lg" className="bg-terracotta hover:bg-terracotta/90 text-terracotta-foreground">
                <Plus className="mr-2 h-5 w-5" />
                Yeni Drop Ekle
             </Button>
          </div>
          
          {/* Drop Listesi */}
          <div className="space-y-4">
            {mockDrops.map((drop, index) => (
              <Card 
                key={drop.id} 
                className="bg-card/60 backdrop-blur-md border-border/70 shadow-sm hover:shadow-lg transition-all duration-300 animate-gentle-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                    <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-foreground">{drop.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-sky pt-1">
                            <LinkIcon className="h-4 w-4" />
                            {drop.source}
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Düzenle</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/80 hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Sil</span>
                        </Button>
                    </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage; 