import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/services/api";
import type { Drop } from "@/types/domain";
import { Globe, Loader2, StickyNote, Tags, Type } from "lucide-react";
import { useEffect, useState } from "react";

interface EditDropFormProps {
  drop: Drop;
  onDropUpdated: (updatedDrop: Drop) => void;
  onSuccess: () => void;
}

export const EditDropForm = ({ drop, onDropUpdated, onSuccess }: EditDropFormProps) => {
  const [topic, setTopic] = useState(drop.topic);
  const [url, setUrl] = useState(drop.url);
  const [tags, setTags] = useState(drop.tags.join(", "));
  const [userNotes, setUserNotes] = useState(drop.user_notes || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If the drop prop changes (e.g., user opens dialog for a different drop),
  // reset the form state.
  useEffect(() => {
    setTopic(drop.topic);
    setUrl(drop.url);
    setTags(drop.tags.join(", "));
    setUserNotes(drop.user_notes || "");
  }, [drop]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        url,
        topic,
        user_notes: userNotes,
        tags: tags.split(',').map(tag => tag.trim()).filter(t => t),
      };
      
      const response = await api.put<Drop>(`/drops/${drop.id}`, payload);
      
      onDropUpdated(response.data);
      onSuccess();
    } catch (err) {
      setError("Failed to update drop. Please check the details and try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-3">
        <Label htmlFor="url" className="flex items-center">
          <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
          URL
        </Label>
        <Input
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="bg-input/50"
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="topic" className="flex items-center">
            <Type className="mr-2 h-4 w-4 text-muted-foreground" />
            Topic / Title
        </Label>
        <Input 
          id="topic" 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required 
          className="bg-input/50"
        />
      </div>
       <div className="grid gap-3">
        <Label htmlFor="tags" className="flex items-center">
            <Tags className="mr-2 h-4 w-4 text-muted-foreground" />
            Tags
        </Label>
        <Input 
          id="tags" 
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="comma, separated, tags" 
          className="bg-input/50" 
        />
        <p className="text-xs text-muted-foreground">
            Separate tags with a comma.
        </p>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="user_notes" className="flex items-center">
            <StickyNote className="mr-2 h-4 w-4 text-muted-foreground" />
            Your Notes (Optional)
        </Label>
        <Textarea
          id="user_notes"
          value={userNotes}
          onChange={(e) => setUserNotes(e.target.value)}
          className="resize-y min-h-[100px] bg-input/50"
        />
      </div>

      {error && <p className="text-sm text-destructive text-center">{error}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full bg-terracotta hover:bg-terracotta/90">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Changes
      </Button>
    </form>
  );
}; 