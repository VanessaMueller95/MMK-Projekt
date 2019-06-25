<template>
    <div id="chart1Container">
        <div class="ContainerContent">
            <Dounut :chart-data="this.datacollection" :styles="myStyles" :options="this.options"></Dounut>
        </div>
    </div>
</template>

<script>

    import Dounut from "./DonutChart.js";
    import db from "@/db.js"

    export default{
        components: {
            Dounut
        },
        data () {
            return {
                ausgaben: [],
                ausgabenMonth: [],
                gesAusgabenMonth: 0.0,
                monthBudgetRef: [],
                monthBudget: 0,
                leftDays: 0.0,
                pastDays: 0.0,
                currentMonth : new Date(new Date().getFullYear(),new Date().getMonth(), 1),
                nextMonth : new Date(new Date().getFullYear(),new Date().getMonth()+1, 1),
                test: 5,
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
                                if (tooltipItem.datasetIndex === 0) {
                                    return data['datasets'][0]['data'][tooltipItem['index']] + "€";
                                } else if (tooltipItem.datasetIndex === 1) {
                                     return data['datasets'][1]['data'][tooltipItem['index']] + "Tage";
                                }
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                }
      };
    },
    methods: {
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      calculateDaysInMonth(){
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getYear();
        this.pastDays = Number(day);
        this.leftDays = this.daysInMonth(month, year)-day;
      },
      daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
      },
      calculateSpendings(){
                var i;
                for (i = 0; i < this.ausgabenMonth.length; i++) {
                    this.gesAusgabenMonth = this.gesAusgabenMonth + this.ausgabenMonth[i].wert;
                } 
      },
      fillData(){
          this.datacollection = {
              labels: ["Tage", "€"], 
              datasets: [
                  {
                        label: ["1"],
                        data: [this.monthBudget, this.gesAusgabenMonth],
                        backgroundColor: ["#13B4B6", "#ECECEC"]
                    },
                    {
                        label: ["2"],
                        data: [this.leftDays, this.pastDays],
                        backgroundColor: ["#ECECEC", "#f39b42"]
                }],
          }
      }
    },
    computed: {
        myStyles () {
            return {
                height: '185px',
                width: '320px',
                padding: '0px'
            }
        },
    },
    mounted() {
        this.calculateDaysInMonth(),
        this.$bind('ausgabenMonth', db.collection('ausgaben').where("datum", ">", this.currentMonth).where("datum", "<", this.nextMonth))
                .then((doc) => {
                    this.calculateSpendings()
                    this.$bind("monthBudgetRef", db.collection('budget').doc('monatsbudget'))
                        .then((doc) => {
                            this.monthBudget= doc.wert; 
                        })
                        .then((doc) => {
                            this.monthBudget = Math.round(this.monthBudget - this.gesAusgabenMonth);
                            this.fillData()
                        }).catch(err => {
                            console.error(err)
                        })
                    })
                .catch((error) => {
                    console.log('error in loading: ', error)
                })
       
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