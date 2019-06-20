<template>
    <div id="chart1Container">
        <div class="ContainerContent">
            <Dounut :chartdata="this.chartconfig" :styles="myStyles" :options="this.options" :labels="this.labels"></Dounut>
        </div>
    </div>
</template>

<script>

    import Dounut from "./DonutChart.js";

    export default{
        components: {
            Dounut
        },
        data () {
            return {
                test: this.$i18n.t('rent'),
                datacollection: null,
                gradient:null,
                options: {
                    plugin: true,
                    rotation: (-0.5 * Math.PI) + (50/180 * Math.PI),
                    fontFamily: 'Muli',
                    cutoutPercentage: 60,
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            generateLabels: function() {
                                return [
                                    { 
                                        text: "Restbudget",
                                        fillStyle: '#13B4B6',
                                        lineWidth: 0
                                    },
                                    { 
                                        text: "Vergangene Tage im Monat",
                                        fillStyle: '#f39b42',
                                        lineWidth: 0
                                    }
                                ]
                            },
                            usePointStyle: true,}
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var dataset = data.datasets[tooltipItem.datasetIndex];
                                var index = tooltipItem.index;
                                return dataset.labels[index] + ': ' + dataset.data[index];
                            }
                        }
                    },
                    
                    responsive: true,
                    maintainAspectRatio: false,
                },
        labels: [this.$i18n.t('rent'), this.$i18n.t('car')],
        chartconfig: [{
            labels: ["1","2"],
            data: [20, 80],
            backgroundColor: ["#13B4B6", "#ECECEC"]
            },
            {data: [30, 70],
            backgroundColor: ["#ECECEC", "#f39b42"],
            labels: ["3","2"]
        }],
        
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
        height: '185px',
        width: '320px',
        padding: '0px'
      }
    }
  }
  }
</script>

<style scoped>

#chart1Container{
    border-radius: 10px;
    height: 200px;
    margin-top: 10px;
    width: 100%;
    background-color: white;
}

.ContainerContent{
    height: 200px;
}

p{
  padding-bottom: 0px;
  margin-bottom: 5px;
}

</style>