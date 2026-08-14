# Ricardo Wissenspaket für den Co-Pilot

Dieses Paket enthält nur freigegebene Dokumente aus knowledge/manifest.json.
Historische und als Entwurf markierte Inhalte sind bewusst nicht enthalten.


## Quelle: _common/response-style.md

# Antwortstil Ricardo

## Standard-Anrede

Immer:

`Grüezi {{ticket.requester.name}}`

Danach folgt grundsätzlich:

`Vielen Dank für Ihre Anfrage.`

## Standard-Abschluss

Antworten enden grundsätzlich mit einem passenden Satz wie:

`Bei weiteren Fragen stehen wir Ihnen jederzeit gerne zur Verfügung.`

Danach folgt:

`Freundliche Grüsse`

Kein zusätzlicher Absender wie „Ricardo Kundendienst“, da der Name automatisch gesetzt wird.

## Musteraufbau

```text
Grüezi {{ticket.requester.name}}

Vielen Dank für Ihre Anfrage.

[Fallbezogene Antwort]

Bei weiteren Fragen stehen wir Ihnen jederzeit gerne zur Verfügung.

Freundliche Grüsse
```

## Empathie und abschliessende Antwort

- Bei Ärger, Enttäuschung, langen Wartezeiten, Mahnungen oder finanziellen
  Belastungen zuerst kurz und glaubwürdig Verständnis zeigen, bevor die Regel
  erklärt wird. Beispiel: „Wir verstehen, dass diese Situation ärgerlich ist.“
- Empathie darf keine falsche Kulanz, Ausnahme oder Erstattung versprechen.
- Eine Anfrage soll nach Möglichkeit mit einer vollständigen Antwort erledigt
  werden. Formulierungen wie „wir prüfen und melden uns“ nur verwenden, wenn
  eine echte interne Abklärung zwingend nötig ist; dann müssen der konkrete
  nächste Schritt und die benötigten Unterlagen genannt werden.
- Keine unnötige Rückfrage oder Weiterleitung, wenn die Lösung bereits aus dem
  Ticket, den Anhängen oder dem bekannten Prozess hervorgeht.
- Keine Gedankenstriche oder typografischen Geviertstriche verwenden. Stattdessen
  vollständige Sätze, Kommas oder Doppelpunkte nutzen.



## Quelle: _common/corporate-wording.md

# Corporate Wording – extrahierte Regeln

Quelle: Kurs „04 - R - Easy“, Abschnitt „Corporate Wording“.

## Schreibweisen

- Beträge: CHF, EUR, $ etc.
- Angebotsarten: „Fixpreis-Angebot“, „Sofort-kaufen-Preis“
- Firma: „Ricardo“
- Uhrzeit: „17.00 Uhr“
- „Benutzerkonto“ statt „Account“
- „Technischer Fehler“ statt „Bug“
- „Aktivierungscode“ statt „SAC“
- Wenn möglich deutsche Begriffe verwenden und keine internen Abkürzungen.

## Antwortstil

- Antworten müssen inhaltlich korrekt und vollständig sein.
- Makros müssen auf den konkreten Fall angepasst werden.
- Betreff, Name, Geschlecht, Anrede und Abschluss müssen geprüft und angepasst werden.
- Falls nötig, kulant formulieren.
- Eine persönliche Note ist erwünscht, sofern sie zum Fall passt.



## Quelle: _common/quality-checklist.md

# Qualitätsbogen Support-Antworten – extrahierte Regeln

Quelle: Kurs „04 - R - Easy“, Abschnitt „Qualitätsbogen“.

## Inhalt und Korrektheit

- Anfrage nicht korrekt beantwortet: -50 Punkte
- Antwort nicht vollständig: -25 Punkte
- Dieselbe Antwort zweimal gesendet: -15 Punkte
- Falscher Abschlusscode: -5 Punkte

## Individualisierung

- Makro nicht angepasst: -25 Punkte
- Betreff nicht korrekt angepasst: -20 Punkte
- Name und Geschlecht nicht angepasst: -15 Punkte
- Anrede oder Abschlusssatz nicht angepasst: -10 Punkte
- Name im Zendesk nicht angepasst: -10 Punkte
- Nicht kulant, obwohl Kulanz erforderlich wäre: -15 Punkte
- Mögliche Kulanz nicht abgeklärt: zuerst den Agenten nach „mit Kulanzgutschrift
  oder ohne“ fragen, bevor der Mitgliederentwurf erstellt wird.
- Persönliche Note: +15 Punkte

## Inhalt und Sprache

- Viele Grammatikfehler: -15 Punkte
- Rechtschreib- oder Interpunktionsfehler: -5 Punkte
- Gleiches Wort mehrfach verwendet: -5 Punkte
- Zu komplizierte Sätze: -5 Punkte
- Corporate-Terminologie nicht verwendet: -10 Punkte
- Falsche Absätze oder Leerzeichen: -5 Punkte
- Falsche Satzstellung: -5 Punkte

## Kritischer Fehler

- Datenschutzverstoss, beispielsweise gegen die DSGVO: -100 Punkte

## Abschlussorientierung

- Den nächsten konkreten Schritt im aktuellen Ticket erklären.
- Mitglieder nicht unnötig auffordern, ein weiteres Ticket zu eröffnen.
- Wenn eine Zustimmung der Gegenpartei erforderlich ist, kann diese über das
  bestehende Ticket nachgereicht werden.



## Quelle: _common/user-confirmed-rules.md

# Verbindliche, vom Ricardo-Team bestätigte Regeln

Diese Datei bündelt ausdrückliche Prozesskorrekturen und Antwortvorgaben aus
der Zusammenarbeit. Sie hat Vorrang vor widersprüchlichen alten Schulungen,
historischen Tickets oder früheren Entwürfen.

## Antwortaufbau

- Deutsch immer mit `Grüezi {{ticket.requester.name}}` beginnen.
- Danach grundsätzlich: `Vielen Dank für Ihre Anfrage.`
- Nur die tatsächlich gestellten Fragen beantworten. Keine ungefragten
  Exkurse oder allgemeinen Informationen ergänzen.
- Empathie zeigen, wenn ein Mitglied Aufwand, Ärger oder einen Verlust schildert.
- Abschluss grundsätzlich mit: `Bei weiteren Fragen stehen wir Ihnen jederzeit
  gerne zur Verfügung.` und danach `Freundliche Grüsse`.
- Keine Teambezeichnung und keine zusätzliche Signatur.
- Keine Gedankenstriche verwenden.
- Antworten möglichst so formulieren, dass das Mitglied sich nicht erneut melden
  muss.

## Arbeitsweise des Co-Piloten

- Zuerst das vollständige Ticket lesen, inklusive aller öffentlichen und
  internen Kommentare, Formular, Felder, Status, Anhänge, Artikelnummern,
  Bestellnummern, Mitgliedsnummer und Requester-Rolle.
- Den Kern der Anfrage erkennen und nur die passende Lösung verwenden.
- Wenn der Agent im Admin handeln muss, zuerst den konkreten internen nächsten
  Schritt nennen.
