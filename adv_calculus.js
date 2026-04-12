// ============================================
// ADVANCED CHALLENGE — Kalkulus (250 soal)
// Questions 126-500: Calculus 1, 2, ODE, Series
// ============================================

registerQuestions('adv_calculus', [
// [Limit Substitusi dan Pemfaktoran] 126-140
{question:"Hitung $\\lim_{x \\to 2} (3x^2 - x + 4)$.",options:["$14$","$10$","$12$","$16$","$8$"],answer:0,hint:"Substitusi langsung: $3(4) - 2 + 4$.",explanation:"$3(2)^2 - 2 + 4 = 12 - 2 + 4 = 14$."},
{question:"Hitung $\\lim_{x \\to -1} (x^3 + 2x^2 - 5)$.",options:["$-4$","$-2$","$-6$","$0$","$-8$"],answer:0,hint:"Substitusi: $(-1)^3 + 2(-1)^2 - 5$.",explanation:"$(-1)^3 + 2(1) - 5 = -1 + 2 - 5 = -4$."},
{question:"Hitung $\\lim_{x \\to 0} (e^x + \\cos x)$.",options:["$2$","$1$","$0$","$e$","$3$"],answer:0,hint:"$e^0 = 1$, $\\cos 0 = 1$.",explanation:"$e^0 + \\cos 0 = 1 + 1 = 2$."},
{question:"Hitung $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$.",options:["$6$","$3$","$9$","$0$","$\\infty$"],answer:0,hint:"Faktorkan: $x^2-9 = (x-3)(x+3)$.",explanation:"$\\frac{(x-3)(x+3)}{x-3} = x+3$.\n$\\lim_{x \\to 3} (x+3) = 6$."},
{question:"Hitung $\\lim_{x \\to 5} \\frac{x^2 - 25}{x - 5}$.",options:["$10$","$5$","$25$","$0$","$\\infty$"],answer:0,hint:"$x^2-25 = (x-5)(x+5)$.",explanation:"$\\frac{(x-5)(x+5)}{x-5} = x+5$.\n$\\lim_{x \\to 5} (x+5) = 10$."},
{question:"Hitung $\\lim_{x \\to 1} \\frac{x^2 + x - 2}{x - 1}$.",options:["$3$","$2$","$1$","$0$","$4$"],answer:0,hint:"$x^2+x-2 = (x-1)(x+2)$.",explanation:"$\\frac{(x-1)(x+2)}{x-1} = x+2$.\n$\\lim_{x \\to 1} (x+2) = 3$."},
{question:"Hitung $\\lim_{x \\to 2} \\frac{x^3 - 8}{x - 2}$.",options:["$12$","$8$","$6$","$4$","$24$"],answer:0,hint:"$x^3-8 = (x-2)(x^2+2x+4)$.",explanation:"$\\frac{(x-2)(x^2+2x+4)}{x-2} = x^2+2x+4$.\n$\\lim_{x \\to 2} (4+4+4) = 12$."},
{question:"Hitung $\\lim_{h \\to 0} \\frac{(2+h)^2 - 4}{h}$.",options:["$4$","$2$","$0$","$8$","$h$"],answer:0,hint:"$(2+h)^2 = 4+4h+h^2$, kurangi 4, bagi $h$.",explanation:"$\\frac{4+4h+h^2-4}{h} = \\frac{4h+h^2}{h} = 4+h$.\n$\\lim_{h \\to 0} (4+h) = 4$."},

// [Limit Akar dan Tak Hingga] 141-155
{question:"Hitung $\\lim_{x \\to 4} \\frac{\\sqrt{x} - 2}{x - 4}$.",options:["$\\frac{1}{4}$","$\\frac{1}{2}$","$1$","$2$","$0$"],answer:0,hint:"Kalikan sekawan: $\\frac{\\sqrt{x}-2}{(\\sqrt{x}-2)(\\sqrt{x}+2)}$.",explanation:"$x-4 = (\\sqrt{x}-2)(\\sqrt{x}+2)$.\n$\\frac{1}{\\sqrt{x}+2} \\xrightarrow{x \\to 4} \\frac{1}{4}$."},
{question:"Hitung $\\lim_{x \\to \\infty} \\frac{3x + 5}{2x - 1}$.",options:["$\\frac{3}{2}$","$3$","$2$","$\\infty$","$0$"],answer:0,hint:"Bagi pembilang dan penyebut dengan $x$.",explanation:"$\\frac{3 + 5/x}{2 - 1/x} \\xrightarrow{x \\to \\infty} \\frac{3}{2}$."},
{question:"Hitung $\\lim_{x \\to \\infty} \\frac{4x^2 - x}{2x^2 + 3}$.",options:["$2$","$4$","$\\frac{1}{2}$","$\\infty$","$0$"],answer:0,hint:"Bagi dengan $x^2$.",explanation:"$\\frac{4 - 1/x}{2 + 3/x^2} \\xrightarrow{x \\to \\infty} \\frac{4}{2} = 2$."},
{question:"Hitung $\\lim_{x \\to \\infty} \\frac{5x}{x^2 + 1}$.",options:["$0$","$5$","$1$","$\\infty$","$\\frac{1}{5}$"],answer:0,hint:"Derajat pembilang < derajat penyebut.",explanation:"$\\frac{5/x}{1 + 1/x^2} \\xrightarrow{x \\to \\infty} 0$.\nDerajat pembilang (1) < penyebut (2)."},
{question:"Hitung $\\lim_{x \\to \\infty} (\\sqrt{x^2 + x} - x)$.",options:["$\\frac{1}{2}$","$0$","$1$","$\\infty$","$-\\frac{1}{2}$"],answer:0,hint:"Kalikan sekawan: $\\frac{(\\sqrt{x^2+x}-x)(\\sqrt{x^2+x}+x)}{\\sqrt{x^2+x}+x}$.",explanation:"$\\frac{x^2+x-x^2}{\\sqrt{x^2+x}+x} = \\frac{x}{\\sqrt{x^2+x}+x}$.\nBagi $x$: $\\frac{1}{\\sqrt{1+1/x}+1} \\to \\frac{1}{2}$."},

// [Limit Trigonometri] 156-165
{question:"Hitung $\\lim_{x \\to 0} \\frac{\\sin x}{x}$.",options:["$1$","$0$","$\\infty$","$-1$","$\\frac{1}{2}$"],answer:0,hint:"Limit fundamental trigonometri.",explanation:"$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$.\nIni adalah limit fundamental."},
{question:"Hitung $\\lim_{x \\to 0} \\frac{\\sin(3x)}{x}$.",options:["$3$","$1$","$0$","$\\frac{1}{3}$","$9$"],answer:0,hint:"$\\frac{\\sin 3x}{x} = 3 \\cdot \\frac{\\sin 3x}{3x}$.",explanation:"$\\frac{\\sin 3x}{x} = 3 \\cdot \\frac{\\sin 3x}{3x} \\to 3 \\cdot 1 = 3$."},
{question:"Hitung $\\lim_{x \\to 0} \\frac{\\sin(5x)}{\\sin(2x)}$.",options:["$\\frac{5}{2}$","$\\frac{2}{5}$","$1$","$5$","$2$"],answer:0,hint:"$\\frac{\\sin 5x}{\\sin 2x} = \\frac{5x}{2x} \\cdot \\frac{\\sin 5x/5x}{\\sin 2x/2x}$.",explanation:"$\\frac{\\sin 5x}{\\sin 2x} = \\frac{5}{2} \\cdot \\frac{\\sin 5x/(5x)}{\\sin 2x/(2x)} \\to \\frac{5}{2}$."},
{question:"Hitung $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2}$.",options:["$\\frac{1}{2}$","$0$","$1$","$2$","$\\infty$"],answer:0,hint:"Gunakan identitas $1-\\cos x = 2\\sin^2(x/2)$ atau L'Hôpital.",explanation:"L'Hôpital: $\\frac{\\sin x}{2x} \\to \\frac{1}{2}$.\nAtau: $\\frac{2\\sin^2(x/2)}{x^2} = \\frac{1}{2}\\left(\\frac{\\sin(x/2)}{x/2}\\right)^2 \\to \\frac{1}{2}$."},

// [Turunan Dasar] 171-185
{question:"Tentukan turunan pertama dari $f(x) = 5$.",options:["$0$","$5$","$1$","$5x$","$-5$"],answer:0,hint:"Turunan konstanta = 0.",explanation:"$f(x) = 5$ (konstanta).\n$f'(x) = 0$."},
{question:"Tentukan turunan pertama dari $f(x) = x^4$.",options:["$4x^3$","$x^3$","$3x^4$","$4x^4$","$x^5/5$"],answer:0,hint:"Power rule: $(x^n)' = nx^{n-1}$.",explanation:"$f'(x) = 4x^{4-1} = 4x^3$."},
{question:"Tentukan turunan pertama dari $f(x) = 4x^3 - 2x^2 + x - 7$.",options:["$12x^2 - 4x + 1$","$12x^2 - 4x$","$4x^2 - 2x + 1$","$12x^2 - 2x + 1$","$12x - 4$"],answer:0,hint:"Turunkan suku per suku.",explanation:"$f'(x) = 12x^2 - 4x + 1$.\nKonstanta $-7$ turunannya 0."},
{question:"Tentukan turunan pertama dari $f(x) = \\frac{1}{x}$.",options:["$-\\frac{1}{x^2}$","$\\frac{1}{x^2}$","$\\ln x$","$-\\frac{1}{2x}$","$\\frac{1}{2x}$"],answer:0,hint:"$\\frac{1}{x} = x^{-1}$. Power rule: $(-1)x^{-2}$.",explanation:"$f(x) = x^{-1}$.\n$f'(x) = -x^{-2} = -\\frac{1}{x^2}$."},
{question:"Tentukan turunan pertama dari $f(x) = \\sqrt{x}$.",options:["$\\frac{1}{2\\sqrt{x}}$","$\\frac{1}{\\sqrt{x}}$","$2\\sqrt{x}$","$\\frac{\\sqrt{x}}{2}$","$\\frac{1}{2x}$"],answer:0,hint:"$\\sqrt{x} = x^{1/2}$. Power rule: $\\frac{1}{2}x^{-1/2}$.",explanation:"$f(x) = x^{1/2}$.\n$f'(x) = \\frac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}$."},

// [Product Rule] 186-195
{question:"Tentukan turunan dari $f(x) = x \\sin x$.",options:["$\\sin x + x \\cos x$","$x \\cos x$","$\\cos x$","$\\sin x - x \\cos x$","$x \\sin x \\cos x$"],answer:0,hint:"Product rule: $(uv)' = u'v + uv'$.",explanation:"$f'(x) = (1)(\\sin x) + (x)(\\cos x) = \\sin x + x\\cos x$."},
{question:"Tentukan turunan dari $f(x) = e^x \\sin x$.",options:["$e^x(\\sin x + \\cos x)$","$e^x \\cos x$","$e^x \\sin x$","$e^x(\\sin x - \\cos x)$","$e^{2x} \\sin x$"],answer:0,hint:"$(e^x)' = e^x$, $(\\sin x)' = \\cos x$.",explanation:"$f'(x) = e^x \\sin x + e^x \\cos x = e^x(\\sin x + \\cos x)$."},
{question:"Tentukan turunan dari $f(x) = x^2 \\ln x$.",options:["$x(2\\ln x + 1)$","$2x \\ln x$","$\\frac{x^2}{x}$","$2x \\ln x + x$","$x^2 + \\ln x$"],answer:0,hint:"Product rule: $2x \\ln x + x^2 \\cdot \\frac{1}{x}$.",explanation:"$f'(x) = 2x\\ln x + x^2 \\cdot \\frac{1}{x} = 2x\\ln x + x = x(2\\ln x + 1)$."},

// [Quotient Rule] 196-205
{question:"Tentukan turunan dari $f(x) = \\frac{x}{x+1}$.",options:["$\\frac{1}{(x+1)^2}$","$\\frac{1}{x+1}$","$\\frac{x}{(x+1)^2}$","$\\frac{-1}{(x+1)^2}$","$\\frac{2x+1}{(x+1)^2}$"],answer:0,hint:"Quotient rule: $\\frac{u'v - uv'}{v^2}$.",explanation:"$f'(x) = \\frac{(1)(x+1) - x(1)}{(x+1)^2} = \\frac{1}{(x+1)^2}$."},
{question:"Tentukan turunan dari $f(x) = \\frac{\\ln x}{x}$.",options:["$\\frac{1 - \\ln x}{x^2}$","$\\frac{\\ln x}{x^2}$","$\\frac{1}{x^2}$","$\\frac{1 + \\ln x}{x^2}$","$\\frac{1}{x \\ln x}$"],answer:0,hint:"$u = \\ln x, u' = 1/x$. $v = x, v' = 1$.",explanation:"$f'(x) = \\frac{\\frac{1}{x} \\cdot x - \\ln x \\cdot 1}{x^2} = \\frac{1 - \\ln x}{x^2}$."},

// [Chain Rule] 206-215
{question:"Tentukan turunan dari $f(x) = (x^2 + 1)^5$.",options:["$10x(x^2+1)^4$","$5(x^2+1)^4$","$5x(x^2+1)^4$","$10(x^2+1)^4$","$2x(x^2+1)^5$"],answer:0,hint:"Chain rule: $5(x^2+1)^4 \\cdot 2x$.",explanation:"$f'(x) = 5(x^2+1)^4 \\cdot 2x = 10x(x^2+1)^4$."},
{question:"Tentukan turunan dari $f(x) = \\sin(2x)$.",options:["$2\\cos(2x)$","$\\cos(2x)$","$2\\sin(2x)$","$-2\\cos(2x)$","$\\sin(2x)\\cos(2x)$"],answer:0,hint:"Chain rule: $\\cos(2x) \\cdot 2$.",explanation:"$f'(x) = \\cos(2x) \\cdot 2 = 2\\cos(2x)$."},
{question:"Tentukan turunan dari $f(x) = e^{2x}$.",options:["$2e^{2x}$","$e^{2x}$","$2xe^{2x}$","$e^{2x+1}$","$xe^{2x}$"],answer:0,hint:"Chain rule: $e^{2x} \\cdot 2$.",explanation:"$f'(x) = e^{2x} \\cdot 2 = 2e^{2x}$."},
{question:"Tentukan turunan dari $f(x) = \\ln(x^2 + 1)$.",options:["$\\frac{2x}{x^2+1}$","$\\frac{1}{x^2+1}$","$\\frac{x}{x^2+1}$","$\\frac{2}{x^2+1}$","$2x\\ln(x^2+1)$"],answer:0,hint:"$\\frac{1}{x^2+1} \\cdot 2x$.",explanation:"$f'(x) = \\frac{1}{x^2+1} \\cdot 2x = \\frac{2x}{x^2+1}$."},
{question:"Tentukan turunan dari $f(x) = \\arctan(x)$.",options:["$\\frac{1}{1+x^2}$","$\\frac{1}{\\sqrt{1-x^2}}$","$\\frac{-1}{1+x^2}$","$\\frac{x}{1+x^2}$","$\\sec^2(x)$"],answer:0,hint:"Turunan arctan adalah $\\frac{1}{1+x^2}$.",explanation:"$\\frac{d}{dx}\\arctan(x) = \\frac{1}{1+x^2}$."},

// [Turunan Implisit] 231-240
{question:"Tentukan $\\frac{dy}{dx}$ dari $x^2 + y^2 = 25$.",options:["$-\\frac{x}{y}$","$\\frac{x}{y}$","$-\\frac{y}{x}$","$\\frac{y}{x}$","$-\\frac{2x}{y}$"],answer:0,hint:"Diferensialkan kedua ruas: $2x + 2y \\frac{dy}{dx} = 0$.",explanation:"$2x + 2y\\frac{dy}{dx} = 0$.\n$\\frac{dy}{dx} = -\\frac{x}{y}$."},
{question:"Tentukan $\\frac{dy}{dx}$ dari $xy = 1$.",options:["$-\\frac{y}{x}$","$\\frac{y}{x}$","$-\\frac{1}{x^2}$","$\\frac{1}{y}$","$-\\frac{x}{y}$"],answer:0,hint:"Product rule: $y + x\\frac{dy}{dx} = 0$.",explanation:"$y + x\\frac{dy}{dx} = 0$.\n$\\frac{dy}{dx} = -\\frac{y}{x}$."},

// [Garis Singgung] 251-260
{question:"Tentukan gradien garis singgung $y = x^2$ di $x = 2$.",options:["$4$","$2$","$8$","$1$","$0$"],answer:0,hint:"$y' = 2x$. Substitusi $x = 2$.",explanation:"$y' = 2x$.\nDi $x=2$: $y'(2) = 4$."},
{question:"Tentukan persamaan garis singgung $y = x^2$ di titik $(2, 4)$.",options:["$y = 4x - 4$","$y = 2x$","$y = 4x$","$y = 4x + 4$","$y = 2x + 4$"],answer:0,hint:"$y - y_1 = m(x - x_1)$ dengan $m = 4$.",explanation:"$m = y'(2) = 4$.\n$y - 4 = 4(x - 2) \\Rightarrow y = 4x - 4$."},
{question:"Tentukan persamaan garis singgung $y = e^x$ di $x = 0$.",options:["$y = x + 1$","$y = x$","$y = e^x$","$y = 1$","$y = x + e$"],answer:0,hint:"$y'(0) = e^0 = 1$. Titik: $(0, 1)$.",explanation:"$y' = e^x$, $y'(0) = 1$.\nTitik $(0, 1)$: $y - 1 = 1(x - 0)$.\n$y = x + 1$."},

// [Integral Dasar] 296-310
{question:"Tentukan $\\int 2x \\, dx$.",options:["$x^2 + C$","$2x^2 + C$","$x + C$","$\\frac{x^2}{2} + C$","$2 + C$"],answer:0,hint:"$\\int 2x \\, dx = 2 \\cdot \\frac{x^2}{2} + C$.",explanation:"$\\int 2x \\, dx = x^2 + C$."},
{question:"Tentukan $\\int x^2 \\, dx$.",options:["$\\frac{x^3}{3} + C$","$\\frac{x^2}{2} + C$","$2x + C$","$x^3 + C$","$\\frac{x^3}{2} + C$"],answer:0,hint:"$\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$.",explanation:"$\\int x^2 dx = \\frac{x^{2+1}}{2+1} + C = \\frac{x^3}{3} + C$."},
{question:"Tentukan $\\int \\sqrt{x} \\, dx$.",options:["$\\frac{2}{3}x^{3/2} + C$","$\\frac{1}{2\\sqrt{x}} + C$","$\\frac{x^{3/2}}{3} + C$","$2\\sqrt{x} + C$","$\\frac{\\sqrt{x}}{2} + C$"],answer:0,hint:"$\\sqrt{x} = x^{1/2}$. Gunakan power rule.",explanation:"$\\int x^{1/2} dx = \\frac{x^{3/2}}{3/2} + C = \\frac{2}{3}x^{3/2} + C$."},
{question:"Tentukan $\\int \\frac{1}{\\sqrt{x}} \\, dx$.",options:["$2\\sqrt{x} + C$","$\\frac{1}{2}\\sqrt{x} + C$","$-\\frac{1}{2}x^{-3/2} + C$","$\\ln\\sqrt{x} + C$","$\\sqrt{x} + C$"],answer:0,hint:"$\\frac{1}{\\sqrt{x}} = x^{-1/2}$.",explanation:"$\\int x^{-1/2} dx = \\frac{x^{1/2}}{1/2} + C = 2\\sqrt{x} + C$."},

// [Integral Trigonometri] 311-325
{question:"Tentukan $\\int \\sin x \\, dx$.",options:["$-\\cos x + C$","$\\cos x + C$","$-\\sin x + C$","$\\tan x + C$","$\\sin x + C$"],answer:0,hint:"$(\\cos x)' = -\\sin x$, jadi $\\int \\sin x = -\\cos x$.",explanation:"$\\int \\sin x \\, dx = -\\cos x + C$."},
{question:"Tentukan $\\int \\cos x \\, dx$.",options:["$\\sin x + C$","$-\\sin x + C$","$\\cos x + C$","$-\\cos x + C$","$\\tan x + C$"],answer:0,hint:"$(\\sin x)' = \\cos x$.",explanation:"$\\int \\cos x \\, dx = \\sin x + C$."},
{question:"Tentukan $\\int e^x \\, dx$.",options:["$e^x + C$","$xe^x + C$","$e^{x+1} + C$","$\\frac{e^x}{x} + C$","$\\ln(e^x) + C$"],answer:0,hint:"$e^x$ adalah antiturunan dari dirinya sendiri.",explanation:"$\\int e^x dx = e^x + C$."},
{question:"Tentukan $\\int \\frac{1}{x} \\, dx$.",options:["$\\ln|x| + C$","$\\frac{1}{x^2} + C$","$-\\frac{1}{x} + C$","$x + C$","$\\ln x + C$"],answer:0,hint:"Turunan dari $\\ln|x|$ adalah $\\frac{1}{x}$.",explanation:"$\\int \\frac{1}{x} dx = \\ln|x| + C$."},
{question:"Tentukan $\\int \\frac{1}{1+x^2} \\, dx$.",options:["$\\arctan x + C$","$\\arcsin x + C$","$\\ln(1+x^2) + C$","$\\frac{x}{1+x^2} + C$","$\\frac{1}{2}\\ln(1+x^2) + C$"],answer:0,hint:"Turunan $\\arctan x = \\frac{1}{1+x^2}$.",explanation:"$\\int \\frac{1}{1+x^2} dx = \\arctan x + C$."},

// [Substitusi] 326-345
{question:"Tentukan $\\int \\sin(2x) \\, dx$.",options:["$-\\frac{1}{2}\\cos(2x) + C$","$-\\cos(2x) + C$","$\\frac{1}{2}\\cos(2x) + C$","$-2\\cos(2x) + C$","$\\cos(2x) + C$"],answer:0,hint:"Substitusi $u = 2x$, $du = 2dx$.",explanation:"$u = 2x \\Rightarrow \\int \\sin u \\cdot \\frac{du}{2} = -\\frac{1}{2}\\cos(2x) + C$."},
{question:"Tentukan $\\int e^{2x} \\, dx$.",options:["$\\frac{1}{2}e^{2x} + C$","$e^{2x} + C$","$2e^{2x} + C$","$\\frac{e^{2x}}{2x} + C$","$e^{x^2} + C$"],answer:0,hint:"Substitusi $u = 2x$.",explanation:"$u = 2x \\Rightarrow \\int e^u \\cdot \\frac{du}{2} = \\frac{1}{2}e^{2x} + C$."},
{question:"Tentukan $\\int \\frac{2x}{x^2+1} \\, dx$.",options:["$\\ln(x^2+1) + C$","$\\frac{1}{x^2+1} + C$","$\\arctan x + C$","$2\\ln(x^2+1) + C$","$(x^2+1)^2 + C$"],answer:0,hint:"Substitusi $u = x^2+1$, $du = 2x\\,dx$.",explanation:"$u = x^2+1, du = 2x\\,dx$.\n$\\int \\frac{du}{u} = \\ln|u| + C = \\ln(x^2+1) + C$."},
{question:"Tentukan $\\int \\frac{\\ln x}{x} \\, dx$.",options:["$\\frac{1}{2}(\\ln x)^2 + C$","$\\frac{(\\ln x)^2}{x} + C$","$\\ln(\\ln x) + C$","$x \\ln x + C$","$\\frac{\\ln x}{2} + C$"],answer:0,hint:"Substitusi $u = \\ln x$, $du = \\frac{1}{x}dx$.",explanation:"$u = \\ln x$.\n$\\int u \\, du = \\frac{u^2}{2} + C = \\frac{(\\ln x)^2}{2} + C$."},

// [Integral Parsial] 346-355
{question:"Tentukan $\\int x e^x \\, dx$.",options:["$(x-1)e^x + C$","$xe^x + C$","$\\frac{x^2}{2}e^x + C$","$(x+1)e^x + C$","$e^x + C$"],answer:0,hint:"Integration by parts: $u=x, dv=e^x dx$.",explanation:"$u=x, dv=e^x dx$.\n$du=dx, v=e^x$.\n$xe^x - \\int e^x dx = xe^x - e^x + C = (x-1)e^x + C$."},
{question:"Tentukan $\\int \\ln x \\, dx$.",options:["$x\\ln x - x + C$","$\\frac{\\ln x}{x} + C$","$x\\ln x + C$","$\\frac{(\\ln x)^2}{2} + C$","$\\ln x - x + C$"],answer:0,hint:"$u = \\ln x, dv = dx$.",explanation:"$u=\\ln x, dv=dx$.\n$du=\\frac{1}{x}dx, v=x$.\n$x\\ln x - \\int 1\\,dx = x\\ln x - x + C$."},
{question:"Tentukan $\\int x \\sin x \\, dx$.",options:["$-x\\cos x + \\sin x + C$","$x\\cos x + C$","$-x\\cos x + C$","$x\\sin x - \\cos x + C$","$\\sin x - x\\cos x + C$"],answer:0,hint:"$u=x, dv=\\sin x\\,dx$.",explanation:"$u=x, dv=\\sin x\\,dx$.\n$du=dx, v=-\\cos x$.\n$-x\\cos x + \\int \\cos x\\,dx = -x\\cos x + \\sin x + C$."},

// [Integral Tentu] 361-375
{question:"Hitung $\\int_0^1 x \\, dx$.",options:["$\\frac{1}{2}$","$1$","$0$","$\\frac{1}{3}$","$2$"],answer:0,hint:"$[\\frac{x^2}{2}]_0^1$.",explanation:"$\\int_0^1 x\\,dx = \\left[\\frac{x^2}{2}\\right]_0^1 = \\frac{1}{2} - 0 = \\frac{1}{2}$."},
{question:"Hitung $\\int_0^\\pi \\sin x \\, dx$.",options:["$2$","$0$","$1$","$\\pi$","$-2$"],answer:0,hint:"$[-\\cos x]_0^\\pi$.",explanation:"$[-\\cos x]_0^\\pi = -\\cos\\pi + \\cos 0 = 1 + 1 = 2$."},
{question:"Hitung $\\int_0^1 e^x \\, dx$.",options:["$e - 1$","$e$","$1$","$e + 1$","$e^2 - 1$"],answer:0,hint:"$[e^x]_0^1$.",explanation:"$[e^x]_0^1 = e^1 - e^0 = e - 1$."},
{question:"Hitung $\\int_1^e \\frac{1}{x} \\, dx$.",options:["$1$","$e$","$\\ln e$","$e - 1$","$0$"],answer:0,hint:"$[\\ln x]_1^e$.",explanation:"$[\\ln x]_1^e = \\ln e - \\ln 1 = 1 - 0 = 1$."},

// [Luas Daerah] 391-410
{question:"Tentukan luas daerah di bawah kurva $y = x^2$ pada $[0, 2]$.",options:["$\\frac{8}{3}$","$4$","$\\frac{4}{3}$","$2$","$8$"],answer:0,hint:"$\\int_0^2 x^2 dx$.",explanation:"$\\int_0^2 x^2 dx = \\left[\\frac{x^3}{3}\\right]_0^2 = \\frac{8}{3}$."},
{question:"Tentukan luas daerah di bawah kurva $y = \\sin x$ pada $[0, \\pi]$.",options:["$2$","$\\pi$","$1$","$0$","$4$"],answer:0,hint:"$\\int_0^\\pi \\sin x \\, dx$.",explanation:"$\\int_0^\\pi \\sin x \\, dx = [-\\cos x]_0^\\pi = 1 + 1 = 2$."},
{question:"Tentukan luas daerah antara garis $y = x$ dan $y = x^2$.",options:["$\\frac{1}{6}$","$\\frac{1}{3}$","$\\frac{1}{2}$","$1$","$\\frac{1}{4}$"],answer:0,hint:"Titik potong: $x=x^2 \\Rightarrow x=0,1$. $\\int_0^1 (x-x^2)dx$.",explanation:"$\\int_0^1 (x-x^2)dx = \\left[\\frac{x^2}{2}-\\frac{x^3}{3}\\right]_0^1 = \\frac{1}{2}-\\frac{1}{3} = \\frac{1}{6}$."},

// [Volume Benda Putar] 411-425
{question:"Tentukan volume benda putar kurva $y = x^2$ pada $[0,1]$ mengelilingi sumbu-$x$.",options:["$\\frac{\\pi}{5}$","$\\frac{\\pi}{3}$","$\\pi$","$\\frac{2\\pi}{5}$","$\\frac{\\pi}{4}$"],answer:0,hint:"$V = \\pi\\int_0^1 (x^2)^2 dx = \\pi\\int_0^1 x^4 dx$.",explanation:"$V = \\pi\\int_0^1 x^4 dx = \\pi\\left[\\frac{x^5}{5}\\right]_0^1 = \\frac{\\pi}{5}$."},
{question:"Tentukan volume bola berjari-jari $R$ menggunakan integral putar.",options:["$\\frac{4}{3}\\pi R^3$","$\\frac{2}{3}\\pi R^3$","$\\pi R^3$","$\\frac{4}{3}\\pi R^2$","$2\\pi R^3$"],answer:0,hint:"$y = \\sqrt{R^2-x^2}$, putar mengelilingi sumbu-$x$ dari $-R$ ke $R$.",explanation:"$V = \\pi\\int_{-R}^R (R^2-x^2)dx = \\pi\\left[R^2x - \\frac{x^3}{3}\\right]_{-R}^R = \\frac{4}{3}\\pi R^3$."},

// [L'Hôpital] 286-295
{question:"Gunakan L'Hôpital: hitung $\\lim_{x \\to 0} \\frac{e^x - 1}{x}$.",options:["$1$","$0$","$e$","$\\infty$","$-1$"],answer:0,hint:"Bentuk $0/0$. L'Hôpital: $\\frac{e^x}{1}$.",explanation:"Bentuk $\\frac{0}{0}$.\nL'Hôpital: $\\lim \\frac{e^x}{1} = e^0 = 1$."},
{question:"Gunakan L'Hôpital: hitung $\\lim_{x \\to \\infty} \\frac{\\ln x}{x}$.",options:["$0$","$1$","$\\infty$","$-\\infty$","$e$"],answer:0,hint:"Bentuk $\\infty/\\infty$. L'Hôpital: $\\frac{1/x}{1}$.",explanation:"Bentuk $\\frac{\\infty}{\\infty}$.\nL'Hôpital: $\\lim \\frac{1/x}{1} = 0$."},
{question:"Gunakan L'Hôpital: hitung $\\lim_{x \\to 0} \\frac{x - \\sin x}{x^3}$.",options:["$\\frac{1}{6}$","$0$","$\\frac{1}{3}$","$1$","$\\frac{1}{2}$"],answer:0,hint:"Terapkan L'Hôpital 3 kali.",explanation:"$\\frac{0}{0} \\to \\frac{1-\\cos x}{3x^2} \\to \\frac{\\sin x}{6x} \\to \\frac{\\cos x}{6} = \\frac{1}{6}$."},

// [Persamaan Diferensial] 431-450
{question:"Selesaikan persamaan diferensial $\\frac{dy}{dx} = 2x$.",options:["$y = x^2 + C$","$y = 2x + C$","$y = x^2$","$y = 2x^2 + C$","$y = \\frac{x^2}{2} + C$"],answer:0,hint:"Integralkan kedua ruas terhadap $x$.",explanation:"$y = \\int 2x\\,dx = x^2 + C$."},
{question:"Selesaikan persamaan diferensial $\\frac{dy}{dx} = y$.",options:["$y = Ce^x$","$y = e^x$","$y = x + C$","$y = C\\ln x$","$y = Ce^{-x}$"],answer:0,hint:"Pisahkan variabel: $\\frac{dy}{y} = dx$.",explanation:"$\\frac{dy}{y} = dx \\Rightarrow \\ln|y| = x + C_1 \\Rightarrow y = Ce^x$."},
{question:"Selesaikan $\\frac{dy}{dx} = ky$ (pertumbuhan proporsional).",options:["$y = Ce^{kx}$","$y = kx + C$","$y = Ce^x$","$y = Cx^k$","$y = e^{kx}$"],answer:0,hint:"Ini adalah model pertumbuhan eksponensial.",explanation:"$\\frac{dy}{y} = k\\,dx \\Rightarrow \\ln|y| = kx + C_1 \\Rightarrow y = Ce^{kx}$."},
{question:"Tentukan solusi khusus $\\frac{dy}{dx} = y$ jika $y(0) = 5$.",options:["$y = 5e^x$","$y = e^{5x}$","$y = 5x$","$y = e^x + 4$","$y = 5e^{-x}$"],answer:0,hint:"Solusi umum: $y = Ce^x$. $y(0) = 5 \\Rightarrow C = 5$.",explanation:"$y = Ce^x$, $y(0) = C = 5$.\n$y = 5e^x$."},

// [Deret] 451-465
{question:"Tentukan jumlah tak hingga dari deret geometri $1 + \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\cdots$",options:["$2$","$\\infty$","$1$","$4$","$\\frac{3}{2}$"],answer:0,hint:"$S = \\frac{a}{1-r} = \\frac{1}{1-1/2}$.",explanation:"$a = 1, r = 1/2$.\n$S = \\frac{1}{1-1/2} = \\frac{1}{1/2} = 2$."},
{question:"Apakah deret harmonik $\\sum_{n=1}^\\infty \\frac{1}{n}$ konvergen atau divergen?",options:["Divergen","Konvergen","Konvergen ke 1","Konvergen ke $e$","Tidak dapat ditentukan"],answer:0,hint:"Deret harmonik adalah contoh klasik deret yang divergen.",explanation:"Deret harmonik $\\sum 1/n$ divergen.\nMeskipun $1/n \\to 0$, jumlah parsial tumbuh tanpa batas.\nDapat ditunjukkan dengan uji integral atau perbandingan."},
{question:"Tuliskan 4 suku pertama deret Maclaurin untuk $\\sin x$.",options:["$x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\frac{x^7}{5040}$","$1 - \\frac{x^2}{2} + \\frac{x^4}{24}$","$x + \\frac{x^3}{6}$","$1 + x + \\frac{x^2}{2}$","$x - \\frac{x^2}{2} + \\frac{x^3}{6}$"],answer:0,hint:"$\\sin x = \\sum_{n=0}^\\infty \\frac{(-1)^n x^{2n+1}}{(2n+1)!}$.",explanation:"$\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\frac{x^7}{7!} + \\cdots$\n$= x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\frac{x^7}{5040} + \\cdots$"},
{question:"Tuliskan 4 suku pertama deret Maclaurin untuk $e^x$.",options:["$1 + x + \\frac{x^2}{2} + \\frac{x^3}{6}$","$x + \\frac{x^2}{2} + \\frac{x^3}{6}$","$1 + x + x^2 + x^3$","$1 - x + \\frac{x^2}{2}$","$e + ex + \\frac{ex^2}{2}$"],answer:0,hint:"$e^x = \\sum_{n=0}^\\infty \\frac{x^n}{n!}$.",explanation:"$e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$\n$= 1 + x + \\frac{x^2}{2} + \\frac{x^3}{6} + \\cdots$"},

// [Soal Kombinasi] 466-500
{question:"Diberikan $f(x) = \\int_0^x e^{-t^2} dt$. Tentukan $f'(x)$.",options:["$e^{-x^2}$","$-2xe^{-x^2}$","$\\int e^{-x^2}dx$","$e^{x^2}$","$0$"],answer:0,hint:"FTC bagian 1: $\\frac{d}{dx}\\int_0^x g(t)dt = g(x)$.",explanation:"Teorema Dasar Kalkulus:\n$f'(x) = e^{-x^2}$."},
{question:"Tentukan integral tak wajar $\\int_1^\\infty \\frac{1}{x^2} dx$.",options:["$1$","$\\infty$","$0$","$2$","$\\frac{1}{2}$"],answer:0,hint:"$\\int_1^b x^{-2}dx = [-1/x]_1^b = 1 - 1/b$.",explanation:"$\\lim_{b\\to\\infty} \\left[-\\frac{1}{x}\\right]_1^b = \\lim_{b\\to\\infty}\\left(-\\frac{1}{b}+1\\right) = 1$.\nKonvergen."},
{question:"Tentukan integral tak wajar $\\int_0^\\infty e^{-x} dx$.",options:["$1$","$\\infty$","$0$","$e$","$-1$"],answer:0,hint:"$\\int_0^b e^{-x}dx = [-e^{-x}]_0^b = 1-e^{-b}$.",explanation:"$\\lim_{b\\to\\infty}[-e^{-x}]_0^b = 0-(-1) = 1$.\nKonvergen."},
{question:"Selesaikan persamaan $x^2 - 4x + 4 = 0$.",options:["$x = 2$ (akar kembar)","$x = 2$ atau $x = -2$","$x = 4$","$x = 0$ atau $x = 4$","$x = -2$"],answer:0,hint:"Faktorkan: $(x-2)^2 = 0$.",explanation:"$(x-2)^2 = 0 \\Rightarrow x = 2$ (akar kembar).\nDiskriminan = 0."},
{question:"Tentukan persamaan lingkaran berpusat di $(0,0)$ berjari-jari 5.",options:["$x^2 + y^2 = 25$","$x^2 + y^2 = 5$","$(x-5)^2 + y^2 = 25$","$x^2 + y^2 = 10$","$x + y = 5$"],answer:0,hint:"Persamaan lingkaran: $(x-h)^2+(y-k)^2 = r^2$.",explanation:"Pusat $(0,0)$, $r=5$.\n$x^2 + y^2 = 25$."},
{question:"Tentukan $(1+i)^2$.",options:["$2i$","$2$","$1+2i$","$2+2i$","$-2i$"],answer:0,hint:"$(1+i)^2 = 1 + 2i + i^2 = 1 + 2i - 1$.",explanation:"$(1+i)^2 = 1 + 2i + i^2 = 1 + 2i - 1 = 2i$."},
{question:"Tentukan hasil kali titik $\\vec{a} = \\langle 2, -1, 3 \\rangle$ dan $\\vec{b} = \\langle 4, 1, 2 \\rangle$.",options:["$13$","$9$","$11$","$7$","$15$"],answer:0,hint:"$\\vec{a} \\cdot \\vec{b} = (2)(4)+(-1)(1)+(3)(2)$.",explanation:"$\\vec{a} \\cdot \\vec{b} = 8 + (-1) + 6 = 13$."},
{question:"Sebutkan bunyi Teorema Dasar Kalkulus bagian 1.",options:["$\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)$","$\\int_a^b f'(x)dx = f(b)+f(a)$","$\\lim_{n\\to\\infty} \\sum f = \\int f$","$f'(c) = \\frac{f(b)-f(a)}{b-a}$","$\\int f \\cdot g = \\int f \\cdot \\int g$"],answer:0,hint:"FTC-1: turunan dari integral = fungsi integrand.",explanation:"FTC bagian 1: Jika $F(x) = \\int_a^x f(t)\\,dt$, maka $F'(x) = f(x)$.\nHubungan fundamental antara turunan dan integral."},
]);
