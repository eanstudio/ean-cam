# Izmaiņu žurnāls

Šeit hronoloģiski fiksē lietotājam nozīmīgas izmaiņas. Jaunākās izmaiņas ir augšā. **Unreleased** sadaļā ir tikai vēl nepublicētas izmaiņas. Publicētu izmaiņu sadaļām piešķir laidiena versiju un datumu, kad ir saskaņota un atjaunināta lietotnes versija.

## [Unreleased]

### Mainīts

- Preču bāzes izsūtīšana vairākiem tālruņiem optimizēta: katalogs tiek sagatavots un saspiests (gzip) vienu reizi, daļas ir lielākas, vienlaikus tiek apkalpoti ne vairāk kā 2 tālruņi, un tālrunis ar jau aktuālu bāzi to automātiski nesaņem atkārtoti. Vecākas lietotnes versijas turpina saņemt nesaspiestu bāzi.
- Skeneris V2.32 (nepieciešams kopā ar admin V2.35), atjaunināta PWA kešatmiņas versija.
- Skenera galvenais ekrāns ir fiksēts tālruņa redzamajā augstumā; ritinās tikai skenēto preču saraksts.
- Sarakstā katrā režīmā saglabā un rāda pēdējās 50 preces. Inventūras rindai pieskaroties, daudzumu var labot uzreiz, un korekcija tiek sinhronizēta ar admin paneli.
- Pievienota vecāku šī veikala inventūras skenējumu meklēšana pēc nosaukuma vai svītrkoda visā tālruņa lokālajā vēsturē, lai arī ārpus pēdējām 50 rindām varētu izlabot daudzumu bez admin paneļa.
- Cenu zīmju un pārcenošanas daudzums arī labošanas laikā paliek fiksēts uz 1.
- Atjaunināta PWA kešatmiņas versija.

### Lokāli testēts, nav publicēts

- Admin paneļa veikalu profilu pārslēgšana, izveide, pārdēvēšana un arhivēšana/atjaunošana.
- Admin paneļa rīkjoslas un preču bāzes statusa attēlojuma uzlabojumi.
- Veikala izveides dialogam pievienota atcelšana un aizvēršana ar Escape.
- Admin panelī kļūdas un brīdinājumi redzami atsevišķā, katram veikalam lokāli saglabātā paziņojumu cilnē; piekļuves pieprasījumi paliek redzami virs cilnēm.

## [2.30] — 2026-10-07

### Mainīts

- PWA atjauninājumam tiek piedāvāts īss laidiena apraksts ar izvēli atjaunināt tagad vai atlikt; lietotne nepārlādējas bez lietotāja apstiprinājuma.
- Atvērta un redzama lietotne pārbauda jaunu versiju aptuveni reizi minūtē un, atgriežoties priekšplānā, lai aktīva sesija varētu saņemt atjauninājuma piedāvājumu bez manuālas pārlādes.
- Pēc apstiprinātas atjaunināšanas lapa pārlādējas, bet atjauninājums nemaina lokāli saglabāto skenējumu rindu.
- Atjaunināta PWA kešatmiņas versija.

## [2.29] — 2026-10-06

### Mainīts

- Kameras objektīva pārslēgšanas poga atgriezta augšējā joslā; tā kļūst aktīva, ja ierīcei ir pieejamas vairākas kameras.
- Ātrā +1 režīma pogas tekstam rezervēts nemainīgs platums un noņemta nospiešanas mērogošanas animācija, lai pārslēgšana vizuāli neraustītos.
- Atjaunināta PWA kešatmiņas versija.

## [2.28] — 2026-10-06

### Mainīts

