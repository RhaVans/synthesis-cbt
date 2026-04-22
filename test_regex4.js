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

console.log(prewrapMath("This is tkd_matdas something."));
console.log(prewrapMath("This is already $x^2$ wrapped."));
console.log(prewrapMath("This is \\sin(x) not wrapped."));
console.log(prewrapMath("This is x^2 not wrapped."));
console.log(prewrapMath("This is x_{1} not wrapped."));
console.log(prewrapMath("This is a_b not wrapped."));
console.log(prewrapMath("10^2=100"));
console.log(prewrapMath("10_{2}=100"));
