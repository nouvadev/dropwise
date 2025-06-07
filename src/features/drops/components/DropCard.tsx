import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Edit,
  Globe,
  MoreVertical,
  StickyNote,
  Tag,
  Trash2,
} from "lucide-react";
import type { Drop } from "@/types/domain";
import { formatDistanceToNow, parseISO } from "date-fns";
import { EditDropForm } from "./EditDropForm";
import { useState } from "react";

interface DropCardProps {
  drop: Drop;
  onDropUpdated: (updatedDrop: Drop) => void;
  onDropDeleted: (dropId: string) => void;
}

const statusColors = {
    new: "bg-sky/20 text-sky-foreground",
    sent: "bg-terracotta/20 text-terracotta-foreground",
    archived: "bg-sage/20 text-sage-foreground",
    snoozed: "bg-sunflower/20 text-sunflower-foreground",
}

export const DropCard = ({ drop, onDropUpdated, onDropDeleted }: DropCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { id, topic, url, user_notes, added_date, tags, status } = drop;
  const host = new URL(url).hostname;

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error("Failed to parse date:", dateString, error);
      return dateString; // Fallback to original string if parsing fails
    }
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <AlertDialog>
        <Card className="bg-card/70 backdrop-blur-sm border border-border/30 shadow-md hover:border-border/60 hover:shadow-xl transition-all duration-300 w-full group">
          <CardHeader>
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="secondary" 
                    className={`capitalize text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[status] || ''}`}
                  >
                    {status}
                  </Badge>
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-sky transition-colors text-sm"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    <span className="truncate max-w-[200px] md:max-w-xs">{host}</span>
                  </a>
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-terracotta transition-colors">
                  {topic}
                </CardTitle>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground flex-shrink-0">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card/80 backdrop-blur-lg border-border/50">
                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuSeparator />
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          
          {user_notes && (
            <CardContent className="pt-0">
                <div className="border-l-2 border-sunflower/50 pl-4 mt-2">
                    <p className="text-muted-foreground text-sm italic">"{user_notes}"</p>
                </div>
            </CardContent>
          )}

          <CardFooter>
            <div className="w-full flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                    {tags && tags.length > 0 ? (
                        tags.map((tag, index) => (
                        <Badge key={`${tag}-${index}`} variant="secondary">
                            {tag}
                        </Badge>
                        ))
                    ) : (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Tag className="h-3.5 w-3.5" />
                            <span>No tags</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground ml-auto">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(added_date)}</span>
                </div>
            </div>
          </CardFooter>
        </Card>
        
        <AlertDialogContent className="bg-card/95 backdrop-blur-xl border-border/50">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this drop
              from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDropDeleted(id)} className="bg-destructive hover:bg-destructive/90">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DialogContent className="sm:max-w-[480px] bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Edit className="w-6 h-6 text-terracotta" />
            Edit Drop
          </DialogTitle>
          <DialogDescription>
            Update the details of your drop below.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <EditDropForm 
            drop={drop}
            onDropUpdated={onDropUpdated}
            onSuccess={() => setIsEditDialogOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}; 