import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProductBySlug } from "@/lib/products";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const roomSets = [
  { title: "Гостиная", text: "Диван, столик, ТВ-тумба и открытая полка — спокойная зона отдыха без визуального шума.", slugs: ["liniya-210", "pauza", "ekran-160", "otkrytaya-polka"] },
  { title: "Спальня", text: "Мягкая кровать, комод и высокий шкаф для одежды, белья и сезонных вещей.", slugs: ["sonata-160", "poryadok-120", "vozduh-180"] },
  { title: "Прихожая", text: "Компактное хранение у входа: зеркало, крючки, обувница и закрытые ящики.", slugs: ["pervyy-shag", "poryadok-120"] }
];

export function RoomsPreview() {
  return (
    <section className="section-shell room-preview-section">
      <SectionHeading
        eyebrow="Готовые решения"
        title="Комплекты по комнатам"
        text="Соберите комнату не по отдельным предметам, а по сценарию жизни: отдых, сон, хранение, входная зона."
      />
      <div className="room-set-grid">
        {roomSets.map((set, index) => {
          const firstProduct = getProductBySlug(set.slugs[0]);
          return (
            <Reveal key={set.title} delay={index * 0.08}>
              <Link href="/rooms" className="room-set-card">
                <div className="room-set-media">
                  {firstProduct ? <Image src={firstProduct.colors[0].image} alt={set.title} fill sizes="(max-width: 900px) 92vw, 31vw" /> : null}
                </div>
                <div className="room-set-copy">
                  <h3>{set.title}</h3>
                  <p>{set.text}</p>
                  <ul>
                    {set.slugs.map((slug) => {
                      const product = getProductBySlug(slug);
                      return product ? <li key={slug}>{product.name}</li> : null;
                    })}
                  </ul>
                  <span className="small-link">
                    Собрать такой комплект
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
