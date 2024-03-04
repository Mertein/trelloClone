import Link from "next/link"
import Image from "next/image";
import {cn} from "@/lib/utils";
import localFont from "next/font/local";

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
})

export const Logo = () => {
  return (
    <Link href='/'>
      <div className="hover:opacity-75 transition gap-x-2 md:flex items-center hidden">
        <Image
          src='/logo.svg'
          width={20}
          height={30}
          alt='logo'
        />
        <p className={cn("text-lg text-neutral-700 pb-1", headingFont.className)}>Taskify</p>
      </div>
    
    </Link>
      
  )
}