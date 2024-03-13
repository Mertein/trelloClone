"use client";

import { useAction } from "@/hooks/use-action";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { stripeRedirect } from "@/actions/stripe-redirect";

export const ProModal = () => {
  const proModal = useProModal();

  const {execute, isLoading} = useAction(stripeRedirect, {
    onSuccess(data) {
      window.location.href = data;
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onClick = () => {
    execute({});
  };

  return (
    <Dialog
      open={proModal.isOpen}
      onOpenChange={proModal.onClose}
    >
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image
            fill
            src="/hero.svg"
            alt="Hero"
            className="object-cover"
          />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">
            Adquiera una suscripción para acceder a todas las funcionalidades!
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore lo mejor de Taskify
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Tableros Ilimitados</li>
              <li>Checklists avanzados</li>
              <li>Funcionalidades de Admin y Seguridad</li>
              <li>Y mucho mas!</li>
            </ul>
          </div>
          <Button
            className="w-full"
            variant='primary'
            disabled={isLoading}
            onClick={onClick}
          >
            Adquirir suscripción
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}