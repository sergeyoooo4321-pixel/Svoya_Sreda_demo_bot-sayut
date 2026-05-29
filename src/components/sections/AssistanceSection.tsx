import { MessageCircle, Send } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getTelegramUrl } from "@/lib/telegram";

export function AssistanceSection() {
  return (
    <section className="section-shell assist-section">
      <Reveal className="assist-copy">
        <span className="section-kicker">Подбор без суеты</span>
        <h2>Не обязательно разбираться в материалах, размерах и механизмах</h2>
        <p>
          Напишите, для какой комнаты нужна мебель, какой размер и цвет вам ближе — мы предложим подходящие варианты из
          каталога и подскажем, что уточнить перед заказом.
        </p>
        <ButtonLink href="/manager" variant="secondary" icon={<MessageCircle size={18} />}>
          Как работает менеджер
        </ButtonLink>
      </Reveal>

      <Reveal delay={0.12} className="telegram-dialog">
        <div className="dialog-header">
          <span>Своя Среда Bot</span>
          <small>онлайн</small>
        </div>
        <div className="dialog-bubble client">Нужен диван в гостиную, чтобы был не маркий.</div>
        <div className="dialog-bubble bot">
          Подойдёт «Линия 210» в графитовом или оливковом цвете. Он компактный, со спальным местом и спокойным
          современным дизайном.
        </div>
        <div className="dialog-bubble client">Можно сразу посмотреть карточку?</div>
        <div className="dialog-bubble bot action">
          Да, отправляю ссылку и могу передать заявку менеджеру.
          <ButtonLink href={getTelegramUrl("SS-DV-210")} target="_blank" rel="noreferrer" icon={<Send size={16} />}>
            Открыть Telegram
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
