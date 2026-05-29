import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductExplorer } from "@/components/catalog/ProductExplorer";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Каталог мебели",
  description: "Каталог мебели «Своя Среда»: диваны, кресла, кровати, столы, комоды, шкафы, стеллажи, ТВ-тумбы и прихожие."
};

export default function CatalogPage() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <h1>Каталог мебели</h1>
        <p>Выберите мебель для гостиной, спальни, кухни или прихожей. Если не знаете, что подойдёт, менеджер поможет с подбором.</p>
      </section>
      <Suspense fallback={<div className="skeleton-block">Загружаем каталог</div>}>
        <ProductExplorer products={products} />
      </Suspense>
    </div>
  );
}
