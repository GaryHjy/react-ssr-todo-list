'use strict'

// 处理成功时返回格式
exports.success = ({ctx, res = null, code = 0, msg = 'ok'}) => {
  ctx.body = {
    code,
    data: res,
    msg
  }
}