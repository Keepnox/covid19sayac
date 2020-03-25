<template lang="pug">
  #website.bg-gray-100.font-sans.leading-normal.tracking-normal
    nav.flex.items-center.justify-between.flex-wrap.bg-white.p-6.fixed.w-full.border-gray.border-b.z-10
      .flex.items-center.flex-shrink-0.text-gray-700.mr-6
        img(src="~/assets/logo.png").app-logo
        span.font-semibold.text-xl.tracking-tight.text-gray-700 Covid 19 Sayaç
      //- .flex.block.flex-grow(class='hidden lg:flex lg:items-center lg:w-auto')
      //-   .text-sm(class='lg:flex-grow')
      //-     nuxt-link.block.mt-4.text-gray-500.mr-4(to='/', class='lg:inline-block lg:mt-0 hover:text-gray-700')
      //-       | Veriler
      //-     nuxt-link.block.mt-4.text-gray-500.mr-4(to='/onemli-bilgiler', class='lg:inline-block lg:mt-0 hover:text-gray-700')
      //-       | Önemli Bilgiler
      //-     a.block.mt-4.text-gray-500(href='#responsive-header', class='lg:inline-block lg:mt-0 hover:text-gray-700')
      //-       | Son Tweetler
      //- .block(class='' @click="isShowNav = !isShowNav")
      //-   button#sidebar-open.flex.px-6.items-center.text-gray-500(type='button', class=' focus:outline-none focus:text-gray-700')
      //-     svg.fill-current.w-4.h-4(xmlns='http://www.w3.org/2000/svg', viewBox='0 0 20 20')
      //-       path(d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z')
      //- .header-link(class='w-full sm:full lg:hidden md:full')
      //-   .text-sm.mt-2
      //-     nuxt-link.inline-block.mt-4.text-gray-500.mr-4(to='/', class='hover:text-gray-700')
      //-       | Veriler
      //-     nuxt-link.inline-block.mt-4.text-gray-500.mr-4(to='/onemli-bilgiler', class='hover:text-gray-700')
      //-       | Önemli Bilgiler
    .flex.mx-full.pr
      .div(class="keepnox-container" :class="{deactive: isShowNav == false}")
        nuxt
      navBar(:isShowNav="isShowNav")
</template>

<script>
import navBar from '@/components/Navbar.vue'
export default {
  components:{navBar},
  data: () => ({
    isShowNav: false,
  }),


}
</script>

<style lang="sass">
body
  background: #f7fafc
.pr
  position: relative
.app-logo
  width: 30px;
  margin-right: 20px;
  transform: scale(1.6);
.keepnox-container
  @media(min-width: 992px)
    height: 100vh
    padding-top: 80px
    width: calc(100% - 250px)
    transition: .3s all
    &.deactive
      height: 100vh
      width: 100%
</style>
