const regex = /\$[^\$]+\$|\\[a-zA-Z]+(?:_(?:\{[^{}]*\}|[a-zA-Z0-9])|\^(?:\{[^{}]*\}|[a-zA-Z0-9])|\{[^{}]*\}|\([^)]*\))*|(?:\b|(?<=\s))[a-zA-Z0-9]+(?:_(?:\{[^{}]*\}|[a-zA-Z0-9])|\^(?:\{[^{}]*\}|[0-9a-zA-Z-]+))/g;

function prewrapMath(text) {
    if (!text) return text;
    // Update the quick check as well if we allow multiple characters before ^ or _
    // Wait, if we allow `[a-zA-Z0-9]+_` we might match `tkd_matdas`.
    // But `tkd` is a word boundary, `_` is a word boundary? No, `\b` considers `_` as word character.
    // Let's test this carefully.
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
