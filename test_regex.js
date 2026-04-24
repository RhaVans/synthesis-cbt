const REGEX_LATEX_TOKEN = /\$[^\$]+\$|\\[a-zA-Z]+(?:_(?:\{[^{}]*\}|[a-zA-Z0-9])|\^(?:\{[^{}]*\}|[a-zA-Z0-9])|\{[^{}]*\}|\([^)]*\))*|[a-zA-Z0-9]\^(?:\{[^{}]*\}|[0-9]+)|[a-zA-Z0-9]_(?:\{[^{}]*\}|[a-zA-Z0-9])/g;

console.log("tkd_matdas".match(REGEX_LATEX_TOKEN));
