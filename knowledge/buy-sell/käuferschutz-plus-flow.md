# Käuferschutz+: Ablauf, automatische Stornierung und Streitfälle

Quelle: passwortgeschütztes Miro-Board «Ablauf Kaufen-Verkaufen / Stornierung
einreichen», geprüft am 13.08.2026. Die vier vom Mitglied bereitgestellten
Screenshots liegen unter `../Knowledge/Easygenerator PDFs/screenshots/`.

## Transaktionsablauf

1. Der Käufer bezahlt über Käuferschutz+ mit TWINT oder Kreditkarte.
2. Nach Zahlung muss der Verkäufer den Artikel innerhalb von 7 Tagen versenden.
   Ricardo berücksichtigt intern einen zusätzlichen Puffer von 3 Tagen, also
   insgesamt 10 Tage.
3. Wird der Artikel innerhalb dieser Frist nicht versendet, wird die
   Transaktion automatisch storniert und der Betrag dem Käufer zurückerstattet.
4. Bei Versand mit einem Ricardo-Etikett wird der Versandstatus automatisch
   aktualisiert, sobald der Artikel bei der Post aufgegeben wurde.
5. Bei eigenem Versand muss der Verkäufer den Artikel manuell als versendet
   markieren. Erfolgt dies nicht, erhält er nach 4 Tagen eine Erinnerung.
6. Nach bestätigtem Erhalt und «in Ordnung» wird der Betrag dem Verkäufer
   grundsätzlich innerhalb von 2 bis 3 Arbeitstagen ausbezahlt.

## Auszahlung prüfen

- Zuerst prüfen, ob der Verkauf abgeschlossen ist und der Käufer den Artikel als
  erhalten und in Ordnung markiert hat.
- Wenn die 2 bis 3 Arbeitstage noch nicht abgelaufen sind, den Zeitraum abwarten.
- Danach im Adyen-Konto des Verkäufers prüfen. Wenn dort weiterhin keine
  Auszahlung ersichtlich ist, den Fall intern zur weiteren Abklärung geben.
- Ist die Transaktion noch nicht abgeschlossen, zuerst prüfen, welcher Schritt
  noch fehlt. Nicht vorschnell eine Auszahlung zusagen.

## Erhalt und automatische Abschlusslogik

- Der Käufer soll nach Erhalt prüfen, ob der Artikel in Ordnung ist, und den
  Erhalt bestätigen.
- Die Miro-Darstellung enthält zwei unterschiedliche automatische Fristen:
  einmal automatische Markierung nach 4 Tagen und einmal eine Erinnerungs-/Auto-
  Markierung nach 10 Tagen. Diese Abweichung muss fachlich geklärt werden,
  bevor sie als exakte Kundenfrist kommuniziert wird. Die aktuell bestätigte
  Supportregel bleibt: Käufer hat 3 Tage für eine Reklamation nach Erhalt;
  der genaue automatische Statuswechsel ist im Order-/Adminstatus zu prüfen.

## Streitfall / Dispute

1. Käufer erhält den Artikel und hat 3 Tage, den Zustand zu prüfen.
2. Ist der Artikel nicht in Ordnung, eröffnet der Käufer im Benutzerkonto einen
   Streitfall («Problem melden»). Die Auszahlung wird ab diesem Zeitpunkt
   gestoppt.
3. Der Verkäufer erhält im Zendesk ein Ticket und grundsätzlich 72 Stunden,
   um auf den Streitfall zu reagieren.
4. Stellungnahme und Belege prüfen. Danach den Streitfall gemäss Prozess
   annehmen oder ablehnen.
5. Bei Annahme wird die Transaktion storniert und der Käufer erhält den Betrag
   zurück. Bei Ablehnung wird die Begründung geprüft und der Fall entsprechend
   abgeschlossen.
6. Reagiert der Verkäufer nicht innerhalb von 72 Stunden, wird der Fall erneut
   geöffnet und durch den Support geprüft.

## Terminologie

Der historische Miro-/PDF-Inhalt nennt den Ablauf teilweise «MoneyGuard». Dieser
Begriff ist veraltet. In allen neuen Antworten, Makros und Dokumenten ist
ausschliesslich «Käuferschutz+» zu verwenden.
