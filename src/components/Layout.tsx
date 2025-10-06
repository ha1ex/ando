import { ReactNode } from "react";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <LeftSidebar />
      <Header />
      <main className="ml-64 pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;
