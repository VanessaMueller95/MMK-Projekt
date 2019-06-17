import { HorizontalBar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: HorizontalBar,
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
    },
    type:{
      type: String,
      default: null
    }
  },
  data () {
    return {
    }
  },
  mounted () {

    this.renderChart({
        labels: this.labels,
        datasets: [
            {
                ...this.chartdata,
            }
        ]
      },
      this.options,)
  }
}
