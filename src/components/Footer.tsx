import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-16 py-16">
        <div className="grid grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <div className="border border-foreground p-3 text-center w-20">
                <div className="text-lg font-light tracking-[0.2em]">AN</div>
                <div className="text-lg font-light tracking-[0.2em]">DO</div>
                <div className="w-full h-[1px] bg-foreground my-1" />
                <div className="text-[10px] tracking-[0.3em]">JV</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground mb-6">
              Минималистичная детская мода, созданная с заботой о комфорте и стиле. 
              Качественные материалы и продуманный дизайн.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border flex items-center justify-center hover:border-foreground transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border flex items-center justify-center hover:border-foreground transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border flex items-center justify-center hover:border-foreground transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border flex items-center justify-center hover:border-foreground transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Buyers Column */}
          <div>
            <h3 className="text-sm font-medium mb-6 tracking-wide uppercase">Покупателям</h3>
            <nav className="space-y-3">
              <Link to="/info?section=size-guide" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Размерная сетка
              </Link>
              <Link to="/info?section=delivery" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Доставка и оплата
              </Link>
              <Link to="/info?section=returns" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Возврат и обмен
              </Link>
              <Link to="/catalog" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Уход за изделиями
              </Link>
              <Link to="/info?section=loyalty" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Программа лояльности
              </Link>
            </nav>
          </div>

          {/* About Company Column */}
          <div>
            <h3 className="text-sm font-medium mb-6 tracking-wide uppercase">О компании</h3>
            <nav className="space-y-3">
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                О бренде
              </Link>
              <Link to="/info?section=cooperation" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Наша команда
              </Link>
              <Link to="/info?section=cooperation" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Вакансии
              </Link>
              <Link to="/lookbook" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Новости
              </Link>
              <Link to="/info?section=contacts" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Пресс-центр
              </Link>
            </nav>
          </div>

          {/* Help Column */}
          <div>
            <h3 className="text-sm font-medium mb-6 tracking-wide uppercase">Помощь</h3>
            <nav className="space-y-3">
              <Link to="/info" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Частые вопросы
              </Link>
              <Link to="/info?section=contacts" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Связаться с нами
              </Link>
              <Link to="/info?section=contacts" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Техподдержка
              </Link>
              <Link to="/info" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Отзывы
              </Link>
              <Link to="/catalog" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Карта сайта
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
          <p>© 2024 ANDO JV. Все права защищены.</p>
          <div className="flex gap-6">
            <Link to="/info?section=agreement" className="hover:text-foreground transition-colors">
              Пользовательское соглашение
            </Link>
            <Link to="/info?section=agreement" className="hover:text-foreground transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
