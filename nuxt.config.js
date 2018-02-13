module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'xo-do',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Simple drag and drop based todo application' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Titillium+Web:300,400,600,700' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    extractCSS: true,
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    }
  },
  css: [
    '@/assets/css/bulma.css',
    '@/assets/css/vue-toast.css',
    '@/assets/css/styles.css'
  ]  
}
