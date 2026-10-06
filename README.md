# EAN Skeneris

EAN Skeneris ir mobilā svītrkodu skenera tīmekļa lietotne (PWA). Tā darbojas pārlūkā un var tikt instalēta tālrunī. Android APK izveidei repozitorijā ir GitHub Actions darbplūsma.

## Projekta statuss

- Publiskā lietotne ir skeneris (`index.html`) kopā ar manifestu, servisa darbinieku un ikonām.
- Admin panelis (`admin.html`) pašlaik paredzēts tikai lokālai testēšanai. Tas netiek publicēts GitHub Pages vietnē un ir izslēgts no turpmākajiem Git papildinājumiem ar `.gitignore`.
- Admin panelis glabā profilus un iestatījumus pārlūka lokālajā krātuvē. Tie ir pieejami tikai tajā pašā pārlūkā un ierīcē.

> **Svarīgi:** repozitorijs ir publisks, un agrāk publicēta `admin.html` versija joprojām var būt apskatāma Git vēsturē. Faila izņemšana no pašreizējās vietnes neizdzēš tā iepriekšējos GitHub ierakstus. Panelī nav jāglabā paroles, API atslēgas vai cita slepena informācija.

## Darbinieka lietotnes lietošana

1. Atver publisko EAN Skeneris vietni HTTPS adresē un, ja vēlies, instalē to tālrunī.
2. Sāc darbinieka sesiju un izvēlies vajadzīgo skenēšanas režīmu.
3. Lai pārietu uz citu veikalu, nospied **Mainīt veikalu** un noskenē šī veikala QR kodu, kas izveidots admin panelī.
4. Ja ierīcei konkrētajā veikalā nepieciešams apstiprinājums, autorizē to admin panelī.
5. Kameru vari ieslēgt vai izslēgt, kā arī pārslēgties starp pieejamajiem objektīviem ar pogām augšējā joslā; objektīva pārslēgšanas poga ir neaktīva, ja ierīcei pieejama tikai viena kamera. Zibspuldze ir pieejama turpat, bet kameras nosaukumu vari apskatīt iestatījumos.
6. Pogas **+1 iesl. / +1 izsl.** pārslēdz ātro režīmu: ieslēdzot skenējums uzreiz pieskaita vienu vienību; izslēdzot pēc skenēšanas vari norādīt daudzumu.

QR kodā ir veikala ID un attēlojamais nosaukums. Šī informācija nav šifrēta un nav piekļuves parole.

## Lokāla palaišana un admin paneļa testēšana

Nepieciešams Python 3. Projekta tīmekļa daļai nav vajadzīgs kompilācijas solis vai `npm install`.

PowerShell logā no projekta mapes palaid lokālu HTTP serveri:

```powershell
python -m http.server 8000
```

Pārlūkā atver:

- Skeneri: <http://localhost:8000/>
- Lokālo admin paneli: <http://localhost:8000/admin.html>

Kamerai un servisa darbiniekam vajadzīgs drošs konteksts — publiskajā vidē HTTPS, lokālā testēšanā `localhost`. Admin panelis ir ignorēts ar Git, tāpēc pēc jauna klonējuma tā lokālais `admin.html` fails nebūs pieejams automātiski; tas jāpievieno lokāli atsevišķi.

## PWA instalēšana

- Android ierīcē atver vietni pārlūkā Chrome un pārlūka izvēlnē izvēlies **Install app**. Ja šī izvēle nav pieejama, izmanto **Add to Home screen**.
- iPhone/iPad ierīcē atver vietni Safari un izvēlies **Share → Add to Home Screen**.
- Pēc lietotnes atjaunināšanas atver to tiešsaistē vai pārlādē lapu, lai pārlūks saņemtu jauno versiju.

Servisa darbinieks kešo lietotnes sākuma lapu un var to atgriezt bezsaistē. Tas nenozīmē, ka visas funkcijas ir pieejamas bez interneta: katalogs, ārējās bibliotēkas un sinhronizācija var būt atkarīga no tīkla. Skenējumi un neizsūtītās darbības tiek glabātas ierīcē, līdz tās var sinhronizēt.

## Admin paneļa veikalu profili

Šī sadaļa attiecas uz lokāli testējamo `admin.html` versiju, nevis publisko skenera vietni.

