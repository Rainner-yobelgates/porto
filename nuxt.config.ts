export default defineNuxtConfig({
  compatibilityDate: '2026-09-25',
  debug: false,
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  components: [{ path: '~/components', pathPrefix: false }],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [{ name: 'theme-color', content: '#07070b' }],
      link: [
        { rel: 'icon', type: 'image/png', href: '/asssets/logo-transparent.png' },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/dm-sans-latin.woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/manrope-latin.woff2',
          crossorigin: 'anonymous',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  typescript: {
    strict: true,
    tsConfig: { compilerOptions: { noUnusedLocals: true, noUnusedParameters: true } },
  },
})
