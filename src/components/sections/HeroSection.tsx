"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getTelegramUrl } from "@/lib/telegram";
import { getProductBySlug } from "@/lib/products";

const heroProducts = ["liniya-210", "tihiy-ugol", "poryadok-120", "ekran-160"]
  .map((slug) => getProductBySlug(slug))
  .filter(Boolean);

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useTransform(mouseX, [-0.5, 0.5], reduceMotion ? [0, 0] : [-12, 12]);
  const y = useTransform(mouseY, [-0.5, 0.5], reduceMotion ? [0, 0] : [-8, 8]);

  return (
    <section
      className="hero section-shell"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
    >
      <div className="hero-copy">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22, filter: "blur(8px)" }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge tone="sage">Подбор, каталог и доставка</Badge>
        </motion.div>
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 34, filter: "blur(10px)" }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          Своя Среда — мебель для жизни, а не для картинки
        </motion.h1>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
        >
          Подбираем диваны, кровати, шкафы, столы и системы хранения под ваш размер, стиль и ритм жизни. Можно выбрать
          самому или написать менеджеру в Telegram.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32 }}
        >
          <ButtonLink href="/catalog" icon={<ArrowRight size={18} />}>
            Смотреть каталог
          </ButtonLink>
          <ButtonLink href={getTelegramUrl()} variant="secondary" target="_blank" rel="noreferrer" icon={<Send size={18} />}>
            Подобрать в Telegram
          </ButtonLink>
        </motion.div>
      </div>

      <motion.div className="hero-visual" style={{ x, y }}>
        <div className="hero-main-shot">
          {heroProducts[0] ? (
            <Image
              src={heroProducts[0].colors[0].image}
              alt={heroProducts[0].name}
              fill
              sizes="(max-width: 980px) 92vw, 44vw"
              priority
              loading="eager"
              className="hero-product-image"
            />
          ) : null}
          <div className="hero-media-label">
            <strong>10 товаров</strong>
            <span>с фото по цветам</span>
          </div>
        </div>

        <div className="hero-side-stack">
          {heroProducts.slice(1).map((product) =>
            product ? (
              <div className="hero-small-shot" key={product.slug}>
                <Image src={product.colors[0].image} alt={product.name} fill sizes="180px" className="hero-product-image" />
              </div>
            ) : null
          )}
        </div>
      </motion.div>
    </section>
  );
}
