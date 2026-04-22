const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '../app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');

function extractFunction(name) {
    const startIdx = appJsContent.indexOf(`function ${name}(`);
    if (startIdx === -1) {
        throw new Error(`Could not find function ${name} in app.js`);
    }

    let braceCount = 0;
    let started = false;
    let endIdx = -1;

    let inRegex = false;
    let inString = null;

    for (let i = startIdx; i < appJsContent.length; i++) {
        const char = appJsContent[i];
        const nextChar = appJsContent[i+1];

        if (!inRegex && !inString) {
            if (char === '{') {
                braceCount++;
                started = true;
            } else if (char === '}') {
                braceCount--;
            } else if (char === '/' && nextChar !== '/' && nextChar !== '*') {
                // Potential regex start
                // This is a very simplified check
                let prevChar = '';
                for (let j = i - 1; j >= 0; j--) {
                    if (!/\s/.test(appJsContent[j])) {
                        prevChar = appJsContent[j];
                        break;
                    }
                }
                if (['(', '=', ',', ':'].includes(prevChar)) {
                    inRegex = true;
                }
            } else if (char === "'" || char === '"' || char === '`') {
                inString = char;
            }
        } else if (inRegex) {
            if (char === '/' && appJsContent[i-1] !== '\\') {
                inRegex = false;
            }
        } else if (inString) {
            if (char === inString && appJsContent[i-1] !== '\\') {
                inString = null;
            }
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
const prewrapMathStr = extractFunction('prewrapMath');
const formatTextStr = extractFunction('formatText');

const utils = new Function(`
    ${escapeHTMLStr}
    ${prewrapMathStr}
    ${formatTextStr}
    return { escapeHTML, prewrapMath, formatText };
`)();

const { formatText } = utils;

function testXSSProtection() {
    console.log('--- Testing XSS Protection in formatText ---');

    const testCases = [
        {
            name: 'Simple script tag',
            input: '<script>alert("XSS")</script>',
            expectedNotContains: '<script>'
        },
        {
            name: 'Image onerror',
            input: '<img src=x onerror=alert(1)>',
            expectedContains: ['&lt;img', 'onerror=alert(1)&gt;']
        },
        {
            name: 'HTML characters escaping',
            input: '"quoted" & <bracketed>',
            expectedContains: ['&quot;quoted&quot;', '&amp;', '&lt;bracketed&gt;']
        },
        {
            name: 'Mixed content with formatting',
            input: '**Bold** <script>alert(1)</script> *Italic*',
            expectedContains: ['<strong>Bold</strong>', '<em>Italic</em>'],
            expectedNotContains: '<script>'
        }
    ];

    testCases.forEach(tc => {
        const output = formatText(tc.input);
        console.log(`Testing: ${tc.name}`);

        if (tc.expectedNotContains) {
            if (output.includes(tc.expectedNotContains)) {
                throw new Error(`XSS protection failed for ${tc.name}: output contains "${tc.expectedNotContains}"\nOutput: ${output}`);
            }
        }

        if (tc.expectedContains) {
            tc.expectedContains.forEach(expected => {
                if (!output.includes(expected)) {
                    throw new Error(`Formatting failed for ${tc.name}: output does not contain "${expected}"\nOutput: ${output}`);
                }
            });
        }
        console.log('  Passed ✓');
    });

    console.log('\nXSS protection tests passed!');
}

try {
    testXSSProtection();
} catch (error) {
    console.error('\n' + error.message);
    process.exit(1);
}
