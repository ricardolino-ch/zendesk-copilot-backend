# Ricardo Copilot 2.0

## Backend on Render

The Render service can deploy this repository with the existing start command: `npm start`.

Required environment variables:

- `OPENAI_API_KEY`
- `ZENDESK_SUBDOMAIN`
- `ZENDESK_EMAIL`
- `ZENDESK_API_TOKEN`
- optional: `OPENAI_MODEL` (defaults to `gpt-5.4`)

After pushing the branch connected to Render, confirm `GET /health` returns `{ "ok": true, "version": "2.0.0" }`.

## Zendesk app test package

Upload `ricardo-copilot-2.0.0-zendesk-app.zip` in Zendesk Admin Center as a private app. The production backend URL is configured in `zendesk-app/assets/modal.js`.

### Safety behaviour

The modal keeps the ticket ID from the ticket that opened it. Before insertion it finds the matching `ticket_editor` instance, reads that editor's ticket ID, and sends the insertion request only to that instance. The editor verifies the ID again immediately before calling `ticket.editor.insert`. When there is any mismatch or no matching editor, nothing is inserted.
