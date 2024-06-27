
import SideNavbar from "@/components/SideNavbar";

export default function DashboardLayout({ children }) {


  return (
    <div className="relative flex">
      <SideNavbar/>
      <div className="flex-1 ml-0 lg:ml-60 transition-all duration-200">
        {children}
      </div>
    </div>
  );
}