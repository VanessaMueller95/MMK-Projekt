<template>
    <div id="chart6Container">
        <div class="ContainerContent">
            <p>{{ $t('balance') }}</p>
            <bar-chart :chartData="this.datacollection" :styles="myStyles" :options="this.options" ></bar-chart>
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
        datacollection: {},
        monthlyBudget: 0, thisMonthBalance: 0, oneMonthAgoBalance:0, twoMonthAgoBalance:0, threeMonthAgoBalance:0, fourMonthAgoBalance:0,
        months: [this.$i18n.t('months[0]'),this.$i18n.t('months[1]'),this.$i18n.t('months[2]'),this.$i18n.t('months[3]'),this.$i18n.t('months[4]'),this.$i18n.t('months[5]'),this.$i18n.t('months[6]'),this.$i18n.t('months[7]'),this.$i18n.t('months[8]'),this.$i18n.t('months[9]'),this.$i18n.t('months[10]'),this.$i18n.t('months[11]')],
        fourthLastMonth: new Date(new Date().getFullYear(),new Date().getMonth()-5, 1),
        thirdLastMonth: new Date(new Date().getFullYear(),new Date().getMonth()-3, 1),
        secondLastMonth: new Date(new Date().getFullYear(),new Date().getMonth()-2, 1),
        lastMonth: new Date(new Date().getFullYear(),new Date().getMonth()-1, 1),
        currentMonth : new Date(new Date().getFullYear(),new Date().getMonth(), 1),
        nextMonth : new Date(new Date().getFullYear(),new Date().getMonth()+1, 1),
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
      fillData(){
        var dataArray= [(this.thisMonthBalance).toFixed(2), (this.oneMonthAgoBalance).toFixed(2), (this.twoMonthAgoBalance).toFixed(2), (this.threeMonthAgoBalance).toFixed(2), (this.fourMonthAgoBalance).toFixed(2)];
        var colorsArray = dataArray.map((value) => value < 0 ? '#f39b42' : '#13B4B6');
        var labelsArray= [];
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
              label: this.$i18n.t('bal'),
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
    created(){
        var MonthBudgetRef = db.collection('budget').doc('monatsbudget');
        var thisMonthRef = db.collection('ausgaben').where("datum", ">", this.currentMonth).where("datum", "<", this.nextMonth)
        var oneMonthAgoRef = db.collection('ausgaben').where("datum", ">", this.lastMonth).where("datum", "<", this.currentMonth)
        var twoMonthAgoRef = db.collection('ausgaben').where("datum", ">", this.secondLastMonth).where("datum", "<", this.lastMonth)
        var threeMonthAgoRef = db.collection('ausgaben').where("datum", ">", this.thirdLastMonth).where("datum", "<", this.secondLastMonth)
        var fourMonthAgoRef = db.collection('ausgaben').where("datum", ">", this.fourthLastMonth).where("datum", "<", this.thirdLastMonth)

        var vm = this;

        MonthBudgetRef.get().then(function(doc) {

            vm.monthlyBudget = doc.data().wert;

            thisMonthRef.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {vm.thisMonthBalance += doc.get("wert");});
                vm.thisMonthBalance = vm.monthlyBudget - vm.thisMonthBalance;
            });

            oneMonthAgoRef.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {vm.oneMonthAgoBalance += doc.get("wert");});
                vm.oneMonthAgoBalance = vm.monthlyBudget - vm.oneMonthAgoBalance;

            });

            twoMonthAgoRef.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {vm.twoMonthAgoBalance += doc.get("wert");});
                vm.twoMonthAgoBalance = vm.monthlyBudget - vm.twoMonthAgoBalance;
            });

            threeMonthAgoRef.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {vm.threeMonthAgoBalance += doc.get("wert");});
                vm.threeMonthAgoBalance = vm.monthlyBudget - vm.threeMonthAgoBalance;
            });

            fourMonthAgoRef.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {vm.fourMonthAgoBalance += doc.get("wert");});
                vm.fourMonthAgoBalance = vm.monthlyBudget - vm.fourMonthAgoBalance;
                vm.fillData();
            });
        });
    }
  }
</script>

<style scoped>

  #chart6Container{border-radius: 10px; width: 87%; height: 200px; margin-top: 10px; width: 100%; background-color: white;}

  .ContainerContent{height: 200px;}

</style>