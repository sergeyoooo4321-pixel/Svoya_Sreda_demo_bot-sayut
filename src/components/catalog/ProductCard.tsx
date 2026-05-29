import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import type { Product } from "@/lib/products";
import { getTelegramUrl } from "@/lib/telegram";
import { Badge } from "@/components/ui/Badge";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const mainImage = product.colors[0]?.image;
  const isAvailable = product.stock === "В наличии";

  return (
    <article className="product-card">
      <Link href={`/catalog/${product.slug}`} className="product-card-media" aria-label={`Открыть ${product.name}`}>
        <Image
          src={mainImage}
          alt={`${product.name}, ${product.colors[0]?.name}`}
          fill
          sizes="(max-width: 768px) 92vw, (max-width: 1200px) 44vw, 31vw"
          className="product-card-image"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
        <Badge tone={isAvailable ? "sage" : "clay"} className="product-stock-badge">
          {product.stock}
        </Badge>
      </Link>

      <div className="product-card-body">
        <div>
          <p className="product-category">{product.category}</p>
          <h3>
            <Link href={`/catalog/${product.slug}`}>{product.name}</Link>
          </h3>
        </div>
        <p className="product-price">{product.priceText}</p>
        <p className="product-size">{product.sizes}</p>
        <p className="product-description">{product.description}</p>

        <div className="color-row" aria-label="Доступные цвета">
          {product.colors.map((color) => (
            <span key={color.name} className="color-dot" style={{ backgroundColor: color.hex }} title={color.name} aria-label={color.name} />
          ))}
        </div>

        <div className="product-card-actions">
          <Link href={`/catalog/${product.slug}`} className="small-link">
            Подробнее
            <ArrowRight size={16} />
          </Link>
          <Link href={getTelegramUrl(product.article)} target="_blank" rel="noreferrer" className="small-link muted">
            <Send size={15} />
            Спросить
          </Link>
        </div>
      </div>
    </article>
  );
}
