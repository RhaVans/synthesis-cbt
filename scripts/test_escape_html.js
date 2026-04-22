const fs = require('fs');
const path = require('path');
const test = require('node:test');
const assert = require('node:assert');

const appJsPath = path.join(__dirname, '../app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');

/**
 * Extracts a function from the app.js content.
 * This is a simplified extraction that assumes the function ends with
 * a closing brace at the start of a line or after some whitespace.
 * For production, a proper module system or a more robust parser is preferred.
 */
function extractFunction(name) {
    const regex = new RegExp(`function ${name}\\s*\\(.*?\\)\\s*\\{`, 'g');
    const match = regex.exec(appJsContent);
    if (!match) {
        throw new Error(`Could not find function ${name} in app.js`);
    }

    const startIdx = match.index;
    let braceCount = 0;
    let started = false;
    let endIdx = -1;

    for (let i = startIdx; i < appJsContent.length; i++) {
        if (appJsContent[i] === '{') {
            braceCount++;
            started = true;
        } else if (appJsContent[i] === '}') {
            braceCount--;
        }

        if (started && braceCount === 0) {
            endIdx = i + 1;
            break;
        }
    }

    if (endIdx === -1) {
        throw new Error(`Could not find closing brace for function ${name}`);
    }

    return appJsContent.slice(startIdx, endIdx);
}

const escapeHTMLStr = extractFunction('escapeHTML');

const utils = new Function(`
    ${escapeHTMLStr}
    return { escapeHTML };
`)();

const { escapeHTML } = utils;

test('escapeHTML unit tests', async (t) => {
    await t.test('escapes special characters', () => {
        assert.strictEqual(escapeHTML('&'), '&amp;');
        assert.strictEqual(escapeHTML('<'), '&lt;');
        assert.strictEqual(escapeHTML('>'), '&gt;');
        assert.strictEqual(escapeHTML('"'), '&quot;');
        assert.strictEqual(escapeHTML("'"), '&#39;');
        assert.strictEqual(
            escapeHTML('<script>alert("XSS")</script>'),
            '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
        );
    });

    await t.test('handles falsy values', () => {
        assert.strictEqual(escapeHTML(''), '');
        assert.strictEqual(escapeHTML(null), '');
        assert.strictEqual(escapeHTML(undefined), '');
    });

    await t.test('returns same string if no special characters', () => {
        assert.strictEqual(escapeHTML('Hello World'), 'Hello World');
        assert.strictEqual(escapeHTML('12345'), '12345');
    });

    await t.test('handles repeated characters', () => {
        assert.strictEqual(escapeHTML('<<<<'), '&lt;&lt;&lt;&lt;');
        assert.strictEqual(escapeHTML('&&&'), '&amp;&amp;&amp;');
    });

    await t.test('escapes string with only special characters', () => {
        assert.strictEqual(escapeHTML('<>"\'&'), '&lt;&gt;&quot;&#39;&amp;');
    });

    await t.test('handles mixed characters', () => {
        assert.strictEqual(escapeHTML('a < b && b > c'), 'a &lt; b &amp;&amp; b &gt; c');
    });

    await t.test('handles large strings', () => {
        const largeStr = 'a'.repeat(10000) + '<' + 'b'.repeat(10000);
        const escapedLargeStr = escapeHTML(largeStr);
        assert.strictEqual(escapedLargeStr.length, 20000 + 4);
        assert.ok(escapedLargeStr.includes('&lt;'));
    });
});
