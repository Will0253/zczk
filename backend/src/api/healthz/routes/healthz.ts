export default {
  routes: [
    {
      method: 'GET',
      path: '/healthz',
      handler: 'healthz.index',
      config: {
        auth: false,
      },
    },
  ],
}
