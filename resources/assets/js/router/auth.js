export default {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    // http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    loginData: { url: 'api/auth/login', method: 'POST', redirect: { name: 'dashboard' }, fetchUser: true },
    registerData: { url: 'api/auth/register', method: 'POST', redirect: { name: 'login' } },
    logoutData: { url: 'api/auth/logout', method: 'POST', redirect: '/', makeRequest: false },
    fetchData: { url: 'api/user', method: 'GET', enabled: true },
    refreshData: { url: 'api/user/refresh', method: 'GET', enabled: true, interval: 30 },
    notFoundRedirect: { path: '/'},
    forbiddenRedirect: { path: '/'},
}
