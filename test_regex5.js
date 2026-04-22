const regex = /\$[^\$]+\$|\\[a-zA-Z]+(?:_(?:\{[^{}]*\}|[a-zA-Z0-9])|\^(?:\{[^{}]*\}|[a-zA-Z0-9])|\{[^{}]*\}|\([^)]*\))*|(?<![a-zA-Z0-9])[a-zA-Z0-9]\^(?:\{[^{}]*\}|[0-9]+)|(?<![a-zA-Z0-9])[a-zA-Z0-9]_(?:\{[^{}]*\}|[a-zA-Z0-9])/g;

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
// Note: 10^2=100 will NOT match the third branch because of `(?<![a-zA-Z0-9])[a-zA-Z0-9]\^`. "10" is length 2.
// Wait, the regex expects single letter/number before ^. `[a-zA-Z0-9]\^` is ONE character.
// Ah, `(?<![a-zA-Z0-9])[a-zA-Z0-9]\^` means "a single character not preceded by letter/number".
// If "10", the '0' is preceded by '1'. So it doesn't match!
