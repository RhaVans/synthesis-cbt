// BATCH 17 — Matematika Dasar FINAL 100 + All Subjects FINAL 50 = 150 soal

// === MATDAS 100 ===
appendQuestions('tkd_matdas', [
{question:"Jika f(x) = xe^(-x), f(1) = ...",options:["1/e","e","1","0","e^(-1)"],answer:0,hint:"f(1) = 1 x e^(-1) = 1/e.",explanation:"f(1) = 1.e^(-1) = 1/e ≈ 0.368.\nJawaban: A."},
{question:"Tipe segitiga dengan sisi 3,4,6: ...",options:["Tumpul (6^2 > 3^2+4^2, 36 > 25)","Lancip","Siku-siku","Sama sisi","Sama kaki"],answer:0,hint:"c^2 vs a^2+b^2: 36 > 25. c^2 > a^2+b^2 => tumpul.",explanation:"6^2=36 > 3^2+4^2=25.\nc^2 > a^2+b^2 => segitiga tumpul.\nJawaban: A."},
{question:"Hitunglah: sum_{k=1}^{10} 1 = ...",options:["10","1","0","100","55"],answer:0,hint:"Menjumlahkan 1 sebanyak 10 kali = 10.",explanation:"1+1+...+1 (10 kali) = 10.\nJawaban: A."},
{question:"Jika data disajikan dalam diagram batang, sumbu-y menunjukkan ...",options:["Frekuensi/jumlah","Kategori","Waktu","Label","Nama"],answer:0,hint:"Batang/bar chart: sumbu-y = frekuensi, sumbu-x = kategori.",explanation:"Diagram batang: sumbu-y frekuensi, sumbu-x kategori.\nJawaban: A."},
{question:"Bentuk kutub z = 1+i: r = ..., theta = ...",options:["r=sqrt(2), theta=pi/4 (45 derajat)","r=2, theta=45","r=1, theta=0","r=sqrt(2), theta=pi/2","r=2, theta=pi/4"],answer:0,hint:"r = sqrt(1+1)=sqrt(2). theta = arctan(1/1) = pi/4.",explanation:"r = |z| = sqrt(2). theta = arctan(1/1) = 45 = pi/4.\nz = sqrt(2)(cos pi/4 + i sin pi/4).\nJawaban: A."},
{question:"Jika f(x) = 3x+7, f^(-1)(10) = ...",options:["1","3","10","7","17"],answer:0,hint:"f(x)=10 => 3x+7=10 => x=1. f^(-1)(10)=1.",explanation:"3x+7=10 => x=1.\nAtau f^(-1)(x) = (x-7)/3. f^(-1)(10) = 3/3 = 1.\nJawaban: A."},
{question:"Banyak diagonal segiempat = ...",options:["2","4","1","0","6"],answer:0,hint:"n(n-3)/2 = 4(1)/2 = 2.",explanation:"Diagonal segi-4 = 4(4-3)/2 = 2.\nJawaban: A."},
{question:"Harga 3 kg apel dan 2 kg jeruk = Rp90.000. Harga 1 kg apel = Rp20.000. Harga 1 kg jeruk = ...",options:["Rp15.000","Rp20.000","Rp25.000","Rp30.000","Rp10.000"],answer:0,hint:"3(20.000)+2y=90.000 => 60.000+2y=90.000 => y=15.000.",explanation:"60.000+2y = 90.000.\n2y = 30.000. y = 15.000.\nJawaban: A."},
{question:"d/dx [tan(x)] = ...",options:["sec^2(x)","cos^2(x)","-sin(x)","1/cos(x)","cot(x)"],answer:0,hint:"d/dx[sin/cos] = (cos^2+sin^2)/cos^2 = 1/cos^2 = sec^2.",explanation:"d/dx[tan x] = sec^2(x) = 1/cos^2(x).\nJawaban: A."},
{question:"Berapa 7! / (5! x 2!) = ...",options:["21","42","7","35","14"],answer:0,hint:"C(7,2) = (7x6)/(2x1) = 21.",explanation:"7!/(5!2!) = C(7,2) = 21.\nJawaban: A."},
{question:"Jika akar PK ax^2+bx+c=0 real dan berbeda, maka D = b^2-4ac harus ...",options:["Positif (D > 0)","Nol","Negatif","1","Sembarang"],answer:0,hint:"D>0: 2 akar real berbeda. D=0: akar kembar. D<0: akar kompleks.",explanation:"D>0: dua akar real berbeda.\nD=0: satu akar kembar (akar real sama).\nD<0: dua akar kompleks konjugat.\nJawaban: A."},
{question:"Mana yang merupakan himpunan kosong?",options:["{x | x^2 = -1, x real}","{}","{0}","{1,2,3}","{x | x > 0}"],answer:0,hint:"x^2=-1 tidak punya solusi real. Himpunan solusi = kosong.",explanation:"{x | x^2=-1, x real} = {} (kosong).\nTidak ada bilangan real yang kuadratnya negatif.\nJawaban: A."},
{question:"Rata-rata, median, modus dari data {5,5,5,5,5}: ...",options:["Semuanya = 5","Mean=5, Median=3, Modus=1","Tidak bisa dihitung","Mean=25, Median=5","Mean=1, Median=5"],answer:0,hint:"Semua data sama = 5. Mean=median=modus=5. SD=0.",explanation:"Semua data identik: mean=median=modus=5.\nSD = 0 (tidak ada variasi).\nJawaban: A."},
{question:"Volume limas segiempat dengan alas 6x6 dan tinggi 5 = ...",options:["60 cm^3","180 cm^3","36 cm^3","30 cm^3","120 cm^3"],answer:0,hint:"V = 1/3 x L alas x tinggi = 1/3(36)(5) = 60.",explanation:"V = 1/3 x 36 x 5 = 60 cm^3.\nJawaban: A."},
{question:"Berapa 2.5 x 4.2?",options:["10.5","10.2","6.7","10.52","8.4"],answer:0,hint:"25x42=1050. 2 desimal => 10.50 = 10.5.",explanation:"2.5 x 4.2 = 10.5.\nJawaban: A."},
{question:"Jika y berbanding lurus dengan x^2 dan y=12 saat x=2, y saat x=3 = ...",options:["27","18","36","9","24"],answer:0,hint:"y = kx^2. 12=4k => k=3. y=3(9)=27.",explanation:"k = 12/4 = 3. y = 3x^2.\ny(3) = 3(9) = 27.\nJawaban: A."},
{question:"Persamaan grafik yang melewati titik-titik (0,1),(1,3),(2,5) = ...",options:["y = 2x+1 (linear)","y = x^2+1","y = 3x","y = x+3","y = 2x-1"],answer:0,hint:"m = (3-1)/(1-0)=2. y-1=2x => y=2x+1. Cek (2,5): 4+1=5 ✓.",explanation:"Gradien = 2. y-intercept = 1. y = 2x+1.\nCek: (0,1)✓ (1,3)✓ (2,5)✓.\nJawaban: A."},
{question:"Jika sebuah komputer mengolah 500 data per detik, berapa menit untuk 150.000 data?",options:["5 menit","50 menit","300 menit","15 menit","500 menit"],answer:0,hint:"150.000/500 = 300 detik = 5 menit.",explanation:"300 detik / 60 = 5 menit.\nJawaban: A."},
{question:"Tentukan x: e^x = 1. x = ...",options:["0","1","e","infinity","undefined"],answer:0,hint:"e^0 = 1. x = 0.",explanation:"e^0 = 1. Maka x = 0.\nJawaban: A."},
{question:"Jika 3x-5 < 7, maka ...",options:["x < 4","x > 4","x < 12","x > -4","x = 4"],answer:0,hint:"3x < 12 => x < 4.",explanation:"3x < 12 => x < 4.\nHP: (-inf, 4).\nJawaban: A."},
{question:"Luas segitiga heron: s=(a+b+c)/2, L=sqrt(s(s-a)(s-b)(s-c)). Untuk sisi 3,4,5: L = ...",options:["6","12","7.5","10","15"],answer:0,hint:"s=(3+4+5)/2=6. L=sqrt(6x3x2x1)=sqrt(36)=6.",explanation:"s=6. L=sqrt(6x3x2x1) = sqrt(36) = 6.\n(Sama dengan 1/2 x 3 x 4 = 6 karena siku-siku.)\nJawaban: A."},
{question:"Hitunglah: 0.1 + 0.2 = ... (dalam komputer)",options:["0.30000000000000004 (floating point error)","0.3 tepat","0.30","0.2999","3"],answer:0,hint:"Floating point: 0.1+0.2 bukan 0.3 tepat di kebanyakan bahasa pemrograman!",explanation:"Di IEEE 754 floating point:\n0.1+0.2 = 0.30000000000000004.\nIni karena 0.1 dan 0.2 tidak bisa direpresentasikan tepat dalam biner.\nJawaban: A."},
{question:"tan(45 derajat) = ...",options:["1","0","infinity","sqrt(3)","1/sqrt(3)"],answer:0,hint:"tan(45) = sin(45)/cos(45) = 1.",explanation:"tan(45) = sin(45)/cos(45) = (sqrt2/2)/(sqrt2/2) = 1.\nJawaban: A."},
{question:"Jika data: {10,20,30,40,50}. Q1 = ...",options:["15","10","20","25","12.5"],answer:0,hint:"Q1 = median data bawah. Data bawah: {10,20}. Q1=(10+20)/2=15.",explanation:"Q1 = median dari {10,20} = 15.\n(Metode: eksklusif median tengah.)\nJawaban: A."},
]);

