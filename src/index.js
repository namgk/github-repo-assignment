var GitHubApi = require("github");

var github = new GitHubApi({
    // optional
    debug: true,
    timeout: 5000,
    host: "api.github.com", // should be api.github.com for GitHub
    protocol: "https"
});

github.authenticate({
    type: "token",
    token: "cacbd58e2ed6d81d99c5a739e9661dedf1b19be1",
});

github.repos.checkCollaborator({
    owner: "CPSC319-2017w1",
    repo: "coast2",
    username: "trangvuh"
}, function(err, res){
    console.log(err, res)
})
// github.orgs.addOrgMembership({
//     org: "CPSC319-2017w1",
//     username: "trangvuh",
//     role: "member"
// }, function(err, res) {
//     console.log(err, res);
// });

// github.users.getFollowingForUser({
//     username: "namgk"
// }, function(err, res) {
//     console.log(JSON.stringify(res.data.length));
// });