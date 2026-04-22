const regex = /\$[^\$]+\$|\\[a-zA-Z]+(?:_(?:\{[^{}]*\}|[a-zA-Z0-9])|\^(?:\{[^{}]*\}|[a-zA-Z0-9])|\{[^{}]*\}|\([^)]*\))*|(?:\b|(?<=\s))[a-zA-Z0-9]+(?:\^(?:\{[^{}]*\}|[0-9a-zA-Z-]+))|(?:\b|(?<=\s))[a-zA-Z0-9]+(?:_(?:\{[^{}]*\}|[0-9]))/g;

function prewrapMath(text) {
    if (!text) return text;
    return text.replace(regex, match => {
        if (match.startsWith('$')) {
            return match; // already wrapped
        }
        return '$' + match + '$';
    });
}

console.log(prewrapMath("10^2=100"));
console.log(prewrapMath("10_{2}=100"));
console.log(prewrapMath("tkd_matdas"));
console.log(prewrapMath("tkd_1"));
console.log(prewrapMath("x_1"));
console.log(prewrapMath("y^2"));
