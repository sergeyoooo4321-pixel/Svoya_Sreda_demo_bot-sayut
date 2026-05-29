import type { Product } from "@/lib/products";

export function ProductSpecs({ product }: { product: Product }) {
  const specs = [
    ["Артикул", product.article],
    ["Категория", product.category],
    ["Размер", product.sizes],
    ["Спальное место", product.sleepingPlace || "Не предусмотрено"],
    ["Цвета", product.colors.map((color) => color.name).join(", ")],
    ["Материал", product.material],
    ["Наличие", product.stock],
    ["Срок поставки", product.delivery],
    ["Сборка", product.assembly],
    ["Гарантия", product.warranty]
  ];

  return (
    <div className="spec-table">
      {specs.map(([label, value]) => (
        <div className="spec-row" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}
