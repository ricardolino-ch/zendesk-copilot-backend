# Ricardo historische Muster für den Co-Pilot

Diese Sammlung dient nur als sekundäre Musterquelle. Sie darf keine aktuelle
Prozessregel, Frist oder Kulanzentscheidung überschreiben.


## Historische Quelle: historical-30d-batch1.md

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



## Historische Quelle: solved-30d-5000-analysis.md

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



## Historische Quelle: solved-7d-batch1.md

# Gelöste Tickets – Lernbatch 1

**Zeitraum:** Lösungsdatum ab 03.08.2026, erster Batch mit 50 Tickets und 74
Kommentaren. Die Suchabfrage enthielt insgesamt deutlich mehr Treffer; weitere
Batches sind erforderlich.

**Datenschutz:** Nur anonymisierte Muster. Keine Namen, E-Mail-Adressen,
Telefonnummern, Ticketnummern oder Originaltexte als Wissensregel speichern.

## Beobachtete Muster

- **Bewertungslöschung:** Auch bei Vorwürfen wie Betrug oder Rufschädigung wird
  auf das offizielle Bewertungslöschungsformular verwiesen; keine Beurteilung im
  normalen Ticket.
- **2FA-Push funktioniert nicht:** Nach Identitätsprüfung kann 2FA deaktiviert
  werden; Mitglied informieren und erneute Aktivierung empfehlen.
- **Phishing/Kontoübernahme:** Keine Links öffnen; Konto/Sitzungen und Passwort
  prüfen, Sicherheitsprozess einschalten; bei bestätigtem Fall können Konto und
  Transaktion geschützt beziehungsweise rückabgewickelt werden.
- **Vorübergehende Login-/IP-Sperre:** Freischaltung über den Link in der
  Ricardo-E-Mail; Spam-Ordner prüfen.
- **Konto gehackt:** Nach erfolgreicher Prüfung Passwort zurücksetzen, aktive
  Sitzungen beenden und Konto gemäss Sicherheitsprozess freischalten.
- **Versehntliches Gebot oder Kauf:** Kauf ist verbindlich; direkte Einigung mit
  dem Verkäufer kann eine einvernehmliche Stornierung ermöglichen. Keine
  einseitige Aufhebung versprechen.
- **Boost versehentlich ausgewählt:** Keine automatische Rückerstattung;
  Einzelfall als mögliche Kulanzgutschrift prüfen.
- **Streitfälle:** Käufer- und Verkäuferantwort, MoneyGuard-Zustimmung,
  Rücksendung und Belege müssen vor der Entscheidung geprüft werden.
- **Adyen-KYC:** KYC-Fehler an den vorgesehenen Prüfprozess geben; nach
  erfolgreicher Prüfung Mitglied über die Freischaltung informieren.
- **Abholung/Barzahlung:** Zahlungsstatus nicht allein anhand einer Anzeige
  als Zahlungseingang behandeln; tatsächlichen Zahlungseingang prüfen.

## Status

Diese Regeln sind aus gelösten Tickets abgeleitet und müssen mit den
verbindlichen internen Prozessunterlagen abgeglichen werden, bevor sie als
verbindliche Antwortregeln gelten.



## Historische Quelle: solved-7d-batch2.md

# Gelöste Tickets – Lernbatch 2

**Quelle:** zweiter Stichprobenbatch gelöster Tickets ab 03.08.2026, 50 Tickets
mit 78 Kommentaren. Automatisierte Telefon-/Systemtickets und technische
Tags wurden nicht als fachliche Regeln gewertet.

## Neue beobachtete Muster

### Sicherheit und Kontozugriff

- Bei bestätigtem Kontoübergriff: Konto schützen/blockieren, aktive
  Transaktionen prüfen, nach ausreichender Identitätsprüfung Passwort zurücksetzen
  und aktive Sitzungen beenden.
- Für die Wiederfreischaltung können aktuelle Adresse, Telefonnummer und eine
  Ausweiskopie über das offizielle Kontaktformular erforderlich sein.