- Bei möglicher Kulanz immer zuerst den Agenten fragen: `Mit Kulanzgutschrift
  oder ohne?` Erst danach die endgültige Mitgliederantwort schreiben.
- Tags wie `answerbot` sind für die fachliche Beurteilung nicht relevant.

## Gebühren und Mehrwertsteuer

- Für Fristen und Kontostatus ist immer die älteste offene Gebühr entscheidend.
- Bei Stornierungsanfragen wegen Käuferverantwortung immer den Zeitraum von 7
  bis 60 Tagen nach Angebotsende erwähnen.
- Ein Mitglied muss die Gebührenübersicht prüfen und so lange bezahlen, bis die
  Zahlungsfristen wieder grün sind. Auf die Markierungen `Bezahlt` oder
  `Teilbezahlt` allein ist aktuell nicht zuverlässig abzustellen.
- Eine Erfolgsprovision ist eine normale Ricardo-Gebühr. Die darauf enthaltene
  Mehrwertsteuer ist etwas anderes als die Mehrwertsteuer auf den Verkauf eines
  nicht mehrwertsteuerpflichtigen Mitglieds.
- Bei nicht mehrwertsteuerpflichtigen Verkäufern wird die Mehrwertsteuer auf den
  Verkauf gesetzlich belastet und direkt wieder gutgeschrieben.
- Eine E-Mail mit `MWST-Gutschrift` und `MwSt. erhoben` kann deshalb eine
  Nullrechnung ergeben. Entscheidend ist die Gebührenübersicht, nicht diese
  verwirrende Hintergrundbuchung. Das Mitglied kann die Nullrechnung
  ignorieren.
- Mehrwertsteuer auf Artikelpreis und Versand kann nicht wegen einer Kulanz-
  oder privaten Vereinbarung angepasst werden.
- Einstellgebühren für Fahrzeuge: ab CHF 3'000 bei der ersten Veröffentlichung;
  Rückerstattung nur bei erfolgreichem Verkauf über Ricardo. Alte Schulungen mit
  gegenteiliger Aussage sind veraltet.

## Kaufen, Verkaufen und Stornierung

- Mit dem Abschluss eines Angebots entsteht grundsätzlich ein rechtsgültiger
  Kaufvertrag.
- Der Ricardo-Käufer ist der rechtmässige Käufer. Eine andere Person, die den
  Artikel bei einer Besichtigung mitnimmt, ist nicht automatisch Käufer und
  muss die Angelegenheit mit der tatsächlich kaufenden Person klären.
- Ein Verkäufer darf einen Verkauf nicht einfach stornieren, weil er parallel
  auf Tutti verkauft oder einen Fehler gemacht hat. Bei Verkäuferverschulden
  keine automatische Gutschrift versprechen. Kulanz muss ausdrücklich geprüft
  werden.
- Wenn der Käufer nicht bezahlt, kann der Verkäufer 7 bis 60 Tage nach
  Angebotsende über `Mein Verkaufen` > `Verkauft` > `Verkauf stornieren` eine
  Stornierungsanfrage einreichen. Der Käufer erhält 7 Tage zur Stellungnahme.
- Nach einer Stornierung erhält der Käufer grundsätzlich eine negative
  Bewertung. Bei wiederholten Fällen kann das Käuferkonto blockiert werden.
- Eine Stornierung ist nur zulässig, wenn die Verantwortung beim Käufer liegt,
  ausser Ricardo gewährt ausdrücklich Kulanz.

## Boosts

- Ein Boost ist Werbung und keine Verkaufsgarantie.
- Wird ein Boost versehentlich aktiviert, muss das Angebot umgehend, spätestens
  innerhalb von 24 Stunden, beendet werden. Dann kann eine Kulanzgutschrift
  geprüft werden.
- Ein Boost gilt grundsätzlich als benutzt, wenn das Angebot veröffentlicht war,
  auch wenn die Transaktion später scheitert.
- Bei Kulanz muss der Agent ausdrücklich entscheiden, ob gutgeschrieben wird.
- Wird ein Angebot nach einer Kulanzgutschrift reaktiviert, muss der Boost im
  Verkaufsformular zuerst entfernt werden. Eine erneute Gutschrift erfolgt nicht
  automatisch.

## Versand und Käuferschutz+

- `Käuferschutz+` ist die aktuelle Bezeichnung. `MoneyGuard` ist veraltet und
  darf in neuen Antworten nicht verwendet werden.
- Bei Zahlung mit Käuferschutz+ erhält der Verkäufer eine Benachrichtigung und
  sieht den Zahlungsstatus beim verkauften Artikel.
- Ohne Käuferschutz+ muss der Verkäufer den Zahlungseingang im eigenen
  Bankkonto prüfen und erst danach versenden.
- Versandetiketten werden dem Konto belastet, über das sie erstellt wurden.
- Die Ricardo-Etikette wird anhand der Versandangaben im Angebot erstellt. Wird
  diese Ricardo-Etikette genutzt, werden die ausgewiesenen Versandkosten
  verrechnet. Bezieht das Mitglied die Etikette direkt bei der Post, verrechnet
  Ricardo dafür nichts. Das Mitglied hat die Wahl.
- Ein Paket über dem zulässigen Gewicht oder den zulässigen Massen kann von der
  Post nachträglich mit einem Zuschlag belastet werden.
- Die allgemeine Angabe eines Standardpakets bis 30 kg beschreibt die maximal
  zulässige Paketklasse. Sie bedeutet nicht, dass jedes konkrete Etikett
  automatisch für 30 kg gültig ist.
- Bei einem Paket über 10 kg ist der relevante Zuschlag anhand der tatsächlichen
  Sendungsdaten zu erklären, nicht anhand allgemeiner Etiketteninformationen.

## Konten und Verifizierung

- Bei SMS-Verifizierungsproblemen StartButton öffnen und alle Konten mit der
  Telefonnummer prüfen.
- Bei mehreren Konten ist das Konto mit dem letzten Last Login das Target
  Account.
- Prüfen, ob die Nummer bereits im älteren Konto verifiziert ist. Falls ja, im
  alten Konto `Unverify` durchführen.
- Im neuen Konto zusätzlich SuspiciousTakeOver wegen Inaktivität prüfen und bei
  berechtigter Bereinigung entfernen.
- Danach das passende Makro senden, damit das Mitglied die Verifizierung erneut
  durchführen kann.
- Wenn nur ein Konto existiert und die Nummer dort noch nicht verifiziert ist,
  direkt verifizieren.
- Bei anderen Kontoproblemen zuerst Blockierung, Aktivierungscode und sonstige
  Admin-Hinweise prüfen.
- Wenn bereits alles verifiziert ist, interne Notiz `Bereits verifiziert` setzen
  und das Ticket abschliessen.

## Bewertungen, Reklamationen und Kulanz

- Anträge auf Bewertungslöschung müssen zwingend über das offizielle Formular
  eingereicht werden: https://help.ricardo.ch/hc/de/articles/20281675956124
