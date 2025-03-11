import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";

export default function IdeaModal({ open, onOpenChange, idea }) {
  if (!idea) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{idea.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-sm text-gray-500">Description</p>
            <p className="mt-1">{idea.description}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Category</p>
            <p className="mt-1">{idea.category?.name || 'Uncategorized'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Published</p>
            <p className="mt-1">
              {format(new Date(idea._publishedAt), 'MMM dd, yyyy')}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}