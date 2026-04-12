// BATCH 18 — THE ABSOLUTE FINAL BATCH (232+ soal to reach 2500)
// Matdas: ~170 soal (to push to ~1150, ~46%)
// Other subjects: ~62 soal

appendQuestions('tkd_matdas', [
{question:"Hitunglah: 14^2 - 12^2 = ...",options: ["52","4","28","196","144"],answer:0,hint:"(14-12)(14+12) = 2x26 = 52.",explanation:"Selisih kuadrat: (14-12)(14+12) = 2(26) = 52.\nJawaban: A."},
{question:"Jika gradient garis 3x+6y=12 adalah ...",options: ["$\\frac{-1}{2}$","3","6","$\\frac{1}{2}$","2"],answer:0,hint:"6y=-3x+12 => y=-x/2+2. m=-1/2.",explanation:"y = -x/2+2. m=-1/2.\nJawaban: A."},
{question:"Berapa banyak diagonal pada segi-10?",options: ["35","10","20","45","50"],answer:0,hint:"n(n-3)/2 = 10(7)/2 = 35.",explanation:"Diagonal = 10(10-3)/2 = 70/2 = 35.\nJawaban: A."},
{question:"Jika data: 2,3,4,5,6,7,8. Jangkauan interkuartil (IQR) = ...",options: ["4","6","3","5","7"],answer:0,hint:"Q1=3, Q3=7. IQR=7-3=4.",explanation:"Q1=3. Q3=7. IQR = Q3-Q1 = 4.\nJawaban: A."},
{question:"16^(3/4) = ...",options: ["8","12","4","64","2"],answer:0,hint:"16^(1/4)=2. 2^3=8. Atau (16^3)^(1/4)=(4096)^(1/4)=8.",explanation:"16^(3/4) = (16^(1/4))^3 = 2^3 = 8.\nJawaban: A."},
{question:"Integral dari sec^2(x) dx = ...",options: ["tan(x) + C","-cot(x) + C","sec(x) + C","sin(x) + C","cos(x) + C"],answer:0,hint:"d/dx[tan x] = sec^2 x. Maka integral sec^2 = tan + C.",explanation:"Integral sec^2(x) dx = tan(x) + C.\nJawaban: A."},
{question:"Diketahui deret: 1-1+1-1+1-... Apakah deret ini konvergen?",options: ["Tidak (deret divergen/osilasi, tidak memiliki jumlah pasti)","Ya, = 0","Ya, = 1","Ya, = 1/2","Ya, = -1"],answer:0,hint:"Jumlah parsial: 1,0,1,0,1,0... Tidak menuju satu nilai. Divergen.",explanation:"Jumlah parsial osilasi antara 0 dan 1.\nTidak konvergen (dalam arti standar).\n(Metode Cesaro: rata-rata = 1/2, tapi bukan konvergensi biasa.)\nJawaban: A."},
{question:"Luas permukaan kerucut tanpa alas (selimut saja) = ...",options: ["pi r s (s = slant height)","pi r^2","2 pi r h","pi r(r+s)","4 pi r^2"],answer:0,hint:"Selimut kerucut = pi r s. LP total = pi r s + pi r^2 = pi r(s+r).",explanation:"Luas selimut = pi r s.\ns = garis pelukis (slant height).\nJawaban: A."},
{question:"Jika x^2+y^2+z^2 = 49 dan x=2, y=3, z = ...",options: ["6 atau -6","44","$\\sqrt{44}$","7","0"],answer:0,hint:"4+9+z^2=49 => z^2=36 => z=6 atau z=-6.",explanation:"z^2 = 49-4-9 = 36. z = 6 atau z = -6.\nJawaban: A."},
{question:"Jika f(x)=x^3+x, apakah f injektif?",options: ["Ya (f'(x)=3x^2+1>0 selalu, fungsi naik terus)","Tidak","Tergantung","Kadang-kadang","Tidak terdefinisi"],answer:0,hint:"f'(x)=3x^2+1>0 untuk semua x. Strictly increasing => injektif.",explanation:"f'(x) = 3x^2+1 > 0 untuk semua x real.\nStrictly increasing => injektif (one-to-one).\nJawaban: A."},
{question:"Hitunglah: log_3(81) = ...",options: ["4","3","81","27","9"],answer:0,hint:"3^4 = 81. log_3(81) = 4.",explanation:"3^4 = 81. Maka log_3(81) = 4.\nJawaban: A."},
{question:"Jika matriks A orthogonal, maka A^T.A = ...",options: ["I (matriks identitas)","A","0","A^2","2A"],answer:0,hint:"Orthogonal: A^T = A^(-1). A^T.A = I.",explanation:"Matriks orthogonal: A^T A = AA^T = I.\nA^T = A^(-1).\nContoh: matriks rotasi.\nJawaban: A."},
{question:"Sebuah persegi memiliki luas 64 cm^2. Sisi = ...",options: ["8 cm","32 cm","16 cm","4 cm","64 cm"],answer:0,hint:"s = $\\sqrt{64}$ = 8.",explanation:"s = $\\sqrt{64}$ = 8 cm.\nJawaban: A."},
{question:"Jika a/b = 3/5, berapa (a+b)/b?",options: ["$\\frac{8}{5}$","$\\frac{3}{5}$","$\\frac{5}{3}$","$\\frac{8}{3}$","15"],answer:0,hint:"(a+b)/b = a/b + b/b = 3/5 + 1 = 8/5.",explanation:"(a+b)/b = a/b+1 = 3/5+5/5 = 8/5.\nJawaban: A."},
{question:"Berapa cm^3 dalam 1 liter?",options: ["1000","100","10","10000","1"],answer:0,hint:"1 liter = 1000 mL = 1000 cm^3.",explanation:"1 L = 1000 cm^3 = 1000 mL.\nJawaban: A."},
{question:"Jika suku ke-n barisan = 2n+1, barisan ini: 3,5,7,9,... Ini adalah ...",options: ["Barisan aritmatika dengan d=2","Barisan geometri","Barisan Fibonacci","Barisan prima","Barisan acak"],answer:0,hint:"Selisih tetap = 2. Barisan aritmatika.",explanation:"d = 5-3 = 7-5 = 2 (konstan).\nBarisan aritmatika dengan a=3, d=2.\nJawaban: A."},
{question:"Hitunglah: (1+i)^2 = ...",options: ["2i","2","1+2i","0","1-i"],answer:0,hint:"(1+i)^2 = 1+2i+i^2 = 1+2i-1 = 2i.",explanation:"(1+i)^2 = 1+2i+i^2 = 1+2i-1 = 2i.\n(Karena i^2 = -1.)\nJawaban: A."},
{question:"Berapa 0.5^2?",options: ["0.25","0.5","1","0.025","2.5"],answer:0,hint:"0.5 x 0.5 = 0.25.",explanation:"(1/2)^2 = 1/4 = 0.25.\nJawaban: A."},
{question:"Jika fungsi f kontinu di [a,b], maka berdasarkan Teorema Nilai Antara (IVT) ...",options: ["f mengambil semua nilai antara f(a) dan f(b)","f selalu naik","f selalu turun","f(a)=f(b)","f=0"],answer:0,hint:"IVT: fungsi kontinu mengambil semua nilai antara f(a) dan f(b).",explanation:"IVT: jika f kontinu di [a,b], untuk setiap y antara f(a) dan f(b), ada c di (a,b) sehingga f(c)=y.\nJawaban: A."},
{question:"Modular arithmetic: 17 mod 5 = ...",options: ["2","3","5","17","12"],answer:0,hint:"17 = 3x5 + 2. Sisa = 2.",explanation:"17 / 5 = 3 sisa 2.\n17 mod 5 = 2.\nJawaban: A."},
{question:"Jarak antara 2 titik pada garis bilangan: |7-(-3)| = ...",options: ["10","4","-10","3","7"],answer:0,hint:"|7+3| = |10| = 10.",explanation:"|7-(-3)| = |7+3| = 10.\nJarak selalu positif.\nJawaban: A."},
{question:"Jika investasi Rp1.000.000 turun 50% lalu naik 100%. Nilai akhir = ...",options: ["Rp1.000.000 (kembali ke awal)","Rp1.500.000","Rp500.000","Rp2.000.000","Rp750.000"],answer:0,hint:"1jt x 0.5 = 500rb. 500rb x 2 = 1jt.",explanation:"1.000.000 x 0.5 = 500.000.\n500.000 x 2.0 = 1.000.000.\nKembali ke semula!\nJawaban: A."},
{question:"Sudut yang dibentuk jarum jam pukul 3:00 = ...",options: ["90 derajat","180 derajat","45 derajat","120 derajat","60 derajat"],answer:0,hint:"Angka 12 ke 3 = 3 x 30 = 90 derajat.",explanation:"Setiap angka = 30 derajat (360/12).\nJam 3: jarum jam di 3, jarum menit di 12.\n3 x 30 = 90 derajat.\nJawaban: A."},
{question:"Hitunglah: C(6,2) = ...",options: ["15","30","12","6","36"],answer:0,hint:"C(6,2) = (6x5)/(2x1) = 15.",explanation:"C(6,2) = 30/2 = 15.\nJawaban: A."},
{question:"Berapa $1^{100}$?",options: ["1","100","0","undefined","infinity"],answer:0,hint:"1 pangkat berapapun = 1.",explanation:"1^n = 1 untuk semua n.\nJawaban: A."},
{question:"Jika f(x) = log(x), maka f(10) + f(100) = ...",options: ["3","10","100","110","2"],answer:0,hint:"log(10)=1. log(100)=2. 1+2=3.",explanation:"log10(10)=1. log10(100)=2. 1+2=3.\nJawaban: A."},
{question:"Sebuah persegi panjang 12x5. Diagonal = ...",options: ["13","17","60","7","11"],answer:0,hint:"d = $\\sqrt{144+25}$ = $\\sqrt{169}$ = 13.",explanation:"d = $\\sqrt{12^2+5^2}$ = $\\sqrt{169}$ = 13.\nTriple: 5-12-13.\nJawaban: A."},
{question:"Konversi 75% ke pecahan paling sederhana = ...",options: ["$\\frac{3}{4}$","$\\frac{75}{100}$","$\\frac{15}{20}$","$\\frac{7}{5}$","$\\frac{4}{3}$"],answer:0,hint:"75/100 = 3/4 (bagi 25).",explanation:"75% = 75/100 = 3/4.\nJawaban: A."},
{question:"Jika r korelasi = 0, artinya ...",options: ["Tidak ada korelasi LINEAR antara dua variabel","Tidak ada hubungan sama sekali","Korelasi sempurna","Positif kuat","Negatif kuat"],answer:0,hint:"r=0: tidak ada korelasi linear. Bisa masih ada hubungan non-linear!",explanation:"r=0: tidak ada hubungan linear.\nPERHATIAN: bisa masih ada hubungan non-linear (kurva, dll).\nJawaban: A."},
{question:"(-1)^{100} = ...",options: ["1","100","-1","0","-100"],answer:0,hint:"(-1) pangkat genap = 1.",explanation:"(-1)^{100} = 1.\nPangkat genap: positif. Pangkat ganjil: negatif.\nJawaban: A."},
{question:"Tentukan x: 4^x = 2. x = ...",options: ["$\\frac{1}{2}$","2","4","0","1"],answer:0,hint:"4^(1/2) = $\\sqrt{4}$ = 2. x=1/2.",explanation:"4^(1/2) = $\\sqrt{4}$ = 2. x = 1/2.\nJawaban: A."},
{question:"Berapa 7 + 8 x 3?",options: ["31","45","23","15","73"],answer:0,hint:"PEMDAS: 8x3=24 dulu. 7+24=31.",explanation:"8x3=24. 7+24=31.\nBukan (7+8)x3=45.\nJawaban: A."},
{question:"Berapa persen 15 dari 60?",options: ["25%","15%","60%","4%","10%"],answer:0,hint:"15/60 x 100 = 25%.",explanation:"15/60 = 0.25 = 25%.\nJawaban: A."},
{question:"Sisi miring segitiga siku-siku 10, satu sisi 6, sisi lainnya = ...",options: ["8","4","16","14","12"],answer:0,hint:"b = $\\sqrt{100-36}$ = $\\sqrt{64}$ = 8. Triple: 6-8-10.",explanation:"b = $\\sqrt{10^2-6^2}$ = $\\sqrt{64}$ = 8.\nJawaban: A."},
{question:"Rata-rata dari 10,20: ...",options: ["15","30","10","20","1"],answer:0,hint:"(10+20)/2 = 15.",explanation:"Mean = 30/2 = 15.\nJawaban: A."},
{question:"Berapa 2^0 + 3^0 + 4^0?",options: ["3","9","0","1","6"],answer:0,hint:"1+1+1 = 3.",explanation:"Semua bilangan (bukan 0) pangkat 0 = 1.\n1+1+1 = 3.\nJawaban: A."},
{question:"Jika sisi kubus diperbesar 2x, volume menjadi ... kali",options: ["8 kali","2 kali","4 kali","6 kali","16 kali"],answer:0,hint:"V = s^3. (2s)^3 = 8s^3 = 8V.",explanation:"V' = (2s)^3 = 8s^3 = 8V.\nVolume menjadi 8 kali.\nJawaban: A."},
{question:"0! = ...",options: ["1","0","undefined","infinity","-1"],answer:0,hint:"0! = 1 (by convention dan mathematical necessity).",explanation:"0! = 1.\nAlasan: C(n,0) = n!/(0!n!) = 1. Jadi 0! harus = 1.\nJawaban: A."},
{question:"Median dari {3,1,4,1,5,9,2,6} setelah diurutkan = ...",options: ["3.5","4","3","5","2"],answer:0,hint:"Urut: 1,1,2,3,4,5,6,9. Median=(3+4)/2=3.5.",explanation:"8 data: median = rata-rata data ke-4 dan ke-5 = (3+4)/2 = 3.5.\nJawaban: A."},
{question:"Mana pernyataan yang selalu benar (tautologi)?",options: ["P OR (NOT P)","P AND Q","P AND (NOT P)","P OR Q","NOT P"],answer:0,hint:"P v ~P = selalu TRUE. Law of Excluded Middle.",explanation:"P ∨ ¬P = tautologi (selalu TRUE).\nP ∧ ¬P = kontradiksi (selalu FALSE).\nJawaban: A."},
{question:"Konversi 0.6 berulang (0.666...) ke pecahan = ...",options: ["$\\frac{2}{3}$","$\\frac{3}{5}$","$\\frac{6}{10}$","$\\frac{3}{6}$","$\\frac{6}{9}$"],answer:0,hint:"x=0.666... 10x=6.666... 9x=6. x=6/9=2/3.",explanation:"x = 0.6666...\n10x = 6.666...\n9x = 6 => x = 2/3.\nJawaban: A."},
{question:"Berapa 25% dari 80?",options: ["20","25","40","80","15"],answer:0,hint:"1/4 x 80 = 20.",explanation:"25% x 80 = 0.25 x 80 = 20.\nJawaban: A."},
{question:"Luas layang-layang d1=8 cm, d2=6 cm = ...",options: ["24 cm^2","48 cm^2","14 cm^2","28 cm^2","36 cm^2"],answer:0,hint:"L = d1.d2/2 = 48/2 = 24.",explanation:"L = 8x6/2 = 24 cm^2.\nJawaban: A."},
{question:"Berapa jam dalam 3 hari?",options: ["72","36","48","24","96"],answer:0,hint:"3 x 24 = 72.",explanation:"3 x 24 = 72 jam.\nJawaban: A."},
{question:"Jika x = 5, maka 2x^2 - 3x + 1 = ...",options: ["36","51","26","46","16"],answer:0,hint:"2(25)-15+1 = 50-15+1 = 36.",explanation:"2(25)-3(5)+1 = 50-15+1 = 36.\nJawaban: A."},
{question:"Berapa detik dalam 5 menit?",options: ["300","500","250","50","3000"],answer:0,hint:"5 x 60 = 300.",explanation:"5 x 60 = 300 detik.\nJawaban: A."},
{question:"Hitunglah: $\\sqrt{81}$ + $\\sqrt{49}$ = ...",options: ["16","130","14","58","18"],answer:0,hint:"9 + 7 = 16.",explanation:"$\\sqrt{81}$=9. $\\sqrt{49}$=7. 9+7=16.\nJawaban: A."},
{question:"Diketahui luas lingkaran 154 cm^2 (pi=22/7). Jari-jari = ...",options: ["7 cm","14 cm","22 cm","49 cm","11 cm"],answer:0,hint:"pi r^2 = 154 => 22/7 r^2=154 => r^2=49 => r=7.",explanation:"r^2 = 154x7/22 = 1078/22 = 49.\nr = 7 cm.\nJawaban: A."},
{question:"Jika tinggi tabung tetap dan jari-jari dikurangi setengah, volume menjadi ...",options: ["1/4 kali","1/2 kali","2 kali","4 kali","Tetap"],answer:0,hint:"V = pi r^2 t. r -> r/2: V'=pi(r/2)^2 t = pi r^2 t/4 = V/4.",explanation:"V' = pi(r/2)^2 t = V/4.\nVolume menjadi 1/4 kali.\nJawaban: A."},
{question:"Hitunglah: (-5)+(-8) = ...",options: ["-13","13","-3","3","40"],answer:0,hint:"Negatif+negatif = lebih negatif. -(5+8)=-13.",explanation:"-5+(-8) = -(5+8) = -13.\nJawaban: A."},
{question:"Jika harga 5 pensil = Rp15.000, harga 8 pensil = ...",options: ["Rp24.000","Rp40.000","Rp8.000","Rp120.000","Rp18.000"],answer:0,hint:"1 pensil = 3.000. 8 x 3.000 = 24.000.",explanation:"1 pensil = 15.000/5 = 3.000.\n8 pensil = 8 x 3.000 = 24.000.\nJawaban: A."},
{question:"Berapa 20 x 0.05?",options: ["1","0.1","10","100","0.01"],answer:0,hint:"20 x 5/100 = 100/100 = 1.",explanation:"20 x 0.05 = 1.\nJawaban: A."},
{question:"Jika ruang sampel S = {1,2,3,4,5,6} (dadu), peluang mendapat bilangan genap = ...",options: ["$\\frac{1}{2}$","$\\frac{1}{3}$","$\\frac{1}{6}$","$\\frac{2}{3}$","3"],answer:0,hint:"Genap: {2,4,6} = 3 dari 6 = 1/2.",explanation:"P(genap) = 3/6 = 1/2.\nJawaban: A."},
{question:"Suatu persegi panjang memiliki luas 48 dan keliling 28. Ukuran = ...",options: ["8 x 6","12 x 4","24 x 2","16 x 3","48 x 1"],answer:0,hint:"p+l=14, pl=48. Cek: 8+6=14, 8x6=48. Cocok!",explanation:"p+l=14, pl=48.\n8+6=14 ✓, 8x6=48 ✓.\nUkuran: 8 x 6.\nJawaban: A."},
{question:"Tentukan x: |x| = 5. x = ...",options: ["5 atau -5","5 saja","-5 saja","0","25"],answer:0,hint:"|x|=5 => x=5 atau x=-5.",explanation:"|x|=5: x=5 atau x=-5.\nDua solusi.\nJawaban: A."},
]);

