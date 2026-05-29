import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const categoryText: Record<string, string> = {
  Диваны: "для гостиной, студии и гостей",
  Кресла: "для чтения и тихого угла",
  Кровати: "мягкое изголовье и хранение",
  Столы: "обеденная зона без суеты",
  Комоды: "порядок в спальне и прихожей",
  Шкафы: "закрытое хранение на каждый день",
  Стеллажи: "книги, декор и зонирование",
  "ТВ-тумбы": "медиа-зона без проводов",
  Прихожие: "входная зона с зеркалом"
};

const shownCategories = ["Диваны", "Кресла", "Кровати", "Столы", "Комоды", "Шкафы", "Стеллажи", "ТВ-тумбы", "Прихожие"];

export function CategoriesSection() {
  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="Что ищете?"
        title="Категории, с которых удобно начать"
        text="Можно идти от предмета, комнаты или задачи. Фильтры в каталоге помогут быстро сузить выбор."
      />

      <div className="category-grid">
        {shownCategories.map((category, index) => {
          const product = products.find((item) => item.category === category) || products[index % products.length];
          return (
            <Reveal key={category} delay={index * 0.04}>
              <Link href={`/catalog?category=${encodeURIComponent(category)}`} className="category-tile">
                <div className="category-tile-media">
                  <Image src={product.colors[0].image} alt={category} fill sizes="(max-width: 760px) 44vw, 22vw" />
                </div>
                <div>
                  <h3>{category}</h3>
                  <p>{categoryText[category]}</p>
                </div>
                <ArrowRight size={18} />
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
