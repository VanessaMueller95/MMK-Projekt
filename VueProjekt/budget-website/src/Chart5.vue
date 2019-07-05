<template>
    <div id="chart5Container">
        <div class="ContainerContent">
            <p>{{ $t('yearSpending') }} {{yearVar}}</p>
            <line-chart :chartData="this.datacollection" :styles="myStyles" :options="this.options"></line-chart>
        </div>
    </div>
</template>

<script>

  import LineChart from './LineChart.js'
  import db from "@/db.js"

  export default{
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: {},
        yearVar: new Date().getFullYear(),
        monthData: [],
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
                        display: false
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            }
        }
      }
    },
    methods: {
      fillData(){
        this.datacollection = {
          labels: [this.$i18n.t('months[0]'), this.$i18n.t('months[1]'), this.$i18n.t('months[2]'), this.$i18n.t('months[3]'), this.$i18n.t('months[4]'), this.$i18n.t('months[5]'), this.$i18n.t('months[6]'), this.$i18n.t('months[7]'), this.$i18n.t('months[8]'), this.$i18n.t('months[9]'), this.$i18n.t('months[10]'), this.$i18n.t('months[11]')],
          datasets: [{
            label: this.$i18n.t('spendingsSM'),
            data: this.monthData,
            pointBackgroundColor: '#F29A42',
            borderWidth: 2,
            pointBorderColor: '#F29A42',
            backgroundColor: ["#71c5c7"],
            fill: false,
            borderColor: ["#13B4B6"]
          }]
        }
      }
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
        var docRefJan = db.collection('ausgaben').where("datum", ">", new Date(new Date().getFullYear(),0, 1)).where("datum", "<", new Date(new Date().getFullYear(),1, 1));
        var docRefFeb = db.collection('ausgaben').where("datum", ">", new Date(new Date().getFullYear(),1, 1)).where("datum", "<", new Date(new Date().getFullYear(),2, 1));
        var docRefMar = db.collection('ausgaben').where("datum", ">", new Date(new Date().getFullYear(),2, 1)).where("datum", "<", new Date(new Date().getFullYear(),3, 1));
        var docRefApr = db.collection('ausgaben').where("datum", ">", new Date(new Date().getFullYear(),3, 1)).where("datum", "<", new Date(new Date().getFullYear(),4, 1));
        var docRefMay = db.collection('ausgaben').where("datum", ">", new Date(new Date().getFullYear(),4, 1)).where("datum", "<", new Date(new Date().getFullYear(),5, 1));
        var docRefJun = db.collection('ausgaben').where("datum", ">", new Date(new Date().getFullYear(),5, 1)).where("datum", "<", new Date(new Date().getFullYear(),6, 1));
        var docRefJul = db.collection('ausgaben').where("datum", ">", new Date(new Date().getFullYear(),6, 1)).where("datum", "<", new Date(new Date().getFullYear(),7, 1));
        var docRefAug = db.collection('ausgaben').where("datum", ">", new Date(new Date().getFullYear(),7, 1)).where("datum", "<", new Date(new Date().getFullYear(),8, 1));
        var docRefSep = db.collection('ausgaben').where("datum", ">", new Date(new Date().getFullYear(),8, 1)).where("datum", "<", new Date(new Date().getFullYear(),9, 1));
        var docRefOct = db.collection('ausgaben').where("datum", ">", new Date(new Date().getFullYear(),9, 1)).where("datum", "<", new Date(new Date().getFullYear(),10, 1));
        var docRefNov = db.collection('ausgaben').where("datum", ">", new Date(new Date().getFullYear(),10, 1)).where("datum", "<", new Date(new Date().getFullYear(),11, 1));
        var docRefDec = db.collection('ausgaben').where("datum", ">", new Date(new Date().getFullYear(),11, 1)).where("datum", "<", new Date(new Date().getFullYear(),0, 1));

        var vm = this;

        docRefJan.get().then(function(querySnapshot) {
          var spendings = 0;
          querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
          vm.monthData[0] = (spendings).toFixed(2);
        });

        docRefFeb.get().then(function(querySnapshot) {
          var spendings = 0;
          querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
          vm.monthData[1] = (spendings).toFixed(2);
        });

        docRefMar.get().then(function(querySnapshot) {
          var spendings = 0;
          querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
          vm.monthData[2] = (spendings).toFixed(2);
        });

        docRefApr.get().then(function(querySnapshot) {
          var spendings = 0;
          querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
          vm.monthData[3] = (spendings).toFixed(2);
        });

        docRefMay.get().then(function(querySnapshot) {
          var spendings = 0;
          querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
          vm.monthData[4] = (spendings).toFixed(2);
        });

        docRefJun.get().then(function(querySnapshot) {
          var spendings = 0;
          querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
          vm.monthData[5] = (spendings).toFixed(2);
        });

        docRefJul.get().then(function(querySnapshot) {
          var spendings = 0;
          querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
          vm.monthData[6] = (spendings).toFixed(2);
        });

        docRefAug.get().then(function(querySnapshot) {
          var spendings = 0;
          querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
          vm.monthData[7] = (spendings).toFixed(2);
        });

        docRefSep.get().then(function(querySnapshot) {
          var spendings = 0;
          querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
          vm.monthData[8] = (spendings).toFixed(2);
        });

        docRefOct.get().then(function(querySnapshot) {
          var spendings = 0;
          querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
          vm.monthData[9] = (spendings).toFixed(2);
        });

        docRefNov.get().then(function(querySnapshot) {
          var spendings = 0;
          querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
          vm.monthData[10] = (spendings).toFixed(2);
        });

        docRefDec.get().then(function(querySnapshot) {
          var spendings = 0;
          querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
          vm.monthData[11] = (spendings).toFixed(2);
          vm.fillData();
        });
    }
  }
    
</script>

<style scoped>

  #chart5Container{border-radius: 10px; width: 87%; height: 200px; margin-top: 10px; width: 100%; background-color: white;}

  .ContainerContent{height: 200px;}

</style>