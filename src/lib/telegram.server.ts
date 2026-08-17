function dataUrlToBlob(dataUrl: string): Blob {
  const [meta, b64] = dataUrl.split(",");
  const mime = /:(.*?);/.exec(meta ?? "")?.[1] ?? "image/jpeg";
  const binary = atob(b64 ?? "");
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

export async function sendRegistration(input: {
  userId: string;
  telegramUser: string;
  depositShot: string;
  idShot: string;
}) {
  const token = process.env["TELEGRAM_BOT_TOKEN"];
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN is not configured");
  const chatId = "1851758530";

  const caption = [
    "🆕 DARK VIP — طلب تفعيل جديد",
    "",
    `🆔 MELBET ID: ${input.userId}`,
    `✈️ Telegram: ${input.telegramUser}`,
  ].join("\n");

  const form = new FormData();
  form.append("chat_id", chatId);
  form.append(
    "media",
    JSON.stringify([
      { type: "photo", media: "attach://deposit", caption },
      { type: "photo", media: "attach://idcard" },
    ]),
  );
  form.append("deposit", dataUrlToBlob(input.depositShot), "deposit.jpg");
  form.append("idcard", dataUrlToBlob(input.idShot), "id.jpg");

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMediaGroup`,
    { method: "POST", body: form },
  );
  const body = await res.text();
  if (!res.ok) {
    console.error(`Telegram sendMediaGroup failed [${res.status}]: ${body}`);
    throw new Error(`Telegram request failed [${res.status}]: ${body}`);
  }
  return { ok: true as const };
}