- Eine Kontolöschung nach einem Übergriff darf nicht ohne erneute
  Identitätsprüfung durchgeführt werden.
- Bei einer vorübergehenden IP-Sperre auf den Freigabelink in der E-Mail und
  den Spam-Ordner verweisen.
- Bei einer SMS-Verifizierung mit ausländischer Nummer nicht manuell
  freischalten; den vorgesehenen Verifizierungsweg verwenden.

### Phishing

- Keine Links öffnen und keine Ricardo-, Kreditkarten-, TWINT- oder
  E-Banking-Daten eingeben.
- Bei eingegebenen Kartendaten sofort den Kartenherausgeber kontaktieren und
  gegebenenfalls eine Rückbuchung sowie eine Polizeimeldung veranlassen.
- Verdächtige Konten/Transaktionen intern prüfen; eine Kontosperre oder
  Stornierung nicht als automatische Standardmassnahme versprechen.
- Eine allfällige Boost-Kulanz separat prüfen; die Erfolgsprovision kann bei
  einer bestätigten Betrugsstornierung automatisch gutgeschrieben werden.

### Kaufen, Verkaufen und Gebote

- Ein versehentliches Gebot bleibt grundsätzlich verbindlich. Eine Löschung
  kann bei laufender Auktion geprüft werden, wenn der Verkäufer zustimmt.
- Bei einem Streitfall müssen die Antworten beider Parteien, Zahlungsstatus,
  Versandstatus, Rücksendung und MoneyGuard-Zustimmung vollständig geprüft
  werden.
- Eine Verkäuferantwort wie „ich versende innerhalb von 24 Stunden“ beendet
  den Streitfall nicht automatisch; der Versand muss nachverfolgt werden.

### 2FA und Verifizierung

- Bei einem Login-Loop nach Gerätewechsel wird 2FA erst nach dem vorgesehenen
  Identitätscheck deaktiviert; danach erneute Aktivierung empfehlen.

## Abgrenzung

Diese Datei enthält aus gelösten Tickets abgeleitete Muster. Sie ersetzt keine
verbindliche interne Prozessregel. Einzelne Kulanz-, Storno- oder
Sicherheitsentscheidungen bleiben fallbezogen.



## Historische Quelle: solved-7d-batch3.md

# Gelöste Tickets – Lernbatch 3

**Quelle:** dritter Stichprobenbatch gelöster Tickets ab 03.08.2026, 50 Tickets
mit 72 Kommentaren.

## Beobachtete Regeln und Antwortmuster

### 2FA / neues Gerät

- Bei einem alten oder verlorenen Gerät wird für den 2FA-Reset das offizielle
  Formular verwendet; eine Ausweiskopie ist zur Identifikation erforderlich.
- Alternativ kann ein Anruf von der registrierten Handynummer innerhalb der
  vorgesehenen Supportzeiten möglich sein.
- Nach erfolgreichem Reset wird die erneute Aktivierung von 2FA empfohlen.

### Käuferschutz+ / Problemfälle

- Ein Problemfall wegen nicht erhaltener Ware kann frühestens 10 Tage nach der
  Bezahlung eröffnet werden.
- Wenn der Button nicht aktiv ist, muss der Artikel zuerst als „erhalten"
  markiert werden; danach wird der Problemfall eröffnet. Dieser Schritt darf
  nur kommuniziert werden, wenn er im konkreten Prozess tatsächlich vorgesehen
  ist.
- Bei bestätigtem Betrugsfall kann der Käuferschutz bis maximal 60 Tage nach
  Angebotsende beantragt werden. Zahlungsbeleg und das Originalformular sind
  gemäss dem freigegebenen Prozess erforderlich.

### Nichtzahlung / Stornierung

- Bei ausbleibender Käuferzahlung wartet der Verkäufer die vorgesehene Frist
  ab und beantragt anschliessend die Stornierung; nach Genehmigung wird die
  Erfolgsprovision gutgeschrieben.
- Bei einem nicht mehr verfügbaren Artikel kann die Transaktion im
  Streitfall storniert und der Käuferbetrag zurückerstattet werden. Die
  Gebührenfolge muss fallbezogen geprüft werden; keine automatische
  Gebührenfreiheit versprechen.