- Bei technischen, finanziellen oder Kulanzfällen zuerst klären, was der Kunde
  tatsächlich fragt. Keine unpassenden Standardinformationen ergänzen.
- Wenn eine Kulanz bereits entschieden wurde, die Entscheidung klar mitteilen
  und gleichzeitig die Regel für zukünftige Fälle erklären.



## Quelle: easy/macro-catalog.md

# Easy Makros – extrahierter Makro-Katalog

Quelle: Kurs „04 - R - Easy“, Abschnitt „Easy Makros“.

## Benutzerangaben ändern

- Adresse bei Post nicht registriert
- Adresse kann nicht verifiziert werden
- Adresse selber ändern (änd)
- Adresse terminiert selber ändern (adäd)
- Änderung bestätigen
- Benutzernamen ändern (bäd)
- Bestätigung Namensänderung (bnäd)
- Bestätigung Änderung Wohnadresse (bäw)
- E-Mail-Adresse ändern – gültig (maägd)
- E-Mail-Adresse geändert – Bestätigung (emg)
- IBAN ändern (nicht Stripe) – kein Ausweis erhalten
- IBAN geändert
- Kontoübertragung nicht möglich (künm)
- Name geändert
- Namensänderung Ausweis
- Passwort ändern (päd)
- Passwort vergessen (vbpd)
- Rückmeldung Umwandlung Wechsel Privat auf Gewerblich

## Aktivierungscode

- Aktivierungscode eingeben (aced)
- Aktivierungscode erst gerade verschickt
- Aktivierungscode nochmals zugesendet (acsd)
- Aktivierungscode Versand Ausland dauert länger
- Ausland, Aktivierungscode muss eingegeben werden
- Liechtenstein
- Wohnsitz im Ausland, Code unterwegs
- Änderung bestätigen + Aktivierungscode versendet
- Bestätigung Änderung Wohnadresse & erneute Sendung Aktivierungscode
- Code zugestellt, Konto aktiviert
- Was ist der Aktivierungscode für Ausländer (acwad)

## Registrierung

- Anmeldung aus Ausland (aad)
- Link für E-Mail-Bestätigung erneut anfordern (Willkommens-E-Mail) (wl)
- Telefonnummer kann nicht vom Mitglied verifiziert werden
- Wieso kann ich nicht kaufen / Fragen stellen

## Kündigung

- Konto versehentlich gelöscht
- Bitte Konto wieder öffnen – Konto gelöscht
- Kein Zugriff auf E-Mail-Adresse
- Konto gelöscht (kgd)
- Löschung funktioniert nicht
- Wieso kann ich mein Konto nicht löschen? (klönd)
- Löscht alle Daten sofort, Ausweis
- Offener Betrag (kobd)
- Todesfall (Totenschein)
- Wie kann ich mein Konto löschen? (klöd)

## Sicherheits-Verifizierung / SMS

- Benutzerkonto wieder freigeschaltet
- Handynummer in mehreren Benutzerkonten
- Keine Handynummer im Benutzerkonto
- TakeOverSuspicious Status manuell angepasst
- Unfähig, die Handynummer zu verifizieren
- Was sind das für ungewöhnliche Aktivitäten

## 2FA

- 2FA – Anleitung bei Login
- 2FA deaktiviert
- Wie aktiviere ich 2FA
- Wie deaktiviere ich 2FA



## Quelle: easy/2fa.md

# Zwei-Faktor-Authentifizierung – extrahierte Regeln

Quelle: Kurs „04 - R - Easy“, Abschnitt „2FA – Zwei-Faktor-Authentifizierung“.

## Aktivierung

- 2FA kann im Benutzerkonto bei den Benutzerangaben aktiviert werden.
- Unterstützte Methoden: Authentifizierungs-App oder Push-Benachrichtigung über die Ricardo-App.
- Der zweite Faktor wird nicht bei jedem Login verlangt, sondern nur bei verdächtigem oder ungewöhnlichem Anmeldeverhalten.
- Die genauen Sicherheitskriterien werden nicht bekannt gegeben.
- Bei der Aktivierung wird ein QR-Code mit der Authentifizierungs-App gescannt; alternativ kann der Sicherheitsschlüssel manuell eingegeben werden.

## Deaktivierung durch das Mitglied

- Das Mitglied kann 2FA im Benutzerkonto selbst deaktivieren.
- Danach kann 2FA wieder aktiviert werden.

## Support-Prozess bei 2FA-Problemen

- Eine Deaktivierung durch den Support erfolgt nur nach Identitätsprüfung.
- Schreibt das Mitglied von der hinterlegten E-Mail-Adresse und sendet eine Ausweiskopie, kann der Reset vorgenommen werden.
- Wenn ein Mitglied keine Ausweiskopie senden möchte, kann die Identität über einen Anruf an die hinterlegte Telefonnummer verifiziert werden.
- Nach der Deaktivierung wird das Mitglied informiert und kann 2FA erneut aktivieren.

- Nach einem Gerätewechsel oder Verlust des alten Geräts soll das Mitglied 2FA
  nach dem Reset bei der nächsten Anmeldung wieder aktivieren.
## Ergänzungen aus Easygenerator 04.08.2026

- Aktive Methoden sind Authenticator-App und Push über die Ricardo-App. 2FA wird
  nicht bei jedem Login, sondern nur bei ungewöhnlichem oder verdächtigem Login
  abgefragt; die Kriterien werden nicht bekanntgegeben.
- Für einen Admin-Reset zuerst Auth0 im OKTA-Dashboard öffnen. Danach im Admin
  beim Mitglied unter «Profil» den Auth0-Link öffnen und «Reset MFA» ausführen.
- Identifikation für den Reset: registrierte E-Mail plus Ausweiskopie oder
  alternativ Anruf auf die hinterlegte Telefonnummer. Ohne sichere Identifikation
  keinen Reset durchführen.



## Quelle: easy/user-details.md

# Benutzerangaben ändern – extrahierte Regeln

Quelle: Kurs „04 - R - Easy“, Abschnitt „Benutzerangaben ändern“.

## Telefonnummer

- Telefonnummern können im Benutzerkonto geändert werden, sofern das Konto nicht blockiert ist.
- Die neue Nummer muss anschliessend verifiziert werden.
- Ist die Nummer bereits auf einem anderen Konto verifiziert, erfolgt eine manuelle Prüfung.
- Die Prüfung erfolgt über identische Kontodaten oder einen Anruf an die bereits registrierte Telefonnummer.

## Wohn- und Rechnungsadresse

- Wenn das Mitglied die Wohnadresse nicht selbst ändern kann, muss es von der registrierten E-Mail-Adresse schreiben.
- Die Adresse kann dann durch den Support geändert werden.
- Bei einer Wohnadressänderung sind auch Rechnungsadresse und gegebenenfalls die Adresse bei der IBAN zu prüfen.
- Terminierte Adressänderungen sind nicht möglich; das Mitglied muss die Adresse selbst zum gewünschten Zeitpunkt ändern oder sich dann erneut melden.

## Privat/Gewerblich

