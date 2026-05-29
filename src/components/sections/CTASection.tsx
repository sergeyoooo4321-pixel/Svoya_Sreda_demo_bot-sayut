import { Send } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { getTelegramUrl } from "@/lib/telegram";

export function CTASection() {
  return (
    <section className="section-shell">
      <div className="final-cta">
        <span className="section-kicker">Не знаете, что выбрать?</span>
        <h2>Напишите менеджеру</h2>
        <p>Он уточнит комнату, размер, цвет и предложит подходящие варианты из каталога.</p>
        <div className="cta-actions">
          <ButtonLink href={getTelegramUrl()} target="_blank" rel="noreferrer" icon={<Send size={18} />}>
            Написать в Telegram
          </ButtonLink>
          <ButtonLink href="/catalog" variant="dark">
            Смотреть каталог
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
