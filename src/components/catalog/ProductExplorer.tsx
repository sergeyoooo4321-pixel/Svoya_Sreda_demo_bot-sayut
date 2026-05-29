"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Product } from "@/lib/products";
import { categories, rooms } from "@/lib/products";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Button } from "@/components/ui/Button";

const categorySlugs: Record<string, string> = {
  Все: "all",
  Диваны: "sofas",
  Кресла: "armchairs",
  Кровати: "beds",
  Столы: "tables",
  "Журнальные столики": "coffee-tables",
  Комоды: "dressers",
  Шкафы: "wardrobes",
  Стеллажи: "shelves",
  "ТВ-тумбы": "tv-stands",
  Прихожие: "hallways"
};

const categoryBySlug = Object.fromEntries(Object.entries(categorySlugs).map(([label, slug]) => [slug, label]));

function getInitialCategory(param: string | null) {
  if (!param) return "Все";
  return categoryBySlug[param] || param;
}

export function ProductExplorer({ products }: { products: Product[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(getInitialCategory(searchParams.get("category")));
  const [room, setRoom] = useState("Все");
  const [stock, setStock] = useState("Все");
  const [price, setPrice] = useState("Все");
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = category === "Все" || product.category === category;
      const matchRoom = room === "Все" || product.room.includes(room);
      const matchStock = stock === "Все" || product.stock === stock;
      const matchPrice =
        price === "Все" ||
        (price === "до 30 000 ₽" && product.price <= 30000) ||
        (price === "30 000–50 000 ₽" && product.price > 30000 && product.price <= 50000) ||
        (price === "от 50 000 ₽" && product.price > 50000);
      const loweredQuery = query.trim().toLowerCase();
      const matchQuery =
        loweredQuery.length === 0 ||
        [product.name, product.category, product.description, product.article, product.colors.map((c) => c.name).join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(loweredQuery);

      return matchCategory && matchRoom && matchStock && matchPrice && matchQuery;
    });
  }, [category, price, products, query, room, stock]);

  function selectCategory(nextCategory: string) {
    setCategory(nextCategory);
    const slug = categorySlugs[nextCategory] || nextCategory;
    router.replace(slug === "all" ? "/catalog" : `/catalog?category=${slug}`, { scroll: false });
  }

  function resetFilters() {
    setCategory("Все");
    setRoom("Все");
    setStock("Все");
    setPrice("Все");
    setQuery("");
    router.replace("/catalog", { scroll: false });
  }

  return (
    <div className="catalog-explorer">
      <div className="filter-panel">
        <div className="filter-panel-title">
          <SlidersHorizontal size={20} />
          <span>Фильтры</span>
        </div>

        <label className="search-field">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск по названию, цвету, артикулу" />
        </label>

        <div className="filter-group">
          <span>Категория</span>
          <div className="chip-row">
            {categories.map((item) => (
              <button key={item} type="button" className={item === category ? "chip chip-active" : "chip"} onClick={() => selectCategory(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-grid">
          <label>
            Комната
            <select value={room} onChange={(event) => setRoom(event.target.value)}>
              {rooms.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Наличие
            <select value={stock} onChange={(event) => setStock(event.target.value)}>
              {["Все", "В наличии", "Под заказ"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Цена
            <select value={price} onChange={(event) => setPrice(event.target.value)}>
              {["Все", "до 30 000 ₽", "30 000–50 000 ₽", "от 50 000 ₽"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="filter-summary">
          <span>Найдено: {filteredProducts.length}</span>
          <Button type="button" variant="ghost" onClick={resetFilters}>
            Сбросить
          </Button>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.slug} product={product} priority={index < 2} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Подходящих товаров не нашли</h2>
          <p>Сбросьте фильтры или напишите менеджеру — он подберёт близкие варианты вручную.</p>
          <Button type="button" onClick={resetFilters}>
            Сбросить фильтры
          </Button>
        </div>
      )}
    </div>
  );
}