- Ein privates Konto kann nicht selbst in ein gewerbliches Konto umgewandelt werden.
- Für die Umwandlung werden Firmenname, gegebenenfalls MwSt.- und Handelsregister-Nummer, zugehörige Benutzernamen, Kontaktperson, Geburtsdatum, Telefonnummer und aktuelle Adresse benötigt.
- Die Umwandlung von gewerblich zu privat ist nur bei einer Einzelfirma möglich; der Kontoinhaber kann nicht geändert werden.
- In anderen Fällen muss ein neues Konto eröffnet werden.
- Bei GmbH oder AG kann die Kontaktperson geändert werden; bei einer Einzelfirma muss der Inhaber Kontaktperson bleiben.

## IBAN

- Eine IBAN kann nicht selbst geändert werden; die Änderung erfolgt durch den Support.
- Erforderlich sind eine Anfrage von der registrierten E-Mail-Adresse, die neue IBAN und eine Ausweiskopie des Kontoinhabers.
- Alternativ kann die Identität über einen Anruf an die registrierte Telefonnummer geprüft werden; die neue IBAN muss zusätzlich von der registrierten E-Mail-Adresse bestätigt werden.
- Zum Löschen der IBAN müssen auch Adresse und Kontoinhaber gelöscht werden.
## Ergänzungen aus Easygenerator 04.08.2026

- Kontobezogene Änderungen nur von der registrierten E-Mail-Adresse oder nach
  Anruf von der registrierten Telefonnummer. Drittadressen reichen nicht aus.
- Ohne Zugriff auf E-Mail und Telefonnummer: Ausweiskopie Vorder- und Rückseite,
  Benutzername und gewünschte Änderung anfordern.
- Benutzername nur alle 30 Tage ändern; keine Endungen wie `.ch` oder `.com`,
  keine Leer- oder Sonderzeichen.
- Bei einer Wohnadressänderung Rechnungsadresse und die Adresse bei der IBAN
  mitprüfen. Terminierte Änderungen werden nicht vorgängig eingetragen.
- IBAN-Änderung nur durch den Kundendienst mit neuer IBAN und sicherer
  Identifikation; zum Löschen müssen IBAN, Adresse und Kontoinhaber gemeinsam
  entfernt werden.



## Quelle: easy/securityflow.md

# SecurityFlow / Suspicious TakeOver – extrahierte Regeln

Quelle: Kurs „04 - R - Easy“, Abschnitt „SMS – Verifizierung – SecurityFlow“.

## Grundsatz

- Bei bestimmten Auffälligkeiten wird ein Mitglied als „Suspicious“ geflaggt.
- Vor dem Publizieren eines Angebots muss die Telefonnummer dann erneut per SMS-Code bestätigt werden.
- Ein Mitglied kann nur alle 30 Tage geflaggt werden.
- Kaufregeln werden erst nach Käufen ausgelöst; laufende oder bereits eingestellte Angebote bleiben unberührt, neue oder geplante Angebote können jedoch blockiert sein.
- Die genauen Sicherheitsregeln dürfen nicht nach aussen kommuniziert werden.

## Typische Auslöser

- Kürzlich geänderte E-Mail-Adresse oder Telefonnummer bei einem Angebot mit Fixpreis oder Sofort-kaufen-Preis über CHF 200.00.
- Barzahlung/Abholung bei Erstellung oder Änderung eines Angebots zwischen 22.00 und 08.00 Uhr.
- Mehrere Sofortkäufe bei verschiedenen Verkäufern in kurzer Zeit oder mit hohem kumuliertem Wert.

## Verifizierung

- Schweizer Mobilnummer: Mitglied fordert den SMS-Code an und wird danach automatisch wieder „unflagged“.
- Festnetznummer: Mitglied kann eine Mobilnummer hinzufügen und sich damit verifizieren.
- Mehrere Konten mit derselben Nummer, ausländischer Wohnsitz oder ausländische Telefonnummer: direkt an das Verifizierungsformular weiterleiten.
- Selbstverifizierung soll genutzt werden, wenn sie möglich ist; keine unnötige manuelle Prüfung durch den Support.

## Support-Entscheid

- Ohne Verdacht: Status „Not Suspicious“ setzen; eine manuelle Verifizierung nur nach Rückruf auf die registrierte Nummer oder eingereichter Ausweiskopie.
- Bei Verdacht oder eigener Meldung des Mitglieds: Anfrage in die entsprechende Security-Kategorie verschieben.
- Wird ein Status manuell zurückgesetzt, muss ein nachvollziehbarer Admin-Kommentar hinterlegt werden.
- Nach dem Zurücksetzen erhält das Mitglied automatisch seine ursprüngliche Rolle zurück.



## Quelle: easy/sms-verification-support.md

# Interner Prozess: SMS-Verifizierung nach KI-Anruf

Dieser Ablauf gilt, wenn nach dem Kontaktformular ein Verifizierungsanruf-Ticket
im Zendesk eingeht.

## Ablauf

1. Im Zendesk auf den **Start-Button** klicken. Dadurch öffnet sich im Admin die
   Übersicht aller Benutzerkonten, die diese Telefonnummer verwenden.
2. Gibt es mehrere Konten, ist das Konto mit dem jüngsten **Last Login**
   umrandet. Dieses Konto ist das **Target Account**.
3. Prüfen, ob die Telefonnummer bereits in einem älteren Benutzerkonto
   verifiziert wurde. Falls ja, die Telefonnummer im alten Konto **unverify**n.
4. Im neuen Konto prüfen, ob weitere Bereinigungen erforderlich sind, zum
   Beispiel ein **SuspiciousTakeOver**-Flag wegen Inaktivität. Ein solches Flag
   entfernen, sofern die Prüfung dies erlaubt.
5. Das Mitglied mit dem vorgesehenen Makro informieren, dass die Verifizierung
   nun möglich sein sollte.

## Sonderfälle

- **Nur ein Konto vorhanden und Telefonnummer noch nicht verifiziert:**
  Telefonnummer verifizieren und das Mitglied mit dem vorgesehenen Makro
  informieren.
- **Sonstige Kontoprobleme vorhanden:** prüfen, ob diese im vorgesehenen
  Admin-Prozess gelöst werden können, zum Beispiel eine Kontosperre.
- **Kein Problem erkennbar und alles bereits verifiziert:** Ticket mit der
  internen Notiz **„Bereits verifiziert“** abschliessen.

## Antwort- und Sicherheitsregeln

- Erst nach der Prüfung im Admin antworten; keine automatische Freigabe allein
  aufgrund des Tickettextes.
- Keine Verifizierungscodes oder vollständigen Telefonnummern per E-Mail
  anfordern oder in die Antwort schreiben.
- Wenn eine Kontobereinigung nicht zulässig oder nicht eindeutig ist, nicht
  eigenmächtig ändern, sondern gemäss Eskalationsweg weitergeben.



## Quelle: easy/first-problems.md

# Häufige erste Probleme – extrahierte Regeln

Quelle: Kurs „04 - R - Easy“, Abschnitt „Mögliche erste Probleme“.

## Registrierung

