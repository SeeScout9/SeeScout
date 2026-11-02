# SeeScout 0.4 – Offline-App mit echter Fisch-Chat-KI-Anbindung

## Was neu ist
- **Fisch Chat** ist jetzt als echte KI-Unterhaltung vorbereitet: freie Fragen, Rückfragen und Gesprächskontext (bis zu 12 Nachrichten).
- Der Chat sendet an `/api/chat` auf dem eigenen SeeScout-Server und verwendet die OpenAI Responses API.
- Der API-Schlüssel bleibt ausschliesslich als Server-Umgebungsvariable; er wird nie an den Browser ausgeliefert.
- Offline: Angelberater, lokale Gewässer-Orientierung, Fangtagebuch und bereits geladene App-Dateien bleiben verfügbar.
- Online nötig: echte KI, Live-Wetter und Kartenkacheln.
- Wenn Leaflet offline nicht geladen werden kann, blockiert das nicht mehr die übrigen App-Bereiche.

## Wichtig: Die echte KI ist noch nicht live geschaltet
Dieser ZIP enthält die vollständige Server-Anbindung, aber sie antwortet erst, wenn der Server installiert, mit einem gültigen API-Zugang konfiguriert und online gehostet wurde. Das kann ich nicht aus diesem Chat heraus für dich veröffentlichen oder einen API-Zugang einrichten.

## Einrichtung durch eine erwachsene Person / Projektbetreuung
1. Node.js installieren und dieses Projekt auf einen HTTPS-fähigen Server laden.
2. Im Projektordner `npm install` ausführen.
3. Auf dem Server die Umgebungsvariable `OPENAI_API_KEY` sicher hinterlegen. Den Schlüssel niemals in `index.html`, GitHub oder im Chat veröffentlichen.
4. Optional `OPENAI_MODEL` setzen; Standard in diesem Starter ist `gpt-5.5`.
5. `npm start` starten und die App über die HTTPS-Adresse öffnen.
6. `/api/status` sollte `{"configured":true}` zurückgeben, wenn der Server-Zugang gesetzt ist.

Die OpenAI-API wird serverseitig über das offizielle JavaScript-SDK und die Responses API angesprochen. API-Nutzung kann Kosten verursachen; vor Aktivierung sollten Kostenlimits und Datenschutz gemeinsam geprüft werden.

## iPhone
Die App muss über HTTPS bereitgestellt werden. In Safari öffnen → Teilen → Zum Home-Bildschirm. Für die Offline-Grundfunktionen die App einmal online laden, damit der Service Worker die App-Dateien speichern kann.

## Grenzen
- Die Karte verwendet Leaflet/OpenStreetMap und braucht Internet für Bibliothek und Kartenkacheln. Die vorhandenen Marker sind grobe Regionsmarker, keine bestätigten Angelstellen.
- Live-Wetter über Open-Meteo benötigt Internet.
- Fangtagebuch wird lokal auf diesem Gerät gespeichert. Ohne Synchronisation ist es nicht automatisch auf anderen Geräten verfügbar.
- Der experimentelle Beissindex ist keine wissenschaftlich validierte Fangvorhersage.
- Fisch Chat kann aktuelle Vorschriften nicht garantieren. Kantonale offizielle Regeln haben Vorrang.
- Rheinfall: Wasserfall und unmittelbare Gefahrenzone sind kein Angelplatz. Nur ausdrücklich freigegebene, sichere Abschnitte beachten.

## Technische Sicherheit
- Serverseitiger API-Schlüssel, Eingabeprüfung, JSON-Grössenlimit und einfaches Rate-Limit enthalten.
- Für einen öffentlichen Produktivbetrieb zusätzlich HTTPS, robuste verteilte Rate-Limits, Monitoring, Datenschutz-/Aufbewahrungskonzept und altersgerechte Moderation prüfen.
