# EAN Studio — Izmaiņu žurnāls (Changelog)

Visas nozīmīgās projekta "EAN Studio" izmaiņas un labojumi tiek fiksēti šajā dokumentā.

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