- Besteht bereits ein Konto mit der E-Mail-Adresse, ist keine zweite Registrierung möglich. Passwort zurücksetzen oder altes Konto löschen lassen.
- Bei Registrierungsfehlern ohne bestehendes Konto Screenshot der Fehlermeldung anfordern oder die Registrierung telefonisch Schritt für Schritt begleiten.
- Nicht bestätigte Willkommens-E-Mail: Mitglied kann selbst erneut eine Bestätigungs-E-Mail anfordern.

## Login

- Passwort vergessen: Passwort über den Login-Prozess zurücksetzen.
- Unbekannter Benutzername/E-Mail: Konto kann anhand der vollständigen Adresse im Admin gesucht werden.
- Nicht bestätigte E-Mail: Bestätigungslink erneut anfordern.
- Gebanishte Konten: Grund im Log prüfen und entsprechend informieren.
- 2FA-Probleme nach neuem Handy, App-Neuinstallation oder deaktivierten Push-Benachrichtigungen: 2FA-Reset nach dem definierten Identitätsprüfungsprozess.
- Wenn kein anderer Fehler feststellbar ist: Cookies und temporäre Internetdateien löschen lassen.

## Telefonnummer

- Ist die Schweizer Mobilnummer bereits auf einem anderen Konto hinterlegt, telefonisch klären, welches Konto weitergeführt werden soll.
- Das nicht benötigte Konto kann gekündigt werden.
- Wenn beide Konten behalten werden sollen, ist eine manuelle Verifizierung nur bei identischen Daten möglich.
- Bei Anrufen zur Verifizierung immer zusätzlich das Geburtsdatum erfragen.
- Festnetznummer: Verifizierung per Anruf oder Versand eines Aktivierungscodes.
- Schweizer Adresse mit ausländischer Telefonnummer: grundsätzlich Aktivierungscode senden; Anruf nur ausnahmsweise.

## Ausweis und Ausland

- Ausweis wird häufig wegen unscharfer/verdrehter Aufnahme oder nicht identischer Kontodaten abgelehnt.
- Private Mitglieder mit ausländischem Wohnsitz können nur kaufen, nicht verkaufen; Aktivierungscode ist für die Aktivierung erforderlich.
- Liechtensteinische Mitglieder dürfen nach Eingabe des Aktivierungscodes auch verkaufen.
- Gewerbliche Mitglieder aus dem Ausland müssen sich für den Verkauf bewerben.

## Aktivierungscode

- Schweiz: Bei Versand vor weniger als 3 Arbeitstagen um Geduld bitten; A-Post dauert in der Regel 2–3 Werktage.
- Schweiz: Nach mehr als 3 Arbeitstagen Code erneut versenden und Online-Verifizierung mit ID/Pass als Alternative nennen.
- Ausland: Versand kann bis zu einer Woche dauern.
- Bei mehrfacher Anforderung ist nur der zuletzt generierte Code gültig.
- Ein Foto/Screenshot des Briefs kann zur Prüfung von Datum und Adresse eingereicht werden.
- Bei Verlust kann der Versand erneut ausgelöst werden; Anfrage muss von der registrierten E-Mail-Adresse kommen.



## Quelle: easy/registration-and-verification.md

# Registrierung und Verifizierung – extrahierte Regeln

Quelle: Kurs „04 - R - Easy“, Abschnitt „Registrierung & Aktivierung“.

## Registrierung

- Ein Mitglied muss mindestens 18 Jahre alt sein.
- Pro E-Mail-Adresse ist nur ein Benutzerkonto erlaubt.
- Es darf kein bestehendes blockiertes (banished) Benutzerkonto vorhanden sein.
- Die E-Mail-Adresse muss innerhalb von 24 Stunden über die Willkommens-E-Mail bestätigt werden; sonst ist kein Login mehr möglich.
- Nach der Bestätigung kann das Profil vervollständigt werden.

## Profil

- Für Kaufen und Verkaufen muss das Profil vervollständigt werden.
- Die Adresse muss Post-konform hinterlegt sein.

## Handynummer

- Für das Bieten/Kaufen und Fragenstellen muss die Handynummer verifiziert werden.
- Es werden Schweizer Mobilnummern verifiziert.
- Eine verifizierte Nummer kann nicht gleichzeitig auf einem anderen Konto verifiziert werden.
- Eine Telefonnummer kann grundsätzlich nur einmal innerhalb von 30 Tagen verifiziert werden.
- Der Code ist 10 Minuten gültig; ein neuer Code kann ebenfalls erst nach 10 Minuten angefordert werden.
- Nach erfolgreicher Verifizierung wechselt die Rolle von „saver“ zu „buyer“.

## Ausländische Mitglieder

- Ausländische Mitglieder müssen den per Post versendeten Aktivierungscode eingeben, um als Käufer aktiv zu werden und Fragen an Verkäufer zu stellen.
- Der Aktivierungscode dient der Überprüfung der Wohnadresse.
- Verkaufen ist für Privatpersonen mit ausländischem Wohnsitz grundsätzlich nicht möglich.
- Gewerbliche Mitglieder aus dem Ausland müssen den Aktivierungscode eingeben, bevor sie sich als Verkäufer bewerben können.

## Verkäufer-Verifizierung

- Für das Verkaufen aus der Schweiz ist zusätzlich eine Identitätsprüfung erforderlich.
- Diese kann über einen Ausweis oder einen per Post zugestellten Aktivierungscode erfolgen.



## Quelle: easy/account-cancellation.md

# Konto kündigen / löschen – extrahierte Regeln

Quelle: Kurs „04 - R - Easy“, Abschnitt „Mitgliedschaft kündigen / Benutzerkonto löschen“.

## Selbstständige Löschung

Ein Mitglied kann das Konto selbst löschen, wenn:

- der Kontosaldo ausgeglichen ist
- keine laufenden Käufe oder Verkäufe bestehen
- alle Verkäufe der letzten 60 Tage als „Artikel erhalten“ markiert wurden
- das Konto nicht blockiert ist

Ist eine Transaktion jünger als 60 Tage und nicht als erhalten markiert, muss das Mitglied entweder den Käufer beziehungsweise Verkäufer kontaktieren und die Markierung nachholen lassen oder 60 Tage abwarten.

## Löschung durch den Support

- Ein Antrag muss grundsätzlich von der registrierten E-Mail-Adresse kommen.
- Alternativ ist ein Anruf von der hinterlegten Telefonnummer möglich.
- Falls beides nicht möglich ist, wird eine Ausweiskopie von Vorder- und Rückseite benötigt.
- Bei offenen Gebühren darf das Konto weder selbstständig noch manuell gelöscht werden.
- Bei offenen Gebühren ist dem Mitglied die konkrete fehlende Voraussetzung mitzuteilen.

## Guthaben

- Bei selbstständiger Löschung wird auf ein allfälliges Guthaben hingewiesen; das Konto wird sofort deaktiviert.
- Bei einer Löschung durch den Support wird erst ab CHF 20.00 aktiv auf ein Guthaben hingewiesen.
- Kleinere Guthaben werden nur auf ausdrücklichen Wunsch ausbezahlt; eine nachträgliche Auszahlung kann noch Jahre später möglich sein.

