export default {
  routes: [
    {
      method: 'GET',
      path: '/healthz',
      handler: 'healthz.index',
      type: 'content-api',
      config: {
        auth: false,
      },
    },
  ],
}
