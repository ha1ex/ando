const About = () => {
  return (
    <div className="min-h-full py-20 px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl mb-16 tracking-[0.2em] uppercase">О Бренде</h1>
        
        <div className="space-y-12 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl mb-6 tracking-[0.15em] uppercase">ANDO JV</h2>
            <p className="text-muted-foreground mb-4">
              ANDO JV — российский бренд современной одежды, созданный для тех, кто ценит минимализм, 
              качество и индивидуальность. Каждая вещь разрабатывается с вниманием к деталям и комфорту, 
              отражая философию бренда: «Feel the moment».
            </p>
            <p className="text-muted-foreground">
              Мы создаем коллекции, которые легко интегрируются в повседневный гардероб, 
              подчеркивая уникальность каждого человека. Наша цель — предложить вещи, 
              которые будут актуальны вне времени и трендов.
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-6 tracking-[0.15em] uppercase">Философия</h2>
            <p className="text-muted-foreground mb-4">
              В основе бренда лежит идея осознанного потребления и внимания к деталям. 
              Мы используем только качественные натуральные материалы и работаем с проверенными производителями.
            </p>
            <p className="text-muted-foreground">
              Каждая коллекция — это отражение момента, настроения, стремления к гармонии 
              между внутренним состоянием и внешним выражением.
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-6 tracking-[0.15em] uppercase">Производство</h2>
            <p className="text-muted-foreground">
              Все изделия производятся в России с соблюдением высоких стандартов качества. 
              Мы контролируем каждый этап создания одежды — от выбора тканей до финальной отделки, 
              чтобы гарантировать безупречный результат.
            </p>
          </section>

          <section className="pt-8 border-t border-border">
            <h2 className="text-xl mb-6 tracking-[0.15em] uppercase">Контакты</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>Email: hello@jnby.com.ru</p>
              <p>Телефон: +7 (921) 909-39-67</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
