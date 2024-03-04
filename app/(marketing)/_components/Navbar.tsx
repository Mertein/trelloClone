"use client"

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Navbar = () => {
  return(
    <div className="fixed bg-white w-full top-0 items-center flex border-b shadow-sm h-14 ">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between ">
        <Logo />
        <div className="space-x-4 md:block md:w-auto w-full flex items-center justify-between ">
          <Button size="sm" asChild>
            <Link href='/sign-in'>
              Login
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/sign-up">
              Obtén Taskify gratis
            </Link>
          </Button>
        </div>
     </div>
    </div>
  );
};