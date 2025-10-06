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
    sale: 10
  },
  {
    id: 2,
    name: "Джемпер «Гравюра»",
    price: 11599,
    colors: ["#D3D3D3", "#4A4A4A"],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80"
  },
  {
    id: 3,
    name: "Футболка «Луг»",
    price: 3600,
    colors: ["#D4E157", "#E8E8E8"],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
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

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Свитшот");

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-border py-12 px-6">
        <nav className="space-y-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`block w-full text-left text-sm tracking-wide hover:opacity-60 transition-opacity ${
                category === selectedCategory ? "underline" : ""
              } ${category === "SALE %" ? "text-accent" : ""}`}
            >
              {category}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1">
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
          {products.map((product) => (
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
    </div>
  );
};

export default Catalog;
