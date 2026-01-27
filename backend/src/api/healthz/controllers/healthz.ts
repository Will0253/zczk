export default {
  async index(ctx) {
    ctx.status = 200
    ctx.body = {
      status: 'ok',
      timestamp: new Date().toISOString(),
    }
  },
}
