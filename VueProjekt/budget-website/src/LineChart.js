import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    labels: {
        type: Array,
        default: () => ['A', 'B', 'C']
    },
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      gradient: null
    }
  },
  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450),
      this.gradient.addColorStop(0, 'rgba(19, 180,182, 1)'),
      this.gradient.addColorStop(0.5, 'rgba(199, 221, 229, 0)'),
      

    this.renderChart({
        labels: this.labels,
        datasets: [
            {
                ...this.chartdata,
                backgroundColor: 'rgba(0, 0,0, 0)',
                borderColor: this.gradient
            }
        ]
    },
    this.options)
  }
}