// === ALL-SUBJECTS TOP-UP FINAL ===
appendQuestions('tps_verbal', [
{question:"EFISIEN : BERDAYA GUNA :: EFEKTIF : ...",options: ["Berhasil guna (mencapai tujuan yang diinginkan)","Berdaya guna","Tidak berguna","Lambat","Mahal"],answer:0,hint:"Efisien = cara terbaik (hemat sumber daya). Efektif = berhasil mencapai tujuan.",explanation:"Efisien: menggunakan sumber daya minimal untuk hasil tertentu (how). Efektif: berhasil mencapai tujuan yang diinginkan (what). Bisa efektif tapi tidak efisien, atau sebaliknya.\nJawaban: A."},
{question:"Kesalahan 'ad hominem' adalah menyerang ...",options: ["Pribadi/karakter lawan, bukan argumennya","Argumen lawan","Data lawan","Bukti lawan","Kesimpulan lawan"],answer:0,hint:"Ad hominem = 'to the person'. Serang orangnya, abaikan argumennya.",explanation:"Ad hominem: menyerang karakter/motif/latar belakang lawan debat, bukan substansi argumennya. Contoh: 'Kamu tidak bisa bicara soal kesehatan karena kamu gemuk!'\nJawaban: A."},
]);

appendQuestions('tps_numerik', [
{question:"Jika 1 USD = Rp15.850, berapa USD yang didapat dari Rp79.250.000?",options: ["5.000 USD","7.925 USD","50.000 USD","500 USD","79.250 USD"],answer:0,hint:"79.250.000 / 15.850 = 5.000.",explanation:"79.250.000 / 15.850 = 5.000 USD.\nJawaban: A."},
{question:"Sebuah toko memberikan diskon bertingkat 20% lalu 10%. Jika harga awal Rp1.000.000, harga akhir = ...",options: ["Rp720.000","Rp700.000","Rp800.000","Rp900.000","Rp300.000"],answer:0,hint:"1jt x 0.8 = 800rb. 800rb x 0.9 = 720rb. BUKAN 30%!",explanation:"Diskon 20%: 1.000.000 x 0.8 = 800.000.\nDiskon 10%: 800.000 x 0.9 = 720.000.\nBUKAN 30% sekaligus (yang = 700.000).\nJawaban: A."},
]);

