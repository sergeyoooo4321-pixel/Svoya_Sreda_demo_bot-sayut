import type { Metadata } from "next";
import { CreditCard, PackageCheck, RotateCcw, ShieldCheck, Truck, Wrench } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Доставка, оплата и сборка",
  description: "Условия доставки, оплаты, сборки, гарантии и возврата в мебельном магазине «Своя Среда»."
};

const blocks = [
  { icon: Truck, title: "Доставка", text: "По Москве доставляем товары в наличии обычно за 1–3 дня. По Московской области и в регионы отправляем через транспортную компанию." },
  { icon: CreditCard, title: "Оплата", text: "Финальные условия оплаты подтверждает менеджер после проверки наличия, цвета, комплектации и адреса доставки." },
  { icon: Wrench, title: "Сборка", text: "Для большинства товаров доступна сборка. Стоимость зависит от модели и согласуется до оформления заказа." },
  { icon: ShieldCheck, title: "Гарантия", text: "На товары действует гарантия от 12 до 24 месяцев. Срок указан в карточке товара и документах к заказу." },
  { icon: RotateCcw, title: "Возврат", text: "Для товаров в наличии действует стандартный порядок возврата. Индивидуальные заказы согласуются отдельно." },
  { icon: PackageCheck, title: "Самовывоз", text: "Самовывоз возможен после подтверждения менеджером. Мы заранее подготовим заказ и согласуем окно выдачи." }
];

export default function DeliveryPage() {
  return (
    <>
      <div className="page-shell">
        <section className="page-hero">
          <h1>Доставка, оплата и сборка</h1>
          <p>Условия понятны до оплаты: менеджер подтверждает наличие, срок, способ доставки, подъём и сборку по конкретному адресу.</p>
        </section>
        <div className="info-grid">
          {blocks.map((block, index) => {
            const Icon = block.icon;
            return <Reveal key={block.title} delay={index * 0.04}><article className="info-card"><Icon size={28} /><h2>{block.title}</h2><p>{block.text}</p></article></Reveal>;
          })}
        </div>
      </div>
      <CTASection />
    </>
  );
}
