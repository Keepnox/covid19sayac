<template lang="pug">
  .keepnox-outer(class="w-full sm:w-full md:w-12/12 lg:w-12/12")
    #asdad(class="rounded overflow-hidden border my-3 mx-3 py-4 px-4" v-if="!news")
      p selam
    #keepnoxNews(class="rounded overflow-hidden border my-3 mx-3 py-4 px-4" v-if="news")
      client-only
        carousel(:per-page="1" navigationEnabled)
          slide(v-for="nn in news" ).slides-outer
            .img(:style="`background-image:url(${nn.image})`")
              .overlay
              .text
                .title(v-html="nn.name") 
              a.button(:href="nn.url" target="_blank") Devamını Oku

        
</template>

<script>

export default {
  props: ['news'],
  data: () => ({
    
  })
}
</script>

<style lang="sass">
  #keepnoxNews
    background-color: white
    .VueCarousel-navigation-next
      transform: translateY(-50%) translateX(70%);
    .VueCarousel-navigation-prev
      transform: translateY(-50%) translateX(-70%);
    .VueCarousel-pagination
        margin-top: -25px;
    .VueCarousel-dot
      margin-top: 11px !important;
      padding: 3px !important;
      width: 5px !important;
      height: 5px !important;
      background-color: rgb(239, 239, 239) !important;
      &.VueCarousel-dot--active
        background-color: black !important
    .slides-outer
      padding: 5px
    .img
      height: 170px
      position: relative
      background-size: cover
      background-position: center
      a.button
        position: absolute;
        right: 15px;
        top: 15px;
        background: #ffffffd4;
        padding: 10px;
        color: #000000;
        font-weight: 700;
        font-size: 16px;
        border-radius: 3px;
        border: 1px solid rgb(226, 232, 240);
      .overlay
        position: absolute
        left: 0
        bottom: 0
        right: 0
        top: 40%
        background: rgb(2,0,36);

        background: linear-gradient(0deg, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0) 100%);
      .text
        position: absolute
        bottom: 20px;
        left: 10px;
        padding: 5px;
        .title
          font-size: 16px;
          line-height: 1.2;
          font-weight: 700
        .desc
          color: #4a5568
          font-size: 15px
          font-weight: 400
          margin-top: 5px
          line-height: 15px

</style>
