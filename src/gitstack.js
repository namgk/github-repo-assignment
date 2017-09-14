var GitHubApi = require("github");

var github = new GitHubApi({
    timeout: 5000,
    host: "api.github.com", // should be api.github.com for GitHub
    protocol: "https"
})

github.authenticate({
    type: "token",
    token: process.env.GITHUB_TOKEN,
})

module.exports = github