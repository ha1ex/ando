import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface ProductSearchProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

const ProductSearch = ({ onSearch, initialValue = "" }: ProductSearchProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [debouncedQuery, setDebouncedQuery] = useState(initialValue);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Call onSearch when debounced query changes
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder=""
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-transparent border-0 border-b border-border px-2 py-2 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground text-center"
        aria-label="Поиск товаров"
      />
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        <Search className="w-4 h-4 text-muted-foreground opacity-60" aria-hidden="true" />
      </div>
    </div>
  );
};

export default ProductSearch;
