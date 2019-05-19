<template>
    <div id="chart5Container">
        <div class="ContainerContent">
            <p>MONATLICHE AUSGABEN 2018</p>
            <bar-chart :chartdata="this.chartconfig" :styles="myStyles" :options="this.options" :labels="this.labels"></bar-chart>
        </div>
    </div>
</template>

<script>

  import BarChart from './BarChart.js'

  export default {
    components: {
      BarChart
    },
    data () {
      return {
        datacollection: null,
        gradient:null,
        options: {
            fontFamily: 'Muli',
            legend: {
                display: false
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5
                    },
                    gridLines: {
                        display: false
                    }
                }],
                xAxes: [{
                    maxBarThickness: 40,
                    gridLines: {
                        display: false
                    }
                }]
            }
        },
        labels: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        chartconfig: {
              label: 'Ausgaben',
              borderWidth: 0,
              barThickness: 2,
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(),]
            }
      }
    },
    mounted () {
    },
    methods: {
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    },
    computed: {
    myStyles () {
      return {
        height: `130px`,
        position: 'relative'
      }
    }
  }
  }
</script>

<style scoped>

#chart5Container{
    border-radius: 10px;
    width: 87%;
    height: 200px;
    margin-top: 10px;
    width: 100%;
    background-color: white;
}

.ContainerContent{
    height: 200px;
}

</style>