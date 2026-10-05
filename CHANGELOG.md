# EAN Studio — Izmaiņu žurnāls (Changelog)

Visas nozīmīgās projekta "EAN Studio" izmaiņas un labojumi tiek fiksēti šajā dokumentā.

---

## [2.23] — 2026-10-06

### Funkcionālie un vizuālie jauninājumi (EAN Studio Suite)

#### 1. Mobilais skeneris (`index.html`)
- **Ātrais / Nepārtrauktais skenēšanas režīms (*Rapid +1*)**:
  - Ieviests pārslēgšanas taustiņš `⚡ Ātrais +1 / Standarta` galvenajā rīkjoslā.
  - Inventūras režīmā iespējots nepārtraukts skenēšanas cikls bez daudzuma loga atvēršanās — katrs pīkstiens automātiski reģistrē `+1 gab.`, sinhronizē datus un ļauj uzreiz skenēt nākamo vienību.
- **Režīmu krāsu kodēšana un vizuālais skenēšanas zibsnis (*Scan Flash*)**:
  - Katram režīmam piešķirta dinamiska vizuālā identitāte:
    - *Inventūra*: Smaragda zaļš (`emerald`)
    - *Cenu zīmes*: Indigo zils (`indigo`)
    - *Pārcenošana*: Dzintara oranžs (`amber`)
    - *Cenu pārbaude*: Debess zils (`sky`)
  - Kameras rāmis, mērķēšanas stūrīši, lāzera stars un paziņojumu lodziņi automātiski pielāgojas aktīvā režīma krāsai.
  - Skenēšanas fiksācijas brīdī kameras rāmis rada spilgtu impulsa zibsni (`scan-flash` animācija).
- **Svītrkodu ģenerators un skatītājs katalogā**:
  - Meklējot preci bāzē, pievienota poga `||||`, kas atver skaidri renderētu vektora svītrkodu (EAN-13 / Code39 SVG formātā bez ārējām bibliotēkām) ērtai nolasīšanai no cita ekrāna.
- **Ierīces akumulatora diagnostika**:
  - Ar Battery Status API palīdzību telefona akumulatora uzlādes līmenis automātiski tiek nosūtīts administratora panelim sirdspukstu (*ping*) un autorizācijas ziņojumos.

#### 2. Vadības panelis (`admin.html`)
- **Inventūras progresa josla (Progress Bar)**:
  - KPI rādītāju blokā pievienots vizuāls progress: cik procenti un skaits no ielādētās preču bāzes sortimenta jau ir inventarizēts.
- **Tabulas kompaktuma pārslēgs (*Density toggle*)**:
  - Poga `Kompakts / Normāls` ļauj samazināt tabulas rindu augstumu un teksta izmēru, nodrošinot ievērojami labāku pārskatāmību uz klēpjdatoriem un lielos datu apjomos.
- **Automātiska dublikātu apvienošana (*Merge duplicates*)**:
  - Poga apakšējā joslā `🔗 Apvienot dublikātus` ar 1 klikšķi konsolidē vairākus atsevišķus viena un tā paša EAN koda skenējumus vienā ierakstā ar summētu daudzumu un apvienotu darbinieku/ierīču sarakstu.
- **Starpību un iztrūkumu audits (*Variance & Stock check*)**:
  - Atbalstīta 4. kolonna preču katalogā (`atlikums`). Tabulā blakus saskaitītajam daudzumam tiek parādīts bāzes atlikums un starpība (zaļš pārpalikums / sarkans iztrūkums).
  - Filtros pievienota opcija `📊 Ar starpībām / iztrūkumu`.
- **Cenu zīmju tiešā druka uz A4 lapas**:
  - Cilnē "Cenu zīmes" poga `🖨️ Drukāt cenu zīmes` sagatavo profesionālas veikala plauktu cenu zīmes (preces nosaukums, lielā cena, vektora svītrkods, EAN un datums) un atver pārlūka drukas logu.
- **Fona automātiskā rezerves kopēšana (*Auto-save interval*)**:
  - Automātisks fona taimeris ik pēc 2 minūtēm klusi saglabā inventūras stāvokli gan lokālajā atmiņā, gan `session_backup.json` failā ar laika zīmogu apakšējā joslā.
- **Skeneru akumulatora uzraudzība**:
  - Ierīču pārvaldniekā un darbinieku kartītēs tiek attēlots katra pievienotā tālruņa baterijas līmenis (piem., `🔋 85%`).

---


## [2.22] — 2026-10-06

### Labojumi un vizuālie uzlabojumi (admin.html)
- **Atjaunots un uzlabots hover efekts tabulas rindām**:
  - Pievienota globāla CSS `#scansTableBody tr:hover` un `#scansTableBody tr` pāreja ar elegantu smaragda akcentu (`rgba(16, 185, 129, 0.12)` tumšajā tēmā, `rgba(16, 185, 129, 0.06)` gaišajā tēmā).
  - Novērsta iepriekšējā problēma, kur `dark:hover:bg-white/[0.03]` bija pārāk blāva (3% caurspīdība uz tumša fona) un radīja iespaidu par pazudušu hover efektu.
- **Filtru un izvēļņu trigger pogas**:
  - Pogām "Visi darbinieki", "Visi statusi" un "Kārtot: Secīgi" pievienoti fona un apmales hover efekti (`hover:bg-slate-100`, `dark:hover:bg-white/[0.08]`, `hover:border-slate-400`, `dark:hover:border-white/20`).
  - Analoģiski hover efekti pievienoti eksporta konfiguratora nolaižamo sarakstu pogām.
- **Cilņu (Tabs) pārslēgšanas pogas**:
  - Neaktīvajām cilnēm ("Cenu zīmes", "Pārcenošana") pievienota fona reakcija peles uzvednes brīdī gan statiskajā HTML marķējumā, gan dinamiskajā JavaScript pārslēgšanā (`switchAdminTab`).
- **Apakšējās rīkjoslas darbību pogas**:
  - Pogām "Iztīrīt inventūru", "Eksporta iestatījumi", "1C Fails (.txt)" un "Saglabāt arhīvā" iestatīti tumšajai tēmai atbilstoši hover foni un apmales, novēršot gaišo krāsu lēcienus tumšajā režīmā.
- **Modālo logu un interaktīvo elementu stili**:
  - Pievienoti un noslīpēti hover stāvokļi apstiprinājumu dialogam ("Atcelt", "Jā, mainīt"), arhīva logam ("+ Saglabāt pašreizējo", "🔄 Pārlādēt") un fotoattēlu sīktēliem.
