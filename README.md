# SeeScout 2.1 World – Beta

## Dateien
- `index.html`, `style.css`, `app.js`: App-Oberfläche und Funktionen
- `sw.js`: Service Worker mit neuem Cache-Namen `seescout-world-v21`
- `manifest.webmanifest`, Icons: PWA-Installation

## GitHub Pages
1. Sichere dein altes Repository zuerst über **Code → Download ZIP**.
2. Lade alle Dateien dieses Pakets ins Stammverzeichnis deines Repositories hoch und bestätige den Commit.
3. Unter Settings → Pages `main` und `/(root)` wählen.
4. Unter Actions warten, bis der neueste Deploy erfolgreich ist.
5. Website in Safari mit `?v=20` am Ende öffnen.

## Ehrliche Funktionsgrenzen
- Die Karte startet weltweit und bietet eine weltweite Ortssuche (OpenStreetMap/Nominatim). Suchtreffer sind nur Ortsmarkierungen, keine bestätigten Angelplätze.
- Die eingebauten Gewässerpins und Artenlisten sind weiterhin nur ausgewählte Beispiele, keine vollständige globale Gewässer- oder Fischdatenbank.
- Artenlisten und Zielfisch-Tipps sind beispielhaft, nicht vollständig amtlich verifiziert.
- Fangbuch und Community-Demo speichern lokal im Browser auf diesem Gerät; keine Konten oder Cloud-Synchronisierung.
- Chat ist eine lokale Demo, keine echte KI. Fotoerkennung ist noch nicht verbunden.
- Für öffentliche Community, Anmeldung, Cloud-Daten, echte KI und Bilderkennung wird ein sicherer Server benötigt. API-Schlüssel niemals in GitHub hochladen.
- Prüfe vor jedem Angelausflug offizielle kantonale Regeln, Bewilligungen, Schonzeiten, Mindestmasse, Schutzgebiete und erlaubte Zugänge.
- Karte und externe Fotos benötigen Internet. OpenStreetMap: https://www.openstreetmap.org/copyright

- Die weltweite Suche benötigt Internet und unterliegt den Nutzungsbedingungen und fair-use-Regeln von OpenStreetMap/Nominatim.


## Neuer Gewässer-Check (v2.2)
- Nach einer weltweiten Ortssuche können Koordinaten in den Gewässer-Check übernommen werden.
- SeeScout fragt GBIF nach dokumentierten Fisch-Beobachtungen im Umkreis von 10 km ab. Das sind Hinweise, keine Bestätigung des aktuellen Bestands.
- Das Angelrecht wird bewusst als „Nicht bestätigt“ angezeigt. Ein Suchlink hilft, offizielle Regeln der zuständigen Behörde zu finden. Lizenzen, Zonen, Schonzeiten, Mindestmasse, Fanglimiten und Schutzgebiete müssen vor dem Angeln anhand offizieller Quellen geprüft werden.
- Der Gewässer-Check benötigt Internet. GBIF-Daten sind weltweit nicht vollständig und können veraltet oder ungenau sein.
