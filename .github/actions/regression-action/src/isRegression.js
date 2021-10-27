const isRegression = (issue) => {
    const issueFields = issue.body.split("\n\n");
    const regressionLabelIndex = issueFields.findIndex(el => el.includes("Is this a regression?"));
    return issueFields[regressionLabelIndex + 1] === "Yes";
};

module.exports = isRegression;
