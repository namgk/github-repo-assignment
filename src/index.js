var program = require('commander')
var fs = require('fs')

program
  .version('0.1.0')

program
  .command('createrepos', 'Create repositories and associated teams')
	.command('deleterepos', 'Delete all repositories')
	.command('addmembers', 'Add members to teams')
	.command('getteams', 'Get all teams')
	.parse(process.argv)

