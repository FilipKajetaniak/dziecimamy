const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Dziecimamy - Blog poświęcony wychowaniu dzieci',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'og:description', name: 'og:description', content: 'Blog o wychowaniu, pomoc dla rodziców, jak radzić sobie z trudnymi zachowaniami dzieci, nastolatków' },
      { hid: 'description', name: 'description', content: 'Blog o wychowaniu, pomoc dla rodziców, jak radzić sobie z trudnymi zachowaniami dzieci, nastolatków' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet',  href: 'https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i|Nunito:400,700,800' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#0097ff',
    height: '2px'
  },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/main.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/font-awesome' },
    { src: '~plugins/nuxt-quill-plugin.js', ssr: false },
    { src: '~/plugins/vue-scrollto' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/apollo', '@nuxtjs/font-awesome'],
  
  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
    }
  },
  /*
  ** Build configuration
  */


  buildDir: 'public_nodejs',
  build: {
    publicPath: '/public/',
    extractCSS: true,
    postcss: [
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')(),
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}