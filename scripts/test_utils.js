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

const shuffleArrayStr = extractFunction('shuffleArray');
const shuffleOptionsStr = extractFunction('shuffleOptions');
const balanceConsecutiveAnswersStr = extractFunction('balanceConsecutiveAnswers');

const utils = new Function(`
    ${shuffleArrayStr}
    ${shuffleOptionsStr}
    ${balanceConsecutiveAnswersStr}
    return { shuffleArray, shuffleOptions, balanceConsecutiveAnswers };
`)();

const { shuffleArray, shuffleOptions, balanceConsecutiveAnswers } = utils;

function assert(condition, message) {
    if (!condition) {
        throw new Error('Assertion failed: ' + message);
    }
}

function testShuffleArray() {
    console.log('--- Testing shuffleArray ---');

    // Test Case 1: Same length
    const input1 = [1, 2, 3, 4, 5];
    const output1 = shuffleArray(input1);
    assert(input1.length === output1.length, 'Output length should match input length');

    // Test Case 2: Same elements
    const sortedInput1 = [...input1].sort((a, b) => a - b);
    const sortedOutput1 = [...output1].sort((a, b) => a - b);
    assert(JSON.stringify(sortedInput1) === JSON.stringify(sortedOutput1), 'Output should contain all original elements');

    // Test Case 3: Immutability
    const input3 = [10, 20, 30];
    const input3Copy = [...input3];
    shuffleArray(input3);
    assert(JSON.stringify(input3) === JSON.stringify(input3Copy), 'Original array should not be mutated');

    // Test Case 4: Empty array
    const input4 = [];
    const output4 = shuffleArray(input4);
    assert(output4.length === 0, 'Empty array should return empty array');

    // Test Case 5: Single element array
    const input5 = [42];
    const output5 = shuffleArray(input5);
    assert(output5.length === 1 && output5[0] === 42, 'Single element array should return same element');

    // Test Case 6: Actually shuffles (with high probability)
    const input6 = Array.from({length: 100}, (_, i) => i);
    const output6 = shuffleArray(input6);
    assert(JSON.stringify(input6) !== JSON.stringify(output6), 'Array of 100 elements should likely be shuffled');

    console.log('shuffleArray tests passed!');
}

function testShuffleOptions() {
    console.log('--- Testing shuffleOptions ---');

    const questions = [
        {
            question: "What is 1+1?",
            options: ["2", "3", "4", "5"],
            answer: 0 // "2"
        }
    ];

    const shuffled = shuffleOptions(questions);

    assert(shuffled.length === 1, 'Should return same number of questions');
    assert(shuffled[0] !== questions[0], 'Should return a copy of the question');
    assert(shuffled[0].options.length === 4, 'Should have same number of options');

    const originalAnswerText = questions[0].options[questions[0].answer];
    const newAnswerIndex = shuffled[0].answer;
    const newAnswerText = shuffled[0].options[newAnswerIndex];

    assert(originalAnswerText === newAnswerText, 'Correct answer text should remain correct');
    assert(JSON.stringify(shuffled[0].options.sort()) === JSON.stringify(questions[0].options.sort()), 'Should have same options');

    console.log('shuffleOptions tests passed!');
}

function testBalanceConsecutiveAnswers() {
    console.log('--- Testing balanceConsecutiveAnswers ---');

    const questions = [
        { question: "Q1", options: ["A", "B", "C"], answer: 0 },
        { question: "Q2", options: ["A", "B", "C"], answer: 0 },
        { question: "Q3", options: ["A", "B", "C"], answer: 0 }
    ];

    const balanced = balanceConsecutiveAnswers(questions);

    for (let i = 1; i < balanced.length; i++) {
        assert(balanced[i].answer !== balanced[i-1].answer, `Consecutive answers should not match at index ${i}`);
    }

    console.log('balanceConsecutiveAnswers tests passed!');
}

try {
    testShuffleArray();
    testShuffleOptions();
    testBalanceConsecutiveAnswers();
    console.log('\nAll utility tests passed successfully!');
} catch (error) {
    console.error('\n' + error.message);
    process.exit(1);
}
