const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// 1. Update submitQuiz
// Find `    document.getElementById('skippedCount').textContent = skipped;`
const submitTarget = "    document.getElementById('skippedCount').textContent = skipped;";
const submitFix = submitTarget + "\n\n    // Render KaTeX in results (for review section if visible or any static math)\n    renderMathInContainer(document.getElementById('resultsScreen'));";

if (app.includes(submitTarget) && !app.includes("renderMathInContainer(document.getElementById('resultsScreen'));")) {
    app = app.replace(submitTarget, submitFix);
}

// 2. Update filterReview
// Find `        reviewList.appendChild(item);\n    });`
const reviewTarget = "        reviewList.appendChild(item);\n    });";
const reviewFix = "        reviewList.appendChild(item);\n    });\n\n    // Render KaTeX for review items\n    renderMathInContainer(reviewList);";

if (app.includes(reviewTarget) && !app.includes("renderMathInContainer(reviewList);")) {
    app = app.replace(reviewTarget, reviewFix);
}

fs.writeFileSync('app.js', app, 'utf8');
console.log("Applied fixes to app.js");
