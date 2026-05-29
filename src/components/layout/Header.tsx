"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Send, X } from "lucide-react";
import clsx from "clsx";
import { navItems } from "@/lib/site";
import { getTelegramUrl } from "@/lib/telegram";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <header className={clsx("site-header", isScrolled && "site-header-scrolled")}>
      <Link href="/" className="brand" aria-label="Своя Среда, на главную">
        <span className="brand-mark">СС</span>
        <span className="brand-copy">
          <strong>Своя Среда</strong>
          <small>мебель для спокойного дома</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Главное меню">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={clsx(pathname === item.href && "active")}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <Link href={getTelegramUrl()} target="_blank" rel="noreferrer" className="telegram-pill">
          <Send size={16} />
          <span>Telegram-бот</span>
        </Link>
        <button
          type="button"
          className="menu-button"
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={clsx("mobile-menu", isOpen && "mobile-menu-open")} aria-hidden={!isOpen}>
        {isOpen ? (
          <nav aria-label="Мобильное меню">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/manager">Менеджер</Link>
            <Link href={getTelegramUrl()} target="_blank" rel="noreferrer" className="mobile-telegram">
              <Send size={18} />
              Написать в Telegram
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
