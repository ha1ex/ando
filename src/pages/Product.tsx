import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useProduct } from "@/hooks/useProducts";
import { toast } from "sonner";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { data: product, isLoading } = useProduct(id || '');
  
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Загрузка...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-full items-center justify-center flex-col gap-4">
        <p className="text-muted-foreground">Товар не найден</p>
        <Link to="/catalog" className="underline">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const images = product.product_images?.sort((a, b) => a.display_order - b.display_order) || [];
  const mainImages = images.length > 0 
    ? images.map(img => img.image_url)
    : ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&q=80'];

  const discount = product.old_price 
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize && product.available_sizes && product.available_sizes.length > 0) {
      toast.error("Пожалуйста, выберите размер");
      return;
    }

    addToCart({
      id: Number(product.id),
      name: product.name,
      price: product.price,
      size: selectedSize || 'ONE SIZE',
      color: product.available_colors?.[selectedColor] || 'default',
      image: mainImages[0],
    });
    toast.success("Товар добавлен в корзину");
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 flex items-center justify-center py-16 px-8">
        <div className="relative max-w-xl">
          {mainImages.length > 1 && (
            <button 
              onClick={() => setCurrentImage((prev) => (prev - 1 + mainImages.length) % mainImages.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hover:opacity-60 transition-opacity"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}
          <img
            src={mainImages[currentImage]}
            alt={product.name}
            className="w-full"
          />

          {mainImages.length > 1 && (
            <button 
              onClick={() => setCurrentImage((prev) => (prev + 1) % mainImages.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hover:opacity-60 transition-opacity"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {product.available_colors && product.available_colors.length > 0 && (
            <div className="flex gap-2 justify-center mt-4">
              {product.available_colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(idx)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    idx === selectedColor ? "border-foreground" : "border-border"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-96 border-l border-border py-16 px-8">
        <div className="flex items-start justify-between mb-8">
          <h1 className="text-xl tracking-[0.15em] uppercase">
            {product.name}
          </h1>
          {product.is_sale && discount > 0 && (
            <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center text-xs flex-shrink-0">
              -{discount}%
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 mb-8">
          {product.old_price && (
            <span className="text-lg text-muted-foreground line-through">
              {product.old_price} ₽
            </span>
          )}
          <span className="text-2xl font-medium">
            {product.price} ₽
          </span>
        </div>

        <div className="space-y-4 mb-8 text-sm">
          {product.article && (
            <div>
              <span className="text-muted-foreground">Артикул:</span> {product.article}
            </div>
          )}
          {product.material && (
            <div>
              <span className="text-muted-foreground">Состав:</span> {product.material}
            </div>
          )}
          {product.description && (
            <div>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          )}
        </div>

        {product.available_sizes && product.available_sizes.length > 0 && (
          <div className="mb-6">
            <div className="text-sm mb-3">Размер:</div>
            <div className="flex gap-2">
              {product.available_sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 border border-border hover:border-foreground transition-colors ${
                    selectedSize === size ? "bg-foreground text-background" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <Link to="#" className="text-xs underline mt-2 inline-block">
              Информация о размерах товара
            </Link>
          </div>
        )}

          <div className="flex gap-3 mb-8">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-foreground text-background py-4 px-6 text-sm tracking-wide uppercase hover:opacity-90 transition-opacity"
            >
              ДОБАВИТЬ В КОРЗИНУ
            </button>
            <button className="w-12 h-12 border border-border hover:border-foreground transition-colors flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          <div className="text-sm mb-3">
            В другом цвете: <Link to="#" className="underline">Голубой</Link>
          </div>

          <div className="space-y-6 text-sm pt-8 border-t border-border">
            <div>
              <h3 className="font-medium mb-2">ДОСТАВКА</h3>
              <p className="text-muted-foreground leading-relaxed">
                Доставка по России за 1-7 дней, бесплатно<br />
                По Санкт-Петербургу и Москве доставка заказа возможна доставка на следующий день. 
                Стоимость доставки от 1500 руб.<br />
                Подробнее на странице <Link to="/info" className="underline">Доставка</Link>
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">ОПЛАТА</h3>
              <p className="text-muted-foreground leading-relaxed">
                Онлайн оплата через платежную систему CloudPayments<br />
                Принимаются карты VISA, MasterCard, платежная система «Мир»<br />
                Подробнее на странице <Link to="/info" className="underline">Оплата</Link>
              </p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Product;
