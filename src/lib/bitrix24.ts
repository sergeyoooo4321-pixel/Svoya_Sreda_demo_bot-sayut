import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import type { LeadInput } from "@/lib/lead-schema";

type BitrixResult = {
  ok: boolean;
  mode: "bitrix24" | "fallback";
  error?: string;
};

function getBitrixEndpoint() {
  const webhook = process.env.BITRIX24_WEBHOOK_URL?.trim();
  if (!webhook) return null;
  return webhook.includes("crm.lead.add") ? webhook : `${webhook.replace(/\/$/, "")}/crm.lead.add.json`;
}

async function writeFallbackLead(lead: LeadInput, error?: string) {
  const dir = path.join(process.cwd(), ".lead-logs");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "leads.jsonl"), `${JSON.stringify({ createdAt: new Date().toISOString(), lead, error })}\n`, "utf8");
}

export async function sendLeadToBitrix24(lead: LeadInput): Promise<BitrixResult> {
  const endpoint = getBitrixEndpoint();
  const comment = `Заявка с сайта. Клиент интересуется товаром: ${lead.product || "не указан"}. Город доставки: ${lead.city}. Комментарий: ${lead.comment || "без комментария"}.`;

  if (!endpoint) {
    await writeFallbackLead(lead, "BITRIX24_WEBHOOK_URL is not set");
    return { ok: true, mode: "fallback" };
  }

  const payload = {
    fields: {
      TITLE: `Заявка с сайта: ${lead.product || "консультация"}`,
      NAME: lead.name,
      SOURCE_ID: "WEB",
      STATUS_ID: "NEW",
      PHONE: [{ VALUE: lead.phone, VALUE_TYPE: "WORK" }],
      COMMENTS: comment,
      UF_CRM_CITY: lead.city
    },
    params: { REGISTER_SONET_EVENT: "Y" }
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store"
    });

    if (!response.ok) {
      const text = await response.text();
      await writeFallbackLead(lead, text);
      return { ok: true, mode: "fallback", error: text };
    }

    return { ok: true, mode: "bitrix24" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Bitrix24 error";
    await writeFallbackLead(lead, message);
    return { ok: true, mode: "fallback", error: message };
  }
}
