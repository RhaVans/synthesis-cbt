// Saintek Final Push — fill remaining gaps to reach 1000

appendQuestions('saintek_matipa', [
{question:"Himpunan penyelesaian $2^{x+1}=32$ adalah $x=...$",options: ["4","5","3","6","2"],answer:0,explanation:"$2^{x+1}=2^5 \\Rightarrow x+1=5 \\Rightarrow x=4$."},
{question:"Jika $f(x)=\\sqrt{x+4}$, domain $f$ adalah ...",options: ["$x \\geq -4$","$x \\geq 0$","$x > 4$","$x \\leq -4$","Semua $x$ riil"],answer:0,explanation:"$\\sqrt{x+4}$ terdefinisi jika $x+4 \\geq 0 \\Rightarrow x \\geq -4$."},
{question:"Hitung $C(8,3) = ...$",options: ["56","336","40320","24","8"],answer:0,explanation:"$C(8,3)=\\frac{8!}{3!5!}=\\frac{336}{6}=56$."},
{question:"$\\tan 45^\\circ = ...$",options: ["1","0","$\\sqrt{3}$","$\\frac{1}{\\sqrt{3}}$","$\\infty$"],answer:0,explanation:"$\\tan 45^\\circ = \\frac{\\sin 45^\\circ}{\\cos 45^\\circ} = \\frac{\\sqrt{2}/2}{\\sqrt{2}/2} = 1$."},
{question:"Persamaan garis yang melalui $(1,2)$ dan $(3,6)$ adalah ...",options: ["$y=2x$","$y=x+1$","$y=3x-1$","$y=x+2$","$y=2x+1$"],answer:0,explanation:"$m=\\frac{6-2}{3-1}=2$. $y-2=2(x-1) \\Rightarrow y=2x$."},
{question:"Volume kerucut dengan $r=3$ dan $t=4$ adalah ...",options: ["$12\\pi$","$36\\pi$","$9\\pi$","$16\\pi$","$48\\pi$"],answer:0,explanation:"$V=\\frac{1}{3}\\pi r^2 t = \\frac{1}{3}\\pi(9)(4)=12\\pi$."},
{question:"Luas permukaan bola dengan jari-jari 7 cm ...",options: ["$196\\pi$ cm^2","$\\frac{1372\\pi}{3}$ cm^2","$49\\pi$ cm^2","$343\\pi$ cm^2","$98\\pi$ cm^2"],answer:0,explanation:"$L=4\\pi r^2=4\\pi(49)=196\\pi$ cm^2."},
{question:"$\\log_{10} 1000 = ...$",options: ["3","10","100","30","2"],answer:0,explanation:"$10^3=1000$, jadi $\\log_{10}1000=3$."},
{question:"Matriks identitas $2\\times 2$ adalah ...",options: ["$\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}$","$\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}$","$\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$","$\\begin{pmatrix}2&0\\\\0&2\\end{pmatrix}$","$\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$"],answer:0,explanation:"Matriks identitas: diagonal utama = 1, elemen lain = 0."},
{question:"Fungsi komposisi $(f \\circ g)(x)$ jika $f(x)=2x+1$ dan $g(x)=x^2$ adalah ...",options: ["$2x^2+1$","$(2x+1)^2$","$2x^2$","$x^2+1$","$4x^2+1$"],answer:0,explanation:"$(f \\circ g)(x)=f(g(x))=f(x^2)=2x^2+1$."},
]);

