# Firebase: installation och löpande administration

Projekt: `bowling-kristianstad`. Funktionerna använder Firestore Standard och Firebase Authentication (e-post/lösenord). Ingen Cloud Function, Storage-bucket eller privat service account-nyckel behövs.

## Engångsinstallation

1. Öppna [Firebase Console](https://console.firebase.google.com/project/bowling-kristianstad/overview) med företagets projektägarkonto.
2. Under Project settings → General, registrera eller välj en webbapp. Kopiera dess konfiguration till `.env.local` enligt `.env.example`. Fyll i API key, auth domain, project ID och app ID. Lägg samma variabler hos webbplatsens hostingtjänst. Dessa webbappsvärden är offentliga identifierare; behörigheter skyddas av Firestore-reglerna. Lägg aldrig privata nycklar i `NEXT_PUBLIC_*`.
3. Skapa en Firestore-databas med ID `(default)`, Standard edition, i en lämplig europeisk region. Välj production mode.
4. Publicera innehållet i `firestore.rules` under Firestore → Rules. Alternativt med Firebase CLI: `firebase deploy --only firestore:rules --project bowling-kristianstad`. Kontrollera först om projektet redan har andra appar och regler: den här filen nekar all åtkomst utom de dokument som används av sidan och måste i så fall slås ihop med de befintliga reglerna.
5. Under Authentication → Sign-in method, aktivera Email/Password. Lägg webbplatsens domän och vid lokal utveckling `localhost` under Authorized domains.
6. Under Authentication → Users, skapa personalens konto. Kopiera användarens UID.
7. Under Firestore → Data, skapa samlingen `admins` och ett dokument vars ID är exakt användarens UID. Lägg exempelvis till fältet `label` med personalens namn. Dokumentets existens ger behörighet. Inget lösenord ska sparas här. Bara projektägare ska kunna skapa dessa dokument via konsolen.
8. Kör `npm run dev` och öppna `/admin`. Logga in. En tom databas visar tidigare priser, menyer och föreslagna stängda dagar. Kontrollera särskilt sommaruppehållet och helgdagarna. Klicka **Publicera startinnehåll**. Detta skriver dokumentet `site/content`.
9. Kontrollera öppettider, bowlingpriser, eventmenyer och kalaskalkylatorn på publika sidan. Gör en mindre ändring, spara och kontrollera efter cirka 1–2 minuter. Publicera webbplatskoden med miljövariablerna när detta fungerar.

Koden behöver publiceras en gång för den här funktionen. Därefter kräver innehållsändringar ingen ny deploy. Byten av Firebase-projekt eller `NEXT_PUBLIC_*`-konfiguration kräver däremot nytt bygge.

## Så används adminsidan

- Öppettider och datum tolkas i `Europe/Stockholm`.
- Ordinarie tider anges måndag–söndag. Stängning ska vara efter öppning samma dag.
- Undantag har start- och slutdatum, inklusive båda dagarna. Samma datum i båda fälten gäller en enda dag.
- Ett enskilt datum går före en period. Två perioder får inte överlappa. Exempel: juli stängt, men 14 juli öppet 14–17.
- Datum upprepas **inte** nästa år. Startförslaget innehåller innevarande och nästa år, men måste granskas. Lägg in kommande års helgdagar i god tid och rensa gamla undantag.
- Menyer och priser har svenska och engelska texter, med ett gemensamt numeriskt pris. Eventmenyer kan ha separat barnpris/åldersgräns eller ”Ring för pris”.
- Kalastillval räknas per barn eller en gång per kalas. Kalkylatorn använder samma priser som menyn.
- Alla ändringar sparas tillsammans. Versionskontroll hindrar att en annan administratörs senare ändringar skrivs över. Vid konflikt, kopiera dina ändringar innan omladdning.
- Personalkonton skapas och lösenord återställs i Firebase Console. Ta bort ett `admins/{uid}`-dokument för att återkalla redigeringsbehörigheten.

## Data, cache och drift

`site/content` innehåller `payload` (JSON med versionsmärkt innehåll), `revision` och `updatedAt`. JSON-fältet gör att hela den lilla innehållsmängden kan hämtas med en dokumentläsning och sparas atomiskt. Redigera genom `/admin`, inte genom att ändra JSON-strängen manuellt.

Publika sidan läser dokumentet via Firestores REST API och de publicerade läsreglerna, utan administratörsnyckel. Next.js cachar läsningen i 60 sekunder. Synliga webbläsarflikar uppdaterar var 60:e sekund. Det kan därför ta omkring 1–2 minuter innan en sparning syns; infrastruktur och nätfel kan påverka tiden. Serverrenderade öppettider till sökmotorer kommer från samma innehåll.

Utan Project ID används lokalt startinnehåll för utveckling. När ett projekt är konfigurerat visar saknad/ogiltig data eller ett läsfel kontaktinformation i stället för att tyst återgå till gamla priser. Next.js kan fortsätta servera sin senaste lyckade cache vid ett tillfälligt fel i bakgrundsuppdateringen.

Säkerhetsreglerna ger publik `get` på endast `site/content`; en inloggad användare behöver dessutom ett `admins/{uid}`-dokument för skrivning. Vanliga användare kan inte ge sig själva behörighet. Reglerna kontrollerar dokumentets fält, storlek, revision och servertid. Innehållets schema valideras vid läsning och i adminformuläret. En behörig administratör betraktas som betrodd och kan annars skriva en felaktig JSON-payload via API; den publika sidan avvisar den.

Följ Firestore Usage i konsolen. Gratisutrymmet delas med annan användning i projektet. Cache minskar vanliga läsningar men ersätter inte kvoter eller skydd mot avsiktligt missbruk av den publika läsåtkomsten.

Ta en kopia av `site/content` före större ändringar. Automatisk backup och återställningshistorik ingår inte i denna implementation.

## Verifiering

- Node.js 22.18+ (eller senare kompatibel LTS) för `npm test`.
- `npm test`: datumundantag, sommarstängt, svensk tidszon/årsskifte, prisvalidering och kalkylator.
- `npm run lint`, `npx tsc --noEmit`, `npm run build`.
- Kontrollera i det riktiga projektet att anonym skrivning nekas, en vanlig inloggad användare nekas och en administratör kan spara. Kontrollera även att en användare inte kan skapa sitt eget `admins`-dokument.
- Testa i två inloggade fönster att den andra sparningen nekas vid en versionskonflikt.

Officiell dokumentation: [Firebase Auth](https://firebase.google.com/docs/auth/web/password-auth), [Firestore-regler](https://firebase.google.com/docs/firestore/security/rules-conditions).

## Automatisk utloggning

Adminvyn loggar ut efter 15 minuters inaktivitet och visar en varning under sista minuten. Tangenttryck, klick, pekskärmskontakt och skrollning räknas som aktivitet. En vilande eller dold flik kontrollerar den passerade tiden vid återkomst innan någon aktivitet kan förlänga den. Omladdning återställer inte tidsgränsen. Osparade ändringar publiceras inte och rensas vid utloggning.

En session får även vara högst en timme från Firebase-tokenens signerade `auth_time`. Tokenförnyelse förlänger inte denna gräns. `firestore.rules` nekar skrivningar från äldre inloggningar även om klientens utloggning kringgås. **Publicera den uppdaterade regelfilen i Firebase Console för att aktivera denna serverspärr.** Inaktivitetsgränsen på 15 minuter är ett skydd i webbläsaren; den återkallar inte redan utfärdade token hos Firebase. Den ska inte beskrivas som serverbaserad tokenåterkallelse.