## Wichtige Prozessregel

Ein gelöschtes Konto wird nicht wieder geöffnet.
## Ergänzungen aus Easygenerator 04.08.2026

- Selbstlöschung setzt CHF 0.00 offenen Saldo, keine laufenden Käufe/Verkäufe,
  alle Verkäufe der letzten 60 Tage als erhalten markiert und keinen Banished-
  Status voraus.
- Bei einer jüngeren, nicht bestätigten Transaktion Käufer kontaktieren oder
  60 Tage bis zum automatischen Abschluss abwarten.
- Antrag per registrierter E-Mail; bei Post oder Drittadresse Ausweiskopie
  Vorder- und Rückseite. Guthaben unter CHF 20.00 wird nur auf ausdrücklichen
  Wunsch ausbezahlt.



## Quelle: blocked/blocked.md

# Kontosperrungen

## AC-Blockierung (Manually Blocked)

- Das Konto bleibt einloggbar, aber Kaufen und Verkaufen sind nicht möglich.
- Typische Gründe: unvollständige oder ungültige Kontaktangaben, ungültige Telefonnummer, nicht zulässige c/o-, PickPost- oder reine Postfachadresse, unzulässiger Benutzername mit Domain-ähnlichen Endungen (`.ch`, `.com`, `-ch`, `_ch`), unvollständige Firmenangaben oder offene ausgebuchte Beträge.
- Für die Freischaltung müssen die fehlenden Angaben korrigiert bzw. Nachweise geliefert werden. Bei c/o-Adressen: Begründung plus Ausweiskopie oder vollständige Adresse ohne c/o.
- Intern wird der Status im Profil angepasst und mit einem Admin-Kommentar begründet; die User Message nennt nur die benötigten Angaben.

## Write-off

- Ein Write-off ist ein seit mehr als zwölf Monaten offener, automatisch ausgebuchter Betrag.
- Normalerweise wird das Konto nach Zahlung des offenen Betrags wieder geöffnet.
- Die historische Ausnahme vom 18.09.2018 (CHF 12–19.90, bestimmter Kommentar, kein Inkasso) ist nur nach interner Rückfrage anzuwenden.

## Antwortgrenze

Konkrete interne Sperrgründe, Prüfregeln und Kontomassnahmen werden Mitgliedern nicht offengelegt. Nach aussen nennen wir die erforderliche Korrektur oder den benötigten Nachweis.
## Ergänzungen aus Easygenerator 05.08.2026

- AC-Block bedeutet: Login möglich, Kaufen und Verkaufen nicht möglich. Im Admin
  müssen Admin-Kommentar (interner Grund) und User Message (benötigter Nachweis)
  gesetzt werden.
- Banished ist eine vollständige Sperre. Bei Übereinstimmungen mit einem alten
  gesperrten Konto keine Details zu Bewertungen, Gegenparteien oder dem alten
  Konto offenlegen.
- Für Sperrentscheide wegen Bewertungen zählen die relevanten negativen
  Bewertungen der letzten 12 Monate. Eine spätere Entsperrprüfung erfolgt erst,
  wenn der Sperrgrund bereinigt ist.



## Quelle: buy-sell/decision-rules.md

# Verbindliche Entscheidungsregeln

## Falsche Übergabe bei Ricardo-Verkauf

Wenn eine andere Person als der Ricardo-Käufer den Artikel abholt oder erhält:

- Rechtmässiger Käufer ist ausschliesslich die Person, die den Artikel über Ricardo gekauft hat.
- Die andere Person ist nicht der Käufer des Ricardo-Verkaufs.
- Der Verkäufer muss die Angelegenheit direkt mit dem rechtmässigen Käufer klären.
- Keine Spekulation über Betrug oder ein System dahinter, sofern dafür keine bestätigten Hinweise vorliegen.
- Keine Zusage von Erstattung, Stornierung oder Entschädigung durch Ricardo aus diesem Sachverhalt ableiten.

## Käufer bezahlt nicht und bestätigt den Rücktritt nicht schriftlich

- Mit dem Abschluss des Angebots besteht ein rechtsgültiger Kaufvertrag.
- Der Verkäufer kann 7 bis 60 Tage nach Angebotsende über „Mein Verkaufen“ > „Verkauft“ > „Verkauf stornieren“ eine Stornierungsanfrage einreichen.
- Ricardo fordert den Käufer zur Stellungnahme auf.
- Bestätigt der Käufer den Grund nicht oder reagiert er innerhalb von 7 Tagen nicht, wird die Anfrage automatisch genehmigt.
- Die Erfolgsprovision wird gutgeschrieben.
- Der Käufer erhält aufgrund der Stornierung eine negative Bewertung.
- Bei wiederholtem Fehlverhalten wird der Käufer blockiert.

## Käuferkonto / falsche Adresse

- Ricardo darf aus Datenschutzgründen keine Auskunft über interne Kontomassnahmen oder die Prüfung persönlicher Daten eines anderen Mitglieds geben.
- Hinweise wie retournierte Post können zur internen Prüfung eingereicht werden.
- Solche Nachweise begründen keine Zusage einer bestimmten Massnahme gegen das Käuferkonto.

## Verkäufer verkauft den Artikel zusätzlich ausserhalb von Ricardo

- Die Ursache liegt beim Verkäufer; der Ricardo-Kauf bleibt verbindlich.
- Eine Stornierungsanfrage zur Rückerstattung der Erfolgsprovision ist für eine
  vom Verkäufer verursachte Nichterfüllung nicht als Käufer-Verfehlung zulässig.
- Der Verkäufer muss den Ricardo-Kauf erfüllen oder mit dem Käufer eine
  einvernehmliche Kulanzlösung suchen. Eine Kulanzlösung garantiert keine
  Gebührenrückerstattung.

## Käuferschutz, MoneyGuard und externe Zahlungen

- Wenn ein Käufer direkt an den Verkäufer (z.B. per Twint) bezahlt, wird der
  Ricardo-Zahlungsstatus dadurch nicht automatisch aktualisiert.
- Ein Ricardo-Versandlabel oder die automatische MoneyGuard-Auszahlung kann
  nur über den vorgesehenen Zahlungsablauf ausgelöst werden.
- Bei verspäteter MoneyGuard-Auszahlung zuerst den Zahlungsstatus, die
  Empfangsbestätigung und allfällige Fristen der konkreten Transaktion prüfen.
- Bei ausbleibender Lieferung nach erfolgter Zahlung auf den
  Käuferschutzprozess verweisen bzw. den bestehenden Antrag anhand der
  Artikelnummer, Zahlungsdaten und Kommunikation prüfen.



## Quelle: buy-sell/decision-rule-contact-before-purchase.md

# Vor-Kauf-Besichtigung und Kontaktaufnahme

## Fall

Ein Käufer möchte einen grösseren oder höherpreisigen Artikel vor dem Kauf am
Standort des Verkäufers besichtigen.

## Verbindliche Antwortlogik

