<script>
import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'

export default {
  props: ['chartdata', 'options'],
  extends: Line,
  mounted () {
    this.renderChart(this.chartdata, this.options)
  },
  
}
</script>


<style lang="sass">
#keepnoxChart
  height: 205px;
</style>