import { products } from "@/lib/products";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const popularSlugs = ["liniya-210", "tihiy-ugol", "sonata-160", "poryadok-120", "ekran-160", "pervyy-shag"];

export function PopularProducts() {
  const popular = popularSlugs.map((slug) => products.find((product) => product.slug === slug)).filter(Boolean);

  return (
    <section className="section-shell">
      <div className="section-split-heading">
        <SectionHeading
          eyebrow="Популярные товары"
          title="База для спокойного дома"
          text="У каждой позиции есть реальные фото по цветам, характеристики, сроки и быстрый переход в Telegram."
        />
        <ButtonLink href="/catalog" variant="secondary">
          Весь каталог
        </ButtonLink>
      </div>

      <div className="product-grid">
        {popular.map((product, index) =>
          product ? (
            <Reveal key={product.slug} delay={index * 0.05}>
              <ProductCard product={product} />
            </Reveal>
          ) : null
        )}
      </div>
    </section>
  );
}
