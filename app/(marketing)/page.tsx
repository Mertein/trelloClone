import { Medal } from "lucide-react";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
})

const textFont = Poppins({
  subsets: ['latin'],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ],
})

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className={cn(
        "flex items-center justify-center flex-col",
        headingFont.className,
      )}>
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase  ">
          <Medal className="h-6 w-6 mr-2"/>
            Nro 1 en gestión de tareas
        </div>
        <h1 className="text-3xl md:text-6xl text-centertext-neutral-800 mb-6">
          Taskify ayuda al equipo a moverse
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-500 to-pink-300 r text-white px-4 p-2 rounded-md pb-4 w-fit">
          Avanza.
        </div>
      </div>
      <div className={cn(
        "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl  text-center mx-auto",
        textFont.className,
      )}>
       Colabora, gestiona proyectos y alcanza nuevos niveles de productividad. Desde rascacielos hasta la oficina en casa, la forma en que tu equipo trabaja es única; logra todo esto con Taskify.
      </div>
      <Button className="mt-8" size="lg" asChild>
        <Link href='/sign-up'>
          Obtén Taskify gratis
        </Link>
      </Button>
    </div>
   
  );
}
export default MarketingPage;