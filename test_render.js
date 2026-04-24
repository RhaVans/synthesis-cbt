// If `renderMathInElement` exists, why isn't it rendering `$8x7=56$`?
// Because my regex in `katex_master.js` added `$` around it.
// Wait! Delimiters configured in `app.js` are:
// { left: '$$', right: '$$', display: true },
// { left: '$', right: '$', display: false }
// If KaTeX encounters a `$` block, it SHOULD render it.
// Does KaTeX throw an error?
