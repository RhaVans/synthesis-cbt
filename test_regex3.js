// We want to wrap x^2, x_1, x_{123}, etc.
// But we want to avoid wrapping part of an identifier like `tkd_matdas` or `image_1.png`
const text1 = "x_1, y_2, z_{34}";
const text2 = "tkd_matdas_saintek";

// Try negative lookbehind and lookahead if supported
const regex = /\$[^\$]+\$|\\[a-zA-Z]+(?:_(?:\{[^{}]*\}|[a-zA-Z0-9])|\^(?:\{[^{}]*\}|[a-zA-Z0-9])|\{[^{}]*\}|\([^)]*\))*|(?<![a-zA-Z])[a-zA-Z0-9]\^(?:\{[^{}]*\}|[0-9]+)|(?<![a-zA-Z])[a-zA-Z0-9]_(?:\{[^{}]*\}|[a-zA-Z0-9])/g;

console.log(text1.match(regex));
console.log(text2.match(regex));
