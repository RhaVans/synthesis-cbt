const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.js') && f !== 'app.js' && !f.startsWith('verify'));

for (const file of files) {
  try {
    let content = fs.readFileSync(file, 'utf8');

    // Restore any accidentally badly constructed double backslashes (e.g., \\\x to \\x) if they exist
    // But since we reverted git, they don't exist anymore.
    // Replace:
    // Any single backslash (not preceded by `\`)
    // that is NOT followed by `\`, `n`, `r`, `t`, `'`, `"`, or `` ` ``
    // with double backslashes.
    
    // In JavaScript string literals for regex, '\\\\' means \ in regex.
    // (?<!\\\\) means not preceded by \
    // \\\\ means match literal \
    // (?![\\\\nrt\'\"\`]) means not followed by \, n, r, t, ', ", `
    const regex = /(?<!\\)\\(?![\\nrt'"`])/g;
    
    let newContent = content.replace(regex, '\\\\');

    if (newContent !== content) {
      fs.writeFileSync(file, newContent, 'utf8');
      console.log('Fixed backslashes using robust regex in', file);
    }
  } catch (e) {
    console.error('Error processing', file, e);
  }
}
