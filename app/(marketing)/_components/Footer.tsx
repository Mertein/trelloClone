"use client"

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return(
    <div className="fixed w-full bottom-0 border-t px-4 bg-slate-100">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between ">
        <Logo />
        <div className="space-x-4 md:block md:w-auto w-full flex items-center justify-between ">
          <Button variant="ghost" size="lg"  >Política de Privacidad</Button>
          <Button variant="ghost" size="lg">Términos y Servicios</Button>
        </div>
     </div>
    </div>
  );
};