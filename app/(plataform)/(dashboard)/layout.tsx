import NavBar from "./_components/Navbar";

interface DashBoardLayoutProps {
  children: React.ReactNode,
}

const DashboardLayout = ({children} : DashBoardLayoutProps) => {
  return ( 
    <div>
      <NavBar/>
      {children}
    </div>
   );
}
 
export default DashboardLayout;