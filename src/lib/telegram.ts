const fallbackTelegramUrl = "https://t.me/Svoya_Sreda_demo_bot";

export function getTelegramUrl(article?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL || fallbackTelegramUrl;

  if (!article) {
    return baseUrl;
  }

  try {
    const url = new URL(baseUrl);
    url.searchParams.set("start", `product_${article}`);
    return url.toString();
  } catch {
    return baseUrl;
  }
}
