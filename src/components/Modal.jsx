import * as React from "react"
import { Dialog } from "radix-ui"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

const Modal = Dialog.Root
const ModalTrigger = Dialog.Trigger
const ModalPortal = Dialog.Portal
const ModalClose = Dialog.Close

const ModalOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]",
      className
    )}
    {...props}
  />
))
ModalOverlay.displayName = Dialog.Overlay.displayName

const ModalContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <div className="fixed inset-0 z-50 p-2 sm:p-4">
      <Dialog.Content
        ref={ref}
        aria-describedby={props["aria-describedby"] || undefined}
        className={cn(
          "relative mx-auto flex h-full w-full max-h-[90vh] max-w-lg flex-col rounded-sm border bg-background p-0 shadow-lg md:mt-[5vh]",
          className
        )}
        {...props}
      >
        {children}
        <Dialog.Close className="absolute right-4 top-5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground cursor-pointer">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Dialog.Close>
      </Dialog.Content>
    </div>
  </ModalPortal>
))
ModalContent.displayName = Dialog.Content.displayName

const ModalHeader = ({ className, ...props }) => (
  <div
    className={cn("shrink-0 flex flex-col space-y-1.5 text-center sm:text-left p-6 border-b bg-muted/20", className)}
    {...props}
  />
)
ModalHeader.displayName = "ModalHeader"

const ModalFooter = ({ className, ...props }) => (
  <div
    className={cn("shrink-0 flex gap-1 md:gap-0 sm:justify-end sm:space-x-2 p-6 border-t bg-muted/20", className)}
    {...props}
  />
)
ModalFooter.displayName = "ModalFooter"

const ModalTitle = React.forwardRef(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight text-primary", className)}
    {...props}
  />
))
ModalTitle.displayName = Dialog.Title.displayName

const ModalDescription = React.forwardRef(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
ModalDescription.displayName = Dialog.Description.displayName

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
}
