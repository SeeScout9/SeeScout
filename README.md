# SeeScout 3.0 – Weltweite Angel-App (Prototyp)

## Neu in 3.0
- Weltweite Ortssuche mit Open-Meteo-Geocoding und Nominatim-Fallback.
- Fischaktivitäts-Anzeige mit ausdrücklich als Schätzung markierter Beispielkurve.
- Foto-Upload mit Vorschau; echte KI-Fisch-Erkennung ist noch nicht verbunden.
- Konto- und Synchronisierungsoberfläche für Supabase; benötigt einmalige Einrichtung (siehe SETUP_KONTO.txt).
- Gewässer-Check mit GBIF-Beobachtungen bleibt enthalten; Angelrecht wird nicht automatisch bestätigt.

## Wichtige Grenzen
Die Aktivitätskurve ist eine illustrative Schätzung und keine Live-Prognose. Die Foto-Funktion erkennt noch keine Fischart. Anmeldung und Cloud-Sync funktionieren erst nach Eintragung der eigenen Supabase-Projekt-URL und des öffentlichen anon-Schlüssels in config.js sowie Einrichtung der SQL-Tabelle. Niemals einen Supabase service_role-Schlüssel in die App eintragen.

Die weltweite Ortssuche findet Orte und Gewässernamen, bestätigt aber weder Fischbestand noch Angelrecht, Zugang oder Sicherheit. Bitte lokale Behördeninformationen prüfen.

## Lokal gespeicherte Daten
Fangbuch und Community-Demo speichern Daten zunächst im Browser. Erst nach Einrichtung und manueller Synchronisierung werden die genannten Daten im Konto gespeichert.
