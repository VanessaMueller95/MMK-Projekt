import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ['options'],
  
  mounted () {
    this.renderChart(this.chartData,this.options)

  Chart.pluginService.register({
      beforeDraw: function(chart) {
        if (chart.config.options.plugin) {
        var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;
    
        ctx.restore();
        var fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + "em Muli";
        ctx.textBaseline = "middle";
    
        var text = "27%",
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2.4;
    
        ctx.fillText(text, textX, textY);
        ctx.save();
        }
      }
    });
    

  }
}