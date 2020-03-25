<template lang="pug">
  .center.flex.justify-center.w-full
    table.table-auto.mt-10
      thead
        tr
          th.px-4.py-2.table-title
            strong Ülke
          th.px-4.py-2.table-title
            strong Toplam Vaka
          th.px-4.py-2.table-title
            strong Yeni Vaka
          th.px-4.py-2.table-title
            strong Ölüm
          th.px-4.py-2.table-title
            strong Yeni Ölüm
          th.px-4.py-2.table-title
            strong İyileşme
          th.px-4.py-2.table-title
            strong İyileşme Oranı
          th.px-4.py-2.table-title
            strong Ölüm Oranı
      tbody(class="items-center justify-between overflow-y-scroll keepnox-table")
        tr(v-for="i in item")
          td.border.px-4.py-2.bg-white {{i.country | countryNameToTr}}
          td.border.px-4.py-2.bg-white {{i.confirmed}}
          td.border.px-4.py-2.animation-red(:class="{active: i.confirmedSinceYesterday > 0 }") <strong> + {{i.confirmedSinceYesterday}} </strong>
          td.border.px-4.py-2.bg-white {{i.death}} 
          td.border.px-4.py-2.animation-red(:class="{active: i.deathSinceYesterday > 0 }") <strong> + {{i.deathSinceYesterday}} </strong>
          td.border.px-4.py-2.bg-white {{i.recovered}}
          td.border.px-4.py-2.bg-white {{i.recoveredRate.toFixed()}}%
          td.border.px-4.py-2.bg-white {{i.deathRate.toFixed()}}%

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
.table-title
  strong
    font-weight: 700;
.animation-red
  &.active
    animation: pulseBg 1s infinite alternate;

@keyframes pulseBg
  0%
    background-color: white
  20%
    background-color: white
  100% 
    background-color: #fc8181
.keepnox-table
  tr:nth-child(even) td
    background-color: #f7fafc
</style>


