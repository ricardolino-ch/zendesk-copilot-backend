# Easygenerator-Kurse: strukturierte Wissensbasis

Quelle: zehn exportierte Easygenerator-PDFs, bereitgestellt am 13.08.2026. Die
Original-PDFs und die extrahierten Volltexte liegen unter
`../Knowledge/Easygenerator PDFs/`; je Kapitel ist zusätzlich ein Vorschaubild
der ersten PDF-Seite unter `../Knowledge/Easygenerator PDFs/screenshots/`
abgelegt.

## Verbindliche Arbeitsweise für Antworten

- Ticket immer zuerst vollständig lesen: öffentliche und interne Kommentare,
  Ticketformular, Status, Felder, Artikelnummern, Anhänge und bisherigen
  Verlauf.
- Nur die tatsächlich gestellten Fragen beantworten. Keine allgemeinen Regeln
  ergänzen, wenn sie für den Fall nicht relevant sind.
- Ist der Wunsch eindeutig und darf die Aktion ausgeführt werden, direkt handeln
  und nicht unnötig rückfragen.
- Bei möglicher Kulanz zuerst intern klären, ob Kulanz gewährt wird. Erst danach
  die Mitgliederantwort mit oder ohne Gutschrift formulieren.
- Datenschutz: allgemeine Informationen dürfen ohne Identifikation gegeben
  werden. Kontobezogene Informationen und Änderungen nur nach Identifikation
  über registrierte E-Mail-Adresse oder registrierte Telefonnummer; bei fehlendem
  Zugriff Identitätsprüfung gemäss Prozess.
- Vollständige Makros dynamisch verwenden, aber Name, Geschlecht, Anrede,
  Sprache, Fakten, Fristen und Abschluss immer prüfen und anpassen.

## Kapitel 02 - Tools und Zendesk

- OKTA ist der zentrale Zugang zu Zendesk, Gmail, Notion, Onfido und weiteren
  freigegebenen Werkzeugen.
- Tickets im Play-Modus in der vorgegebenen Reihenfolge bearbeiten und prüfen,
  ob bereits jemand am Ticket arbeitet. Offene Tickets des Mitglieds prüfen und
  bei Bedarf zusammenführen oder abschliessen.
- Ticketfelder prüfen: Gruppe, Formular, Sprache, Typ (Frage, Vorfall, Problem,
  Aufgabe), Abschlusscode, Artikelnummer, öffentliche Antwort, interne Notiz,
  Anhänge und Ticketstatus.
- Eine öffentliche Antwort und Statusänderung wird an das Mitglied gesendet.
  Interne Abklärungen ausschliesslich als interne Notiz erfassen.
- Falsche Sprache oder Kategorie intern rekategorisieren; keinen Zwischenbescheid
  senden. Bei anderer Sprache zuerst die Benutzersprache korrigieren.
- Keine Antwort nötig: Abschlusscode «Keine Antwort nötig», keine Dankesmail.
  Nach einem Telefonat keine E-Mail-Bestätigung, ausser das Mitglied verlangt
  diese ausdrücklich.
- Rückrufwünsche bearbeiten: bis 20.00 Uhr möglich, danach Rücksprache.
- Gelöst: Mitglied kann innerhalb der Automatisierungsfrist erneut antworten;
  geschlossen: nicht wieder öffnen, Antwort erzeugt ein Folgeticket. Die PDF
  nennt 28 Tage bis zum automatischen Schliessen gelöster Tickets und 120 Tage
  bis zur Archivierung.
- Makros sind dynamisch und sprachabhängig. Vollständige Makros enthalten
  Begrüssung, Dank, Antwort, Abschluss und «Freundliche Grüsse». Nach der
  Signatur keinen Agentennamen ergänzen.
- Bei Freigabe für neue Mitarbeitende: Antwort als interne Notiz in die Gruppe
  «Freigabe» senden, Status nicht auf «Gelöst» setzen; Kontrolleur ergänzt die
  Prüfung und weist zurück.
- SendGrid zeigt nur die letzten 72 Stunden. «Delivered», «Open», «Processed»,
  «Deferred» und «Block» unterscheiden. Bei Blocks/Bounces/Spam Reports/Invalid
  nie «Delete All» verwenden; nur die konkrete Adresse entfernen, sofern der
  Prozess dies erlaubt.

## Kapitel 03 - Datenschutz

