<template>
    <div id="chart5Container">
        <div class="ContainerContent">
            <p>{{ $t('yearSpending') }} {{yearVar}}</p>
            <bar-chart :chart-data="this.datacollection" :styles="myStyles" :options="this.options" ></bar-chart>
        </div>
    </div>
</template>

<script>

  import BarChart from './BarChart.js'
  import db from "@/db.js"

  export default {
    components: {
      BarChart
    },
    data () {
      return {
        datacollection: null,
        gradient:null,
        yearVar: new Date().getFullYear(),
        monthRefs: [],
        monthData: [],
        currentMonth : new Date(new Date().getFullYear(),new Date().getMonth(), 1),
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
        }
      }
    },
    mounted () {
      this.fillData ()
    },
    methods: {
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      fillData(){
            this.datacollection = {
              labels: [this.$i18n.t('jan'), this.$i18n.t('feb'), this.$i18n.t('mar'), this.$i18n.t('apr'), this.$i18n.t('may'), this.$i18n.t('jun'), this.$i18n.t('jul'), this.$i18n.t('aug'), this.$i18n.t('sep'), this.$i18n.t('oct'), this.$i18n.t('nov'), this.$i18n.t('dec')],
              datasets: [{
                label: "Ausgaben",
                data: this.monthData,
                backgroundColor:'#F29A42'
               
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
  mounted () {
    },

  created(){
      var i = 5;
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
        vm.monthData[0] = spendings;
      });

      docRefFeb.get().then(function(querySnapshot) {
        var spendings = 0;
        querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
        vm.monthData[1] = spendings;
      });

      docRefMar.get().then(function(querySnapshot) {
        var spendings = 0;
        querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
        vm.monthData[2] = spendings;
      });

      docRefApr.get().then(function(querySnapshot) {
        var spendings = 0;
        querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
        vm.monthData[3] = spendings;
      });

      docRefMay.get().then(function(querySnapshot) {
        var spendings = 0;
        querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
        vm.monthData[4] = spendings;
      });

      docRefJun.get().then(function(querySnapshot) {
        var spendings = 0;
        querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
        vm.monthData[5] = spendings;
      });

      docRefJul.get().then(function(querySnapshot) {
        var spendings = 0;
        querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
        vm.monthData[6] = spendings;
      });

      docRefAug.get().then(function(querySnapshot) {
        var spendings = 0;
        querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
        vm.monthData[7] = spendings;
      });

      docRefSep.get().then(function(querySnapshot) {
        var spendings = 0;
        querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
        vm.monthData[8] = spendings;
      });

      docRefOct.get().then(function(querySnapshot) {
        var spendings = 0;
        querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
        vm.monthData[9] = spendings;
      });

      docRefNov.get().then(function(querySnapshot) {
        var spendings = 0;
        querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
        vm.monthData[10] = spendings;
      });

      docRefDec.get().then(function(querySnapshot) {
        var spendings = 0;
        querySnapshot.forEach(function(doc) {spendings = spendings + doc.get("wert");});
        vm.monthData[11] = spendings;
        vm.fillData();
      });
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