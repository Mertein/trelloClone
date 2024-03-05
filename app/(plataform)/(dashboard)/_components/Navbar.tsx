import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";
import { FormPopover } from "@/components/form/form-popover";
const NavBar = () => {
  return ( 
    <nav className="z-50 fixed top-0 border-b px-4 shadow-sm bg-white w-full h-14 flex items-center">
      <MobileSidebar/>
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
            <Logo/>
          </div>
        <FormPopover align="start" sideOffset={18} side="bottom">
          <Button 
            size='sm'
            variant='primary'
            className="rounded-sm hidden md:block h-auto py-1.5 px-2"
          >
            Crear
          </Button>
        </FormPopover>
        <FormPopover>
          <Button 
            size='sm'
            className="rounded-sm block md:hidden mr-2"
            variant='primary'
          >
            <Plus className="w-4 h-4"/>
          </Button>
        </FormPopover>
      </div>
      <div className="items-center flex ml-auto gap-x-2 ">
        <OrganizationSwitcher
          afterCreateOrganizationUrl='/organization/:id'
          afterSelectOrganizationUrl='/organization/:id'
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }
            }
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          signInUrl="/organization"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30
              }
            }
          }}
        />
      </div>
    </nav>
   );
}
 
export default NavBar;