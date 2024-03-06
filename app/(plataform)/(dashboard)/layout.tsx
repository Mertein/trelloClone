import NavBar from "./_components/Navbar";

interface DashBoardLayoutProps {
  children: React.ReactNode,
}

const DashboardLayout = ({children} : DashBoardLayoutProps) => {
  return ( 
    <div className="h-full">
      <NavBar/>
      {children}
    </div>
   );
}
 
export default DashboardLayout;