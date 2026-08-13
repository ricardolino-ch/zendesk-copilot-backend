# Übernahme in ein anderes Co-Pilot-Projekt

## Dateien übernehmen

1. `copilot-system-prompt.md` als System- oder Entwicklerprompt hinterlegen.
2. `knowledge/knowledge-pack.md` als primäre Wissensquelle hinterlegen.
3. `knowledge/historical-patterns-pack.md` als sekundäre Musterquelle hinterlegen.
4. Den gesamten Ordner `knowledge/` als wartbare Originalstruktur behalten.

## Priorität der Quellen

Aktuelle bestätigte Prozesse und die Online-Hilfe haben Vorrang. Historische
Tickets zeigen nur typische Fälle und Formulierungen. Historische Muster dürfen
keine aktuelle Frist, Regel oder Kulanzentscheidung überschreiben.

## Technische Mindestanforderungen

Der Co-Pilot muss vor jedem Vorschlag den vollständigen Zendesk-Ticketkontext
abrufen: Beschreibung, alle öffentlichen und internen Kommentare, Status,
Ticketformular, Felder, Anhänge, Anfrageperson sowie Artikel-, Bestell- und
Mitgliedsnummern. Es darf nicht nur der letzte Kommentar gelesen werden.

Der Co-Pilot erstellt grundsätzlich nur einen Entwurf. Das Senden, Ändern von
Ticketfeldern, Gutschriften oder sonstige Aktionen bleiben beim Agenten, sofern
kein ausdrücklich freigegebener Workflow vorhanden ist.

## Sicherheit

Keine API-Schlüssel, OAuth-Secrets oder personenbezogenen Testdaten in Prompt,
Wissensdateien oder Git eintragen. Zugangsdaten gehören ausschließlich in die
geschützte Secret-Verwaltung des Backends.
