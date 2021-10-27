const core = require('@actions/core');
const github = require('@actions/github');

const regressionLabel = core.getInput('regressionLabel');
const issue = core.getInput('issue');
console.log(issue);