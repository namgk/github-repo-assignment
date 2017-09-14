var program = require('commander')
var fs = require('fs')
var path = require('path')
var parse = require('csv-parse');

var github = require('./gitstack')
var ORG = require('./settings').org

program
  .option('-m, --members <members.csv>', 'Provide a members csv file')
  .option('-t, --teams <teams.json>', 'Provide a team json file')
  .parse(process.argv)

if (!program.teams || !program.members){
	console.log('type -h for help!')
	return
}

var lineRead = 0
try {
	var teams = JSON.parse(fs.readFileSync(program.teams))
	fs.createReadStream(path.resolve(__dirname, program.members) )
	.pipe(parse({delimiter: ','}))
	.on('data', function(line){
		lineRead++
		if (lineRead == 1){
			return // header
		}
		var username = line[3]
		var team = line[5]
		var teamId
		for (var i = 0; i < teams.length; i++){
			if (teams[i].name === team){
				teamId = teams[i].id
				break
			}
		}
		if (!teamId){
			console.log('TEAM ID NOT FOUND FOR: ' + team)
			return
		}

		// invite username to team
		github.orgs.addTeamMembership({
			id: teamId,
			username: username,
			role: 'member'
		}, function(err, res){
			console.log(err ? 'ADDING MEMBER TO TEAM FAILED: ' + err : 'MEMBER ' + username + ' ADDED TO TEAM: ' + team )
		});

	})
} catch (e){
	console.log(e)
	console.log('Usage: -m, --members-csv <members.csv>')
}

