export default {
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],
  modules: [
    '@nuxtjs/pwa'
  ],
  pwa: {
    manifest: {
      name: 'Sutak Calculator',
      short_name: 'Sutak',
      lang: 'en',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#2563eb'  // Tailwind's blue-600
    },
    meta: {
      name: 'Sutak Calculator',
      mobileApp: true,
      mobileAppIOS: true,
      theme_color: '#2563eb'
    }
  },
  head: {
    title: 'Sutak Calculator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  }
}