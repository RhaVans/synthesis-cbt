// If we want to allow single letter identifiers (like x_1, y^2), we can use:
// (?:\b|(?<=\s))[a-zA-Z]\^(?:\{[^{}]*\}|[0-9]+)|(?:\b|(?<=\s))[a-zA-Z]_(?:\{[^{}]*\}|[a-zA-Z0-9])
const regex = /\$[^\$]+\$|\\[a-zA-Z]+(?:_(?:\{[^{}]*\}|[a-zA-Z0-9])|\^(?:\{[^{}]*\}|[a-zA-Z0-9])|\{[^{}]*\}|\([^)]*\))*|(?:\b|(?<=\s))[a-zA-Z0-9]\^(?:\{[^{}]*\}|[0-9]+)|(?:\b|(?<=\s))[a-zA-Z0-9]_(?:\{[^{}]*\}|[a-zA-Z0-9])/g;

function prewrapMath(text) {
    if (!text) return text;
    if (!/\$|\\[a-zA-Z]|[a-zA-Z0-9]\^[{0-9]|[a-zA-Z0-9]_/.test(text)) return text;
    return text.replace(regex, match => {
        if (match.startsWith('$')) {
            return match; // already wrapped
        }
        return '$' + match + '$';
    });
}

console.log(prewrapMath("10^2=100"));
console.log(prewrapMath("x_1=2"));
console.log(prewrapMath("This is tkd_matdas something."));
console.log(prewrapMath("What about tkd_1?"));
console.log(prewrapMath("What about x_a?"));
