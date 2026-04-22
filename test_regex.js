const regex = /\$[^\$]+\$|\\[a-zA-Z]+(?:_(?:\{[^{}]*\}|[a-zA-Z0-9])|\^(?:\{[^{}]*\}|[a-zA-Z0-9])|\{[^{}]*\}|\([^)]*\))*|[a-zA-Z0-9]\^(?:\{[^{}]*\}|[0-9]+)|[a-zA-Z0-9]_(?:\{[^{}]*\}|[a-zA-Z0-9])/g;

console.log("x_1".match(regex));
console.log("tkd_matdas".match(regex));
console.log("x_a".match(regex));
console.log("x_{123}".match(regex));
console.log("a_b".match(regex));
