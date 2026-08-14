# Lernanalyse: 5'000 gelöste Tickets der letzten 30 Tage

## Umfang und Datenschutz

- 5'000 gelöste Tickets aus dem Zeitraum 12.07.2026 bis 11.08.2026 wurden
  über den geschützten Zendesk Cursor Export gelesen.
- Persönliche Daten, E-Mail-Adressen, Telefonnummern und vollständige Tickettexte
  werden nicht als Wissensregeln gespeichert.
- Automatisierte Anruf-Tickets wurden bei der Themenanalyse separat behandelt,
  damit sie schriftliche Supportfälle nicht verfälschen.

## Häufigste verwertbare Ticketbereiche

Nach Ausschluss der überwiegend technischen Anruf-Tickets blieben 4'064
schriftliche oder formularbasierte Vorgänge:

| Bereich | Anzahl |
| --- | ---: |
| Automatische Antwort und Systemmails | 904 |
| Probleme beim Verkaufen | 380 |
| Probleme bei der Verifizierung | 352 |
| Probleme beim Kaufen | 290 |
| Benutzerkonto blockiert | 280 |
| 2FA zurücksetzen | 257 |
| Streitfall melden | 215 |
| Online-Betrug melden | 209 |
| Stornierungsanfrage | 188 |
| Neuer Vorgang und Sicherheitsprüfung | 156 |
| Gebühren | 85 |
| Bankdaten ändern | 93 |
| Bewertungslöschung | 60 |

## Wiederkehrende Use Cases

### Kontosicherheit und Verifizierung

- Neue Handynummer, SMS-Verifizierung, verdächtige Links, Kontoübernahme und
  blockierte Konten bilden einen grossen Anteil der Fälle.
- Bei SMS-Verifizierung muss zuerst der Zielaccount über die Telefonnummer
  bestimmt werden. Alte Verifizierungen, Suspicious-Takeover-Flags und weitere
  Konten müssen gemäss Admin-Prozess geprüft werden.
- Bei Phishing oder Identitätsdiebstahl dürfen keine Zugangsdaten, Codes oder
  Zahlungsdaten angefordert werden. Der Sicherheitsprozess ist zu verwenden.

### Gebühren und automatische Systemmails

- Viele Mitglieder reagieren auf Zahlungserinnerungen, Gutschriften oder
  automatisch generierte Systemmails, obwohl der offene Saldo bereits korrekt
  ist.
- Die Gebührenübersicht und der offene Saldo sind massgebend. Einzelne Labels
  wie «Bezahlt» oder «Teilbezahlt» können aktuell unzuverlässig sein.
- Bei offenen Gebühren ist immer die älteste Gebühr für die Zahlungsfrist
  ausschlaggebend.
- Zahlungsfristen: 14 Tage Zahlungsaufforderung, 30 Tage Zahlungserinnerung,
  Tag 44 CHF 10 Mahnspesen, Tag 58 Kontoblockierung, Tag 72 Inkasso.

### Kaufen, Verkaufen und Stornierung

- Ein abgeschlossener Verkauf bleibt verbindlich, auch wenn das Konto später
  blockiert wird oder der Käufer noch nicht bezahlt hat.
- Bei Nichtzahlung kann der Verkäufer 7 bis 60 Tage nach Angebotsende eine
  Stornierungsanfrage einreichen.
- Eine genehmigte Stornierung kann die Erfolgsprovision gutschreiben.
- Verkäufe, die durch den Verkäufer ausserhalb von Ricardo verursacht und nicht
  erfüllt werden, begründen keine automatische Gebührenrückerstattung.

### Käuferschutz und Streitfälle

- Nicht erhaltene Ware gehört in den Käuferschutzprozess.
- Direkte Zahlungen an den Verkäufer aktualisieren den Ricardo-Zahlungsstatus
  nicht automatisch.
- Bei Streitfällen sind Artikelnummer, Zahlungsbeleg, Kommunikation und der
  konkrete Übergabe- oder Versandstatus zu prüfen.

### Bankdaten und Gebührenbelege

- Bei Bankdatenänderungen müssen Formular, Status und Ausweis geprüft werden.
- Automatische MWST-Gutschriften können eine missverständliche E-Mail erzeugen.
  Solche Nullbelege können ignoriert werden. Relevant bleiben Gebührenübersicht
  und offener Saldo.

## Lernprioritäten für die nächsten Batches

1. Sicherheitsfälle und SMS-Verifizierung mit vollständigem Admin-Entscheidungsbaum.
2. Gebühren-Systemmails, Gutschriften, MWST-Nullbelege und offene Salden.
3. Streitfälle und Käuferschutz mit konkreten Fristen und Nachweisen.
4. Stornierung von Käufen und Verkäufen sowie Kulanzgrenzen.
5. Antwortmuster aus repräsentativen Kommentaren je Ticketformular.

## Qualitätsregel

Eine historische Ticketantwort wird erst als verbindliche Prozessregel übernommen,
wenn sie mit den aktuellen internen Vorgaben, der Online-Hilfe und dem
Admin-Prozess übereinstimmt. Einzelne Kulanzentscheidungen werden nicht als
allgemeiner Anspruch gespeichert.

## Kommentarstichprobe

Zusätzlich wurden 200 Tickets aus den wichtigsten Formularen mit 287 öffentlichen
und internen Kommentaren stichprobenartig geprüft. Die Stichprobe bestätigt, dass
die häufigsten Antwortentscheidungen bei Stornierung, Phishing, Bankdaten,
Käuferschutz, SMS-Verifizierung und Bewertungen liegen. Die Stichprobe dient zur
Priorisierung weiterer Prozessdokumente. Einzelne historische Antworten werden
nicht ungeprüft als verbindliche Regel übernommen.