appendQuestions('saintek_fisika', [
{question:"Resultan dua gaya 3N dan 4N yang saling tegak lurus = ...",options: ["5 N","7 N","1 N","12 N","3.5 N"],answer:0,explanation:"$R=\\sqrt{3^2+4^2}=\\sqrt{25}=5$ N (Pythagoras)."},
{question:"Jarak tempuh benda jatuh bebas selama 2 detik (g=10 m/s^2) = ...",options: ["20 m","10 m","40 m","5 m","30 m"],answer:0,explanation:"$s=\\frac{1}{2}gt^2=\\frac{1}{2}(10)(4)=20$ m."},
{question:"Impuls = ...",options: ["$F \\cdot \\Delta t$","$m \\cdot v$","$F / t$","$m \\cdot a$","$\\frac{1}{2}mv^2$"],answer:0,explanation:"Impuls $J = F \\cdot \\Delta t = \\Delta p$ (perubahan momentum)."},
{question:"Cermin cekung menghasilkan bayangan nyata jika benda berada ...",options: ["Di luar fokus","Di dalam fokus","Di titik fokus tepat","Sangat dekat cermin","Di belakang cermin"],answer:0,explanation:"Benda di luar fokus cermin cekung $\\to$ bayangan nyata, terbalik (di depan cermin)."},
{question:"Lensa cembung disebut juga lensa ...",options: ["Konvergen (mengumpulkan cahaya)","Divergen","Datar","Prisma","Silinder"],answer:0,explanation:"Lensa cembung/bikonveks: memfokuskan/mengumpulkan berkas cahaya $\\to$ konvergen."},
{question:"Besaran pokok SI untuk panjang adalah ...",options: ["Meter (m)","Kilometer","Centimeter","Inci","Yard"],answer:0,explanation:"Meter (m): satuan pokok SI untuk panjang/jarak."},
{question:"Dimensi kecepatan adalah ...",options: ["$[LT^{-1}]$","$[MLT^{-1}]$","$[ML^{-1}]$","$[T^{-1}]$","$[L^2T^{-1}]$"],answer:0,explanation:"Kecepatan = jarak/waktu = $[L]/[T] = [LT^{-1}]$."},
{question:"Hukum kekekalan momentum berlaku pada ...",options: ["Sistem tertutup (tanpa gaya luar)","Semua kondisi","Sistem terbuka","Hanya tumbukan elastis","Hanya benda diam"],answer:0,explanation:"Kekekalan momentum: $\\Sigma p_{awal} = \\Sigma p_{akhir}$ pada sistem tertutup."},
{question:"Gelombang stasioner terbentuk dari ...",options: ["Superposisi dua gelombang berjalan berlawanan arah","Satu gelombang saja","Tiga gelombang","Gelombang longitudinal saja","Gelombang transversal saja"],answer:0,explanation:"Gelombang stasioner: interferensi dua gelombang identik yang merambat berlawanan arah."},
{question:"Kapasitor yang disusun seri memiliki kapasitansi total ...",options: ["Lebih kecil dari kapasitor terkecil","Lebih besar dari semua","Sama dengan rata-rata","Sama dengan jumlah","Tidak berubah"],answer:0,explanation:"Seri: $\\frac{1}{C_t}=\\frac{1}{C_1}+\\frac{1}{C_2}+...$ \\to $C_t$ selalu lebih kecil dari C terkecil."},
]);

appendQuestions('saintek_kimia', [
{question:"Elektron valensi unsur Na (Z=11) berjumlah ...",options: ["1","2","3","8","11"],answer:0,explanation:"Na: 2, 8, 1. Elektron valensi (kulit terluar) = 1."},
{question:"Suatu reaksi dikatakan setimbang jika ...",options: ["Laju reaksi maju = laju reaksi balik","Reaktan habis","Produk habis","Tidak ada perubahan","Reaksi berhenti total"],answer:0,explanation:"Kesetimbangan dinamis: laju maju = laju balik. Konsentrasi reaktan dan produk konstan."},
{question:"Hukum Dalton tentang tekanan parsial menyatakan ...",options: ["Tekanan total campuran gas = jumlah tekanan parsial masing-masing gas","Tekanan selalu sama","Volume selalu tetap","Suhu tidak berpengaruh","Massa gas selalu sama"],answer:0,explanation:"Dalton: $P_{total} = P_1 + P_2 + P_3 + ...$"},
{question:"Konfigurasi elektron atom Fe (Z=26) adalah ...",options: ["[Ar] 3d^6 4s^2","[Ar] 3d^8","[Ar] 4s^2 4p^6","[Ne] 3s^2 3p^6","[Kr] 4d^6 5s^2"],answer:0,explanation:"Fe (26): [Ar] 3d^6 4s^2. Pengisian mengikuti aturan Aufbau."},
{question:"Perbedaan antara ikatan sigma ($\\sigma$) dan pi ($\\pi$) ...",options: ["Sigma: tumpang tindih frontal; pi: tumpang tindih lateral","Keduanya sama","Sigma lebih lemah","Pi selalu lebih kuat","Tidak ada perbedaan"],answer:0,explanation:"Ikatan $\\sigma$: overlap orbital head-to-head (frontal). Ikatan $\\pi$: overlap lateral (di atas/bawah bidang)."},
{question:"Konsentrasi molar (molaritas) didefinisikan sebagai ...",options: ["Mol zat terlarut per liter larutan","Gram zat terlarut per kg pelarut","Mol per kg pelarut","Gram per liter","Mol per mol"],answer:0,explanation:"Molaritas $M = \\frac{n}{V(L)}$ = jumlah mol zat terlarut per liter larutan."},
{question:"Persamaan gas ideal adalah ...",options: ["$PV = nRT$","$PV = nR$","$PT = nRV$","$P = nRT$","$V = nRP$"],answer:0,explanation:"$PV=nRT$ ($P$=tekanan, $V$=volume, $n$=mol, $R$=konstanta gas, $T$=suhu)."},
{question:"Reaksi netralisasi sempurna menghasilkan ...",options: ["Garam dan air","Asam saja","Basa saja","Gas saja","Logam saja"],answer:0,explanation:"Netralisasi: asam + basa \\to garam + air. $HCl + NaOH \\to NaCl + H_2O$."},
{question:"Destilasi adalah proses pemisahan berdasarkan ...",options: ["Perbedaan titik didih","Perbedaan kelarutan","Perbedaan ukuran partikel","Perbedaan warna","Perbedaan berat jenis"],answer:0,explanation:"Destilasi: memisahkan campuran berdasarkan perbedaan titik didih komponen-komponennya."},
{question:"Kromatografi memisahkan zat berdasarkan ...",options: ["Perbedaan afinitas terhadap fasa diam dan fasa gerak","Perbedaan titik didih","Perbedaan massa","Perbedaan warna saja","Perbedaan suhu"],answer:0,explanation:"Kromatografi: pemisahan berdasarkan perbedaan distribusi komponen antara dua fasa (diam & gerak)."},
]);