- Vor dem Kauf steht grundsätzlich nur die öffentliche Fragen-&-Antworten-Funktion zur Verfügung.
- Private Kontaktangaben wie genaue Adresse, Telefonnummer oder E-Mail-Adresse dürfen dort nicht veröffentlicht werden.
- Nach dem Kauf werden die Kontaktdaten zwar in den Kaufdetails verfügbar, das löst aber keine Besichtigung vor dem Kauf.
- Es darf deshalb nicht behauptet werden, der Käufer könne eine Besichtigung beim Verkäufer zuhause verbindlich organisieren, ohne dass die genaue Adresse vor dem Kauf zugänglich ist.
- Wenn für die Besichtigung die genaue Adresse oder private Kontaktdaten erforderlich sind, gibt es unter den aktuellen Regeln keine verlässliche, regelkonforme Lösung vor dem Kauf.
- Der Käufer muss in diesem Fall entscheiden, ob er auf den Kauf verzichtet; die Rückmeldung kann zusätzlich als Produktfeedback aufgenommen werden.



## Quelle: buy-sell/payment-status-seller.md

# Zahlungseingang für Verkäufer

- Bei Käufen mit Käuferschutz+ erhält der Verkäufer eine Zahlungs-
  benachrichtigung; der Zahlungsstatus ist direkt beim verkauften Artikel
  sichtbar.
- Bei Käufen ohne Käuferschutz+ wird die Zahlung direkt an den Verkäufer
  geleistet. Dieser muss den Eingang im eigenen Bankkonto bzw. beim gewählten
  Zahlungsdienst prüfen.
- Versand erst auslösen, wenn die Zahlung tatsächlich eingegangen ist.
- Wird ein Artikel versehentlich als «Bezahlt» markiert, kann dieser Status nicht
  rückgängig gemacht werden. Der Verkäufer soll den Käufer direkt über das
  Versehen informieren und die Zahlung einfordern.
- Käuferangaben findet der Verkäufer unter «Mein Verkaufen» → «Verkauft» →
  «Mehr» beim entsprechenden Angebot.

## Ergänzung aus dem aktuellen Käuferschutz+-Miro-Ablauf

- Nach Zahlung muss der Verkäufer grundsätzlich innerhalb von 7 Tagen liefern;
  mit internem Puffer gilt eine automatische Stornierung nach 10 Tagen ohne
  Versand.
- Ricardo-Etiketten aktualisieren den Versandstatus automatisch nach Aufgabe bei
  der Post. Eigenversand muss der Verkäufer manuell als versendet markieren;
  nach 4 Tagen wird daran erinnert.
- Nach Abschluss und Bestätigung «erhalten und in Ordnung» erfolgt die Auszahlung
  grundsätzlich innerhalb von 2 bis 3 Arbeitstagen. Bei Verzögerungen zuerst
  Orderstatus und Adyen prüfen.



## Quelle: buy-sell/ratings.md

# Bewertungen

- Käufer und Verkäufer können nach einer Transaktion positiv, neutral oder
  negativ bewerten. Die Abgabe ist empfohlen, aber nicht verpflichtend.
- 30 Tage nach Angebotsende wird automatisch eine Erinnerung verschickt.
- Das Bewertungsprofil ist öffentlich. Der Prozentsatz wird aus positiven
  Bewertungen im Verhältnis zu positiven plus negativen Bewertungen berechnet;
  neutrale Bewertungen zählen nicht in den Prozentsatz.
- Viele negative Bewertungen können zum Ausschluss vom Handel führen.

## Löschung

Eine Löschung wird nur in den vorgesehenen Ausnahmefällen geprüft, etwa bei
Bewertungserpressung/Rachebewertung, einer entsprechenden Friedensrichter-
Entscheidung, nachweislich falscher Bewertung oder Zustimmung des Bewertenden.
Bewertungen wegen langer Lieferzeit oder hoher Lieferkosten werden nicht
gelöscht. Anträge laufen zwingend über das Kontaktformular und werden als
Rating-Fall bearbeitet; telefonisch keine Löschungsanträge bearbeiten.

Eine versehentlich selbst abgegebene Bewertung kann ebenfalls nur über das
Formular korrigiert werden. Gelöschte positive oder neutrale Bewertungen können
nicht erneut abgegeben werden.

## Standardantwort bei einem Löschungsantrag

Anträge auf Bewertungslöschung werden nicht direkt im Ticket beurteilt. Das
Mitglied ist zwingend an das offizielle Formular zu verweisen:

https://help.ricardo.ch/hc/de/articles/20281675956124
## Ergänzungen aus Easygenerator 08.08.2026

- Bewertungserinnerung wird 30 Tage nach Angebotsende versandt.
- Für Sperrentscheidungen zählen relevante negative Bewertungen der letzten 12
  Monate. Der Prozentsatz berechnet sich aus positiven geteilt durch positive
  plus negative Bewertungen.
- Löschanträge ausschliesslich über das offizielle Formular. Zulässig sind nur
  Beleidigungen, persönliche Daten, Rache-/Erpressungsbewertungen oder
  nachweislich falsche Tatsachen mit Belegen. Lange Lieferzeit oder hohe
  Lieferkosten sind kein Löschgrund.



## Quelle: fees/fees.md

# Gebühren / Finance

## Grundsätze

- Für normale Artikel fallen keine Einstellgebühren an. Für Fahrzeugangebote ab
  CHF 3'000 gilt seit dem 12.01.2026 eine rückerstattbare Einstellgebühr. Sie
  wird bei der ersten Veröffentlichung belastet und nur bei einem erfolgreichen
  Verkauf über Ricardo vollständig zurückerstattet. Bei Verkauf auf einer
  anderen Plattform oder bei einer Stornierung erfolgt keine automatische
  Rückerstattung.
- Erfolgsprovision je nach Kategorie/Produkttyp 8–12 %, mindestens CHF 0.10,
  maximal CHF 290.00.
- Gebühren, Gutschriften, Rückerstattungen und Zahlungen sind in der
  Gebührenübersicht nachvollziehbar.

## Zahlungsfristen

- 14 Tage: Zahlungsaufforderung.
- 30 Tage danach: erste Zahlungserinnerung.
- Tag 44: Mahnspesen von CHF 10.00.
- Tag 58: Kontoblockierung.
- Tag 72: Übergabe an Inkasso.
- Ab Status `collection` keine Gutschriften mehr. Die tatsächliche Übergabe
  erfolgt mit einem vier­tägigen Puffer; Sonderfälle intern eskalieren.
- Ein technischer Mahnstopp oder eine manuelle Pause einzelner Gebühren ist
  nicht möglich. Für den Zahlungsstatus ist immer die älteste offene Gebühr
  ausschlaggebend.
- Das Mitglied muss die Gebührenübersicht selbst prüfen und die offenen
  Beträge schrittweise begleichen, bis die Zahlungsfristen wieder grün
  angezeigt werden.

## Zahlungen und Rückzahlungen

- Kreditkartenzahlungen werden sofort, E-Banking-Zahlungen innerhalb von zwei
  Arbeitstagen verbucht.
