const core = require('@actions/core');
const github = require('@actions/github');


async function run() {
    const context = github.context;
    const regressionLabel = core.getInput('regressionLabel');
    const token = core.getInput('token');
    const isRegression = require('./isRegression');

    if (!isRegression) {
        console.log('Issue is not a regression, skipping job.');
        return;
    }
    let octokit = github.getOctokit(token);
    const { repository, issue } = context.payload;
    console.log("payload", JSON.stringify({
        repo: repository.name,
        owner: repository.owner.login,
        issue_number: issue.id,
        labels: [regressionLabel],
    }));
    try {
        await octokit.rest.issues.addLabels({
            repo: repository.name,
            owner: repository.owner.login,
            issue_number: issue.id,
            labels: [regressionLabel],
        });
    } catch(e) {
        console.log("Error: " + e);
        console.log(e)
    }
}

run()
