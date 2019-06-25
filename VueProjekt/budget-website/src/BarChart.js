import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default{
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    labels: [],
    chartdata: [],
    options: []
  },
  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450),
    this.gradient.addColorStop(0, 'rgba(199, 221, 229, 0.2)'),
    this.gradient.addColorStop(0.5, 'rgba(19, 180,182, 1)'),

    this.renderChart({
        labels: this.labels,
        datasets: [
            {
                ...this.chartdata,
                backgroundColor: this.gradient,
            }
        ]
      },
      this.options,)
  }
}
