import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { ButtonLink } from "@/components/ui/Button";
import { getTelegramUrl } from "@/lib/telegram";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты и заявка",
  description: "Контакты мебельного магазина «Своя Среда» и форма заявки через Telegram."
};

export default function ContactsPage() {
  return (
    <div className="page-shell contacts-page">
      <section className="page-hero"><h1>Контакты и заявка</h1><p>Оставьте заявку на подбор, уточнение наличия или расчёт доставки. Менеджер вернётся с понятным ответом.</p></section>
      <div className="contacts-grid">
        <aside className="contacts-panel">
          <div><Phone size={22} /><span>{site.phone}</span></div>
          <div><Mail size={22} /><span>{site.email}</span></div>
          <div><MapPin size={22} /><span>{site.address}</span></div>
          <p>{site.workingHours}</p>
          <ButtonLink href={getTelegramUrl()} target="_blank" rel="noreferrer" variant="secondary">Написать в Telegram</ButtonLink>
        </aside>
        <LeadForm sourcePage="/contacts" />
      </div>
    </div>
  );
}
