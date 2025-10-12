import { Link } from "react-router-dom";
import { Search, ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="flex items-center justify-between h-16 px-8">
        <div className="flex-1" />
        
        <nav className="flex items-center gap-12">
          <Link 
            to="/about" 
            className="text-sm uppercase tracking-[0.2em] hover:opacity-60 transition-opacity"
          >
            О БРЕНДЕ
          </Link>
          <Link 
            to="/catalog" 
            className="text-sm uppercase tracking-[0.2em] hover:opacity-60 transition-opacity"
          >
            КАТАЛОГ
          </Link>
          <Link 
            to="/lookbook" 
            className="text-sm uppercase tracking-[0.2em] hover:opacity-60 transition-opacity"
          >
            LOOKBOOK
          </Link>
          <Link 
            to="/info" 
            className="text-sm uppercase tracking-[0.2em] hover:opacity-60 transition-opacity"
          >
            INFO +
          </Link>
        </nav>

        <div className="flex-1 flex items-center justify-end gap-6">
          <input
            type="text"
            placeholder=""
            className="w-32 bg-transparent border-b border-border focus:outline-none text-sm"
          />
          <button className="hover:opacity-60 transition-opacity">
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="hover:opacity-60 transition-opacity relative"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-foreground text-background text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button className="hover:opacity-60 transition-opacity">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
    
    <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
