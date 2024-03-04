'use client'
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
;
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { Activity, CreditCard, Layout, Settings } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export type Organization = {
  id: string,
  slug: string,
  imageUrl: string,
  name: string
}

interface NavItemProps {
  isActive: boolean,
  isExpanded: boolean,
  organization: Organization,
  onExpand: (id: string) => void,

}

export const NavItem = ({
  isActive,
  isExpanded,
  organization,
  onExpand
}: NavItemProps ) => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      label: 'Tableros',
      icon: <Layout className="w-4 h-4 mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: 'Actividad',
      icon: <Activity className="w-4 h-4 mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: 'Configuración',
      icon: <Settings className="w-4 h-4 mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: 'Facturación',
      icon: <CreditCard className="w-4 h-4 mr-2" />,
      href: `/organization/${organization.id}/billing`,
    },
  ]

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger onClick={() => onExpand(organization.id)} className={cn(
        "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
        isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
      )}>
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative ">
            <Image fill src={organization.imageUrl} alt='Organization' className="rounded object-cover" />
          </div>
          <span className="text-sm font-medium">
            {organization.name}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {routes.map((route) => (
          <Button key={route.href} onClick={() => onClick(route.href)} size='sm' variant='ghost' className={cn(
            "w-full font normal justify-start pl-10 mb-1",
            pathname === route.href && "bg-sky-500/10 text-sky-700 font-semibold"
          )}>
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}
NavItem.Skeleton = () => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full"/>
    </div>
  )
}