# Zendesk-Makros

Dieser Ordner enthält das aus dem bisherigen Chat zusammengefasste Makro-Wissen und dient als teilbare Arbeitsgrundlage.

## Standardvorgehen

1. Bestehendes Makro prüfen oder als Vorlage klonen.
2. Vor der Änderung klären:
   - Für wen soll das Makro sichtbar sein?
   - Welcher Abschlusscode soll gesetzt werden?
3. Makro-Titel und Beschreibung in DE, EN, FR und IT dynamisch erstellen.
4. Bei `Betreff festlegen` zusätzlich einen eigenen Dynamic Content-Eintrag für den Betreff erstellen.
5. Statischen Titel beziehungsweise Beschreibungstext durch den passenden Platzhalter ersetzen.
6. Titelkonvention prüfen: immer `Thema::Titel` – niemals `Thema: Titel`.
7. Sichtbarkeit, Abschlusscode und alle vier Varianten nach dem Speichern kontrollieren.

## Wichtige Konventionen

- Makro-Titel: `Thema::Titel`
- Dynamischer Makro-Titel: Dynamic Content mit allen vier Titelvarianten.
- Dynamische Beschreibung: Dynamic Content mit allen vier Textvarianten.
- Makro-Titel und Betreff sind zwei verschiedene Felder und werden getrennt behandelt.
- Steht im Ursprungstitel `DE`, kann die Sprachmarkierung entfernt werden, wenn das Makro danach viersprachig verwendet wird.
- Bestehende Makros werden angepasst; neue Makros nur erstellen, wenn dies ausdrücklich verlangt oder für den Auftrag erforderlich ist.
- Wird ein Makro geklont, bleiben Vorlage, Textlogik und Aktionen erhalten, ausser der Auftrag verlangt Änderungen.
- Links aus dem Ursprungstext werden nicht einfach am Ende angehängt. Bei Help-Center-Links darf die URL auf den Artikelstamm nach der Artikelnummer gekürzt werden, sofern der Link dadurch weiterhin funktioniert.
- Bulletpoints immer als Bindestrich `-`.
- Fett: `**Text**`.

## Dynamic-Content-Namenskonvention

- Beschreibung: `MAKRO ...`
- Titel: `MAKRO TITEL::...`
- Der erzeugte Platzhalter wird immer direkt im Makro verwendet und nach dem Speichern verifiziert.

## Beispiel-Platzhalter aus diesem Projekt

- Beschreibung Guthaben-Auszahlung: `{{dc.makro_finance-guthaben_auszahlung}}`
- Titel Guthaben-Auszahlung: `{{dc.makro_titel-finance_guthaben_auszahlung}}`

## Gesprächsregeln für neue Aufträge

Bei jedem neuen Makro-Auftrag zuerst diese zwei Angaben einholen, sofern sie nicht bereits eindeutig genannt wurden:

- Für wen soll das Makro sichtbar sein?
- Welcher Abschlusscode soll gesetzt werden?

Danach werden Titel und Text grundsätzlich in allen vier Sprachen vorbereitet.
