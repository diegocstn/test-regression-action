const fs = require('fs');
const path = require('path');
const isRegression = require('../src/isRegression');

test('should detect if issue is a regression', () => {
    const rawdata = fs.readFileSync(path.resolve('./test/test-issue.json'));
    const issueData = JSON.parse(rawdata); 
    console.log(isRegression)
    expect(isRegression(issueData)).toBe(true);
});