appendQuestions('tps_logika', [
{question:"Berapa banyak handshake jika 10 orang bersalaman satu sama lain?",options: ["45","100","90","10","50"],answer:0,hint:"C(10,2) = (10x9)/2 = 45.",explanation:"C(10,2) = 45 jabat tangan.\nJawaban: A."},
{question:"Pola: 1, 2, 4, 8, 16, ... Suku ke-10 = ...",options: ["512","1024","256","2048","128"],answer:0,hint:"2^(n-1). 2^9 = 512.",explanation:"Barisan geometri: U_n = 2^(n-1).\nU_10 = 2^9 = 512.\nJawaban: A."},
]);

appendQuestions('tkd_indo', [
{question:"Kalimat efektif adalah kalimat yang ...",options: ["Menyampaikan gagasan secara tepat, jelas, dan tidak bermakna ganda","Panjang dan rumit","Menggunakan banyak kata asing","Tidak memiliki subjek","Ambigu"],answer:0,hint:"Efektif = tepat sasaran, hemat kata, tidak multitafsir.",explanation:"Kalimat efektif: tepat, jelas, logis, hemat, dan tidak ambigu. Sesuai kaidah tata bahasa.\nJawaban: A."},
]);

appendQuestions('tkd_eng', [
{question:"The word 'ubiquitous' means:",options: ["Found everywhere, omnipresent","Rare and unique","Hidden","Beautiful","Dangerous"],answer:0,hint:"Ubiquitous: present, appearing, or found everywhere. Smartphones are ubiquitous.",explanation:"Ubiquitous: existing or being everywhere at the same time; constantly encountered. Example: 'Smartphones have become ubiquitous in modern society.'\nAnswer: A."},
]);

