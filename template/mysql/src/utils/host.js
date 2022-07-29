const { isDev } = require('./env')

const HOST = isDev ? "http://localhost:3009" : "your production url"

module.exports = HOST