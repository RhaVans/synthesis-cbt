const REGEX_LATEX_TOKEN = /\$[^\$]+\$|(?:^|[^a-zA-Z])(\\[a-zA-Z]+(?:_(?:\{[^{}]*\}|[a-zA-Z0-9])|\^(?:\{[^{}]*\}|[a-zA-Z0-9])|\{[^{}]*\}|\([^)]*\))*|[a-zA-Z0-9]\^(?:\{[^{}]*\}|[\-0-9]+)|[a-zA-Z0-9]_(?:\{[^{}]*\}|[a-zA-Z0-9]))/g;

function prewrapMath(text) {
    if (!text) return text;
    // Replace logic to keep the prefix intact if we matched standard token
    return text.replace(REGEX_LATEX_TOKEN, (match, g1) => {
        if (match.startsWith('$')) {
            return match; // already wrapped
        }
        if (g1) {
            let prefix = match.slice(0, match.length - g1.length);
            return prefix + '$' + g1 + '$';
        }
        return '$' + match + '$';
    });
}

console.log(prewrapMath("tkd_matdas"));
console.log(prewrapMath("x_1"));
console.log(prewrapMath("x^-1"));
console.log(prewrapMath(" $x^2$ "));
console.log(prewrapMath("a \\frac{1}{2}"));
console.log(prewrapMath("\\beta"));
