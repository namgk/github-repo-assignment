var github = require('./gitstack')
var ORG = require('./settings').org

github.repos.getForOrg({
    org: ORG
}, function(err, res){
    console.log(res)
    res.data.forEach(function(repo){
        github.repos.delete({
            owner: ORG,
            repo: repo.name
        }, function(err, res){
            console.log(err ? err : 'repo deleted')
        });
    })
})
