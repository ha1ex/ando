import { ReactNode } from "react";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";

interface LayoutProps {
  children: ReactNode;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const Layout = ({ children, selectedCategory, onCategoryChange }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <LeftSidebar selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
      <Header />
      <main className="ml-64 pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;
