import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export default function Custom404Page() {
  return (
    <div className="page-shell not-found-page">
      <h1>Страница не найдена</h1>
      <p>Возможно, ссылка устарела или товар переехал. Начните с каталога или вернитесь на главную.</p>
      <div className="cta-actions"><ButtonLink href="/catalog">Открыть каталог</ButtonLink><Link href="/" className="small-link">На главную</Link></div>
    </div>
  );
}
