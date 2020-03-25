<template lang="pug">
  .keepnox-sidebar.bg-white.px-2.text-center(class='md:bg-white' :class="{ deactive: isShowNav == false }" )
    .mx-auto(class='md:relative lg:float-right lg:px-6')
      ul.list-reset.flex.flex-row.text-center(class='md:flex-col md:text-left')
        li.mr-3.flex-1
          a.block.py-1.pl-1.align-middle.text-gray-800.no-underline.border-b-2.border-gray-800(href='#', class='md:py-3 hover:text-pink-500 md:border-gray-900 hover:border-pink-500')
            i.fas.fa-link.pr-0(class='md:pr-3')
            span.pb-1.text-xs.text-gray-600.block(class='md:pb-0 md:text-base md:text-gray-400 md:inline-block') Link
        li.mr-3.flex-1
          a.block.py-1.pl-1.align-middle.text-gray-800.no-underline.border-b-2.border-gray-800(href='#', class='md:py-3 hover:text-pink-500 md:border-gray-900 hover:border-pink-500')
            i.fas.fa-link.pr-0(class='md:pr-3')
            span.pb-1.text-xs.text-gray-600.block(class='md:pb-0 md:text-base md:text-gray-400 md:inline-block') Link
        li.mr-3.flex-1
          a.block.py-1.pl-1.align-middle.text-white.no-underline.border-b-2.border-pink-600(href='#', class='md:py-3 hover:text-white')
            i.fas.fa-link.pr-0.text-pink-500(class='md:pr-3')
            span.pb-1.text-xs.text-white.block(class='md:pb-0 md:text-base md:font-bold md:inline-block') Active Link
        li.mr-3.flex-1
          nuxt-link.block.py-1.pl-1.align-middle.text-gray-800.no-underline.border-b-2.border-gray-800(to='#', class='md:py-3 hover:text-pink-500 md:border-gray-900 hover:border-pink-500')
            i.fas.fa-link.pr-0(class='md:pr-3')
            span.pb-1.text-xs.text-gray-600.block(class='md:pb-0 md:text-base md:text-gray-400 md:inline-block') Link    
</template>

<style lang="sass">
.keepnox-sidebar
  @media(min-width: 992px)
    padding-top: 80px
    transition: .3s all
    padding-right: 0
    padding-left: 0
    position: fixed
    right: 0
    top: 0
    bottom: 0
    width: 250px
    &.deactive
      overflow: hidden;
      transition: .3s all
      right: -250px
  @media(max-width: 992px)
    padding-top: 80px
    transition: .3s all
    padding-right: 0
    padding-left: 0
    position: fixed
    right: 0
    top: 0
    bottom: 0
    width: 250px
    z-index: 2
    &.deactive
      overflow: hidden;
      transition: .3s all
      right: -260px

</style>

<script>
export default {
  props:['isShowNav']
}
</script>