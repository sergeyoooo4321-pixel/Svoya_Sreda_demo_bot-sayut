import type { Metadata } from "next";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getTelegramUrl } from "@/lib/telegram";

export const metadata: Metadata = {
  title: "Менеджер",
  description: "Как менеджер «Своя Среда» помогает подобрать мебель и передать заявку в работу."
};

const features = [
  "уточняет комнату, размеры и стиль",
  "предлагает товары из каталога",
  "может открыть карточку по ссылке",
  "передаёт контекст в заявку перед заказом"
];

export default function ManagerPage() {
  return (
    <div className="page-shell manager-page">
      <section className="manager-hero">
        <Reveal className="manager-copy">
          <MessageCircle size={42} />
          <h1>Менеджер помогает выбрать мебель без лишней переписки</h1>
          <p>
            Напишите в Telegram, что ищете: комнату, примерный размер, цвет и бюджет. Менеджер предложит подходящие
            товары и поможет перейти к заявке.
          </p>
          <ButtonLink href={getTelegramUrl()} target="_blank" rel="noreferrer" icon={<Send size={18} />}>
            Спросить менеджера
          </ButtonLink>
        </Reveal>
        <Reveal delay={0.12} className="manager-feature-list">
          {features.map((feature) => (
            <div key={feature}>
              <CheckCircle2 size={22} />
              <span>{feature}</span>
            </div>
          ))}
        </Reveal>
      </section>
    </div>
  );
}
