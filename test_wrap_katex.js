const fs = require('fs');

// Ah, wait. `hasDollar` checks if `rawStr.includes('$')`.
// If it has '$', it SKIPS `wrapRawTokens`!
// And right now, almost ALL files ALREADY have '$' in them because `katex_master.js` was run before and it wrapped things.
// For example, "Jika $x^2$ + $y^2$ = 25".
// Because it has '$', `wrapRawTokens` is NOT CALLED!
// That's why it said "Done: 0 files, 0 lines changed."

// To fix it, we need to process EVEN IF it has `$`.
// We can strip all `$` and then re-wrap.
