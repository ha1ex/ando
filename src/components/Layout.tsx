import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { AppSidebar } from "./AppSidebar";

interface LayoutProps {
  children: ReactNode;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  activeInfoSection: string;
  onInfoSectionChange: (section: string) => void;
}

const Layout = ({ children, selectedCategory, onCategoryChange, activeInfoSection, onInfoSectionChange }: LayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar 
        selectedCategory={selectedCategory} 
        onCategoryChange={onCategoryChange}
        activeInfoSection={activeInfoSection}
        onInfoSectionChange={onInfoSectionChange}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
