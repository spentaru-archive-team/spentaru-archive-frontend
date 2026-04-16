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
    <Dialog.Content
      ref={ref}
      aria-describedby={props["aria-describedby"] || undefined}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-0 shadow-lg rounded-sm",
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
  </ModalPortal>
))
ModalContent.displayName = Dialog.Content.displayName

const ModalHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left p-6 border-b bg-muted/20", className)}
    {...props}
  />
)
ModalHeader.displayName = "ModalHeader"

const ModalFooter = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 border-t bg-muted/20", className)}
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
