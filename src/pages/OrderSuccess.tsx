import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items } = useCart();
  const { orderNumber } = location.state || {};

  useEffect(() => {
    if (!orderNumber) {
      navigate('/');
    }
  }, [orderNumber, navigate]);

  useEffect(() => {
    if (items.length > 0) {
      items.forEach(item => {
        // Clear cart after successful order
        const event = new CustomEvent('clearCart');
        window.dispatchEvent(event);
      });
    }
  }, [items]);

  if (!orderNumber) {
    return null;
  }

  return (
    <div className="min-h-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle2 className="w-20 h-20 text-green-500" />
            </div>
            
            <div>
              <h1 className="text-2xl font-semibold mb-2">
                Заказ успешно оформлен!
              </h1>
              <p className="text-muted-foreground">
                Спасибо за ваш заказ
              </p>
            </div>

            <div className="bg-secondary p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">
                Номер заказа:
              </p>
              <p className="text-lg font-mono font-semibold">
                {orderNumber}
              </p>
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                Мы отправили подтверждение на ваш email.
              </p>
              <p>
                Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <Button asChild className="w-full">
                <Link to="/orders">Мои заказы</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/catalog">Продолжить покупки</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;