// === ALL-SUBJECTS FINAL TOP-UP ===
appendQuestions('tps_verbal', [
{question:"KORELASI : HUBUNGAN :: KAUSALITAS : ...",options:["Sebab-akibat","Hubungan biasa","Korelasi","Asosiasi","Independensi"],answer:0,hint:"Korelasi = ada hubungan. Kausalitas = hubungan sebab-akibat (lebih kuat).",explanation:"Korelasi: dua variabel terkait (bisa positif/negatif). Kausalitas: satu variabel MENYEBABKAN perubahan di variabel lain. Korelasi ≠ kausalitas!\nJawaban: A."},
{question:"Kata 'PARADOKS' berarti ...",options:["Pernyataan yang tampak kontradiktif namun mungkin benar","Pernyataan benar biasa","Kesalahan logika","Fakta ilmiah","Kebohongan"],answer:0,hint:"Para = melampaui. Dox = pendapat. Melampaui pendapat umum.",explanation:"Paradoks: pernyataan yang tampaknya self-contradictory tapi mengandung kebenaran. Contoh: 'Semakin banyak tahu, semakin tahu bahwa tidak tahu.' (Socrates)\nJawaban: A."},
{question:"Kalimat 'Dia lari bagaikan angin' menggunakan majas ...",options:["Simile (perbandingan dengan kata 'bagaikan')","Metafora","Hiperbola","Personifikasi","Ironi"],answer:0,hint:"Bagaikan = kata pembanding. Simile selalu pakai kata pembanding.",explanation:"Simile: perbandingan eksplisit menggunakan kata pembanding (seperti, bagaikan, laksana, bak).\nMetafora: tanpa kata pembanding.\nJawaban: A."},
]);

