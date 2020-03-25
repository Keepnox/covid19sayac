<template lang="pug">
  .keepnox-outer(class="w-full sm:w-full md:w-6/12 lg:w-1/3")
    .loading(v-if="!item") YUKLENIYOR
    #keepnoxCard(class="rounded overflow-hidden border my-3 mx-3 py-4 px-4" v-if="")
      .header-info.flex.justify-between
        .title-card.flex-1.text-gray-800 {{item.country | countryNameToTr}}
        .absolute-death-rate.flex-1(style='height: 40px; min-width: 40px; width: 40px;') {{item.deathRate.toFixed()}}%
      .covid-data-area.flex.justify-between
        .data-column.data-c-1.flex-1
          .data-title.text-red-400 Toplam Vaka
          .data-text.text-red-400 {{item.confirmed}}
        .data-column.data-c-2.flex-1
          .data-title.text-gray-800 Ölüm
          .data-text.text-gray-700 {{item.death}}
        .data-column.data-c-3.flex-1
          .data-title.text-teal-400 İyileşme
          .data-text.text-teal-400 {{item.recovered}}
      .keepnox-progress
        .text-abs İyileşme Oranı {{ item.recoveredRate.toFixed() }}% - Kalan Vaka {{ item.activeCase  }} </span>
        .keepnox-status
      .flex.new-case
        .keepnox-badge.pink(v-if="item.confirmedSinceYesterday > 0")
          strong  {{item.confirmedSinceYesterday}}
          span  Yeni Vaka 
        .keepnox-badge.black(v-if="item.deathSinceYesterday > 0")
          strong {{item.deathSinceYesterday}}
          span  Yeni Ölüm   
</template>

<script>
import countries from "i18n-iso-countries"
countries.registerLocale(require("i18n-iso-countries/langs/tr.json"))
countries.registerLocale(require("i18n-iso-countries/langs/en.json"))
export default {
  props: ["item"],
  filters: {
    countryNameToTr: function (value) {
      if(value === "Total:") {
        return 'Dünya Geneli'
      } else {
        return countries.getName(
          countries.getAlpha3Code(value, "en"),
          "TR"
        ) || value;
      }
    }
  }
}
</script>

<style lang="sass">
  #keepnoxCard
    background-color: white
    @media(min-width: 992px)
      height: 205px;
    .title-card
      font-size: 29px
      line-height: 1.2
      margin-bottom: 15px
    .absolute-death-rate
      height: 40px
      min-width: 40px
      width: 40px
      font-size: 29px
      border-radius: 0
      color: #cacaca
      text-align: right
    .data-column
      .data-title
        font-size: 14px
        margin-bottom: -10px
      .data-text
        font-size: 33px
        font-weight: 500
        letter-spacing: 1px
    .keepnox-progress
      margin-top: 5px
      width: 100%
      background-color: #f3f3f3
      height: 25px
      position: relative
      .keepnox-status
        position: absolute
        width: 55%;
        left: 0
        top: 0
        background-color: #e0e0e0
        height: 25px
      .text-abs
        position: absolute
        left: 0;
        right: 0;
        width: 100%;
        top: 50%;
        transform: translateY(-50%)
        text-align: center;
        z-index: 2
        font-weight: 500;
        font-size: 13px;
        color: #000;
    .new-case
      .keepnox-badge
        font-size: 12px;
        animation: pulse 1s infinite alternate;
        margin-top: 8px;
        border: 1px solid;
        padding: 3px 5px;
        display: inline-block
        margin-right: 5px
        &.pink
          color: #e57373;
          border-color: 1px solid #e57373
        &.black
          border: 1px solid #000;
          background-color: #fff;
          color: #000;
  @keyframes pulse
    0%
      opacity: 0.2
    20%
      opacity: 0.8
    100% 
      opacity: 1 
</style>
