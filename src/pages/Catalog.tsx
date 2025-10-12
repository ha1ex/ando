import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Свитшот «Пион»",
    price: 7999,
    oldPrice: 8800,
    colors: ["#C4A4C4", "#E8E8E8"],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
    sale: 10,
    category: "Свитшот"
  },
  {
    id: 2,
    name: "Джемпер «Гравюра»",
    price: 11599,
    colors: ["#D3D3D3", "#4A4A4A"],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    category: "Свитера"
  },
  {
    id: 3,
    name: "Футболка «Луг»",
    price: 3600,
    colors: ["#D4E157", "#E8E8E8"],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    category: "Топы"
  },
  {
    id: 4,
    name: "Блузка «Минимал»",
    price: 5200,
    colors: ["#FFFFFF", "#F5F5DC"],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800&q=80",
    category: "Блузки"
  },
  {
    id: 5,
    name: "Рубашка оверсайз",
    price: 6800,
    colors: ["#FFFFFF", "#708090"],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=800&q=80",
    category: "Рубашки"
  },
  {
    id: 6,
    name: "Юбка миди «Волна»",
    price: 4900,
    colors: ["#2F4F4F", "#D2B48C"],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80",
    category: "Юбки"
  },
  {
    id: 7,
    name: "Брюки широкие",
    price: 8200,
    colors: ["#696969", "#F5F5DC"],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80",
    category: "Брюки"
  },
  {
    id: 8,
    name: "Куртка «Кокон»",
    price: 15900,
    colors: ["#2F4F4F", "#D2B48C"],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80",
    category: "Куртки"
  },
  {
    id: 9,
    name: "Жакет структурный",
    price: 12300,
    colors: ["#808080", "#F5F5DC"],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    category: "Жакеты"
  },
  {
    id: 10,
    name: "Толстовка «Комфорт»",
    price: 5800,
    oldPrice: 6500,
    colors: ["#708090", "#F5F5DC"],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    sale: 11,
    category: "Толстовки"
  },
  {
    id: 11,
    name: "Худи оверсайз",
    price: 6200,
    colors: ["#696969", "#F0E68C"],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    category: "Худи"
  },
  {
    id: 12,
    name: "Топ асимметричный",
    price: 3200,
    oldPrice: 4000,
    colors: ["#000000", "#FFFFFF"],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=800&q=80",
    sale: 20,
    category: "Топы"
  }
];

const categories = [
  "Топы",
  "Блузки",
  "Рубашки",
  "Юбки",
  "Брюки",
  "Свитшот",
  "Куртки",
  "Жакеты",
  "Свитера",
  "Толстовки",
  "Худи",
  "SALE %"
];

interface CatalogProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const Catalog = ({ selectedCategory, setSelectedCategory }: CatalogProps) => {

  const filteredProducts = selectedCategory === "Все товары" 
    ? products 
    : selectedCategory === "SALE %"
    ? products.filter(p => p.sale)
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-full">
        <div className="border-b border-border py-4 px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex gap-8">
              <button className="flex items-center gap-2 hover:opacity-60 transition-opacity">
                Материал <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 hover:opacity-60 transition-opacity">
                Цвет <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 hover:opacity-60 transition-opacity">
                Размер <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 hover:opacity-60 transition-opacity">
                Цена <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="text-muted-foreground">
              Сортировать по: Цена по возрастанию
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 p-8">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group"
            >
              <div className="relative aspect-[3/4] mb-4 overflow-hidden">
                {product.sale && (
                  <div className="absolute top-4 right-4 z-10 bg-black text-white w-12 h-12 rounded-full flex items-center justify-center text-xs">
                    -{product.sale}%
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <h3 className="text-sm mb-2 tracking-wide">{product.name}</h3>
              
              <div className="flex items-center gap-2 mb-2">
                {product.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3 mb-2">
                {product.oldPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {product.oldPrice} ₽
                  </span>
                )}
                <span className="text-sm font-medium">
                  {product.price} ₽
                </span>
              </div>

              <div className="flex gap-2 text-xs">
                {product.sizes.map((size) => (
                  <span key={size} className="text-muted-foreground">
                    {size}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
};

export default Catalog;
