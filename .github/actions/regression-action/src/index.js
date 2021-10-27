const core = require('@actions/core');
const github = require('@actions/github');


async function run() {
    const context = github.context;
    const { repository, issue } = context.payload;

    const regressionLabel = core.getInput('regressionLabel');
    const token = core.getInput('token');
    const isRegression = require('./isRegression');

    if (!isRegression(issue)) {
        console.log('Issue is not a regression, skipping job.');
        return;
    }
    let octokit = github.getOctokit(token);
    

    try {
        await octokit.rest.issues.addLabels({
            repo: repository.name,
            owner: repository.owner.login,
            issue_number: issue.number,
            labels: [regressionLabel],
        });
        await octokit.graphql(
            `
            mutation {
                pinIssue(input: {clientMutationId: "client-id", issueId: "${issue.node_id}"}) {
                    clientMutationId
                }
            }
            `
        );
    } catch(e) {
        console.log("Error: " + e);
        console.log(e)
    }
}

run()
