module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + "Covid 19 Sayaç",
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      },
      {
        name: "theme-color",
        content:'#4a5568' 
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  serverMiddleware: [{ path: "/api/covid19", handler: "~/api/covid19/index" }],

  plugins: ["~/plugins/EventBus"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    "@nuxtjs/tailwindcss"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa"
  ],
  // /*
  //  ** Axios module configuration
  //  ** See https://axios.nuxtjs.org/options
  //  */
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
