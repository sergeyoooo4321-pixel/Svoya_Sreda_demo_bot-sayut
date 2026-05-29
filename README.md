# Своя Среда — сайт мебельного магазина

Многостраничный Next.js-проект по ТЗ: главная витрина, каталог из 10 товаров, карточки товаров, страницы условий, контактов, FAQ, privacy, 404 и Telegram CTA.

## Запуск

```bash
npm install
npm run dev
```

Production static export:

```bash
npm run build
```

## Переменные окружения

Скопируйте `.env.example` в `.env.local` и заполните реальные значения:

```env
NEXT_PUBLIC_SITE_URL=https://svoyasredademo.ru
NEXT_PUBLIC_TELEGRAM_BOT_URL=https://t.me/Svoya_Sreda_demo_bot
```

## Реализованные страницы

- `/` — главная страница
- `/catalog` — каталог с фильтрами
- `/catalog/[slug]` — карточки 10 товаров
- `/rooms` — готовые решения по комнатам
- `/delivery` — доставка, оплата, сборка, гарантия и возврат
- `/about` — о магазине
- `/faq` — частые вопросы
- `/contacts` — контакты и форма заявки
- `/privacy` — политика конфиденциальности
- `/manager` — страница про менеджера
- `/404` и системная `not-found` — ошибка
- `/robots.txt`, `/sitemap.xml` — SEO routes

## Каталог и изображения

Товары лежат в `src/data/products.json`. Фото скопированы в:

```txt
public/images/catalog/<article>_<slug>/*.jpeg
```

Каждый товар содержит 3 изображения по цветовым вариантам. Если позже появятся новые фото, достаточно заменить или добавить файлы и обновить `image` в JSON.

## Анимации и интерфейс

- reveal-анимации блоков при скролле через Framer Motion;
- появление hero-текста с blur/fade-up;
- desktop parallax для hero-коллажа;
- hover-увеличение фото товаров;
- волновое появление категорий и карточек;
- адаптация под `prefers-reduced-motion`;
- mobile burger-menu и адаптивные сетки.

## Telegram

Все Telegram-кнопки используют `NEXT_PUBLIC_TELEGRAM_BOT_URL`. Для карточек товаров формируется deep-link:

```txt
https://t.me/Svoya_Sreda_demo_bot?start=product_SS-DV-210
```

## GitHub Pages

Проект настроен как статический сайт для GitHub Pages:

```bash
npm run build
```

Результат сборки создаётся в `out`. Деплой выполняется workflow `.github/workflows/deploy-pages.yml`. Домен закреплён через `public/CNAME`: `svoyasredademo.ru`.

## Проверка

Перед сдачей проверяются:

```bash
npm run typecheck
npm run build
```

Ключевые сценарии из ТЗ покрыты интерфейсом: переход с главной в каталог, фильтр по диванам, открытие карточки товара, Telegram deep-link, заявка через Telegram и мобильное меню.
