<template lang="pug">
.world-wide-outer(class="w-full")
  .world-wide.flex.justify-between(class="w-full px-4 mt-3")
    .big-title-ww.text-gray-600 Dünya Geneli 
  .worldWideData(class="flex flex-wrap w-full  mt-3")
    .ww-totalCase.ww-box(class="w-1/3 md:w-2/12")
      .ww-box-inner
        .title.text-gray-700 Toplam Vaka
        .count.text-gray-800 {{wwData.confirmed}}
    .ww-totalDeath.ww-box(class="w-1/3 md:w-2/12")
      .ww-box-inner
        .title.text-gray-700 Ölüm
        .count.text-gray-800 {{wwData.death}}
    .ww-totalDeath.ww-box(class="w-1/3 md:w-2/12")
      .ww-box-inner
        .title.text-gray-700 İyileşme
        .count.text-gray-800 {{wwData.recovered}}
    .ww-totalDeath.ww-box(class="w-1/3 md:w-2/12")
      .ww-box-inner
        .title.text-gray-700 Kalan Vaka
        .count.text-gray-800 {{wwData.activeCase}}
    .ww-totalDeath.ww-box(class="w-1/3 md:w-2/12")
      .ww-box-inner
        .title.text-gray-700 Ölüm Oranı
        .count.text-gray-800 {{wwData.deathRate.toFixed(2)}}%
    .ww-totalDeath.ww-box(class="w-1/3 md:w-2/12")
      .ww-box-inner
        .title.text-gray-700 İyileşme Oranı
        .count.text-gray-800 {{wwData.recoveredRate.toFixed(2)}}%
</template>

<script>
export default {
  props: ['wwData']
}
</script>

<style lang="sass">
.worldWideData
  .ww-box
    .ww-box-inner
      padding: 10px
      background: white
      margin: 10px
      border: 1px solid #e2e8f0
    .title
      font-size: 22px;
      font-weight: 400;
    .count
      font-size: 23px;
      font-weight: 500;
    @media(max-width: 992px)
      .title
        font-size: 13px
.big-title-ww
  font-size: 33px
  margin-bottom: -15px
  margin-top: 10px
</style>