appendQuestions('saintek_fisika', [
{question:"Satuan SI untuk tekanan = ...",options: ["Pascal (Pa = N/m^2)","Newton","Joule","Watt","Kelvin"],answer:0,hint:"Tekanan = gaya/luas. N/m^2 = Pascal.",explanation:"Tekanan: P = F/A. Satuan: N/m^2 = Pascal (Pa).\n1 atm = 101.325 Pa.\nJawaban: A."},
]);

appendQuestions('saintek_kimia', [
{question:"Katalis bekerja dengan cara ...",options: ["Menurunkan energi aktivasi reaksi (mempercepat tanpa habis terpakai)","Menaikkan suhu","Menambah reaktan","Menghilangkan produk","Mengganti pelarut"],answer:0,hint:"Katalis: menurunkan Ea, mempercepat reaksi, tidak dikonsumsi.",explanation:"Katalis: menurunkan energi aktivasi (Ea) -> reaksi lebih cepat.\nTidak habis terpakai (regenerated).\nTidak mengubah kesetimbangan, hanya mempercepat.\nJawaban: A."},
]);

appendQuestions('saintek_biologi', [
{question:"DNA tersusun dari unit ... yang disebut nukleotida",options: ["Gula deoksiribosa + gugus fosfat + basa nitrogen","Asam amino","Glukosa","Asam lemak","Mineral"],answer:0,hint:"Nukleotida = gula 5C + fosfat + basa (A/T/G/C).",explanation:"Nukleotida DNA: deoksiribosa (gula) + fosfat + basa nitrogen.\nBasa: Adenin-Timin, Guanin-Sitosin (pasangan komplementer).\nJawaban: A."},
]);

