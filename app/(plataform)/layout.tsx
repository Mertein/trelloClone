import { ModalProvider } from "@/providers/modal-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import {Toaster} from "sonner"

const PlataformLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster/>
        <ModalProvider/>
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};
export default PlataformLayout;