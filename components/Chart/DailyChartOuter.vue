<template lang="pug">
  .keepnox-outer(class="w-full")
    #keepnoxChart(class="rounded overflow-hidden border my-3 mx-3 py-4 px-4" v-if="")
      chart(:chartdata="data.chartdata" :options="data.options"  :styles="{height: `410px`,position: 'relative'}")
</template>


<script>
import VueCharts from "vue-chartjs";
import { Bar, Line } from "vue-chartjs";
import chart from "./DailyChartIndex";
import axios from "axios";
import _ from "lodash";

const dailyDataFunction = async context => {
  const res = await context.$axios.get("/api/covid19/tr");
  return res.data.data;
};

export default {
  props: ["dailyData"],
  extends: Line,
  components: { chart },
  computed: {
    data: function() {
      if (!this.dailyData) return "";
      let daily = this.dailyData;

      console.log(daily);

      var data = {
        chartdata: {
          labels: _.map(daily, function(dd) {
            return dd.date;
          }),
          datasets: [
            {
              label: "Toplam İyileşen",
              backgroundColor: "#4fd1c5",
              data: _.map(daily, function(dd) {
                return dd.recovered;
              })
            },
            {
              label: "Yeni Ölüm",
              backgroundColor: "#6b7b96",
              data: _.map(daily, function(dd) {
                return dd.todayDeath;
              })
            },
            {
              label: "Toplam Ölüm",
              backgroundColor: "#4a5568",
              data: _.map(daily, function(dd) {
                return dd.death;
              })
            },
            {
              label: "Yeni Vaka",
              backgroundColor: "#c56666",
              data: _.map(daily, function(dd) {
                return dd.todayCase;
              })
            },
            {
              label: "Toplam Vaka",
              backgroundColor: "#fc8181",
              data: _.map(daily, function(dd) {
                return dd.totalCase;
              })
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            mode: "x-axis"
          }
        }
      };
      return data;
    }
  }
};
</script>


<style lang="sass">
#keepnoxChart
  position: relative
  background: white
  height: auto !important;
</style>
