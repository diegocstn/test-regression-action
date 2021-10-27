const fs = require('fs');
const path = require('path');
const isRegression = require('../src/isRegression');

test('should detect if issue is a regression', () => {
    const rawdata = fs.readFileSync(path.resolve('./test/test-issue-regression.json'));
    const issueData = JSON.parse(rawdata); 
    expect(isRegression(issueData)).toBe(true);
});

test('should detect if issue is a regression', () => {
    const rawdata = fs.readFileSync(path.resolve('./test/test-issue-no-regression.json'));
    const issueData = JSON.parse(rawdata); 
    expect(isRegression(issueData)).toBe(false);
});