- Der PDF-Export enthält nur einen Verweis auf die Datenschutzinformationen,
  nicht deren Inhalt. Für konkrete Datenschutzfragen muss das verlinkte Dokument
  separat bereitgestellt oder freigegeben werden.

## Kapitel 04 - Easy: Kommunikation, Konten und Sicherheit

### Sprache und Qualität

- Corporate Wording: «Benutzerkonto», «technischer Fehler», «Aktivierungscode»,
  «Fixpreis-Angebot», «Sofort-kaufen-Preis», Uhrzeiten wie «17.00 Uhr».
- Kritische Fehler sind falsche oder unvollständige Antworten, nicht angepasste
  Makros, falsche Anrede, falscher Abschluss, Datenschutzverstösse und fehlende
  Kulanz, wenn sie fachlich angebracht ist.

### Registrierung und Verifizierung

- Registrierung ab 18 Jahren; pro E-Mail-Adresse nur ein Benutzerkonto; kein
  bestehendes gebanishes Konto.
- Willkommens-E-Mail innerhalb von 24 Stunden bestätigen. Bei fehlender oder
  abgelaufener Mail über die Login-Maske erneut anfordern.
- Postkonforme Adresse ist für Versandetiketten erforderlich.
- Schweizer Mobilnummer: nur eine Verifizierung pro Nummer, zusätzlich nur
  einmal innerhalb von 30 Tagen; SMS-Code 10 Minuten gültig und höchstens alle
  10 Minuten neu anforderbar. Schweizer Nummern sind für den Telefonprozess
  massgebend.
- Handynummer verifiziert: Rolle Buyer. Identität per Ausweis oder
  Aktivierungscode verifiziert: Rolle Seller für Schweizer Mitglieder.
- Ausländischer Wohnsitz: Aktivierungscode per Post für Buyer/Fragen; Verkaufen
  grundsätzlich nicht möglich. Liechtenstein kann nach Aktivierungscode
  verkaufen. Ausländische Gewerbekonten benötigen den Code für die Bewerbung als
  Verkäufer.
- Aktivierungscode wird per A-Post versandt und prüft die Wohnadresse.

### 2FA

- Methoden: Authenticator-App oder Push über die Ricardo-App. Der zweite Faktor
  wird nur bei ungewöhnlichem oder verdächtigem Login verlangt.
- Mitglied kann 2FA selbst in den Benutzerangaben aktivieren/deaktivieren.
- Admin-Reset nur nach sicherer Identifikation: registrierte E-Mail plus
  Ausweiskopie oder alternativ Anruf auf die registrierte Telefonnummer. Auth0
  muss über OKTA geöffnet sein; anschliessend im Admin «Reset MFA» ausführen.

### Benutzerangaben

- Änderungen durch Support grundsätzlich nur von registrierter E-Mail-Adresse
  oder nach Anruf von der registrierten Telefonnummer. Von Drittadressen keine
  kontobezogenen Informationen oder Änderungen. Ohne Zugriff auf beides:
  Ausweiskopie Vorder- und Rückseite, Benutzername und Änderungswunsch.
- Mitglied kann selbst ändern: E-Mail-Adresse (wenn Login möglich), Passwort,
  Benutzername, Adresse, Sprache und Telefonnummer. Benutzername nur im
  30-Tage-Rhythmus und ohne Endungen wie .ch/.com, ÄÖÜ, Leer- oder Sonderzeichen.
- Vorname grundsätzlich nicht ändern, Nachname nur nach Prüfung. Todesfall-
  Kontoübertragung ist eine seltene Ausnahme mit Todesurkunde.
- Wohn-, Rechnungs- und gegebenenfalls IBAN-Adresse synchron prüfen; terminierte
  Adressänderungen werden nicht vorgängig eingetragen.
- Privat zu gewerblich: Firmenname, MWST-/Handelsregisterdaten, Konten,
  Inhaber/Kontaktperson, Geburtsdatum, Telefonnummer und Adresse anfordern.
  Gewerblich zu privat nur bei Einzelfirma; sonst neues Konto.
- IBAN wird nur durch den Kundendienst geändert. Registrierte E-Mail plus neue
  IBAN und Ausweiskopie; alternativ Identifikation über registrierte
  Telefonnummer. Zum Löschen der IBAN müssen IBAN, Adresse und Kontoinhaber
  gemeinsam entfernt werden.