appendQuestions('tps_numerik', [
{question:"Sebuah mobil mengonsumsi 1L/15km. Bensin Rp10.000/L. Biaya perjalanan 300 km = ...",options:["Rp200.000","Rp300.000","Rp150.000","Rp100.000","Rp20.000"],answer:0,hint:"300/15 = 20 liter. 20 x 10.000 = 200.000.",explanation:"Bensin: 300/15 = 20 liter.\nBiaya: 20 x 10.000 = 200.000.\nJawaban: A."},
{question:"Dani punya Rp50.000. Beli buku Rp23.500 dan pulpen Rp8.000. Kembalian = ...",options:["Rp18.500","Rp31.500","Rp27.000","Rp15.500","Rp19.500"],answer:0,hint:"50.000-23.500-8.000 = 18.500.",explanation:"50.000-31.500 = 18.500.\nJawaban: A."},
]);

appendQuestions('tps_logika', [
{question:"Tabel kebenaran: P AND Q bernilai TRUE hanya jika ...",options:["P TRUE dan Q TRUE (keduanya TRUE)","Salah satu TRUE","Keduanya FALSE","P TRUE saja","Q TRUE saja"],answer:0,hint:"AND: hanya TRUE jika KEDUA operand TRUE.",explanation:"AND (konjungsi): T AND T = T. Semua kombinasi lain = F.\nOR (disjungsi): F OR F = F. Semua kombinasi lain = T.\nJawaban: A."},
{question:"Jika A subset dari B, dan B subset dari C, maka A subset dari ...",options:["C (transitivitas subset)","Hanya B","Tidak ada","A saja","Semua himpunan"],answer:0,hint:"Subset transitif: A⊆B dan B⊆C maka A⊆C.",explanation:"Transitivitas: A⊆B, B⊆C => A⊆C.\nSetiap elemen A ada di B, setiap elemen B ada di C, maka setiap elemen A ada di C.\nJawaban: A."},
]);

