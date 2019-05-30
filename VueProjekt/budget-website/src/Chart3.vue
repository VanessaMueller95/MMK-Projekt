<template>
    <div id="chart3Container">
        <div class="ContainerContent">
            <p>MONATSAUSGABEN</p>
            <pie-chart :chartdata="this.chartconfig" :styles="myStyles" :options="this.options" :labels="this.labels"></pie-chart>
            <div id="chart-legends"></div>
        </div>
    </div>
</template>

<script>

import PieChart from "./PieChart.js";

    export default{
        components: {
            PieChart
        },
        data () {
            return {
                datacollection: null,
                gradient:null,
                options: {
                    fontFamily: 'Muli',
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            padding: 50
                                                }
                    },
                    
                responsive: true,
                maintainAspectRatio: false,
                },
        labels: ['Miete', 'Auto', 'Strom', 'Nahrung', 'Kleidung', 'Verfügbar'],
        chartconfig: {
              label: 'Kategorien',
              backgroundColor: ["#71c5c7", "#0caeaa", "#176668", "#b1b1b1", "#6e7373", "#f29940"],
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
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
        position: 'right'
      }
    }
  }
  }
</script>

<style scoped>

#chart3Container{
    border-radius: 10px;
    height: 200px;
    margin-top: 10px;
    width: 100%;
    background-color: white;
}

</style>