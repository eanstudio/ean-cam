# EAN Studio — Izstrādes instrukcijas un sistēmas arhitektūra

Šis dokuments nosaka projekta arhitektūru, datu plūsmu un izstrādes noteikumus GitHub Copilot un AI aģentiem.

## 1. Projekta loma un tehnoloģijas
- **Mērķis:** Mazumtirdzniecības svītrkodu skenēšanas, inventūras, pārcenošanas un cenu zīmju sagatavošanas sistēma.
- **Tehnoloģiskais steks:** Vanilla HTML5, moderns ES6+ JavaScript, Tailwind CSS (CDN), IndexedDB, File System Access API, SheetJS (XLSX), QRCode.js.
- **Sakari bez centrālā servera:**
  - Hibrīdais MQTT WebSocket savienojums ar vairākiem publiskiem brokeriem (HiveMQ, EMQX, Eclipse projects).
  - WebRTC Peer-to-Peer lokālā tīkla līnija (PeerJS), kur PC panelis ir `host`, bet mobilie skeneri ir `guest`.

## 2. Galvenie komponenti
1. **`index.html` (Mobilais terminālis / PWA):**
   - Darbojas tiešsaistē (GitHub Pages) darbinieku viedtālruņos.
   - Nodrošina ātru skenēšanu ar kameru (Html5Qrcode), bezsaistes rindu IndexedDB (`EanScannerDB_v11`) un tūlītēju sinhronizāciju.
   - Režīmi: `inventory` (ar parasto un ātro +1 opciju), `labels` (daudzums fiksēts 1), `repricing` (cenas ievade, daudzums fiksēts 1) un `pricecheck` (viesa režīms bez datu ierakstīšanas).
2. **Admin panelis (PC vadības pults):**
   - **Dzīvo atsevišķā privātā repozitorijā** `D:\Projekti\EAN Studio\ean-cam-admin` (GitHub: `eanstudio/ean-cam-admin`), sadalīts failos (`admin.html`, `admin.css`, `admin.js`, `admin-*.js`). Pilnu aprakstu skatīt tur: `ean-cam-admin\.github\copilot-instructions.md`.
   - Vecā `ean-cam\admin.html` kopija ir dzēsta; ja tāda atkal parādās, to nelabo un nepublicē, bet strādā tikai `ean-cam-admin`.
   - Šajā repozitorijā nekad nedrīkst parādīties admin pirmkods; `.gitignore` ietver `admin.html`, `admin.css`, `admin.js`, `admin-*.js`.

## 2.1. Darbvieta
- Abi repozitoriji atveras kopā ar `D:\Projekti\EAN Studio\EAN Studio.code-workspace` (`ean-cam` — publiskais PWA, `ean-cam-admin` — privātais panelis). Katram ir sava Git vēsture.
- Skenera (`index.html`) un admin protokola izmaiņas jāskata kopā: MQTT tēmas un ziņu formāti ir kopīgs līgums (`auth_req`, `auth/<deviceId>`, `catalog/<deviceId>`, `catalog_ack`, `price_update`).
- Kataloga pārraide: admin sagatavo daļas (gzip+base64 laukā `gz`, vai nesaspiests `items`), tālrunis apstiprina katru daļu ar `catalog_ack`. Skeneris autorizācijas pieprasījumā norāda `catalogGz` un `catalogModifiedAt`.
- Izlaišanas secība, ja mainās protokols: vispirms publicē skeneri (`ean-cam`), tad lieto jauno admin versiju.

## 3. Stingrie drošības un koda integritātes noteikumi
- **Admin privātums:** admin faili (`admin.html`, `admin.css`, `admin.js`, `admin-*.js`) nekad nedrīkst tikt publiskoti repozitorijā `ean-cam` vai izņemti no `.gitignore`.
- **Aizsardzība pret koda degradāciju:** Nekad nedrīkst izdzēst vai vienkāršot šādus aizsargmehānismus:
  - Duālo datu kešatmiņu (`localStorage` + `IndexedDB`).
  - Hibrīdo MQTT/WebRTC duplikātu filtru (`mqttIsDuplicate`).
  - 24 stundu ierīču autorizācijas un bloķēšanas loģiku.
  - Pārcenošanas un cenu zīmju režīmu daudzuma bloķēšanu uz `1`.
  - Kodējuma `windows-1257` apstrādi failam `DataToScaner.txt`.
- **PWA un ceļu savietojamība:** Mobilajā skenerī visiem ceļiem uz ikonām, skriptiem un manifestu jābūt relatīviem (`./`), lai saglabātu saderību ar GitHub Pages apakšmapēm.
- **Versiju fiksēšana:** skenerim (`index.html` virsraksts, `APP_UPDATE_VERSION`, `appUpdateSummary`, `sw.js` `CACHE_NAME`) un publiskajam `CHANGELOG.md` šajā repo; adminam atsevišķi savā repo (`admin.html`, `CHANGELOG.md`, `VERSIONS.md`, git tags `admin-vX.YY`). Abu versiju numerācija ir neatkarīga.
- **Git:** commit ziņas latviski, ar trailer `Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>`. Abos repo lokāli uzstādīts autors `Jānis Lubiņš <256196125+lubinsh@users.noreply.github.com>` (GitHub noreply); darba e-pasts (`@aibe.lv`) nekad nedrīkst parādīties commitos vai failos. Pirms commit pārbaudi `git config user.email`; nekad neizdomā e-pastu. Neiekļauj commitā failus, ko lietotājs nav lūdzis.
## 4. Autonomā izpilde un pašpārbaudes cikls (Iterative Problem Solving)

Kad tiek dots uzdevums novērst kļūdu vai ieviest jaunu funkciju:
1. **Pilna atbildība par rezultātu:**
   - Nekad neapstājies pusceļā ar paziņojumu "pārējo pabeidz pats" vai nepabeigtiem koda fragmentiem (`// TODO`, `/* loģika šeit */`).
   - Visas koda izmaiņas veic pilnībā un līdz galam visos saistītajos failos.

2. **Cikls līdz rezultāta sasniegšanai (Loop until resolved):**
   - **Diagnoze:** Vispirms izlasi un saproti saistīto koda kontekstu.
   - **Izpilde:** Veic nepieciešamās izmaiņas.
   - **Pārbaude (Verification):** Patstāvīgi pārbaudi savu risinājumu:
     - Vai sintakse ir pareiza un nav sintakses/tipu kļūdu?
     - Vai nav salauztas blakus funkcijas vai mainīgo nosaukumi?
     - Vai visi HTML ID un klases atbilst JavaScript selektoriem?
     - Ja pieejams terminālis, palaid pārbaudes vai Git statusa komandu, lai apstiprinātu izmaiņu tīrību.
   - **Paškorekcija:** Ja pamani loģikas trūkumu, konfliktu vai sintakses kļūdu, nekavējoties pats to izlabo tajā pašā uzdevuma ciklā pirms atbildes nosūtīšanas.

3. **Gatavības kritērijs (Definition of Done):**
   - Uzdevums tiek uzskatīts par pabeigtu TIKAI tad, kad kods ir pilnībā uzrakstīts, saglabāts failā, atbilst projekta aizsargmehānismiem un ir gatavs tūlītējai testēšanai bez manuālas koda pielāgošanas.