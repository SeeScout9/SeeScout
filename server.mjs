import express from "express";
import OpenAI from "openai";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "32kb" }));

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 20;
const hits = new Map();

function rateLimit(req, res, next) {
  const now = Date.now();
  const ip = req.ip || "unknown";
  const recent = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    return res.status(429).json({ error: "Zu viele Nachrichten in kurzer Zeit. Bitte warte kurz." });
  }
  recent.push(now);
  hits.set(ip, recent);
  next();
}

app.get("/api/status", (_req, res) => {
  res.json({ configured: Boolean(process.env.OPENAI_API_KEY) });
});

app.post("/api/chat", rateLimit, async (req, res) => {
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({
      error: "Der KI-Server ist noch nicht eingerichtet. Eine erwachsene Person muss den Server mit einem sicheren API-Zugang konfigurieren."
    });
  }

  const messages = req.body?.messages;
  if (!Array.isArray(messages) || messages.length < 1 || messages.length > 12) {
    return res.status(400).json({ error: "Ungültiger Gesprächsverlauf." });
  }
  const clean = [];
  for (const m of messages) {
    if (!m || !["user", "assistant"].includes(m.role) || typeof m.content !== "string" ||
        m.content.length < 1 || m.content.length > 2000) {
      return res.status(400).json({ error: "Eine Nachricht ist ungültig oder zu lang." });
    }
    clean.push({ role: m.role, content: m.content });
  }
  if (clean.at(-1).role !== "user") {
    return res.status(400).json({ error: "Die letzte Nachricht muss eine Nutzerfrage sein." });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      instructions: `Du bist Fisch Chat, der freundliche, sachliche Angel-Assistent in SeeScout, einer Angel-App für die Schweiz. Antworte auf Deutsch, wenn die Person Deutsch schreibt. Erkläre verständlich und praktisch zu Fischarten, Angelmethoden, Ausrüstung, Ködern, Gewässerkunde und Angelplanung. Frage bei fehlenden Angaben gezielt nach Zielfisch, Gewässer oder Angelmethode. Erfinde keine bestätigten Angelplätze, Zugänge, Fanggarantien, Wetterdaten oder gesetzlichen Regeln. Bei Schweizer Vorschriften (Patent, Schonzeiten, Mindestmasse, Fanglimiten, erlaubte Methoden) weise darauf hin, dass Kanton, Gewässer und Revier entscheidend sind und aktuelle offizielle Angaben geprüft werden müssen. Empfiehl keine gefährlichen Standorte; warne vor Wasserfällen, Hochwasser, starker Strömung, rutschigen Ufern und gesperrten Bereichen. Gib altersgerechte, sichere Hinweise. Bitte nie nach privaten Daten, Passwörtern oder API-Schlüsseln fragen.`,
      input: clean
    });
    const answer = response.output_text?.trim();
    if (!answer) return res.status(502).json({ error: "Das KI-Modell hat keine Textantwort zurückgegeben." });
    res.json({ answer });
  } catch (err) {
    console.error("OpenAI request failed:", err?.status || err?.name || "unknown");
    res.status(502).json({ error: "Der KI-Dienst konnte gerade nicht antworten. Bitte versuche es später erneut." });
  }
});

app.use(express.static(__dirname, { extensions: ["html"] }));
const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`SeeScout läuft auf Port ${port}`));
