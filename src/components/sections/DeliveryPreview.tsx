import { ArrowRight, PackageCheck, ShieldCheck, Wrench } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function DeliveryPreview() {
  return (
    <section className="section-shell delivery-preview">
      <Reveal className="delivery-preview-copy">
        <span className="section-kicker">Доставка и сборка</span>
        <h2>Условия без мелкого шрифта</h2>
        <p>
          Доставляем по Москве, Московской области и отправляем в регионы через транспортную компанию. Можно выбрать
          доставку до подъезда, до квартиры или самовывоз. Сборка доступна для большинства товаров.
        </p>
        <ButtonLink href="/delivery" variant="secondary" icon={<ArrowRight size={18} />}>
          Подробнее об условиях
        </ButtonLink>
      </Reveal>
      <Reveal delay={0.1} className="delivery-facts">
        <div><PackageCheck size={24} /><strong>1–3 дня</strong><span>для товаров в наличии по Москве</span></div>
        <div><Wrench size={24} /><strong>Сборка</strong><span>согласуем при оформлении заказа</span></div>
        <div><ShieldCheck size={24} /><strong>Гарантия</strong><span>12–24 месяца в зависимости от модели</span></div>
      </Reveal>
    </section>
  );
}
