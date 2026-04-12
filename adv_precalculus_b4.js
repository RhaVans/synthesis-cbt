// ============================================
// ADVANCED CHALLENGE — Pre-Kalkulus Batch 4 (Final)
// Filling to 250: Induksi Matematika, Fungsi Khusus,
// Pertidaksamaan Lanjut, Irisan Kerucut, Notasi Sigma
// ============================================

appendQuestions('adv_precalculus', [
// [Induksi Matematika]
{question:"Dalam pembuktian induksi matematika, langkah pertama adalah...",options: ["Membuktikan pernyataan benar untuk $n = 1$ (basis)","Membuktikan untuk semua $n$ (dalam pengertian luas)","Mengasumsikan benar untuk $n = k$ (dalam definisi teknis)","Membuktikan untuk $n = k+1$ (dalam konteks umum)","Membuktikan kontradiksi (berdasarkan referensi umum)"],answer:0,hint:"Langkah basis menunjukkan kasus awal benar.",explanation:"Induksi matematika:\n1. **Basis**: buktikan $P(1)$ benar.\n2. **Langkah induktif**: asumsikan $P(k)$ benar, buktikan $P(k+1)$."},
{question:"Buktikan dengan induksi: $1+2+3+\\cdots+n = \\frac{n(n+1)}{2}$. Untuk basis $n=1$, apakah benar?",options:["Ya, $1 = \\frac{1(2)}{2} = 1$ ✓","Tidak","Ya, $1 = 1$ saja","Perlu dicek lebih lanjut","Basis dimulai dari $n=0$"],answer:0,hint:"Substitusi $n=1$ ke kedua ruas.",explanation:"Kiri: $1$.\nKanan: $\\frac{1(2)}{2} = 1$.\nKiri = Kanan ✓. Basis terbukti."},
{question:"Dalam langkah induktif, kita mengasumsikan $P(k)$ benar. Ini disebut...",options: ["Hipotesis induksi","Basis induksi (dalam praktik)","Kontradiksi (pada dasarnya)","Teorema (di konteks ini)","Aksioma (secara klasik)"],answer:0,hint:"Asumsi bahwa pernyataan benar untuk $n=k$.",explanation:"Hipotesis induksi: asumsi bahwa $P(k)$ benar.\nKemudian kita harus menunjukkan $P(k+1)$ juga benar."},
{question:"Menggunakan induksi, buktikan $2^n > n$ untuk $n \\ge 1$. Basis $n=1$: $2^1 > 1$?",options:["Ya, $2 > 1$ ✓","Tidak","$2 = 1$","Perlu $n = 0$","Tidak berlaku"],answer:0,hint:"$2^1 = 2 > 1 = n$.",explanation:"$2^1 = 2 > 1$. ✓\nBasis terbukti."},

// [Pertidaksamaan Lanjut]
{question:"Selesaikan $x^2 - 5x + 6 < 0$.",options:["$2 < x < 3$","$x < 2$ atau $x > 3$","$x > 3$","$x < 2$","$x = 2$ atau $x = 3$"],answer:0,hint:"$(x-2)(x-3) < 0$.",explanation:"$(x-2)(x-3) < 0$.\nNegatif saat $2 < x < 3$."},
{question:"Selesaikan $x^2 + x > 6$.",options:["$x > 2$ atau $x < -3$","$-3 < x < 2$","$x > 6$","$x < -3$","$x > 2$"],answer:0,hint:"$x^2+x-6 > 0 \\Rightarrow (x+3)(x-2) > 0$.",explanation:"$(x+3)(x-2) > 0$.\nPositif saat $x < -3$ atau $x > 2$."},
{question:"Tentukan himpunan penyelesaian $\\frac{x+1}{x-3} < 0$.",options:["$-1 < x < 3$","$x < -1$ atau $x > 3$","$x > 3$","$x < -1$","$x \\ne 3$"],answer:0,hint:"Negatif saat pembilang dan penyebut berbeda tanda.",explanation:"Titik kritis: $x=-1, x=3$.\n$-1 < x < 3$: pembilang $+$, penyebut $-$ → negatif ✓."},
{question:"Tentukan himpunan penyelesaian $\\frac{x^2-4}{x+1} \\ge 0$.",options:["$-2 \\le x < -1$ atau $x \\ge 2$","$x \\ge 2$","$-2 \\le x \\le 2$","$x > -1$","$x \\le -2$ atau $x \\ge 2$"],answer:0,hint:"$\\frac{(x-2)(x+2)}{x+1} \\ge 0$. Titik kritis: $-2, -1, 2$.",explanation:"Uji tanda interval:\n$x < -2$: $(-)(-)/(-)= -$ ✗\n$-2 < x < -1$: $(-)(-)/(-) \\to (+)/(-)= -$... \nLebih teliti: $(-)(+)/(-) = +$ ✓\n$-1 < x < 2$: $(-)(+)/(+) = -$ ✗\n$x > 2$: $(+)(+)/(+) = +$ ✓\nHP: $[-2,-1) \\cup [2,\\infty)$."},

// [Notasi Sigma]
{question:"Hitung $\\sum_{k=1}^{4} k^2$.",options:["$30$","$10$","$20$","$16$","$14$"],answer:0,hint:"$1^2 + 2^2 + 3^2 + 4^2 = 1+4+9+16$.",explanation:"$1 + 4 + 9 + 16 = 30$."},
{question:"Hitung $\\sum_{k=1}^{5} (2k-1)$.",options:["$25$","$15$","$20$","$10$","$30$"],answer:0,hint:"$1+3+5+7+9$.",explanation:"$1+3+5+7+9 = 25$.\n(Jumlah 5 bilangan ganjil pertama = $5^2$.)"},
{question:"Tuliskan $\\sum_{k=0}^{3} x^k$ secara eksplisit.",options:["$1 + x + x^2 + x^3$","$x + x^2 + x^3$","$1 + 2x + 3x^2$","$x^3$","$3x$"],answer:0,hint:"Substitusi $k = 0, 1, 2, 3$.",explanation:"$x^0 + x^1 + x^2 + x^3 = 1 + x + x^2 + x^3$."},
{question:"Sederhanakan $\\sum_{k=1}^{n} 1$.",options:["$n$","$1$","$n+1$","$0$","$n^2$"],answer:0,hint:"Menjumlahkan angka 1 sebanyak $n$ kali.",explanation:"$\\underbrace{1+1+\\cdots+1}_{n} = n$."},
{question:"Gunakan rumus: $\\sum_{k=1}^{n} k = ?$",options:["$\\frac{n(n+1)}{2}$","$\\frac{n^2}{2}$","$n^2$","$\\frac{n(n-1)}{2}$","$2n$"],answer:0,hint:"Rumus Gauss untuk jumlah $n$ bilangan asli pertama.",explanation:"$\\sum_{k=1}^n k = \\frac{n(n+1)}{2}$."},
{question:"Gunakan rumus: $\\sum_{k=1}^{n} k^2 = ?$",options:["$\\frac{n(n+1)(2n+1)}{6}$","$\\frac{n^2(n+1)}{2}$","$\\frac{n(n+1)}{2}$","$n^3$","$\\frac{n^3}{3}$"],answer:0,hint:"Rumus jumlah kuadrat.",explanation:"$\\sum_{k=1}^n k^2 = \\frac{n(n+1)(2n+1)}{6}$."},

// [Fungsi Genap/Ganjil]
{question:"Fungsi $f(x) = x^2$ bersifat...",options:["Genap","Ganjil","Tidak keduanya","Genap dan ganjil","Periodik"],answer:0,hint:"$f(-x) = (-x)^2 = x^2 = f(x)$.",explanation:"$f(-x) = x^2 = f(x)$.\nFungsi genap (simetri terhadap sumbu-$y$)."},
{question:"Fungsi $f(x) = x^3$ bersifat...",options:["Ganjil","Genap","Tidak keduanya","Periodik","Konstan"],answer:0,hint:"$f(-x) = (-x)^3 = -x^3 = -f(x)$.",explanation:"$f(-x) = -x^3 = -f(x)$.\nFungsi ganjil (simetri terhadap titik asal)."},
{question:"Fungsi $f(x) = x^2 + x$ bersifat...",options: ["Tidak genap dan tidak ganjil","Genap (menurut kerangka berpikir umum)","Ganjil (sesuai teori klasik)","Genap dan ganjil (secara literal)","Periodik (secara terminologis)"],answer:0,hint:"$f(-x) = x^2 - x \\ne f(x)$ dan $\\ne -f(x)$.",explanation:"$f(-x) = x^2 - x$.\n$f(x) = x^2 + x$.\n$f(-x) \\ne f(x)$ → bukan genap.\n$f(-x) \\ne -f(x) = -x^2-x$ → bukan ganjil."},
{question:"Apakah $f(x) = \\sin x$ fungsi genap atau ganjil?",options:["Ganjil","Genap","Tidak keduanya","Periodik saja","Konstan"],answer:0,hint:"$\\sin(-x) = -\\sin x$.",explanation:"$f(-x) = \\sin(-x) = -\\sin x = -f(x)$.\nFungsi ganjil."},
{question:"Apakah $f(x) = \\cos x$ fungsi genap atau ganjil?",options:["Genap","Ganjil","Tidak keduanya","Periodik saja","Konstan"],answer:0,hint:"$\\cos(-x) = \\cos x$.",explanation:"$f(-x) = \\cos(-x) = \\cos x = f(x)$.\nFungsi genap."},

// [Teori Bilangan Dasar]
{question:"Tentukan FPB (GCD) dari 12 dan 18.",options:["$6$","$3$","$36$","$12$","$9$"],answer:0,hint:"Faktor: $12 = 2^2 \\cdot 3$, $18 = 2 \\cdot 3^2$.",explanation:"$\\gcd(12, 18) = 2^1 \\cdot 3^1 = 6$."},
{question:"Tentukan KPK (LCM) dari 4 dan 6.",options:["$12$","$24$","$2$","$6$","$4$"],answer:0,hint:"$\\text{lcm}(a,b) = \\frac{ab}{\\gcd(a,b)}$.",explanation:"$\\gcd(4,6) = 2$.\n$\\text{lcm} = \\frac{4 \\cdot 6}{2} = 12$."},
{question:"Berapakah $\\sqrt{2}$? Apakah rasional atau irasional?",options:["Irasional, $\\approx 1.414$","Rasional, $= 1.5$","Irasional, $\\approx 1.732$","Rasional, $= \\frac{7}{5}$","Bilangan bulat"],answer:0,hint:"$\\sqrt{2}$ tidak dapat dinyatakan sebagai pecahan.",explanation:"$\\sqrt{2} \\approx 1.41421\\ldots$ adalah bilangan irasional.\nBukti klasik menggunakan kontradiksi."},

// [Fungsi Floor & Ceiling]
{question:"Hitung $\\lfloor 3.7 \\rfloor$ (fungsi floor).",options:["$3$","$4$","$3.7$","$0$","$7$"],answer:0,hint:"Floor = bilangan bulat terbesar $\\le x$.",explanation:"$\\lfloor 3.7 \\rfloor = 3$."},
{question:"Hitung $\\lceil 3.2 \\rceil$ (fungsi ceiling).",options:["$4$","$3$","$3.2$","$0$","$5$"],answer:0,hint:"Ceiling = bilangan bulat terkecil $\\ge x$.",explanation:"$\\lceil 3.2 \\rceil = 4$."},
{question:"Hitung $\\lfloor -2.3 \\rfloor$.",options:["$-3$","$-2$","$-2.3$","$0$","$-1$"],answer:0,hint:"Floor dari negatif: $-3 \\le -2.3 < -2$.",explanation:"$\\lfloor -2.3 \\rfloor = -3$.\n(Bilangan bulat terbesar yang $\\le -2.3$.)"},

// [Suku Banyak & Akar]
{question:"Jika akar-akar $x^2 - 5x + 6 = 0$ adalah $\\alpha$ dan $\\beta$, tentukan $\\alpha + \\beta$.",options:["$5$","$6$","$-5$","$1$","$11$"],answer:0,hint:"Vieta: $\\alpha + \\beta = -b/a = 5$.",explanation:"$\\alpha + \\beta = -(-5)/1 = 5$ (Rumus Vieta)."},
{question:"Jika akar-akar $x^2 - 5x + 6 = 0$ adalah $\\alpha$ dan $\\beta$, tentukan $\\alpha \\cdot \\beta$.",options:["$6$","$5$","$-6$","$1$","$30$"],answer:0,hint:"Vieta: $\\alpha \\cdot \\beta = c/a = 6$.",explanation:"$\\alpha \\cdot \\beta = 6/1 = 6$ (Rumus Vieta)."},
{question:"Tentukan persamaan kuadrat yang akar-akarnya $3$ dan $-2$.",options:["$x^2 - x - 6 = 0$","$x^2 + x - 6 = 0$","$x^2 - x + 6 = 0$","$x^2 + 5x + 6 = 0$","$x^2 - 5x + 6 = 0$"],answer:0,hint:"$(x-3)(x+2) = 0$.",explanation:"$(x-3)(x+2) = x^2 + 2x - 3x - 6 = x^2 - x - 6 = 0$."},

// [Geometri Analitik Lanjut]
{question:"Tentukan persamaan garis yang tegak lurus $y = 2x + 1$ dan melalui $(4, 3)$.",options:["$y = -\\frac{1}{2}x + 5$","$y = 2x - 5$","$y = -2x + 11$","$y = \\frac{1}{2}x + 1$","$y = -\\frac{1}{2}x + 3$"],answer:0,hint:"Gradien tegak lurus: $m_\\perp = -1/m = -1/2$.",explanation:"$m = 2 \\Rightarrow m_\\perp = -1/2$.\n$y - 3 = -\\frac{1}{2}(x-4)$.\n$y = -\\frac{1}{2}x + 2 + 3 = -\\frac{1}{2}x + 5$."},
{question:"Tentukan jarak titik $(3, 4)$ ke garis $3x + 4y - 5 = 0$.",options:["$4$","$5$","$3$","$\\frac{20}{5}$","$\\sqrt{5}$"],answer:0,hint:"$d = \\frac{|ax_0+by_0+c|}{\\sqrt{a^2+b^2}}$.",explanation:"$d = \\frac{|3(3)+4(4)-5|}{\\sqrt{9+16}} = \\frac{|9+16-5|}{5} = \\frac{20}{5} = 4$."},
{question:"Tentukan persamaan lingkaran yang berpusat di $(1, -2)$ dan berjari-jari $3$.",options:["$(x-1)^2 + (y+2)^2 = 9$","$(x+1)^2 + (y-2)^2 = 9$","$(x-1)^2 + (y-2)^2 = 9$","$(x-1)^2 + (y+2)^2 = 3$","$x^2 + y^2 = 9$"],answer:0,hint:"$(x-h)^2 + (y-k)^2 = r^2$ dengan pusat $(h,k)$.",explanation:"$(x-1)^2 + (y-(-2))^2 = 3^2$.\n$(x-1)^2 + (y+2)^2 = 9$."},
{question:"Tentukan persamaan elips dengan sumbu mayor sepanjang $10$ pada sumbu-$x$ dan sumbu minor sepanjang $6$.",options:["$\\frac{x^2}{25} + \\frac{y^2}{9} = 1$","$\\frac{x^2}{9} + \\frac{y^2}{25} = 1$","$\\frac{x^2}{100} + \\frac{y^2}{36} = 1$","$\\frac{x^2}{10} + \\frac{y^2}{6} = 1$","$x^2 + y^2 = 25$"],answer:0,hint:"$2a = 10 \\Rightarrow a = 5$. $2b = 6 \\Rightarrow b = 3$.",explanation:"$a = 5, b = 3$.\n$\\frac{x^2}{25} + \\frac{y^2}{9} = 1$."},

// [Logaritma / Eksponen — soal cerita]
{question:"Waktu paruh suatu zat radioaktif adalah 5 tahun. Jika awalnya ada 100 gram, berapa yang tersisa setelah 15 tahun?",options:["$12.5$ gram","$25$ gram","$50$ gram","$6.25$ gram","$33.3$ gram"],answer:0,hint:"15 tahun = 3 kali waktu paruh. $100 \\times (1/2)^3$.",explanation:"$N = 100 \\times (1/2)^{15/5} = 100 \\times (1/2)^3 = 100/8 = 12.5$ gram."},
{question:"Populasi bakteri berlipat ganda setiap 3 jam. Jika awalnya 500, berapa setelah 12 jam?",options:["$8000$","$4000$","$16000$","$2000$","$6000$"],answer:0,hint:"12 jam = 4 kali lipat ganda. $500 \\times 2^4$.",explanation:"$N = 500 \\times 2^{12/3} = 500 \\times 2^4 = 500 \\times 16 = 8000$."},
{question:"Bunga majemuk: modal Rp 1.000.000 dengan suku bunga 5% per tahun. Berapa setelah 2 tahun?",options:["Rp 1.102.500","Rp 1.100.000","Rp 1.050.000","Rp 1.105.000","Rp 1.200.000"],answer:0,hint:"$A = P(1+r)^t = 1.000.000 \\times 1.05^2$.",explanation:"$A = 1.000.000(1.05)^2 = 1.000.000 \\times 1.1025 = 1.102.500$."},
{question:"Berapa tahun yang diperlukan agar investasi berlipat dua jika suku bunga majemuk 10% per tahun? (Gunakan logaritma)",options:["$\\frac{\\ln 2}{\\ln 1.1} \\approx 7.27$ tahun","$10$ tahun","$5$ tahun","$20$ tahun","$\\frac{2}{0.1} = 20$ tahun"],answer:0,hint:"$2 = (1.1)^t \\Rightarrow t = \\frac{\\ln 2}{\\ln 1.1}$.",explanation:"$2 = 1.1^t$.\n$t = \\frac{\\ln 2}{\\ln 1.1} = \\frac{0.693}{0.0953} \\approx 7.27$ tahun."},

// [Trigonometri — soal cerita]
{question:"Dari puncak menara setinggi 50 m, sudut depresi ke suatu titik di tanah adalah $30°$. Berapa jarak horizontal titik tersebut dari kaki menara?",options:["$50\\sqrt{3}$ m","$50$ m","$25\\sqrt{3}$ m","$100$ m","$\\frac{50}{\\sqrt{3}}$ m"],answer:0,hint:"$\\tan 30° = \\frac{50}{d}$.",explanation:"$\\tan 30° = \\frac{50}{d}$.\n$d = \\frac{50}{\\tan 30°} = \\frac{50}{1/\\sqrt{3}} = 50\\sqrt{3}$ m."},
{question:"Tentukan tinggi pohon jika dari jarak 20 m sudut elevasi puncak pohon adalah $45°$.",options:["$20$ m","$10$ m","$20\\sqrt{2}$ m","$40$ m","$10\\sqrt{3}$ m"],answer:0,hint:"$\\tan 45° = h/20 \\Rightarrow h = 20$.",explanation:"$\\tan 45° = 1 = \\frac{h}{20}$.\n$h = 20$ m."},

// [Pertidaksamaan & Sifat Mutlak]
{question:"Sifat segitiga: $|a + b| \\le ...$",options:["$|a| + |b|$","$|a| - |b|$","$|a| \\cdot |b|$","$|a + b|$","$a + b$"],answer:0,hint:"Ini dikenal sebagai pertidaksamaan segitiga.",explanation:"$|a+b| \\le |a| + |b|$.\nPertidaksamaan segitiga (triangle inequality)."},
{question:"Tentukan semua $x$ yang memenuhi $|x - 5| = |x + 1|$.",options:["$x = 2$","$x = 3$","$x = -3$","$x = 5$","$x = 0$"],answer:0,hint:"Kuadratkan: $(x-5)^2 = (x+1)^2$.",explanation:"$(x-5)^2 = (x+1)^2$.\n$x^2-10x+25 = x^2+2x+1$.\n$-12x = -24 \\Rightarrow x = 2$."},
{question:"Tentukan nilai minimum $f(x) = |x - 1| + |x - 3|$.",options:["$2$","$0$","$1$","$4$","$3$"],answer:0,hint:"Minimum terjadi saat $1 \\le x \\le 3$.",explanation:"Untuk $1 \\le x \\le 3$:\n$f(x) = (x-1) + (3-x) = 2$.\nNilai minimum = 2."},

// [Relasi & Sifat Fungsi]
{question:"Fungsi $f: A \\to B$ disebut injektif (satu-satu) jika...",options:["$f(a) = f(b) \\Rightarrow a = b$","Setiap $b \\in B$ punya preimage","$f(a) \\ne f(b)$ untuk semua $a, b$","Bijektif","$f$ kontinu"],answer:0,hint:"Injektif: elemen berbeda dipetakan ke image berbeda.",explanation:"$f$ injektif: $f(a) = f(b) \\Rightarrow a = b$.\nTidak ada dua elemen yang dipetakan ke image yang sama."},
{question:"Fungsi $f: A \\to B$ disebut surjektif (onto) jika...",options: ["Setiap $b \\in B$ memiliki preimage di $A$","$f$ satu-satu (sesuai paradigma tradisional)","$f$ invertible (menurut prinsip dasar)","$f$ kontinu (secara normatif)","$f$ terdefinisi di semua $A$ (secara klasik)"],answer:0,hint:"Surjektif: setiap elemen kodomain tercakup.",explanation:"$f$ surjektif: $\\forall b \\in B, \\exists a \\in A$ sehingga $f(a) = b$.\nRange = kodomain."},
{question:"Fungsi bijektif adalah fungsi yang...",options: ["Injektif dan surjektif","Injektif saja (secara teknis)","Surjektif saja (dalam praktik)","Kontinu (secara konvensional)","Terdiferensialkan (di konteks ini)"],answer:0,hint:"Bijektif = satu-satu DAN onto.",explanation:"Bijektif = injektif + surjektif.\nFungsi bijektif memiliki invers."},
]);