- Jede Zahlung benötigt die individuelle Referenznummer.
- Rückzahlung grundsätzlich auf die ursprüngliche Zahlungsart; Guthaben unter
  CHF 20.00 werden in der Regel nicht ausbezahlt. Kulanzgutschriften sind nicht
  auszahlbar; bei offenen Angeboten wird die Rückzahlung zurückgestellt.
- Bei ausländischen Mitgliedern wird die Mehrwertsteuer höchstens einmal pro
  Jahr zurückerstattet.

## Antwortgrenzen

Inkassofälle werden nicht inhaltlich durch den normalen Support beantwortet,
sondern an das Inkassobüro verwiesen. Interne Gutschriften, Umbuchungen und
Ausnahmen benötigen die vorgesehenen Nachweise bzw. interne Freigabe.

## Gebührenübersicht / offener Saldo

- Bei der Prüfung auf Doppelbelastungen ist die Gebührenübersicht massgebend.
- Einzelne Status-Labels wie „Bezahlt“ sind aktuell nicht immer verlässlich.
- Entscheidend ist der offene Saldo: Bei CHF 0.00 sind alle Gebühren bezahlt.
- Das Rechnungssystem wird erneuert; bis dahin kann die Darstellung komplex
  oder missverständlich sein.

## Boosts und Gebührenverantwortung

- Ein Boost ist eine Werbeleistung und garantiert keinen erfolgreichen Verkauf.
- Ein Boost wird sofort nach dem Kauf wirksam und gilt grundsätzlich für die
  gesamte Dauer des Angebots. Bei einem geplanten Start wird er erst mit der
  Veröffentlichung wirksam und verrechnet.
- Innerhalb der ersten 24 Stunden kann der Verkäufer auf eine höhere Stufe
  wechseln, zum Beispiel von Bronze auf Silber oder von Silber auf Gold. Nach
  dem Upgrade muss der Kundendienst kontaktiert werden, damit die Differenz
  zwischen den Boost-Stufen zurückerstattet werden kann.
- Wird ein Angebot reaktiviert und der Boost bleibt ausgewählt, wird er erneut
  verrechnet. Bei automatischer Reaktivierung kann der Boost automatisch erneut
  gebucht werden.
- Wird ein Angebot beworben bzw. verkauft und die Transaktion später storniert,
  gilt der Boost grundsätzlich trotzdem als genutzt. Eine Gutschrift erfolgt
  nicht automatisch. In begründeten Einzelfällen kann jedoch eine
  Kulanzgutschrift gewährt werden; das ist eine manuelle Einzelfallentscheidung.
- Erfolgsprovisionen, Boosts und allfällige Einstellgebühren für Fahrzeuge trägt
  der Verkäufer.
- Käufer bezahlen grundsätzlich keine Verkaufs- oder Boostgebühren. Nur die
  Gebühr für Käuferschutz+ wird dem Käufer automatisch belastet.

Quelle für die 24-Stunden-Upgrade-Regel: [Ricardo Hilfe, Boost-Kosten und
Upgrade](https://help.ricardo.ch/hc/de/articles/21308881293084-Was-kostet-ein-Sichtbarkeits-Boost)

## MwSt. auf Verkauf und Erfolgsprovision unterscheiden

- Die MwSt. auf dem Verkaufspreis im Rahmen der Plattformbesteuerung ist ein
  anderer Vorgang als die MwSt. auf Ricardos Erfolgsprovision.
- Eine Gutschrift der MwSt. auf Verkäufe gemäss dem gültigen Prozess bedeutet
  nicht, dass auch die MwSt. auf Ricardos Gebühren gutgeschrieben wird.
- Die MwSt. auf der Erfolgsprovision ist die Steuer auf Ricardos Dienstleistung.
  Sie wird wie die MwSt. auf einer Restaurant- oder Ladenrechnung verrechnet;
  die eigene MwSt.-Pflicht des Verkäufers ändert daran nichts.
- Bei einer Anfrage zur fehlenden MwSt.-Gutschrift immer zuerst klären, auf
  welcher Buchungszeile die MwSt. steht. Nur die Verkaufs-MwSt. und die
  Gebühren-MwSt. nach den jeweils gültigen Prozessen behandeln.

## Verwirrende E-Mail nach MwSt.-Gutschrift

- Wenn Verkaufs-MwSt. belastet und direkt wieder gutgeschrieben wird, kann das
  System automatisch eine E-Mail senden, wonach Gebühren mit einer Zahlung,
  Gutschrift oder einem Guthaben beglichen wurden.
- Diese E-Mail bedeutet nicht zwingend, dass das Mitglied ein entsprechendes
  Guthaben hatte oder eine zusätzliche Zahlung geleistet hat. Sie kann durch
  die automatische Gutschrift ausgelöst worden sein.
- Mitglieder deshalb nicht anhand der E-Mail allein beurteilen lassen, ob noch
  Gebühren offen sind. Massgebend ist die Gebührenübersicht im Benutzerkonto
  und insbesondere der dort angezeigte offene Saldo.
- Bei einem offenen Saldo von CHF 0.00 besteht kein weiterer Zahlungsbedarf.



## Quelle: bugs/bugs.md

# Bugs / technische Fehler

- Die aktuelle Bugliste und Workarounds stehen im internen Notion sowie in der
  Zendesk-Bugfilterliste. Diese internen Quellen müssen vor einer Antwort auf
  Aktualität geprüft werden.
- Bei einem neuen, noch unbekannten Fehler den Bug-Verantwortlichen informieren.
  Nach Eröffnung eines Zendesk-Bugtickets wird das Ticket als Vorfall mit dem
  bekannten Problem verknüpft.
- Für bekannte Fehler das freigegebene Makro **Technische Probleme – Bug
  bekannt** verwenden und den vorhandenen Workaround mitteilen.
- Häufen sich Meldungen in kurzer Zeit, ist von einem allgemeinen kritischen
  Fehler auszugehen; ein Incident wird nach dem internen Bereitschaftsprozess
  erstellt. Quiz- und interne Eskalationsschritte werden nicht an Mitglieder
  kommuniziert.

## Antwortgrenze

Keine technische Ursache oder Behebungsfrist erfinden. Wenn kein bestätigter
Bug bzw. Workaround vorliegt, Ticket zur technischen Prüfung weiterleiten und
dem Mitglied nur den geprüften Zwischenstand mitteilen.
## Ergänzungen aus Easygenerator 09.09.2024

- Bekannte Bugs zuerst in Notion und der Zendesk-Bugansicht prüfen und den
  dokumentierten Workaround verwenden.
- Kritische Incidents betreffen Login, Kaufen/Bieten, Verkaufen, Bezahlen, Suche,
  Fragen & Antworten, Homepage/Artikelseite, Angebotsabschluss oder allgemein
  nicht versendete Systemmails.
- Einzelne Geräte- oder Einzelmitgliedfehler sind nicht automatisch ein
  allgemeiner Incident. Unbekannte Fehler intern an die zuständige Person melden;
  abends und am Wochenende nur kritische Fehler als Incident erfassen.