### Konto löschen

- Selbstlöschung nur bei Saldo CHF 0.00, keinen laufenden Käufen/Verkäufen,
  allen Verkäufen der letzten 60 Tage als erhalten markiert und keinem Banished-
  Status.
- Bei nicht als erhalten markierten Käufen entweder Käufer kontaktieren oder
  60 Tage bis zum automatischen Abschluss abwarten.
- Kundendienstantrag von registrierter E-Mail; sonst Ausweiskopie. Guthaben unter
  CHF 20.00 wird grundsätzlich nicht aktiv ausbezahlt, ausser es wird bei der
  Kündigung ausdrücklich verlangt.

### SMS-Verifizierung: interner Prozess

- Bei AI-Call-Tickets zuerst StartButton öffnen, alle Konten mit der Nummer
  prüfen, Zielkonto anhand des letzten Last Login bestimmen.
- Prüfen, ob die Nummer in einem älteren Konto verifiziert ist; falls ja dort
  «Unverify». SuspiciousTakeOver wegen Inaktivität gegebenenfalls entfernen.
- Bei genau einem unverifizierten Konto direkt verifizieren. Bei anderen
  Problemen (AC-Block, Banished, sonstige Flags) zuerst Ursache beheben oder
  intern eskalieren.
- Danach Mitglied mit dem passenden Makro informieren. Wenn alles bereits
  verifiziert ist, interne Notiz «Bereits verifiziert» und Ticket schliessen.

## Kapitel 05 - Blockiert

- AC blockiert = Login möglich, Kaufen und Verkaufen nicht möglich. Im Admin
  Activation Code auf «Manually Blocked» setzen, Admin-Kommentar mit internem
  Grund und User Message mit benötigtem Nachweis ergänzen.
- Häufige AC-Gründe: unvollständige/falsche Kontaktdaten, unzulässiger
  Benutzername, falsche Firmenangaben, c/o-Adresse oder alte Write-off-Fälle.
- Entsperrung erst nach den geforderten korrigierten Daten bzw. Nachweisen.
- Banished = vollständige Sperre. Gründe können negative Bewertungen,
  Übereinstimmung mit gesperrtem Konto, nicht zustellbarer Aktivierungscode,
  Minderjährigkeit, suspicious login/fraud, Selfbidding, AGB-Verstoss oder
  wiederholte Kontaktangaben in Angeboten sein.
- Bei Übereinstimmung mit einem gesperrten Konto keine Daten, Bewertungen oder
  Gegenparteien des alten Kontos offenlegen. Nur den Zusammenhang und die
  erforderliche Bereinigung erklären.
- Negative Bewertungen: für Sperrentscheide zählen die relevanten Bewertungen
  der letzten 12 Monate; mindestens zwei aussagekräftige negative Bewertungen
  können zur Sperre führen. Eine Bereinigung kann eine erneute Prüfung auslösen.

## Kapitel 06 - Kaufen, Verkaufen und Stornierung

- Der Kaufabschluss ist grundsätzlich ein rechtsgültiger Vertrag. Ein Käufer
  muss bezahlen und abnehmen; ein Verkäufer muss liefern/übergeben.
- Käufer bei Nichtlieferung, Mangel, falscher Beschreibung oder Streit zuerst
  nach Kaufart und Käuferschutzstatus einordnen. Ohne Schutz ist die direkte
  Kontaktaufnahme bzw. die vertragliche Abwicklung zentral; mit Käuferschutz+
  gilt der separate Streitprozess.
- Stornierung wegen Käuferverantwortung: frühestens 7 und spätestens 60 Tage
  nach Angebotsende über «Mein Verkaufen» > «Verkauft» > «Verkauf stornieren».
  Käufer erhält 7 Tage für Stellungnahme; keine Antwort führt zur automatischen
  Genehmigung. Die Stornierung erzeugt grundsätzlich eine negative Bewertung.
- Verkäufer darf nicht stornieren, nur weil er anderweitig verkauft oder eigene
  Fehler gemacht hat. Kulanz ist eine interne Einzelfallentscheidung und muss
  vor der Antwort geklärt werden.
- Fragen & Antworten können öffentlich oder nur zwischen Fragesteller und
  Verkäufer sichtbar sein; Mitglied soll bei sensiblen Angaben nicht öffentlich
  antworten.
