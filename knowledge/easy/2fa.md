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