### Inkasso und Gebühren

- Eine schnelle Zahlung kann in bestimmten Fällen noch zum Stoppen eines
  Inkassoprozesses und zur Wiederaktivierung des Kontos führen. Das ist vom
  tatsächlichen Übergabestatus abhängig und keine generelle Verlängerung.
- Gebühren können auch entstehen, wenn ein parallel auf einer anderen
  Plattform beworbenes Angebot auf Ricardo verkauft wurde. Entscheidend ist,
  ob auf Ricardo ein Verkauf zustande kam.

### Sicherheit / Phishing

- Nach Phishing über WhatsApp oder E-Mail keine Kontaktdaten oder Zahlungsdaten
  ausserhalb des Ricardo-Prozesses teilen.
- Bei bestätigtem Käuferbetrug kann der Käuferschutzprozess mit Zahlungsbeleg
  und dem vorgesehenen Formular erklärt werden.

## Status

Aus Ticketantworten abgeleitet; vor Übernahme in verbindliche Regeln mit den
internen Schulungsunterlagen und der aktuellen Online-Hilfe abgleichen.



## Historische Quelle: solved-7d-batch4.md

# Gelöste Tickets – Lernbatch 4

**Quelle:** vierter Stichprobenbatch gelöster Tickets ab 03.08.2026, 50 Tickets
mit 112 Kommentaren.

## Beobachtete Muster

### Phishing nach einem Verkauf

- Phishing kann unmittelbar nach einem echten Verkauf über WhatsApp und eine
  gefälschte E-Mail auftreten.
- Auch eine E-Mail von einer echten Ricardo-Adresse beweist nicht, dass jede
  parallel eintreffende Nachricht echt ist.
- Wenn Karten- oder TWINT-Daten eingegeben wurden: Zahlungsanbieter sofort
  kontaktieren, Karte/Konto sperren lassen und gegebenenfalls Anzeige erstatten.
- Wenn der Benutzername der E-Mail-Adresse ähnelt, kann eine Änderung des
  Benutzernamens als Sicherheitsmassnahme empfohlen werden.

### Konten und 2FA

- Bei 2FA auf einem alten Gerät kann die Deaktivierung über das offizielle
  Formular mit Identitätsnachweis oder über den Anrufprozess erfolgen.
- Wenn zwei Konten dieselbe Telefonnummer verwenden und beide bestehen
  bleiben sollen, ist eine manuelle Prüfung erforderlich; die Nummer muss
  eindeutig zugeordnet werden.
- Bei einer veralteten Handynummer nicht einfach im Ticket verifizieren,
  sondern den Kontoprüfungsprozess verwenden.

### Käufe, Verkäufe und Stornierungen

- Ein Verkäufer kann einen nicht mehr verfügbaren Artikel nicht einfach als
  Käuferfehler stornieren. Der Fall muss als Verkäufer-Nichterfüllung geprüft
  werden.
- Bei Nichtzahlung bleibt der Kaufvertrag bestehen; die Stornierung ist erst
  nach der vorgesehenen Frist möglich.
- Eine schriftliche Einigung zwischen Käufer und Verkäufer ist ein wichtiger
  Nachweis, ersetzt aber nicht automatisch den Ricardo-Stornierungsprozess.

### Gebühren und Auszahlungen

- Eine Gebühr kann trotz fehlender persönlicher Abholung oder nachträglicher
  Einigung entstehen, wenn der Verkauf auf Ricardo zustande kam.
- Änderungen von Auszahlungs-/Bankdaten müssen im vorgesehenen Prozess erfolgen;
  IBAN, Kontoinhaber und Adresse sind getrennt zu prüfen.
- Eine in einer E-Mail erwähnte Rückerstattung muss auf den konkreten
  Gebührentyp geprüft werden; Erfolgsprovision und Boost sind nicht automatisch
  gleich zu behandeln.

## Status

Aus Ticketantworten abgeleitet; vor produktiver Verwendung mit den verbindlichen
Prozessunterlagen und den aktuellen Makros abgleichen.



