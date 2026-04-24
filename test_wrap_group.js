// Wait! I can just use the user-requested regex logic but fix it to match equations!
// The user said: "Modify `wrapRawTokens` in `scripts/katex_master.js` to group adjacent math atoms, operators (like `+`, `-`, `=`, `<`), numbers, and spaces into a single `$ ... $` block, rather than wrapping them individually. This ensures expressions like `x^2 + y^2 = 25` and `(x-5)^2` are properly wrapped together."
// `wrapRawTokens` operates on `raw` (an array of tokens like `['x', '^', '2', ' ', '+', ...]`).

// Let's modify `wrapRawTokens` to build an array of tokens where `type` is either `math` or `text`.
