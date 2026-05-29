import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getProductBySlug } from "@/lib/products";

export const metadata: Metadata = {
  title: "О магазине",
  description: "«Своя Среда» — современный мебельный магазин с каталогом, подбором и заявками через Telegram."
};

export default function AboutPage() {
  const product = getProductBySlug("liniya-210");
  return (
    <div className="page-shell">
      <section className="about-hero">
        <Reveal className="about-copy">
          <span className="section-kicker">О магазине</span>
          <h1>Мебель, которая спокойно встраивается в реальную жизнь</h1>
          <p>«Своя Среда» помогает выбрать не просто красивый предмет, а удобное решение под комнату, привычки, размеры и бюджет. На сайте есть каталог, готовые комплекты и быстрый Telegram-подбор.</p>
          <ButtonLink href="/catalog">Открыть каталог</ButtonLink>
        </Reveal>
        <Reveal delay={0.1}><div className="about-media">{product ? <Image src={product.colors[2].image} alt={product.name} fill sizes="(max-width: 900px) 92vw, 44vw" /> : null}</div></Reveal>
      </section>
      <section className="values-grid">
        {[
          ["Спокойный выбор", "Не давим и не торопим. Показываем характеристики, сроки и понятные сценарии использования."],
          ["Каталог с реальными фото", "Для 10 товаров уже добавлены изображения по артикулам и цветовым вариантам."],
          ["Связка с менеджером", "Telegram и форма заявки передают контекст, чтобы консультация начиналась не с нуля."]
        ].map(([title, text]) => <Reveal key={title}><article className="info-card"><h2>{title}</h2><p>{text}</p></article></Reveal>)}
      </section>
    </div>
  );
}