- Versand, Abholung, Zahlung, Bewertung und Artikelstatus immer anhand der
  tatsächlichen Orderdaten und nicht nur anhand eines Labels beurteilen.

## Kapitel 07 - Käuferschutz+

Der Kurs verwendet überwiegend die alte Bezeichnung «MoneyGuard». In der
aktuellen Kommunikation und Wissensbasis wird dies vollständig als
«Käuferschutz+» geführt.

- Käuferschutz+ parkiert die Zahlung von TWINT oder Kreditkarte bei Ricardo, bis
  der Käufer den Erhalt bestätigt. Bei Problemen kann ein Streitfall eröffnet
  werden. Kontaktdaten der Gegenpartei bei Käuferschutz+ nicht vorzeitig
  bekanntgeben, um Zahlungen ausserhalb des Systems zu verhindern.
- Käufer hat 14 Tage für die Zahlung. Nach Zahlung hat der Verkäufer 7 Tage,
  mit zusätzlichem Puffer insgesamt 10 Tage, um zu liefern. Nach ausbleibender
  Lieferung greifen die vorgesehenen automatischen Optionen bzw. Stornierung.
- Nach Versand hat der Käufer 4 Tage zur Erhaltsbestätigung. Ohne Reaktion wird
  der Erhalt automatisch bestätigt. Danach bestehen 3 Tage für einen Streitfall;
  ohne Streitfall wird die Transaktion als in Ordnung abgeschlossen. Auszahlung
  folgt typischerweise 2 bis 3 Arbeitstage danach.
- Verkäufer kann Käuferschutz+ nur deaktivieren, wenn keine offenen Angebote mit
  Geboten bestehen. Wird es aktiviert, werden passende offene Angebote
  automatisch umgestellt.
- Auszahlung kann wegen KYC blockiert sein. Dann Onfido-Prozess befolgen und
  Ausweiskopie bzw. Bankauszug anfordern; persönliche Daten niemals unnötig in
  öffentliche Antworten übernehmen.
- Bei Disputes: Sachverhalt, Belege, Zahlung und Versand prüfen; Streitfall
  gemäss Entscheid annehmen und stornieren oder begründet ablehnen. Verkäufer-
  und Käufermakro unterscheiden.

## Kapitel 08 - Bewertungen

- Bewertung ist freiwillig, aber sicherheitsrelevant. Erinnerung wird 30 Tage
  nach Angebotsende versandt. Positive, neutrale und negative Bewertungen können
  abgegeben werden; es gibt keine Abgabebegrenzung.
- Prozentwert = positive Bewertungen / (positive + negative Bewertungen) x 100.
  Für Sperrentscheidungen nur relevante negative Bewertungen der letzten 12
  Monate berücksichtigen.
- Bewertungslöschung ausschliesslich über das dafür vorgesehene Formular. Zulässige
  Ausnahmefälle sind Beleidigungen, persönliche Daten, Rache-/Erpressungs-
  bewertungen oder nachweislich falsche Tatsachen mit Belegen. Lange Lieferzeit
  oder hohe Lieferkosten reichen nicht aus.

## Kapitel 09 - Bugs und technische Fehler

- Bekannte Fehler in Notion und der Zendesk-Bugansicht prüfen; vorhandenen
  Workaround kommunizieren. Ticket als Vorfall dem bestehenden Problem zuweisen
  und das Bug-Makro verwenden.
- Unbekannte Fehler an die zuständige interne Person melden. Am Abend/Wochenende
  nur kritische Fehler als Incident erfassen.
- Kritisch: Login, Kaufen/Bieten, Verkaufen, Bezahlen, Suche, Fragen & Antworten,
  Homepage/Artikelseite, Angebotsabschluss oder Systemmails allgemein nicht
  möglich. Einzelgeräte- oder Einzelfallfehler sind nicht automatisch ein
  allgemeiner Incident.

## Kapitel 10 - Gebühren und Finance

- Erfolgsprovision beträgt je nach Kategorie 8 bis 12 %, mindestens CHF 0.10,
  maximal CHF 290.00. Boosts sind freiwillige Werbung; Verkäufer tragen
  Erfolgsprovision, Boosts und allfällige Fahrzeug-Einstellgebühren.
- Die Gebührenübersicht und der offene Saldo sind massgebend. Einzelne Status-
  labels können unzuverlässig sein. Für Fristen zählt immer die älteste offene
  Gebühr.
