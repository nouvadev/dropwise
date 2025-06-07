import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

interface DropCardProps {
  drop: Drop;
}

const statusColors = {
    new: "bg-sky/20 text-sky-foreground",
    sent: "bg-terracotta/20 text-terracotta-foreground",
    archived: "bg-sage/20 text-sage-foreground",
    snoozed: "bg-sunflower/20 text-sunflower-foreground",
}

export const DropCard = ({ drop }: DropCardProps) => {
  const { topic, url, user_notes, added_date, tags, status } = drop;
  const host = new URL(url).hostname;

  return (
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
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
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
                {tags.length > 0 ? (
                    tags.map((tag) => (
                    <Badge key={tag.id} variant="secondary" className="font-normal">
                        {tag.name}
                    </Badge>
                    ))
                ) : (
                    <span className="text-xs text-muted-foreground">No tags</span>
                )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground ml-auto">
                <Calendar className="h-4 w-4" />
                <span>{added_date}</span>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}; 