## Historische Quelle: solved-7d-batch5.md

# Gelöste Tickets – Lernbatch 5 (letzte 7 Tage)

Zeitraum: 03.–10.08.2026  
Stichprobe: 50 Tickets, 125 Kommentare  
Status: `draft` – Beobachtungen aus gelösten Tickets; verbindliche Regeln stehen in den Kategorie-Dokumenten.

## Wiederkehrende Muster

- Bei gehackten oder missbräuchlich verwendeten Konten: Konto aus Sicherheitsgründen blockieren, Transaktionen prüfen/stornieren und die Identität bzw. Kontoinhaberschaft über den vorgesehenen Prozess abklären.
- Bei mehreren Konten mit derselben Telefonnummer oder beim Verlust einer alten Telefonnummer: Nummern-/Kontozuordnung im Admin prüfen; nicht automatisch ein Konto löschen oder verifizieren.
- 2FA nach Gerätewechsel kann durch den Support zurückgesetzt werden; Mitglied danach ausdrücklich zur erneuten Aktivierung auffordern.
- Eine Sperre wegen negativer Bewertungen kann nach Bereinigung der Bewertungen bzw. Kontaktaufnahme mit den Gegenparteien aufgehoben werden. Eine zeitlich begrenzte Wiederöffnung ist ein interner Einzelfallentscheid.
- Bei Käuferschutz-/MoneyGuard-Zahlungen bleibt der Zahlungsstatus systemgebunden. Eine Zahlung ausserhalb des Systems (z.B. Twint direkt an den Verkäufer) erzeugt nicht automatisch den normalen Ricardo-Zahlungsstatus oder ein Ricardo-Versandlabel.
- Bei MoneyGuard wird die Auszahlung an den Verkäufer erst nach dem vorgesehenen Bestätigungs-/Fristenprozess ausgelöst; bei Verzögerung Transaktion und Auszahlungsstatus prüfen.
- Bei Versand-/Adressproblemen und bereits eröffnetem Streitfall muss der konkrete Versand- und Rücksendeverlauf geprüft werden; nicht einfach nochmals eine Standardfrist nennen.
- Preisvorschläge nach Auktionsende können bei Annahme unmittelbar zu einem Kauf führen; Zeitstempel und Annahme des Verkäufers erklären, warum kein separates „OK“ des Verkäufers erscheint.
- Nicht erhaltene Ware nach Bezahlung gehört in den Käuferschutzprozess; Artikelnummer, Kaufdatum, Zahlungsnachweis und bisherige Kommunikation sind relevant.
- Phishing-Meldungen: echte Ricardo-Domains und echte Kontobenachrichtigungen von gefälschten Nachrichten unterscheiden; keine Links öffnen und keine Zugangsdaten eingeben.

## Gebühren-/MwSt.-Abgrenzung

- Die MwSt. auf dem Verkaufspreis (Plattformbesteuerung) und die MwSt. auf Ricardos Erfolgsprovision sind zwei verschiedene Vorgänge.
- Eine Gutschrift der Verkaufs-MwSt. nach dem einschlägigen Prozess sagt nichts über die MwSt. auf der Erfolgsprovision aus.
- Die MwSt. auf der Erfolgsprovision ist die Steuer auf Ricardos Dienstleistung (vergleichbar mit MwSt. auf einer Restaurant- oder Ladenrechnung) und wird nicht allein deshalb gutgeschrieben, weil der Verkäufer selbst nicht mehrwertsteuerpflichtig ist.
- Bei Gebühren-Doppelbelastungen zuerst Gebührenübersicht, Artikelnummer und Buchungszeilen prüfen; erst danach eine Gutschrift oder Korrektur zusagen.

## Nicht als verbindliche Regel übernehmen

- Telefonische Agenten-Aktionspunkte sind teilweise Vorschläge und müssen gegen den tatsächlichen Kontostatus und den aktuellen Prozess geprüft werden.
- Automations-Tags wie `answerbot_vorschläge` oder `gelöst_von_answerbot` sind keine fachliche Begründung.
