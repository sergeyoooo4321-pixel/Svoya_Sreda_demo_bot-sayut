import type { Metadata } from "next";
import faq from "@/data/faq.json";
import { Accordion } from "@/components/ui/Accordion";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Частые вопросы",
  description: "Ответы на вопросы о заказе мебели, доставке, сборке, цветах, оплате и возврате."
};

export default function FAQPage() {
  return (
    <>
      <div className="page-shell faq-page">
        <section className="page-hero"><h1>Частые вопросы</h1><p>Собрали короткие ответы по подбору, доставке, сборке и оформлению заказа через Telegram.</p></section>
        <Accordion items={faq} />
      </div>
      <CTASection />
    </>
  );
}
