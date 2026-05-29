import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";
import { ProductGallery } from "@/components/catalog/ProductGallery";
import { ProductSpecs } from "@/components/catalog/ProductSpecs";
import { ProductCard } from "@/components/catalog/ProductCard";
import { LeadForm } from "@/components/forms/LeadForm";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";
import { getTelegramUrl } from "@/lib/telegram";
import { site } from "@/lib/site";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Товар не найден" };
  return {
    title: `${product.name} — ${product.priceText}`,
    description: `${product.description} Размер: ${product.sizes}. ${product.stock}.`,
    openGraph: { title: product.name, description: product.description, images: [product.colors[0].image] }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.article,
    image: product.colors.map((color) => `${site.url}${color.image}`),
    description: product.description,
    material: product.material,
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: product.price,
      availability: product.stock === "В наличии" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      url: `${site.url}/catalog/${product.slug}`
    }
  };

  return (
    <div className="page-shell product-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/catalog" className="back-link"><ArrowLeft size={17} />В каталог</Link>

      <section className="product-detail-grid">
        <Reveal><ProductGallery product={product} /></Reveal>
        <aside className="product-summary">
          <Badge tone={product.stock === "В наличии" ? "sage" : "clay"}>{product.stock}</Badge>
          <h1>{product.name}</h1>
          <p className="product-detail-price">{product.priceText}</p>
          <p>{product.description}</p>
          <div className="summary-list">
            <div><span>Размер</span><strong>{product.sizes}</strong></div>
            <div><span>Материал</span><strong>{product.material}</strong></div>
            <div><span>Поставка</span><strong>{product.delivery}</strong></div>
          </div>
          <div>
            <span className="summary-label">Цвета</span>
            <div className="product-color-list">
              {product.colors.map((color) => <span key={color.name}><i style={{ backgroundColor: color.hex }} />{color.name}</span>)}
            </div>
          </div>
          <div className="product-actions">
            <ButtonLink href="#request" icon={<Send size={18} />}>Оформить заявку</ButtonLink>
            <ButtonLink href={getTelegramUrl(product.article)} variant="secondary" target="_blank" rel="noreferrer" icon={<Send size={18} />}>Спросить в Telegram</ButtonLink>
          </div>
        </aside>
      </section>

      <section className="product-content-grid">
        <Reveal>
          <div className="content-block">
            <h2>Характеристики</h2>
            <ProductSpecs product={product} />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="content-block sticky-request" id="request">
            <h2>Хотите уточнить наличие?</h2>
            <p>{product.fitsFor}</p>
            <LeadForm product={product.name} sourcePage={`/catalog/${product.slug}`} compact />
          </div>
        </Reveal>
      </section>

      <section className="section-shell related-section">
        <h2>С этим товаром смотрят</h2>
        <div className="product-grid">{related.map((item) => <ProductCard key={item.slug} product={item} />)}</div>
      </section>
    </div>
  );
}
