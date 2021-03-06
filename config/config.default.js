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
  },
  // 加载 errorHandler 中间件
  middleware: ['errorHandler'],
  // 只对 /api 前缀的 url 路径生效
  errorHandler: {
    match: '/api',
  },
  // 请求接口日志输出
  middleware: ['loggerHandler'],
  sequelize: {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'react_ssr_todo_list',
    username: 'root',
    password: '123456',
  }
}
