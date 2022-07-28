const path = require('path')
const fs = require('fs-extra')
const Inquirer = require('inquirer')
const ora = require('ora');
const chalk = require('chalk');

module.exports = async function(projectName, options, databaseType) {
  const cwd = process.cwd()
  const targetDir = path.join(cwd, projectName)
  if (fs.existsSync(targetDir)) {
    if (options.force) {
      await fs.remove(targetDir)
    } else {
      const { action } = await Inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: '改目录已存在,覆盖?取消?',
          choices: [
            { name: '覆盖', value: true }, 
            { name: '取消', value: false }
          ]
        }
      ])
      if (!action) return
      const spinner = ora('清除目录中...').start();
      await fs.remove(targetDir)
      spinner.succeed('已清除')
      
    }
  }
  const templateUrl = path.join(__dirname ,'..', 'template', databaseType)
  const spinner = ora('创建项目中...').start();
  await fs.copy(templateUrl, targetDir)
  spinner.succeed(`${chalk.green('项目创建成功')}`)
  console.log()
  console.log(chalk.cyan('cd ' + projectName))
  console.log()
  console.log(chalk.cyan('npm install'))
  console.log()
  console.log(chalk.cyan('npm run dev'))
}