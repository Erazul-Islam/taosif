"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { Button } from "@/src/components/ui/button";

interface DeleteConfirmationModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
  isConfirming?: boolean;
}

const DeleteConfirmationModal = ({
  open,
  title = "Delete this item?",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onOpenChange,
  onConfirm,
  isConfirming = false,
}: DeleteConfirmationModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border border-white/10 bg-slate-950 text-slate-100">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-400">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="destructive" className="border-white/10 cursor-pointer bg-white/5 text-slate-100 hover::text-white/90" onClick={() => onOpenChange(false)}>
              {cancelText}
            </Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              className="cursor-pointer text-white"
              onClick={onConfirm}
              disabled={isConfirming}
            >
              {isConfirming ? "Deleting..." : confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationModal;