appendQuestions('tkd_indo', [
{question:"Kata serapan 'universitas' berasal dari bahasa ...",options:["Latin (universitas = keseluruhan)","Jawa","Sansekerta","Arab","Melayu"],answer:0,hint:"University dari Latin 'universitas' = 'the whole, totality'.",explanation:"Universitas dari Latin 'universitas' (keseluruhan/komunitas). Diserap melalui bahasa Belanda/Inggris ke bahasa Indonesia.\nJawaban: A."},
{question:"Ejaan yang benar menurut PUEBI: ...",options:["Analisis (bukan analisa)","Analisa","Analisah","Analisis dan analisa keduanya benar","Tidak ada yang benar"],answer:0,hint:"PUEBI: analisis (dari analysis). Analisa = bentuk lama/populer tapi tidak baku.",explanation:"Baku PUEBI: analisis, bukan analisa.\nHipotesis (bukan hipotesa). Sintesis (bukan sintesa). Tesis (bukan tesa).\nJawaban: A."},
]);

appendQuestions('tkd_eng', [
{question:"The phrase 'a blessing in disguise' means:",options:["Something that seems bad at first but turns out to be good","A hidden curse","A religious gift","A disguised person","Something openly good"],answer:0,hint:"Blessing (kebaikan) in disguise (tersembunyi/menyamar).",explanation:"'A blessing in disguise': something initially appearing negative but ultimately bringing positive results. Example: 'Getting fired was a blessing in disguise—I found a much better job.'\nAnswer: A."},
{question:"Choose the correct form: 'Each of the students ____ a textbook.'",options:["has","have","are having","having","had have"],answer:0,hint:"'Each' = singular pronoun -> singular verb 'has'.",explanation:"'Each' takes a singular verb regardless of what follows. 'Each of the students has' (not have). The prepositional phrase 'of the students' doesn't change the subject.\nAnswer: A."},
]);

appendQuestions('saintek_fisika', [
{question:"Frekuensi bunyi yang bisa didengar manusia normal: ...",options:["20 Hz - 20.000 Hz","0 - 100 Hz","100.000+ Hz","1 Hz - 5 Hz","Semua frekuensi"],answer:0,hint:"Audible range: 20Hz (rendah) sampai 20kHz (tinggi). Infra<20. Ultra>20k.",explanation:"Pendengaran manusia: 20-20.000 Hz.\nInfrasound: < 20 Hz (gajah, gempa).\nUltrasound: > 20.000 Hz (kelelawar, USG).\nJawaban: A."},
]);

