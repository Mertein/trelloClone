import { ClerkProvider } from "@clerk/nextjs";

const PlataformLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
};
export default PlataformLayout;