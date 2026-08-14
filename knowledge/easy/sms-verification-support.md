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

