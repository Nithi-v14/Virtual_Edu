import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import AIAssistant from "./AIAssistant";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/login";

  return (
    <div className="min-h-screen flex flex-col">
          <div className="min-h-screen bg-background">
      {showNavbar && <Navbar />}
      {children}
    </div>
    {/* <div className="fixed bottom-4 right-4">
       <AIAssistant />
    </div> */}
    </div>
  );
};

export default Layout;
