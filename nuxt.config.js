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
      { hid: 'description', name: 'description', content: 'Blog o wychowaniu, pomoc dla rodziców, jak radzić sobie z trudnymi zachowaniami dzieci, nastolatków' },
      {property: 'og:image', content: 'https://2.bp.blogspot.com/-HzO0m97SOB4/WeX0zM1t8fI/AAAAAAAABMY/Hs9oS5GlIZ0u9-iUwx_2-zF_xZCPdVxbQCLcBGAs/s640/juliette-leufke-154599.jpg'},
      {property: 'og:image:height', content: '339'},
      {property: 'og:image:width', content: '648'},
      {property: 'og:description', content: 'Blog o wychowaniu, pomoc dla rodzic&oacute;w, jak radzić sobie z trudnymi zachowaniami dzieci, nastolatk&oacute;w'},
      {property: 'og:title', content: 'Dziecimamy'},
      {property: 'og:url', content: 'www.dziecimamy.com'}
    ],
    script: [
      {src: '//dziecimamy.disqus.com/count.js', id: 'dsq-count-scr', async: true}
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
      { rel: 'icon', type:'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
      { rel: 'icon', type:'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
      { rel: 'manifest', href: '/site.webmanifest'},
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5'},
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet',  href: 'https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i' },
      { rel: 'stylesheet',  href: 'https://fonts.googleapis.com/css?family=Nunito:400,700,800' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#0099ff',
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
    { src: '~plugins/nuxt-quill-plugin.js', ssr: false },
    { src: '~/plugins/vue-scrollto' },
    { src: '~/plugins/disqus' }
  ],

  modules: ['@nuxtjs/apollo','@nuxtjs/google-analytics'],

  'google-analytics': {
    id: 'UA-118954191-1'
  },


  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
    }
  },
  /*
  ** Build configuration
  */
  buildDir: 'prod',
  build: {
    publicPath: '/public/',
    extractCSS: true,
    postcss: [
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')(),
      require('autoprefixer')({
        browsers: ['last 3 versions'],
        grid: true
      })
    ],
    babel: {
      presets: ['vue-app','env'],
    },
    vendor: [
      'babel-polyfill'
    ],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
