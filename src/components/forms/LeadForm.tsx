"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { leadSchema, type LeadInput } from "@/lib/lead-schema";
import { Button } from "@/components/ui/Button";

type LeadFormProps = {
  product?: string;
  sourcePage?: string;
  compact?: boolean;
};

export function LeadForm({ product = "", sourcePage = "", compact = false }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", phone: "", product, city: "", comment: "", privacy: false, sourcePage }
  });

  async function onSubmit(values: LeadInput) {
    setStatus("idle");
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    reset({ name: "", phone: "", product, city: "", comment: "", privacy: false, sourcePage });
  }

  return (
    <form className={compact ? "lead-form lead-form-compact" : "lead-form"} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-grid">
        <label>
          Имя
          <input {...register("name")} placeholder="Как к вам обращаться" autoComplete="name" />
          {errors.name ? <span className="form-error">{errors.name.message}</span> : null}
        </label>
        <label>
          Телефон
          <input {...register("phone")} placeholder="+7 900 000-00-00" autoComplete="tel" />
          {errors.phone ? <span className="form-error">{errors.phone.message}</span> : null}
        </label>
      </div>

      <div className="form-grid">
        <label>
          Товар
          <input {...register("product")} placeholder="Например, диван «Линия 210»" readOnly={Boolean(product)} />
        </label>
        <label>
          Город доставки
          <input {...register("city")} placeholder="Москва" autoComplete="address-level2" />
          {errors.city ? <span className="form-error">{errors.city.message}</span> : null}
        </label>
      </div>

      <label>
        Комментарий
        <textarea {...register("comment")} placeholder="Размер комнаты, цвет, удобное время связи" rows={compact ? 3 : 4} />
      </label>

      <label className="privacy-check">
        <input type="checkbox" {...register("privacy")} />
        <span>
          Согласен с обработкой данных и <a href="/privacy">политикой конфиденциальности</a>
        </span>
      </label>
      {errors.privacy ? <span className="form-error">{errors.privacy.message}</span> : null}

      <Button type="submit" disabled={isSubmitting} icon={<Send size={18} />}>
        {isSubmitting ? "Отправляем" : "Оставить заявку"}
      </Button>

      {status === "success" ? (
        <p className="form-status success">Заявка принята. Если Bitrix24 не настроен, она сохранена в локальный fallback-журнал.</p>
      ) : null}
      {status === "error" ? <p className="form-status error">Не удалось отправить заявку. Попробуйте ещё раз или напишите в Telegram.</p> : null}
    </form>
  );
}
