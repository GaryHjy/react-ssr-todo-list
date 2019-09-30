module.exports = () => {
  return async function loggerHandler(ctx, next) {
    const url = ctx.request.url;
    const isApi = (/^\/api\/v[0-9]+\/[A-Za-z0-9]+$/.test(url));
    if (isApi) {
      ctx.logger.info('some request data: %j', ctx.request.body);
    } 
    await next();
    if (isApi) {
      ctx.logger.info('some response data: %j', ctx.body);
    }
  }
}