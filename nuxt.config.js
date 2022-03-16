import firebaseConfig from "./config/firebase"

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vue-argon',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://demos.creative-tim.com/argon-dashboard/assets-old/vendor/@fortawesome/fontawesome-free/css/all.min.css' },
    ],
    script: [
      { src: '/js/vendor/jquery/dist/jquery.min.js', body: true },
      { src: '/js/vendor/bootstrap/dist/js/bootstrap.bundle.min.js', body: true },
      { src: '/js/vendor/js-cookie/js.cookie.js', body: true },
      { src: '/js/vendor/jquery.scrollbar/jquery.scrollbar.min.js', body: true },
      { src: '/js/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js', body: true },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/nucleo/css/nucleo.css',
    '~assets/css/argon.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/persistedState.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/firebase',
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    'cookie-universal-nuxt',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Indicator top position
  loading: {
    color: 'cyan'
  },

  // Router
  router: {
    base: '/',
    linkActiveClass: 'active'
  },

  // Firebase
  firebase: firebaseConfig,

  // Apollo GraphQL
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://api.graphqlplaceholder.com',
      }
    }
  },

  server: {
    port: 4551
  }
}
