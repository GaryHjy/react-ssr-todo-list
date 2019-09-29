const resolvePath = (path) => require('path').resolve(__dirname, path)

module.exports = {
  keys: 'egg-ssr',
  static: {
    prefix: '/',
    dir: resolvePath('../dist')
  },
  validatePlus: {
    resolveError(ctx, errors) {
      if (errors.length) {
        ctx.type = 'json';
        ctx.status = 400;
        ctx.body = {
          code: 400,
          error: errors,
          message: '参数错误',
        };
      }
    }
  }
}