- Samazināta augšējās joslas pārblīvētība; kameras izvēle pieejama iestatījumos, un savienojuma statuss ir nolasāms arī tekstā.
- Izkārtojums pielāgots šauriem un ainavas ekrāniem; mazā augstumā lapa ritinās, nevis nogriež vadīklas un skenējumu sarakstu.
- Ātrās skenēšanas slēdzim ir saprotamāks nosaukums un ieslēgšanas stāvoklis; sinhronizācijas statusu un katra skenējuma nosūtīšanas stāvokli var izlasīt arī bez paļaušanās uz krāsu.
- Dialogiem pievienoti pieejami nosaukumi, tastatūras Escape aizvēršana, fokusa pārvaldība un lielāki aizvēršanas mērķi; kustību samazina sistēmas “reduced motion” iestatījums, un pārlūkā ir atļauta pietuvināšana.
- Atjaunināta PWA kešatmiņas versija.

## [2.27] — 2026-10-06

### Mainīts

- Kameras ieslēgšanas un izslēgšanas poga pārvietota uz augšējo vadības joslu un noformēta tāpat kā pārējās darbību pogas, lai neaizsegtu skenēšanas zonu.
- Atjaunināta PWA kešatmiņas versija, lai instalētā lietotne saņemtu jauno izkārtojumu.

## [2.26] — 2026-10-06

### Pievienots

- Skenerī pievienota manuāla kameras ieslēgšanas un izslēgšanas poga; izvēle tiek saglabāta šajā ierīcē.

### Mainīts

- Kataloga saņemšana apstrādā daļu skaitu, neatverot visu iepriekš saņemto daļu saturu katrā solī.
- Lokālais admin sūta līdz četrām kataloga daļām paralēli, joprojām gaidot katras daļas apstiprinājumu un saglabājot atkārtotus mēģinājumus.
- Iestatījumu loga vadīklas vizuāli saskaņotas ar pārējo lietotnes saskarni.
- Atjaunināta PWA kešatmiņas versija.

## [2.25] — 2026-10-06

### Pievienots

- Jaunai ierīcei, pirmo reizi pieprasot autorizāciju lokālajā admin panelī, automātiski tiek nosūtīts pilns preču katalogs. Ja katalogs vēl nav ielādēts, nosūtīšana gaida tā ielādi.
- Skenerī redzams admin paneļa nosūtītais `DataToScaner.txt` faila datums un saņemtā kataloga izmaiņu kopsavilkums.

### Mainīts

- Kataloga daļas tiek nosūtītas ar saņēmēja apstiprinājumu un atkārtoti mēģinājumi tiek veikti, ja apstiprinājums nepienāk. Tālrunis aizvieto katalogu tikai pēc pilnas, pārbaudītas pārraides.
- Skenera augšējā joslā pārkārtota darbinieka un veikala informācija un pārvietota veikala maiņas poga.
- Palielināti biežāk lietoto skenera vadības elementu skārienmērķi.
- Atjaunināta servisa darbinieka kešatmiņas versija, lai uzstādītās PWA varētu pārņemt jaunāko lietotnes sākuma lapu.

## [2.24] — 2026-10-06

### Pievienots

- Skenera lietotnē pievienota veikala maiņa, noskenējot admin panelī izveidotu veikala QR kodu.
- Skenējumi un bezsaistes nosūtīšanas darbības tiek piesaistītas veikala ID, lai tās netiktu nosūtītas citam veikalam pēc pārslēgšanas.

### Mainīts

- Admin panelis izņemts no pašreizējās GitHub Pages publikācijas. `admin.html` paliek lokālai testēšanai un ir izslēgts no turpmākiem Git papildinājumiem.

## [2.23] — 2026-10-06

### Pievienots

- Skenerim ātrais inventūras režīms, režīmu krāsu kodēšana, skenēšanas vizuālais signāls, svītrkodu skatītājs un akumulatora diagnostika.
- Admin panelim inventūras progresa josla, tabulas blīvuma pārslēgs, dublikātu apvienošana, atlikumu starpību audits, cenu zīmju druka un automātiska sesijas rezerves kopēšana.
- Admin panelim pievienots skeneru akumulatora līmeņa attēlojums.

## [2.22] — 2026-10-06

### Mainīts

- Uzlaboti tabulu rindu, filtru, cilņu, apakšējās rīkjoslas un modālo logu hover stāvokļi gaišajā un tumšajā tēmā.
