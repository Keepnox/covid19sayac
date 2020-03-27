<template lang="pug">
  .keepnox-outer(class="w-full")
    #keepnoxChart(class="rounded overflow-hidden border my-3 mx-3 py-4 px-4" v-if="")
      chart(:chartdata="data.chartdata" :options="data.options"  :styles="{height: `450px`,position: 'relative'}")
</template>


<script>
import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'
import { add, sub, format } from 'date-fns';
import chart from './DailyChartIndex'
import _ from 'lodash'

export default {
  props: ["dailyData"],
  extends: Line,
  components: {chart},
  computed: {
    data: function () {
      if (!this.dailyData) return ""
      let daily = this.dailyData;
      const dateCount = daily.newRecoveries.length;
      const startDate = sub(new Date(), { days: daily.newRecoveries.length });
      const dates = Array.from({ length: dateCount }).map((_, i) => {
        return add(startDate, {
          days: i,
        });
      });
      const labels = dates.map(date => format(date, "dd.MM.yyyy"));
      
      var data = {
        chartdata: {
          labels,
          datasets: [
            {
              label: 'Topalam İyileşen',
              backgroundColor: '#4fd1c5',
              data: daily.newRecoveries
            },
            {
              label: 'Yeni Ölüm',
              backgroundColor: '#6b7b96',
              data: daily.dailyDeaths
            },
            {
              label: 'Toplam Ölüm',
              backgroundColor: '#4a5568',
              data: daily.deaths
            },
            {
              label: 'Yeni Vaka',
              backgroundColor: '#c56666',
              data: daily.currentlyInfected
            },
            {
              label: 'Toplam Vaka',
              backgroundColor: '#fc8181',
              data: daily.cases
            },
          ]
        },
        options: {
          responsive: true, 
          maintainAspectRatio: false,
          tooltips: {
            mode: 'x-axis'
          },
        }
      }
      return data
    }
  }

}
</script>


<style lang="sass">
#keepnoxChart
  position: relative
  height: 452px !important
  background: white
</style>