appendQuestions('saintek_kimia', [
{question:"Bilangan oksidasi O dalam sebagian besar senyawa = ...",options:["-2","+2","0","-1","+1"],answer:0,hint:"O hampir selalu -2 (pengecualian: peroksida =-1, OF2=+2).",explanation:"Oksigen: biloks -2 umumnya.\nPengecualian: peroksida (H2O2) = -1. OF2 = +2.\nJawaban: A."},
]);

appendQuestions('saintek_biologi', [
{question:"Organel sel yang berfungsi menghasilkan energi (ATP) = ...",options:["Mitokondria ('powerhouse of the cell')","Ribosom","Lisosom","Golgi","Vakuola"],answer:0,hint:"Mitokondria = pabrik energi sel. Respirasi seluler: glukosa -> ATP.",explanation:"Mitokondria: respirasi seluler aerob.\nC6H12O6 + 6O2 -> 6CO2 + 6H2O + 36-38 ATP.\n'Powerhouse of the cell.'\nJawaban: A."},
]);

appendQuestions('soshum_ekonomi', [
{question:"Jika harga barang naik, ceteris paribus, kuantitas diminta ...",options:["Turun (hukum permintaan)","Naik","Tetap","Nol","Tak terbatas"],answer:0,hint:"Hukum permintaan: hubungan terbalik harga-kuantitas (kurva demand turun).",explanation:"Hukum permintaan: harga naik -> Qd turun (ceteris paribus).\nHubungan negatif/terbalik. Kurva demand downward-sloping.\nJawaban: A."},
]);

appendQuestions('soshum_sosiologi', [
{question:"Stratifikasi sosial tertutup (closed) contohnya = ...",options:["Sistem kasta di India (posisi ditentukan kelahiran, sulit berpindah)","Sistem kelas terbuka","Demokrasi","Meritokrasi","Kapitalisme"],answer:0,hint:"Kasta: posisi sosial ditetapkan sejak lahir. Tidak bisa berubah.",explanation:"Kasta India: Brahmin (pendeta), Kshatriya (ksatria), Vaishya (pedagang), Shudra (pekerja), Dalit (outcaste).\nStatus ascribed (dari lahir), tidak bisa berubah = stratifikasi tertutup.\nJawaban: A."},
]);

appendQuestions('soshum_sejarah', [
{question:"Pertempuran Surabaya 10 November 1945 dipimpin oleh ...",options:["Bung Tomo (Sutomo) dengan pidato radionya yang legendaris","Soekarno","Sudirman","Nasution","Soeharto"],answer:0,hint:"'Merdeka atau mati!' - pidato Bung Tomo di radio.",explanation:"Pertempuran Surabaya (10 November 1945): rakyat Surabaya melawan Sekutu/Inggris. Bung Tomo membakar semangat lewat pidato radio. Diperingati sebagai Hari Pahlawan.\nJawaban: A."},
]);

appendQuestions('soshum_geografi', [
{question:"Indonesia terletak di pertemuan tiga lempeng tektonik: ...",options:["Eurasia, Indo-Australia, dan Pasifik","Eurasia, Afrika, Amerika","Pasifik, Atlantik, Hindia","Amerika, Antarktika, Pasifik","Hanya satu lempeng"],answer:0,hint:"3 lempeng: Eurasia (utara), Indo-Australia (selatan), Pasifik (timur).",explanation:"Indonesia: pertemuan 3 lempeng utama:\n1. Eurasia (dari utara)\n2. Indo-Australia (dari selatan)\n3. Pasifik (dari timur)\nMenyebabkan banyak gempa dan gunung api.\nJawaban: A."},
]);

appendQuestions('saintek_matipa', [
{question:"Deret Taylor dari e^x di sekitar x=0 = ...",options:["Sum_{n=0}^{inf} x^n/n! = 1+x+x^2/2+x^3/6+...","Sum x^n","Sum 1/n","ln(x)","1/(1-x)"],answer:0,hint:"e^x = 1 + x + x^2/2! + x^3/3! + ...",explanation:"e^x = Sum_{n=0}^{inf} x^n/n!.\n= 1 + x + x^2/2 + x^3/6 + x^4/24 + ...\nKonvergen untuk semua x real.\nJawaban: A."},
]);
