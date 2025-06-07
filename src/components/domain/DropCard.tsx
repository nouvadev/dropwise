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
  const { id, topic, url, user_notes, added_date, tags } = drop;
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
        <Card className="bg-card/60 backdrop-blur-md border-border/70 shadow-sm hover:shadow-lg transition-all duration-300 w-full">
          <CardHeader>
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold text-foreground mb-1">
                  {topic}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-sky text-sm">
                  <Globe className="h-4 w-4" />
                  <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {host}
                  </a>
                </CardDescription>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuSeparator />
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          
          {user_notes && (
            <CardContent>
                <Separator className="mb-4" />
                <div className="flex items-start gap-3">
                    <StickyNote className="h-5 w-5 text-sunflower flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground text-sm italic">"{user_notes}"</p>
                </div>
            </CardContent>
          )}

          <CardFooter>
            <div className="w-full flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <div className="flex flex-wrap items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {tags && tags.length > 0 ? (
                        tags.map((tag, index) => (
                        <Badge key={`${tag}-${index}`} variant="secondary" className="font-normal">
                            {tag}
                        </Badge>
                        ))
                    ) : (
                        <span className="text-xs text-muted-foreground">No tags</span>
                    )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground ml-auto">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(added_date)}</span>
                </div>
            </div>
          </CardFooter>
        </Card>
        
        <AlertDialogContent>
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

      <DialogContent className="sm:max-w-[480px] bg-card/90 backdrop-blur-lg">
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