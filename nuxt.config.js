import { Axios, Head, ColorMode, Tailwind, Translation, Content } from './config'

export default {
  head: Head,

  server: {
    host: '0.0.0.0',
    port: 3333
  },

  css: [
  ],

  plugins: [
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    ['@nuxtjs/tailwindcss', Tailwind],
    ['@nuxtjs/color-mode', ColorMode],
  ],

  modules: [
    ['@nuxtjs/axios', Axios],
    ['nuxt-i18n', Translation],
    ['@nuxt/content', Content]
  ],

  buildDir: 'build',

  build: {
  },

  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },
}
