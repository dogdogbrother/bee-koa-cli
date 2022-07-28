const Inquirer = require('inquirer')

module.exports = async function(projectName, options) {
  const { database } = await Inquirer.prompt([
    {
      name: 'database',
      type: 'list',
      message: 'Please select database type-请选择数据库类型 ',
      choices: [
        { name: 'MongoDB', value: 'mongodb' }, 
        { name: 'MySQL', value: 'mysql' }
      ]
    }
  ])
  require('../lib/create')(projectName, options, database)
} 