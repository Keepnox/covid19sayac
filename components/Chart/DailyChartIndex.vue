<script>
import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'


const dailyDataFunction = async context => {
  const res = await context.$axios.get('/api/covid19/tr');
  return res.data.data;
};

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