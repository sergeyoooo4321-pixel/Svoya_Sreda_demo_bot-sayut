import Link from "next/link";
import { Send } from "lucide-react";
import { categories } from "@/lib/products";
import { navItems, site } from "@/lib/site";
import { getTelegramUrl } from "@/lib/telegram";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand">
            <span className="brand-mark">СС</span>
            <span className="brand-copy">
              <strong>Своя Среда</strong>
              <small>современная мебель для дома</small>
            </span>
          </Link>
          <p>Подбираем мебель без суеты: каталог, готовые комплекты, консультации в Telegram и аккуратная заявка в CRM.</p>
          <Link href={getTelegramUrl()} target="_blank" rel="noreferrer" className="footer-telegram">
            <Send size={18} />
            Написать в Telegram
          </Link>
        </div>

        <div>
          <h3>Навигация</h3>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/privacy">Политика конфиденциальности</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Каталог</h3>
          <ul>
            {categories
              .filter((category) => category !== "Все")
              .slice(0, 8)
              .map((category) => (
                <li key={category}>
                  <Link href={`/catalog?category=${encodeURIComponent(category)}`}>{category}</Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h3>Контакты</h3>
          <ul>
            <li>{site.phone}</li>
            <li>{site.email}</li>
            <li>{site.address}</li>
            <li>{site.workingHours}</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© Своя Среда, демо-проект мебельного магазина</span>
        <span>Next.js, Telegram CTA, Bitrix24-ready API</span>
      </div>
    </footer>
  );
}
