const regex = /\$[^\$]+\$|\\[a-zA-Z]+(?:_(?:\{[^{}]*\}|[a-zA-Z0-9])|\^(?:\{[^{}]*\}|[a-zA-Z0-9])|\{[^{}]*\}|\([^)]*\))*|\b[a-zA-Z0-9]\^(?:\{[^{}]*\}|[0-9]+)|\b[a-zA-Z0-9]_(?:\{[^{}]*\}|[0-9]+)/g;

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

console.log(prewrapMath("This is already $x^2$ wrapped."));
console.log(prewrapMath("This is \\sin(x) not wrapped."));
console.log(prewrapMath("This is x^2 not wrapped."));
console.log(prewrapMath("This is x_{1} not wrapped."));
console.log(prewrapMath("This is x_1 not wrapped."));
console.log(prewrapMath("This is tkd_matdas something.")); // Issue: should not wrap tkd_matdas
console.log(prewrapMath("This is tkd_1 something.")); // Should it wrap d_1?
console.log(prewrapMath("a_b is not wrapped.")); // a_b should probably not be wrapped unless a_1
