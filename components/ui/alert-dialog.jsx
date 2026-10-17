
"use client";

import * as React from "react";
import { cn } from "cn";

import {
  Dialog as AlertDialogPrimitive,
  DialogTrigger as AlertDialogTriggerPrimitive,
  Heading,
  ModalOverlay as ModalOverlayPrimitive,
  Modal as ModalPrimitive,
} from "react-aria-components";

import { Button } from "@/components/ui/button";

function AlertDialogTrigger(props) {
  return (
    <AlertDialogTriggerPrimitive
      data-slot="alert-dialog-trigger"
      {...props}
    />
  );
}

function AlertDialogOverlay({
  className,
  children,
  ...props
}) {
  return (
    <ModalOverlayPrimitive
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 z-[9998] flex items-center justify-center bg-black/40 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {children}
    </ModalOverlayPrimitive>
  );
}

function AlertDialog({
  className,
  size = "default",
  children,
  isOpen,
  onOpenChange,
  ...props
}) {
  return (
    <AlertDialogOverlay
      {...props}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalPrimitive
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          "relative z-[9999] grid w-full max-w-md gap-6 rounded-xl bg-white p-6 text-gray-900 shadow-2xl outline-none",
          className
        )}
      >
        <AlertDialogPrimitive
          data-slot="alert-dialog"
          role="alertdialog"
          className="grid gap-4 outline-none"
        >
          {children}
        </AlertDialogPrimitive>
      </ModalPrimitive>
    </AlertDialogOverlay>
  );
}

function AlertDialogContent({
  className,
  size = "default",
  children,
  ...props
}) {
  return (
    <AlertDialog
      className={className}
      size={size}
      {...props}
    >
      {children}
    </AlertDialog>
  );
}

function AlertDialogHeader({ className, ...props }) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "grid gap-2 text-center sm:text-left",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogFooter({ className, ...props }) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogMedia({ className, ...props }) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "mb-2 inline-flex size-16 items-center justify-center rounded-md bg-muted",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({ className, ...props }) {
  return (
    <Heading
      slot="title"
      data-slot="alert-dialog-title"
      className={cn(
        "text-lg font-semibold",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogDescription({ className, ...props }) {
  return (
    <div
      data-slot="alert-dialog-description"
      className={cn(
        "text-sm leading-relaxed text-gray-600",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogAction({ className, ...props }) {
  return (
    <Button
      slot="close"
      data-slot="alert-dialog-action"
      className={className}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}) {
  return (
    <Button
      slot="close"
      data-slot="alert-dialog-cancel"
      variant={variant}
      size={size}
      className={className}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
};
