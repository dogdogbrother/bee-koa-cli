const Inquirer = require('inquirer')

module.exports = async function(projectName, options) {
  const { database } = await Inquirer.prompt([
    {
      name: 'database',
      type: 'list',
      message: 'Please select database type-请选择数据库类型 ',
      choices: [
        { name: 'MySQL', value: 'mysql' },
        { name: 'MongoDB(尚未开发好)', value: 'mongodb' }
      ]
    }
  ])
  if (database === 'mongodb') {
    console.log()
    console.log()
    console.log('给我些时间,后面会补上,现在就先用msyql模板凑活下吧')
    return console.log()
     
  }
  require('../lib/create')(projectName, options, database)
} 