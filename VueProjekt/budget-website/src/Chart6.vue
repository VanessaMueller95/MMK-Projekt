<template>
    <div id="chart6Container">
        <div class="ContainerContent">
            <p>{{ $t('balance') }}</p>
            <bar-chart :chartdata="this.chartconfig" :styles="myStyles" :options="this.options" :labels="this.labels" :type="this.type"></bar-chart>
        </div>
    </div>
</template>

<script>

 import BarChart from './HorBar.js'

 const data = [10, -20, 40, -30, 10];
 const colours = data.map((value) => value < 0 ? '#f39b42' : '#13B4B6');

 export default {
    components: {
      BarChart
    },
    data () {
      return {
        datacollection: null,
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
                        display: false,
                        drawBorder: false
                    }
                }],
                xAxes: [{
                    display: false,
                    maxBarThickness: 10,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }]
            }
        },
        labels: [this.$i18n.t('jan'), this.$i18n.t('feb'), this.$i18n.t('mar'), this.$i18n.t('apr'), this.$i18n.t('may')],
        chartconfig: {
              label: 'Bilanz',
              borderWidth: 0,
              barThickness: 2,
              data: data,
              backgroundColor: colours
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
        height: `140px`,
        position: 'relative'
      }
    }
  }
  }
</script>

<style scoped>

#chart6Container{
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