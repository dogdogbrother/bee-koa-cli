const { User } = require('../models/index')
const doCrypto = require('../utils/cryp')
const { _JWT_KEY_ } = require('../conf/secretKeys')
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const jsonwebtoken = require('jsonwebtoken')

class UsersCtl {
  // 注册
  async register(ctx) {
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    const { username, password } = ctx.request.body
    const [
      { username: _username, id }, 
      created
    ] = await User.findOrCreate({
      where: {
        username
      },
      defaults: {
        username,
        password: doCrypto(password),
      }
    })
    if (!created) {
      return ctx.throw(409, '用户名已占用')
    }
    const token = jsonwebtoken.sign(
      { 
        id,
      },
      _JWT_KEY_,
      { expiresIn: '20d' }
    )
    ctx.body = {
      token,
      username,
      id
    }
  }

  // 登录
  async login(ctx) {
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    const { username, password } = ctx.request.body
    const user = await User.findOne({
      attributes: ['username', 'id', 'avatar' ],
      where: {
        [Op.and]: [{ username },{ password: doCrypto(password) }]
      }
    })
    if (user) {
      const { username, id, avatar } = user
      const token = jsonwebtoken.sign(
        { 
          id,
        }, 
        _JWT_KEY_, 
        { expiresIn: '20d' }
      )
      ctx.body = {
        username,
        id,
        avatar,
        token
      }
    } else {
      return ctx.throw(403, '账户名或者密码错误')
    }
  }

  // 用户信息
  async info(ctx) {
    const { id } = ctx.state.user
    const user = await User.findByPk(id)
    ctx.body = user
  }
}

module.exports = new UsersCtl()