var fs = require('fs')

var github = require('./gitstack')
var ORG = require('./settings').org

github.orgs.getTeams({
    org: ORG
}, function(err, res){
    fs.writeFile("teams.json", JSON.stringify(res.data), function(err) {
        if(err) {
            return console.log(err);
        } else {
        	console.log('teams saved to teams.json')
        }
    }); 
})
