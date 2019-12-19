const pkg = require('./package');

module.exports = {
  /*
  ** Basic configuration
  */
  mode: 'universal',
  buildModules: 'npm_lifecycle_event' in process.env ? ['@nuxt/typescript-build'] : [],
  srcDir: './',
  extension: ['js', 'ts'],

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "~assets/3rdparty/font-awesome.min.css",
    "~assets/css/dots.css",
    'element-ui/lib/theme-chalk/display.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/element-ui', ssr: true }
  ],

  /*
  ** Nuxt.js modules
  */
 modules:  [  '@nuxtjs/axios' ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    transpile: [/^element-ui/],
    extend(config, ctx) {},
  },
};
