import { ClipboardCheck, MessageCircle, Search, Truck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { icon: Search, title: "Выберите мебель", text: "Откройте каталог, отфильтруйте по комнате, цвету, цене и наличию." },
  { icon: MessageCircle, title: "Уточните детали", text: "Напишите менеджеру или оставьте заявку с удобным временем связи." },
  { icon: ClipboardCheck, title: "Подтвердите заказ", text: "Менеджер проверит наличие, срок, доставку, сборку и итоговую стоимость." },
  { icon: Truck, title: "Получите мебель", text: "Доставим до подъезда, квартиры или отправим транспортной компанией." }
];

export function HowItWorks() {
  return (
    <section className="section-shell">
      <SectionHeading eyebrow="Как купить" title="Понятный путь от выбора до сборки" />
      <div className="steps-grid">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.title} delay={index * 0.06}>
              <article className="step-card">
                <div className="step-icon">
                  <Icon size={24} />
                </div>
                <span>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
