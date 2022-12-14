const seq = require('../db/seq')
const { STRING } = require('../db/types')

const User = seq.define('user', {
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  avatar: {
    type: STRING,
    allowNull: true,
    comment: '用户头像地址'
  },
}, {
  defaultScope: {
    attributes: {
      // 排除密码，不返回密码
      exclude: ['password']
    }
  }
})

module.exports = User