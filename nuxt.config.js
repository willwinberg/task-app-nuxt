// const colors = require('vuetify/es5/util/colors').default
// import path from 'path'
// import fs from 'fs'

// const serveStatic = require('serve-static')

module.exports = {
    // serverMiddleware: [
    //   '~/api/index.js'
    // Will register redirect-ssl npm package
    // 'redirect-ssl',

    // Will register file from project api directory to handle /api/* requires
    // { path: '/api', handler: '~/server/index.js' },

    // We can create custom instances too
    // { path: '/static2', handler: serveStatic(__dirname + '/static2') }
    // ],
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['@plugins/vuetify'],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        '@nuxtjs/proxy'
    ],
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: '/api/auth/login',
                        method: 'post',
                        propertyName: 'token'
                    },
                    logout: {
                        url: '/api/auth/logout',
                        method: 'post'
                    },
                    user: {
                        url: '/api/auth/user',
                        method: 'get',
                        propertyName: 'user'
                    }
                },
                // These are the defaults
                tokenRequired: true,
                tokenType: 'bearer',
                tokenName: 'authorization'
            }
        },
        redirect: {
            login: '/',
            logout: '/login'
        }
    },
    router: {
        // middleware: ['auth']
    },
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        // baseURL: 'http://localhost:3000',
        debug: true,
        proxy: true
        // process.env.AXIOS_SERVER
    },
    proxy: {
        '/api/': 'http://localhost:3001'
    },
    // serverMiddleware: ['~/server/index.js'],
    server: {
        port: 3000, // default: 3000
        host: 'localhost' // default: localhost,
        // timing: false,
        // https: {
        //   key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
        //   cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        // }
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    }
}
