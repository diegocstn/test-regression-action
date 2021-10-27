const core = require('@actions/core');
const github = require('@actions/github');


async function run() {
    const context = github.context;
    const regressionLabel = core.getInput('regressionLabel');
    const token = core.getInput('token');
    const issue = core.getInput('issue');
    const isRegression = require('./isRegression');

    if (!isRegression) {
        console.log('Issue is not a regression, skipping job.');
        return;
    }

    console.log('Context: ' + JSON.stringify(context));
    let octokit = github.getOctokit(token);
    try {
        await octokit.rest.issues.addLabels({
            repo: context.repository.full_name,
            owner: context.repository.owner.login,
            issue_number: issue.id,
            labels: [regressionLabel],
        })
    } catch(e) {
        console.log("Error: " + e);
        console.log(e)
    }
}

run()
