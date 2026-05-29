import type { Metadata } from "next";
import Image from "next/image";
import { Send } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getProductBySlug } from "@/lib/products";
import { getTelegramUrl } from "@/lib/telegram";

export const metadata: Metadata = {
  title: "Готовые решения по комнатам",
  description: "Готовые комплекты мебели для гостиной, спальни, прихожей, рабочего угла и квартиры-студии."
};

const roomPages = [
  { title: "Гостиная", text: "Место для отдыха, гостей и вечеров без визуального шума. Диван, столик, ТВ-тумба и открытая полка собираются в спокойную медиа-зону.", slugs: ["liniya-210", "pauza", "ekran-160", "otkrytaya-polka"] },
  { title: "Спальня", text: "Мягкая кровать, комод и шкаф закрывают базовые задачи: сон, хранение белья и сезонных вещей, спокойный визуальный фон.", slugs: ["sonata-160", "poryadok-120", "vozduh-180"] },
  { title: "Прихожая", text: "Компактная входная зона с зеркалом, обувницей и крючками. Комод добавляет закрытое хранение для мелочей.", slugs: ["pervyy-shag", "poryadok-120"] },
  { title: "Рабочий угол", text: "Открытая полка, кресло и круглый стол помогают собрать спокойное место для ноутбука, документов и чтения.", slugs: ["otkrytaya-polka", "tihiy-ugol", "rovnyy-krug"] },
  { title: "Квартира-студия", text: "Диван со спальным местом, лёгкий стеллаж и компактное хранение помогают разделить пространство без тяжёлых перегородок.", slugs: ["liniya-210", "otkrytaya-polka", "poryadok-120"] }
];

export default function RoomsPage() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <h1>Готовые решения по комнатам</h1>
        <p>Смотрите мебель не отдельными позициями, а готовыми сценариями: отдых, сон, хранение, рабочий угол и студия.</p>
      </section>
      <div className="room-page-list">
        {roomPages.map((room, index) => {
          const heroProduct = getProductBySlug(room.slugs[0]);
          return (
            <Reveal key={room.title} delay={index * 0.05}>
              <section className="room-page-card">
                <div className="room-page-media">{heroProduct ? <Image src={heroProduct.colors[0].image} alt={room.title} fill sizes="(max-width: 980px) 92vw, 44vw" /> : null}</div>
                <div className="room-page-copy">
                  <span className="section-kicker">{room.title}</span>
                  <h2>{room.title}</h2>
                  <p>{room.text}</p>
                  <div className="room-products">
                    {room.slugs.map((slug) => {
                      const product = getProductBySlug(slug);
                      return product ? <a href={`/catalog/${product.slug}`} key={slug}>{product.name}</a> : null;
                    })}
                  </div>
                  <ButtonLink href={getTelegramUrl()} target="_blank" rel="noreferrer" icon={<Send size={18} />}>Собрать такой комплект</ButtonLink>
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
