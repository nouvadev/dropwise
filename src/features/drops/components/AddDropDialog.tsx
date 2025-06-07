import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Drop } from "@/types/domain";
import { PlusCircle } from "lucide-react";
import { AddDropForm } from "./AddDropForm";
import { useState } from "react";

interface AddDropDialogProps {
    onDropAdded: (newDrop: Drop) => void;
}

export const AddDropDialog = ({ onDropAdded }: AddDropDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-terracotta hover:bg-terracotta/90 text-terracotta-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow">
          <PlusCircle className="mr-2 h-5 w-5" />
          Add a New Drop
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] bg-card/90 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
             <PlusCircle className="w-6 h-6 text-terracotta" />
             Add a New Drop
          </DialogTitle>
          <DialogDescription>
            Found something worth saving? Add the link below to process it into a drop later.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
            <AddDropForm 
                onDropAdded={onDropAdded}
                onSuccess={() => setOpen(false)}
            />
        </div>
      </DialogContent>
    </Dialog>
  );
}; 