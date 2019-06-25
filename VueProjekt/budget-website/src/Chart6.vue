<template>
    <div id="chart6Container">
        <div class="ContainerContent">
            <p>{{ $t('balance') }}</p>
            <bar-chart :chart-data="this.datacollection" :styles="myStyles" :options="this.options" ></bar-chart>
        </div>
    </div>
</template>

<script>

 import BarChart from './HorBar.js';
 import db from "@/db.js"

 export default{
    components: {
      BarChart
    },
    data () {
      return {
        datacollection: null,
        monthBudgetRef: [], thisMonthRef: [], oneMonthAgoRef:[], twoMonthAgoRef:[], threeMonthAgoRef:[], fourMonthAgoRef:[],
        monthlyBudget: 0, thisMonthBalance: 0, oneMonthAgoBalance:0, twoMonthAgoBalance:0, threeMonthAgoBalance:0, fourMonthAgoBalance:0,
        months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        fourthLastMonth: new Date(new Date().getFullYear(),new Date().getMonth()-5, 1),
        thirdLastMonth: new Date(new Date().getFullYear(),new Date().getMonth()-3, 1),
        secondLastMonth: new Date(new Date().getFullYear(),new Date().getMonth()-2, 1),
        lastMonth: new Date(new Date().getFullYear(),new Date().getMonth()-1, 1),
        currentMonth : new Date(new Date().getFullYear(),new Date().getMonth(), 1),
        nextMonth : new Date(new Date().getFullYear(),new Date().getMonth()+1, 1),
        colors:[],
        options: {
            fontFamily: 'Muli',
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
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
        }
      }
    },
    methods: {
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      fillData(){
        console.log("data wird ausgefüllt")
        var dataArray= [this.thisMonthBalance, this.oneMonthAgoBalance, this.twoMonthAgoBalance, this.threeMonthAgoBalance, this.fourMonthAgoBalance];
        var colorsArray = dataArray.map((value) => value < 0 ? '#f39b42' : '#13B4B6');
        var labelsArray= [];
        var month = new Date().getMonth();
        var d = new Date();
        d.setDate(1); 
        for (var m_month = 0; m_month < 5; m_month++){
            labelsArray[m_month] = this.months[d.getMonth()];
                d.setMonth(d.getMonth()-1);
        }
        this.datacollection = {
          labels: labelsArray,
          datasets: [
          {
              label: ["Bilanz"],
              data: dataArray,
              backgroundColor: colorsArray
          }],
       
      }}
    },
    computed: {
      myStyles () {
        return {
          height: `140px`,
          position: 'relative'
        }
      }
    },
    mounted () {
      this.$bind("monthBudgetRef", db.collection('budget').doc('monatsbudget'))
                .then((doc) => {
                    this.monthlyBudget= doc.wert;

                    this.$bind('thisMonthRef', db.collection('ausgaben').where("datum", ">", this.currentMonth).where("datum", "<", this.nextMonth))
                    .then(() => {
                      var i;
                      for (i = 0; i < this.thisMonthRef.length; i++) {this.thisMonthBalance += this.thisMonthRef[i].wert; }
                      this.thisMonthBalance = this.monthlyBudget - this.thisMonthBalance
                      console.log("Balance of this month: " + this.thisMonthBalance);
                    })

                    this.$bind('oneMonthAgoRef', db.collection('ausgaben').where("datum", ">", this.lastMonth).where("datum", "<", this.currentMonth))
                    .then(() => {
                      var i;
                      for (i = 0; i < this.oneMonthAgoRef.length; i++) {this.oneMonthAgoBalance += this.oneMonthAgoRef[i].wert; }
                      this.oneMonthAgoBalance = this.monthlyBudget - this.oneMonthAgoBalance
                      console.log("Balance of last month: " + this.oneMonthAgoBalance);
                    })

                    this.$bind('twoMonthAgoRef', db.collection('ausgaben').where("datum", ">", this.secondLastMonth).where("datum", "<", this.lastMonth))
                    .then(() => {
                      var i;
                      for (i = 0; i < this.twoMonthAgoRef.length; i++) {this.twoMonthAgoBalance += this.twoMonthAgoRef[i].wert; }
                      this.twoMonthAgoBalance = this.monthlyBudget - this.twoMonthAgoBalance
                      console.log("Balance of 2 month ago: " + this.twoMonthAgoBalance);
                    })

                    this.$bind('threeMonthAgoRef', db.collection('ausgaben').where("datum", ">", this.thirdLastMonth).where("datum", "<", this.secondLastMonth))
                    .then(() => {
                      var i;
                      for (i = 0; i < this.threeMonthAgoRef.length; i++) {this.threeMonthAgoBalance += this.threeMonthAgoRef[i].wert; }
                      this.threeMonthAgoBalance = this.monthlyBudget - this.threeMonthAgoBalance
                      console.log("Balance of 3 month ago: " + this.threeMonthAgoBalance);
                    })

                    this.$bind('fourMonthAgoRef', db.collection('ausgaben').where("datum", ">", this.fourthLastMonth).where("datum", "<", this.thirdLastMonth))
                    .then(() => {
                      var i;
                      for (i = 0; i < this.fourMonthAgoRef.length; i++) {this.fourMonthAgoBalance += this.fourMonthAgoRef[i].wert; }
                      this.fourMonthAgoBalance = this.monthlyBudget - this.fourMonthAgoBalance
                      console.log("Balance of 4 month ago: " + this.fourMonthAgoBalance);
                      this.fillData()
                    })
                })

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