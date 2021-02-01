const webpack = require('webpack')

export default {
  loading: false,
  loadingIndicator: false,
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '2021，你的新年开运签',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'http://res.wx.qq.com/open/js/jweixin-1.6.0.js',
        defer: true,
        id: 'jweixin',
        onload: 'window.scriptLoadedJweixin=1'
      },
      { 
        src: 'https://code.createjs.com/1.0.0/preloadjs.min.js',
        defer: true
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/wx.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['gsap'],
		postcss: {
			plugins: {
        'postcss-import': {},
        'postcss-nested-ancestors': {},
        'postcss-nested': {
          unwrap: ['each']
        },
        'postcss-each': {},
        'tailwindcss': {},
        'webp-in-css/plugin': {},
        'autoprefixer': {}
			}
    },
    publicPath: process.env.NODE_ENV === 'production' 
      ? 'http://www.c9-d.com/3li6xun/xinniankaiyun'
      : ''
  },
  router: {
    base: process.env.NODE_ENV === 'production' 
      ? '/3li6xun/xinniankaiyun/'
      : ''
  },
}