1. Izvēlies profilu vai izveido jaunu veikalu. Veikalu nosaukumi var atkārtoties, jo katram profilam ir savs nemainīgs ID.
2. Pārdēvēšana nemaina veikala ID. Admin panelī redzamais veikala QR kods satur ID un nosaukumu.
3. Profila dzēšana to arhivē, nevis neatgriezeniski izdzēš. Arhivētu profilu var atjaunot ar to pašu ID.
4. Pārslēdzoties starp profiliem, paneļa dati un saziņas kanāls tiek atlasīti attiecīgajam veikalam.

Profilu un iestatījumu glabāšana ir lokāla pārlūka `localStorage`; skenējumu dati tiek glabāti pārlūka `IndexedDB`. Šie dati netiek automātiski dublēti vai pārvietoti uz citu datoru. Pārlūka datu tīrīšana var tos neatgriezeniski izdzēst.

Kad admin panelī atkārtoti ielādē un izsūta pilnu `DataToScaner.txt` katalogu, tālrunis to saņem pa apstiprinātām 200 preču daļām un aizvieto iepriekšējo katalogu tikai pēc visu daļu saņemšanas. Lokālais admin sūta līdz četrām daļām paralēli, gaidot katras saņēmēja apstiprinājumu; tas samazina gaidīšanu starp simtiem mazu daļu, nemainot to izmēru vai atkārtotas nosūtīšanas drošības mehānismu. Nepilnas pārraides vai nederīga/tukša faila gadījumā iepriekšējais katalogs paliek. Skenerī redzams admin paneļa nosūtītais `DataToScaner.txt` faila datums un jauno, mainīto un noņemto preču skaits. Lokālais admin panelis automātiski nosūta pilnu katalogu ierīcei tās pirmajā autorizācijas pieprasījumā; ja katalogs vēl nav ielādēts, pieprasījums tiek gaidīts līdz faila ielādei.

## Datu un drošības ierobežojumi

- Saziņai tiek izmantoti publiski MQTT brokeri. Veikala ID nodala tēmas, taču tas nav noslēpums un pats par sevi nenodrošina piekļuves kontroli vai šifrēšanu.
- QR kods nav šifrēts. Neizmanto to paroļu vai citu slepenu datu pārsūtīšanai.
- Ierīču apstiprināšana lietotnē nav pielīdzināma servera autentifikācijai. Neievieto sistēmā datus, kam nepieciešama garantēta konfidencialitāte.
- Admin paneļa lokālie dati ir piesaistīti pārlūka profilam un origin. Piekļuvei no cita datora vai pārlūka tie automātiski nepārceļas.

## Android APK izveide

`.github/workflows/build-apk.yml` sagatavo tīmekļa resursus, izveido Android projektu un būvē debug APK. Darbplūsmu var palaist manuāli GitHub Actions sadaļā (**workflow_dispatch**) vai ar izmaiņu publicēšanu `main`/`master` zarā. Gatavais APK tiek pievienots darbplūsmas palaidiena artefaktiem 14 dienas.

Admin panelis APK būvēšanas darbplūsmā nav iekļauts.

## Galvenie faili

| Fails | Nozīme |
| --- | --- |
| `index.html` | Skenera lietotne un tās lietotāja saskarne |
| `manifest.json` | PWA nosaukums, sākuma adrese un instalēšanas ikonas |
| `sw.js` | PWA kešošana un bezsaistes sākuma lapas atgriešana |
| `icons/` | PWA un iOS ikonas |
| `admin.html` | Lokāli testējamais admin panelis; netiek publicēts |
| `.github/workflows/build-apk.yml` | Android debug APK izveides darbplūsma |
| `CHANGELOG.md` | Lietotājam nozīmīgo izmaiņu vēsture |

## Versijas un izmaiņu žurnāls

`CHANGELOG.md` uztur īsu, hronoloģisku lietotājam redzamo izmaiņu sarakstu. Nepublicētas izmaiņas liek sadaļā **Unreleased**; laidiena sadaļai piešķir versiju un datumu tikai tad, kad versija tiešām ir publicēta.

HTML lapu virsrakstos ir `V2.29`, bet `package.json` norāda `1.0.0`; projektā vēl nav viena automatizēta versijas avota. Tādēļ šie skaitļi nav uzskatāmi par savstarpēji saskaņotu laidiena versiju.