- Fristen: 14 Tage Zahlungsaufforderung, 30 Tage danach erste Erinnerung,
  Tag 44 CHF 10.00 Mahnspesen, Tag 58 Kontoblockierung, Tag 72 Inkasso. Nach
  «collection» keine Gutschrift mehr; Mitglied direkt ans Inkassobüro verweisen.
- Kreditkarte wird sofort, E-Banking innerhalb von zwei Arbeitstagen verbucht.
  Rückzahlungen grundsätzlich auf ursprüngliche Zahlungsart. Kulanzgutschriften
  sind nicht auszahlbar.
- Gutschriften können nur nach dem vorgesehenen Prozess erstellt werden. Die
  PDF nennt als zulässige Beispiele Abschlussgebührenanpassung mit Artikelnummer
  und Käuferbestätigung, Boost-Gutschrift mit Artikelnummer, Mahngebühr einmal
  pro Jahr und Kulanzentscheid bis CHF 50.00. In allen Fällen zuerst aktuelle
  interne Freigabe und Kulanzentscheid prüfen.
- Die PDF behauptet «keine Einstellgebühren». Das ist für Fahrzeugangebote ab
  12.01.2026 veraltet und wird durch die aktuelle Fahrzeugregel überschrieben:
  Einstellgebühr ab CHF 3'000, Rückerstattung nur bei erfolgreichem Verkauf über
  Ricardo. Bei Verkauf auf einer anderen Plattform oder storniertem Verkauf keine
  automatische Rückerstattung.
- MWST auf Ricardos Erfolgsprovision ist von der MWST-Gutschrift auf Verkäufen zu
  unterscheiden. Bei nicht MWST-pflichtigen Verkäufern kann die Verkaufs-MWST
  belastet und direkt wieder gutgeschrieben werden; die Gebühren-MWST bleibt die
  Steuer auf Ricardos Dienstleistung.

## Kapitel 11 - Telefonieren

- Anrufe innerhalb von 10 Sekunden annehmen. Allgemeine Informationen ohne
  Identifikation; kontobezogene Informationen nur nach Identifikation über die
  hinterlegte Telefonnummer oder Rückruf an diese Nummer.
- Keine Auskunft an Ehepartner, Geschwister oder andere Dritte, auch wenn diese
  das Passwort kennen. Ausnahme nur mit ausdrücklicher Zustimmung des
  Kontoinhabers am Telefon.
- Rückrufwunsch erfüllen und zuerst fragen, ob das Mitglied gerade Zeit hat;
  sonst Termin vereinbaren und einhalten. Nach dem Telefonat keine E-Mail-
  Bestätigung, ausser ausdrücklich verlangt.
- Aircall eröffnet bei Anrufen von der hinterlegten Telefonnummer ein Ticket mit
  dem Konto. Verpasste Anrufe in der To-do-Liste prüfen und zurückrufen.

## Bekannte veraltete oder nicht mitgelieferte Quellen

- Kapitel 03 enthält nur einen Datenschutz-Link, nicht das eigentliche Dokument.
- Im Tool-Kurs fehlen die Videodatei und die verlinkten Starterkit-/Corporate-
  Wording-Dateien. Diese bitte separat bereitstellen, wenn sie verbindlich sind.
- Im Bug-Kurs werden Notion, Jira und Slack als externe Arbeitsquellen genannt;
  deren aktuelle Inhalte sind nicht Bestandteil des PDFs.
- Kapitel 10 enthält die veraltete Aussage «keine Einstellgebühren»; die aktuelle
  Fahrzeugregel wurde bewusst höher priorisiert.
- Kapitel 07 verwendet ältere Bezeichnungen und Links «MoneyGuard». Aktuelle
  Makros und Hilfeartikel müssen gegen «Käuferschutz+» und den aktuellen
  Zahlungsdienstleister abgeglichen werden.

## Quellen und Screenshots

Die zehn Original-PDFs sind dauerhaft unter `../Knowledge/Easygenerator PDFs/`
gespeichert. Die extrahierten Volltexte (`*.txt`) dienen der Suche; die
Vorschaubilder in `screenshots/` dokumentieren die visuellen PDF-Seiten. Bei
Screenshots mit Prozessschritten ist die visuelle Darstellung zu prüfen, bevor
ein Schritt als aktuelle UI-Anleitung verwendet wird.
