// const HOST = require('../utils/host')

class UploadCtl {
  async upload(ctx) {
    const file = ctx.req.files['file']
    ctx.body = file.path
  }
}

module.exports = new UploadCtl()