appendQuestions('saintek_biologi', [
{question:"Struktur DNA berupa ...",options: ["Double helix (pita ganda berpilin)","Single strand","Triple helix","Circular saja","Linear tanpa pilin"],answer:0,explanation:"DNA: double helix (Watson & Crick, 1953) — dua untai polinukleotida berpilin."},
{question:"Kodon adalah urutan ... basa pada mRNA yang menyandi satu asam amino.",options: ["3 (triplet)","2","4","1","5"],answer:0,explanation:"Kodon: 3 nukleotida berurutan pada mRNA yang menyandi 1 asam amino (triplet code)."},
{question:"Antikodon terdapat pada ...",options: ["tRNA","mRNA","rRNA","DNA","Protein"],answer:0,explanation:"Antikodon: 3 basa pada tRNA yang berpasangan dengan kodon di mRNA saat translasi."},
{question:"Kromosom manusia berjumlah ... pasang.",options: ["23 pasang (46 buah)","22 pasang","24 pasang","20 pasang","25 pasang"],answer:0,explanation:"Manusia: 23 pasang kromosom (22 autosom + 1 pasang kromosom seks = 46 total)."},
{question:"Fotosintesis reaksi terang terjadi di ...",options: ["Membran tilakoid (grana)","Stroma","Sitoplasma","Nukleus","Mitokondria"],answer:0,explanation:"Reaksi terang: di membran tilakoid, menghasilkan ATP dan NADPH."},
{question:"Siklus Calvin (reaksi gelap fotosintesis) terjadi di ...",options: ["Stroma kloroplas","Membran tilakoid","Sitoplasma","Nukleus","Ribosom"],answer:0,explanation:"Siklus Calvin: di stroma kloroplas, menggunakan ATP dan NADPH untuk fiksasi CO_2."},
{question:"Peristaltik adalah ...",options: ["Gerakan kontraksi otot saluran pencernaan","Gerakan jantung saja","Gerakan tulang","Gerakan sendi","Gerakan mata"],answer:0,explanation:"Peristaltik: kontraksi bergelombang otot polos saluran pencernaan yang mendorong makanan."},
{question:"Alveolus berfungsi untuk ...",options: ["Pertukaran gas O_2 dan CO_2 dengan kapiler darah","Menyaring udara","Menghangatkan udara","Melembabkan udara saja","Menghasilkan lendir"],answer:0,explanation:"Alveolus: kantong udara tipis di ujung bronkiolus — tempat difusi O_2 dan CO_2."},
{question:"Mekanisme kerja otot berdasarkan teori ...",options: ["Filamen geser (sliding filament theory)","Kontraksi seluler","Pembelahan sel","Osmosis","Difusi pasif"],answer:0,explanation:"Sliding filament: aktin bergeser di atas miosin $\\to$ sarkomer memendek $\\to$ otot berkontraksi."},
{question:"Tipe otot jantung bersifat ...",options: ["Lurik tapi involunter (tidak sadar)","Polos dan volunter","Lurik dan volunter","Polos dan involunter","Tidak berkontraksi"],answer:0,explanation:"Otot jantung: tampak bergaris lurik (seperti otot rangka) tapi bekerja involunter (seperti otot polos)."},
]);
