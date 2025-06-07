import type { Drop } from "@/types/domain";
import { DropCard } from "./DropCard";

interface DropListProps {
  drops: Drop[];
  onDropUpdated: (updatedDrop: Drop) => void;
  onDropDeleted: (dropId: string) => void;
}

export const DropList = ({ drops, onDropUpdated, onDropDeleted }: DropListProps) => {
  if (drops.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-semibold text-muted-foreground">
          No drops here... yet.
        </h3>
        <p className="text-sm text-muted-foreground">
          Add a new drop to start your learning journey.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {drops.map((drop, index) => (
        <div 
            key={drop.id} 
            className="animate-gentle-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <DropCard drop={drop} onDropUpdated={onDropUpdated} onDropDeleted={onDropDeleted} />
        </div>
      ))}
    </div>
  );
}; 