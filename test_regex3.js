function prewrapMath(text) {
    if (!text) return text;

    // We want to avoid negative lookbehinds for safari compatibility as per memory
    // So let's write a standard token matcher that avoids picking up d_m in tkd_matdas

    const REGEX_LATEX_TOKEN = /\$[^\$]+\$|(?:^|[^a-zA-Z])(\\[a-zA-Z]+(?:_(?:\{[^{}]*\}|[a-zA-Z0-9])|\^(?:\{[^{}]*\}|[a-zA-Z0-9])|\{[^{}]*\}|\([^)]*\))*|[a-zA-Z0-9]\^(?:\{[^{}]*\}|[\-0-9]+)|[a-zA-Z0-9]_(?:\{[^{}]*\}|[a-zA-Z0-9]))/g;

    return text.replace(REGEX_LATEX_TOKEN, (match, g1) => {
        if (match.startsWith('$')) return match;
        if (g1) {
            // Need to reconstruct the prefix
            let prefix = match.slice(0, match.length - g1.length);
            return prefix + '$' + g1 + '$';
        }
        return '$' + match + '$';
    });
}
console.log(prewrapMath("tkd_matdas"));
console.log(prewrapMath("x^2"));
console.log(prewrapMath("\\int_{0}^{1}"));
console.log(prewrapMath("f(x) = x_1 + y_2"));