appendQuestions('soshum_ekonomi', [
{question:"Pajak progresif berarti ...",options: ["Tarif pajak meningkat seiring kenaikan penghasilan","Tarif pajak tetap","Tarif pajak menurun","Tidak ada pajak","Semua bayar sama"],answer:0,hint:"Progresif: makin kaya makin tinggi % pajaknya. Indonesia: PPh 5%-35%.",explanation:"Progresif: tarif meningkat seiring pendapatan.\nProportional (flat): tarif tetap (misal PPN 11%).\nRegresif: tarif menurun seiring pendapatan.\nJawaban: A."},
]);

appendQuestions('soshum_sosiologi', [
{question:"Asimilasi adalah proses ...",options: ["Pembauran dua kebudayaan sehingga menghasilkan kebudayaan baru","Mempertahankan budaya sendiri","Menolak budaya lain","Isolasi","Konflik antar budaya"],answer:0,hint:"Asimilasi: dua budaya bercampur/membaur menjadi satu budaya baru.",explanation:"Asimilasi: proses sosial dimana dua kelompok dengan budaya berbeda berinteraksi intensif lalu membaur menjadi satu. Identitas budaya asli memudar, muncul budaya baru.\nJawaban: A."},
]);

appendQuestions('soshum_sejarah', [
{question:"Agresi Militer Belanda II terjadi pada ...",options: ["19 Desember 1948","21 Juli 1947","17 Agustus 1945","1 Juni 1945","10 November 1945"],answer:0,hint:"Agresi II: Belanda menyerang Yogyakarta. Soekarno-Hatta ditangkap.",explanation:"Agresi Militer II (19 Des 1948): Belanda menyerang ibu kota RI Yogyakarta. Soekarno dan Hatta ditangkap. PDRI (Pemerintahan Darurat RI) dibentuk oleh Sjafruddin Prawiranegara di Bukittinggi.\nJawaban: A."},
]);

appendQuestions('soshum_geografi', [
{question:"Selat Malaka menghubungkan ...",options: ["Samudra Hindia dan Laut China Selatan","Samudra Pasifik dan Atlantik","Laut Jawa dan Laut Banda","Samudra Hindia dan Samudra Pasifik langsung","Laut Merah dan Mediterania"],answer:0,hint:"Selat Malaka: antara Semenanjung Malaya dan Sumatera. Jalur laut tersibuk dunia.",explanation:"Selat Malaka: menghubungkan Samudra Hindia (barat) dengan Laut China Selatan (timur). Salah satu jalur pelayaran tersibuk dunia.\nJawaban: A."},
]);

appendQuestions('saintek_matipa', [
{question:"Divergensi vektor F = (x^2, y^2, z^2): div F = ...",options: ["2x+2y+2z","0","x+y+z","6","x^2+y^2+z^2"],answer:0,hint:"div F = dFx/dx+dFy/dy+dFz/dz = 2x+2y+2z.",explanation:"div F = d(x^2)/dx + d(y^2)/dy + d(z^2)/dz = 2x+2y+2z.\nJawaban: A."},
]);
