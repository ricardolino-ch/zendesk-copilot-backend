# Easygenerator: vollständige Easy-Use-Cases

Diese Regeln wurden direkt aus dem öffentlich startbaren Easygenerator-Kurs `04 - R - Easy` ausgelesen und mit den internen Prozessregeln abgeglichen.

## Kommunikation und Qualitätsbogen

- Corporate Wording verwenden: `Benutzerkonto` statt Account, `technischer Fehler` statt Bug, `Aktivierungscode` statt SAC.
- Angebotsbegriffe: `Fixpreis-Angebot` und `Sofort-kaufen-Preis`.
- Beträge mit Währung schreiben, Uhrzeiten im Format `17.00 Uhr`.
- Makros immer individualisieren: Name, Anrede, Geschlecht, Betreff, Sprache, Platzhalter und Falltext prüfen.
- Eine Antwort muss korrekt und vollständig sein. Derselbe Text darf nicht doppelt gesendet werden.
- Datenschutzverstösse sind kritische Fehler. Interne Informationen gehören nicht in öffentliche Antworten.
- Eine persönliche, passende Note ist erwünscht, darf aber keine falsche Kulanz versprechen.

## Registrierung

Voraussetzungen:

1. Das Mitglied ist mindestens 18 Jahre alt.
2. Die E-Mail-Adresse ist noch keinem anderen Benutzerkonto zugeordnet. Pro E-Mail-Adresse ist nur ein Konto möglich.
3. Es besteht kein bereits blockiertes, banished Konto.

Registrierung: `Anmelden` > `Registrieren`, E-Mail-Adresse und Passwort eingeben, Konto erstellen. AGB und Datenschutzerklärung werden beim Erstellen akzeptiert. Für ein gewerbliches Konto den vorgesehenen Link verwenden.

## Willkommens-E-Mail

- Direkt nach der Registrierung wird eine Willkommens-E-Mail an die eingetragene Adresse gesendet.
- Die E-Mail-Adresse muss innerhalb von 24 Stunden bestätigt werden. Danach ist kein Login mehr möglich.
- Nach der Bestätigung wird das Mitglied aufgefordert, sich erneut anzumelden und das Profil zu vervollständigen.
- Bis zur Vervollständigung ist die Rolle `saver`; Merkliste ist möglich, Kaufen und Verkaufen noch nicht.
- Wenn die E-Mail fehlt, der Link nicht funktioniert oder abgelaufen ist, mit E-Mail-Adresse und Passwort anmelden. Auf der Login-Seite kann eine neue Willkommens-E-Mail angefordert werden.

## Profil vervollständigen

- Für Kaufen und Verkaufen muss das Profil vervollständigt werden.
- Die Adresse muss postkonform hinterlegt sein, sonst können Versandetiketten nicht korrekt erstellt werden.
- Nach den Profildaten folgt die Verifizierung der Handynummer.

## Identitäts- und Telefonnummernverifizierung

- Schweizer Mitglieder können für den Verkauf entweder die Ausweisverifizierung oder den Aktivierungscode verwenden.
- Die Ausweisverifizierung ist nur mit Wohnadresse in der Schweiz möglich.
- Nach erfolgreicher Verifizierung wechselt die Rolle von `Buyer` zu `Seller` und der Verkauf wird freigeschaltet.
- Handynummer und Ausweis müssen beim Mitglied vorhanden sein. Die Bestätigung erscheint direkt im Bildschirm und zusätzlich per E-Mail.
- Eine bereits verifizierte Handynummer kann nicht in einem anderen Benutzerkonto erneut verifiziert werden.

## Aktivierungscode

- Der Aktivierungscode prüft die Wohnadresse und wird per A-Post versendet.
- Schweizer Mitglieder können Ausweis oder Aktivierungscode wählen.
- Mitglieder mit ausländischem Wohnsitz können grundsätzlich nicht verkaufen. Sie benötigen den Aktivierungscode zwingend, um als Käufer aktiv zu sein und Fragen an Verkäufer zu stellen.
- Mitglieder aus Liechtenstein können nach Eingabe des Aktivierungscodes auch verkaufen.
- Gewerbliche Mitglieder mit ausländischem Wohnsitz benötigen den Aktivierungscode, um sich überhaupt als Verkäufer zu bewerben.
- Eingabe im Benutzerkonto unter `Benutzerkonto` > Aktivierungscode.

## 2FA

- Methoden: Authenticator-App, zum Beispiel Google Authenticator, Microsoft Authenticator, Authy oder Auth0 Guardian, sowie Push-Benachrichtigung über die Ricardo-App.
- 2FA wird nicht bei jedem Login abgefragt, sondern nur bei ungewöhnlichem oder verdächtigem Anmeldeverhalten. Sicherheitskriterien nicht offenlegen.
- Aktivierung unter `Benutzerangaben` > `2FA aktivieren`, QR-Code scannen oder Sicherheitsschlüssel manuell eingeben und Code bestätigen.
- Deaktivierung: Schalter betätigen und `Ja, Deaktivieren` bestätigen.
- Admin-Reset nur nach Identitäts- und Sicherheitsprüfung im vorgesehenen internen Prozess.

## Umsetzung in Zendesk

Bei jedem Easy-Fall zuerst Ticketformular, Status, Rolle, Sprache und vorhandene Anhänge prüfen. Danach passendes Makro und dynamischen Inhalt wählen, den Text vollständig lesen und individualisieren. Bei internen Aktionen die Aktion ausführen, intern dokumentieren und erst danach die Mitgliederantwort senden.
