var program = require('commander')
var fs = require('fs')

var github = require('./gitstack')
var ORG = require('./settings').org

program
  .option('-p, --projects <projects.json>', 'Provide a project json file')
  .parse(process.argv)

try {
	var projects = JSON.parse(fs.readFileSync(program.projects))
  console.log('Creating repositories with "%s" projects json file', program.projects)
  createRepos(projects)
} catch (e){
	console.log('Please provide a valid project json file: ' + e)
}

function createRepos(projectTeams){
	Object.keys(projectTeams).forEach(function(project){
	  var teams = projectTeams[project].teams
	  if (!(teams instanceof Array) || typeof(teams[0]) != "string"){
	  	return
	  }
	  teams.forEach(function(team){
	    var repoName = project + '.' + team
	    // create repo
	    console.log("-------------------- CREATING REPO: " + repoName)
	    github.repos.createForOrg({
	      org: ORG,
	      name: repoName,
	      private: true
	    }, function(err, res){
	        if (err){
	          console.log("-------------------- REPO CREATION FAILED: " + repoName)
	          console.log(err)
	          return
	        }

	        // create team with -team- as name
	        console.log("-------------------- CREATING TEAM: " + team + " FOR REPO: " + repoName + " WITH MAINTAINERS:" + JSON.stringify(projectTeams[project].maintainers))
	        github.orgs.createTeam({
	          org: ORG,
	          name: team,
	          maintainers: projectTeams[project].maintainers,
	          privacy: "secret"
	        }, function(err, res){
	            if (err){
	              console.log("-------------------- TEAM CREATION FAILED: " + err)
	              console.log(err)
	              return
	            }
	            console.log("-------------------- ADDING REPO: " + repoName + " FOR TEAM: " + team)
	            github.orgs.addTeamRepo({
	              org: ORG,
	              id: res.data.id,
	              repo: repoName,
	              permission: "push"
	            }, function(err, res){
	              console.log(err ? "ERROR" : "TEAM REPO ADDED FOR:" + team)
	            });
          })
	    })
	  })
	})
}