<template>
    <div id="chart5Container">
        <div class="ContainerContent">
            <p>{{ $t('yearSpending') }}</p>
            <line-chart :chartdata="this.chartconfig" :styles="myStyles" :options="this.options" :labels="this.labels"></line-chart>
        </div>
    </div>
</template>

<script>

  import LineChart from './LineChart.js'

  export default {
    components: {
      LineChart
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
                    gridLines: {
                        display: false
                    }
                }]
            }
        },
        labels: [this.$i18n.t('jan'), this.$i18n.t('feb'), this.$i18n.t('mar'), this.$i18n.t('apr'), this.$i18n.t('may'), this.$i18n.t('jun'), this.$i18n.t('jul'), this.$i18n.t('aug'), this.$i18n.t('sep'), this.$i18n.t('oct'), this.$i18n.t('nov'), this.$i18n.t('dec')],
        chartconfig: {
              label: 'Ausgaben',
              pointBackgroundColor: '#F29A42',
              borderWidth: 2,
              pointBorderColor: '#F29A42',
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
        height: `140px`,
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