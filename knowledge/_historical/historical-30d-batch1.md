# Historische Tickets – Auswertung Batch 1

**Quelle:** Zendesk-Tickets der letzten 30 Tage, erster Export (500 Tickets, 707 Kommentare)

**Datenschutz:** Diese Datei enthält nur aggregierte, anonymisierte Muster. Keine Namen,
E-Mail-Adressen, Ticketnummern oder Originalnachrichten aus dem Export speichern.

## Datenqualität und Umfang

- Zeitraum: 08.07.2026 bis 07.08.2026
- 411 Tickets waren beim Export neu, 89 offen.
- Die im Export vorhandenen `answerbot`-Tags sind technische Metadaten und
  werden für die fachliche Use-Case-Auswertung ignoriert.
- Der Export ist ein Batch mit maximal 500 Tickets und daher noch nicht die
  vollständige 30-Tage-Menge.

## Häufige Use-Case-Signale

1. **Auszahlung / Guthaben / IBAN**
   - Signale: Auszahlung beantragen, Gutschrift, Bankwechsel, IBAN ändern,
     Adyen-KYC-Fehler.
   - Erforderliche Prüfung: Kontoinhaber, Verifizierung/KYC-Status und ob die
     Auszahlung im Benutzerkonto selbst ausgelöst werden kann.
   - Antwort darf keine Bankdaten anfordern oder im Ticket ändern; bei KYC-
     beziehungsweise Sicherheitsfehlern an den vorgesehenen Prüfprozess verweisen.

2. **Konto blockiert / Sicherheits- und Anmeldeprobleme**
   - Signale: Konto gesperrt, Zugriff gesperrt, verdächtige Anmeldung,
     Passwort-/2FA-/Telefonnummernwechsel.
   - Erforderliche Prüfung: Sicherheitsgrund und Identitätsprüfung; keine
     Kontofreigabe ohne den vorgesehenen Verifizierungsweg versprechen.

3. **Bewertungen und Bewertungslöschung**
   - Signale: Bewertungslöschungsantrag, erhaltene Bewertung, Bewertung.
   - Standardweg für einen Löschungsantrag:
     https://help.ricardo.ch/hc/de/articles/20281675956124
   - Im Antwortentwurf nicht vorwegnehmen, ob die Bewertung gelöscht wird.

4. **Kaufen/Verkaufen, Zahlung und Versand**
   - Signale: Käufer bezahlt nicht, Zahlung nicht sichtbar, Versandfrist,
     Artikel nicht erhalten, Abholung nicht eingehalten.
   - Lösung immer nach Rolle (Käufer/Verkäufer), Zahlungsart
     (Käuferschutz+ oder direkte Zahlung) und Frist unterscheiden.
   - Keine Mahnfrist oder Stornierung erfinden; auf den jeweils passenden
     Online-Hilfe-Prozess verweisen.

5. **Streitfälle und nicht beschriebene Mängel**
   - Signale: Artikel nicht wie beschrieben, Rückerstattung, Streitfall,
     Verkäufer verweigert Rückzahlung.
   - Zuerst Kaufdatum, Meldungsfrist, Belege und Kommunikationsstand prüfen;
     keine rechtliche Schuldentscheidung ohne die erforderlichen Angaben.

6. **Technische Probleme und Registrierung**
   - Signale: Registrierung, SMS-/Telefonverifizierung, Bieten funktioniert
     nicht, Zahlungsseite, App/iPhone, E-Mail-Adresse.
   - Betriebssystem, Gerät, Fehlermeldung und bereits getestete Schritte
     abfragen; nur bekannte Hilfeschritte verwenden.

## Automations- und Makrohinweise

- Die Tags `answerbot_vorschläge` und `gelöst_von_answerbot` zeigen, dass ein
  grosser Anteil der Fälle bereits automatisiert vorgeschlagen oder gelöst wird.
- Makros müssen zusammen mit ihren Aktionen ausgewertet werden; der sichtbare
  Text allein reicht wegen Platzhaltern, Sprachvarianten und dynamischen Feldern
  nicht aus.
- Bei der späteren Zuordnung sind Sprache (DE/FR/IT/EN), Ticketrolle und
  Prozessstatus eigene Merkmale.

## Noch zu validieren

- Vollständige 30-Tage-Menge oberhalb des 500er-Batches.
- Welche Makros tatsächlich in den jeweiligen Tickets verwendet wurden.
- Freigegebene Antwortvorlagen und Ausnahmen je Use Case.
- Datenschutz-/Aufbewahrungsregeln für Rohtexte und Kommentare.
