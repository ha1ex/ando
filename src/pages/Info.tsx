import { useState } from "react";

const menuItems = [
  { id: "brand", label: "О Бренде" },
  { id: "cooperation", label: "Сотрудничество" },
  { id: "delivery", label: "Оплата и доставка" },
  { id: "returns", label: "Возврат" },
  { id: "size-guide", label: "Гид по размерам" },
  { id: "agreement", label: "Пользовательское соглашение" },
  { id: "warranty", label: "Гарантия" },
  { id: "loyalty", label: "Программа лояльности и бонусы" },
  { id: "contacts", label: "Контакты" },
  { id: "stores", label: "Магазины" }
];

const Info = () => {
  const [activeSection, setActiveSection] = useState("delivery");

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-border py-12 px-6">
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`block w-full text-left text-sm tracking-wide hover:opacity-60 transition-opacity ${
                activeSection === item.id ? "underline" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 py-16 px-16 max-w-4xl">
        {activeSection === "delivery" && (
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl mb-6 tracking-[0.15em] uppercase">ДОСТАВКА</h2>
              <p className="text-sm mb-4 leading-relaxed">
                Доставка всех заказов по России бесплатная.
              </p>
              <p className="text-sm mb-4 leading-relaxed">
                Доставка по России осуществляется курьерской службой <span className="underline">СДЭК</span>. 
                Срок по Санкт-Петербургу и Москве составляет 1-3 рабочих дня, по России до 7 рабочих дней.
              </p>
              <p className="text-sm mb-4 leading-relaxed">
                По Санкт-Петербургу и Москве (при наличии оплаченных вещей на складе) доставка 
                осуществляется курьерами службы <span className="underline">Dostavista</span> и может быть организована на следующий день 
                оформления заказа.
              </p>
              <p className="text-sm mb-4 leading-relaxed">
                Действует международная доставка компанией <span className="underline">EMS</span>. 
                Срок доставки составляет от 7 дней. Стоимость 1500 рублей.
              </p>
              <div className="pt-6">
                <p className="text-sm">+7 (921) 909-39-67</p>
                <p className="text-sm">hello@jnby.com.ru</p>
              </div>
            </section>

            <section className="pt-8 border-t border-border">
              <h2 className="text-2xl mb-6 tracking-[0.15em] uppercase">ОПЛАТА</h2>
              <p className="text-sm mb-4 leading-relaxed">
                К оплате принимаются карты VISA, MasterCard, Платежная система «Мир».
              </p>
              <p className="text-sm mb-4 leading-relaxed">
                Платежи проводятся через систему CloudPayments.
              </p>
              <p className="text-sm leading-relaxed">
                CloudPayments — международная процессинговая компания, которая сотрудничает с крупнейшими 
                мировыми и российскими системами онлайн-платежей. Все данные, введенные на платежной форме 
                процессингового центра CloudPayments, полностью защищены в соответствии с требованиями 
                стандарта безопасности PCI DSS.
              </p>
            </section>

            <section className="pt-8 border-t border-border">
              <h2 className="text-2xl mb-6 tracking-[0.15em] uppercase">РЕКВИЗИТЫ</h2>
              <div className="text-sm space-y-2 text-muted-foreground">
                <p>ООО «Красивый бизнес»</p>
                <p className="mt-4">
                  Юридический адрес: 192522, Санкт-Петербург, ул. Карпинского, 32 лит А, пом 7-н.
                </p>
                <p>
                  Фактический адрес: 191025, Санкт-Петербург, Невский пр., 148, пом 3-н
                </p>
                <p>Телефон/факс: 8 (812) 309-30-67, 8 (812) 905-67-11</p>
                <p className="mt-4">ИНН/КПП 7804418120 / 780401001</p>
                <p>ОКПО 971 52 67</p>
                <p>ОГРН 1097847185798</p>
                <p>ОКПО 40328000</p>
                <p>Расчетный счет № 40702810232060002291</p>
                <p>БИК 044030786</p>
                <p>Корреспондентский счет № 30101810800000000786</p>
                <p>ОАО "АЛЬФА-БАНК", Филиал «Санкт-Петербургский»</p>
                <p className="mt-4">Генеральный директор Косицына Вера Олеговна</p>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
