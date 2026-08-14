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
