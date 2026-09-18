# Tutti / Anibis Copilot – getrennte Installation

Diese Variante ist als unabhängige Zendesk-App für einen separaten Tutti-/Anibis-Zendesk vorgesehen. Sie verwendet die markenspezifische Wissensbasis in `knowledge-tutti/` und schreibt deutsche Antworten mit „Guten Tag“, „Account“, „Nutzer“ und „Beste Grüsse“.

## Backend

Für den separaten Render-Service dieselbe Anwendung aus diesem Repository deployen, aber eigene Umgebungsvariablen verwenden:

- `OPENAI_API_KEY`
- `COPILOT_API_TOKEN` (eigener Token, nicht der Ricardo-Token)
- `FEEDBACK_REVIEW_TOKEN` (eigener Review-Token)
- `ZENDESK_SUBDOMAIN` des Tutti-/Anibis-Zendesk
- `ZENDESK_EMAIL` des technischen Zendesk-Nutzers
- `ZENDESK_API_TOKEN` des technischen Zendesk-Nutzers
- `DATABASE_URL` der separaten Feedback-Datenbank

Die App sendet zusätzlich `brand: "tutti"`. Für Anibis wird im App-Build `brand: "anibis"` verwendet. Ricardo-Zugangsdaten und Ricardo-Feedback bleiben getrennt.

## App-ZIP

Das erzeugte Tutti-ZIP enthält den eigenen App-Namen und die markenspezifischen Beschriftungen. Vor dem Upload in den Tutti-/Anibis-Zendesk muss in `assets/modal.js` nur noch die neue Render-URL und der eigene `COPILOT_API_TOKEN` eingetragen werden, falls sie nicht bereits im Build gesetzt wurden.
