export const site = {
  name: "Своя Среда",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://svoyasredademo.ru",
  description:
    "Магазин мебели «Своя Среда»: диваны, кресла, кровати, шкафы, столы и системы хранения. Подбор мебели, доставка, сборка и заявки через Telegram.",
  phone: "+7 495 000-42-24",
  email: "hello@svoya-sreda.demo",
  address: "Москва, дизайн-пространство «Своя Среда»",
  workingHours: "Ежедневно с 10:00 до 20:00"
};

export const navItems = [
  { href: "/catalog", label: "Каталог" },
  { href: "/rooms", label: "Готовые решения" },
  { href: "/delivery", label: "Доставка" },
  { href: "/about", label: "О магазине" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacts", label: "Контакты" }
];
