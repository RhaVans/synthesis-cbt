// Minimal test of decode-process-encode pipeline
function decodeJSString(raw) {
    let result = '', i = 0;
    while (i < raw.length) {
        if (raw[i] === '\\') {
            i++;
            switch (raw[i]) {
                case 'n': result += '\n'; i++; break;
                case 't': result += '\t'; i++; break;
                case 'r': result += '\r'; i++; break;
                case '\\': result += '\\'; i++; break;
                case "'": result += "'"; i++; break;
                case '"': result += '"'; i++; break;
                default: result += raw[i]; i++; // unknown escape → keep char
            }
        } else { result += raw[i]; i++; }
    }
    return result;
}

function encodeJSString(str) {
    let result = '';
    for (const ch of str) {
        switch (ch) {
            case '\\': result += '\\\\'; break;
            case '\n': result += '\\n'; break;
            case '\r': result += '\\r'; break;
            case '\t': result += '\\t'; break;
            case '"': result += '\\"'; break;
            default: result += ch;
        }
    }
    return result;
}

// Simulate Q1 hint: "...Ingat bahwa \log_{2}(16) = 4."
// In HEAD file, single backslash before log
const headRawHint = '...Ingat bahwa \\log_{2}(16) = 4.';
// After prefixSingleBackslashes: 
const afterPrefix = headRawHint.replace(/(?<!\\)\\(log)/g, '\\\\$1');
console.log('After prefix:', JSON.stringify(afterPrefix));

// Decode it
const decoded = decodeJSString(afterPrefix);
console.log('Decoded:', JSON.stringify(decoded));

// Simple wrapAtoms stub
function wrapAtom(s) { return s.replace(/\\([a-zA-Z]+(?:_\{[^}]+\})?(?:\([^)]+\))?)/g, '$$$&$'); }
const wrapped = wrapAtom(decoded);
console.log('Wrapped:', JSON.stringify(wrapped));

// Encode 
const encoded = encodeJSString(wrapped);
console.log('Re-encoded:', JSON.stringify(encoded));
console.log('In file would look like:', '"' + encoded + '"');
