import rawProducts from "@/data/products.json";

export type ProductColor = {
  name: string;
  hex: string;
  image: string;
};

export type Product = {
  name: string;
  slug: string;
  article: string;
  category: string;
  price: number;
  priceText: string;
  sizes: string;
  sleepingPlace?: string;
  colors: ProductColor[];
  material: string;
  stock: string;
  delivery: string;
  description: string;
  room: string[];
  imageFolder: string;
  fitsFor: string;
  assembly: string;
  warranty: string;
};

export const products = rawProducts as Product[];

export const categories = [
  "Все",
  "Диваны",
  "Кресла",
  "Кровати",
  "Столы",
  "Журнальные столики",
  "Комоды",
  "Шкафы",
  "Стеллажи",
  "ТВ-тумбы",
  "Прихожие"
];

export const rooms = ["Все", "Гостиная", "Спальня", "Кухня", "Прихожая", "Кабинет", "Студия"];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByRoom(room: string) {
  return products.filter((product) => product.room.includes(room));
}

export function getRelatedProducts(product: Product, limit = 3) {
  return products
    .filter(
      (candidate) =>
        candidate.slug !== product.slug &&
        (candidate.room.some((room) => product.room.includes(room)) || candidate.category !== product.category)
    )
    .slice(0, limit);
}
