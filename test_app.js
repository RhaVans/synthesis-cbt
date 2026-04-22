const fs = require('fs');

const appJs = fs.readFileSync('app.js', 'utf8');

// Current regex:
// const regex = /\$[^\$]+\$|\\[a-zA-Z]+(?:_(?:\{[^{}]*\}|[a-zA-Z0-9])|\^(?:\{[^{}]*\}|[a-zA-Z0-9])|\{[^{}]*\}|\([^)]*\))*|[a-zA-Z0-9]\^(?:\{[^{}]*\}|[0-9]+)|[a-zA-Z0-9]_(?:\{[^{}]*\}|[a-zA-Z0-9])/g;

// New regex:
// const regex = /\$[^\$]+\$|\\[a-zA-Z]+(?:_(?:\{[^{}]*\}|[a-zA-Z0-9])|\^(?:\{[^{}]*\}|[a-zA-Z0-9])|\{[^{}]*\}|\([^)]*\))*|(?:(?<![a-zA-Z0-9_])[a-zA-Z0-9]+)\^(?:\{[^{}]*\}|[0-9a-zA-Z-]+)|(?:(?<![a-zA-Z0-9_])[a-zA-Z0-9]+)_(?:\{[^{}]*\}|[a-zA-Z0-9]+)(?![a-zA-Z0-9_])/g;

const newRegex = `const regex = /\\$[^\\$]+\\$|\\\\[a-zA-Z]+(?:_(?:\\{[^{}]*\\}|[a-zA-Z0-9])|\\^(?:\\{[^{}]*\\}|[a-zA-Z0-9])|\\{[^{}]*\\}|\\([^)]*\\))*|(?:(?<![a-zA-Z0-9_])[a-zA-Z0-9]+)\\^(?:\\{[^{}]*\\}|[0-9a-zA-Z-]+)|(?:(?<![a-zA-Z0-9_])[a-zA-Z0-9]+)_(?:\\{[^{}]*\\}|[a-zA-Z0-9]+)(?![a-zA-Z0-9_])/g;`;

const newAppJs = appJs.replace(/const regex = .*\n/, newRegex + '\n');
fs.writeFileSync('app_new.js', newAppJs);
