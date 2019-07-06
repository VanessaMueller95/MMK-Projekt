<template>
    <div id="chart3Container">
        <div class="ContainerContent">
            <p>{{ $t('monSpending') }}</p>
            <pie-chart :chartData="this.datacollection" :styles="myStyles" :options="this.options" ></pie-chart>
        </div>
    </div>
</template>

<script>

import PieChart from "./PieChart.js";
import db from "@/db.js"

    export default{
      components: {
        PieChart
      },
      data () {
        return {
          datacollection: {},
          spendingsRent: 0, spendingsCar: 0, spendingsElectricity: 0, spendingsFood: 0, spendingsClothes: 0, spendingsOthers: 0,
          currentMonth : new Date(new Date().getFullYear(),new Date().getMonth(), 1),
          nextMonth : new Date(new Date().getFullYear(),new Date().getMonth()+1, 1),
          options: {
            fontFamily: 'Muli',
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: true,
              position: 'right',
              labels: {
                padding: 10,
                usePointStyle: true
              }
            }
          }
        }
      },
      methods: {
        fillData (){
          this.datacollection = {
            labels: [this.$i18n.t('rent'), this.$i18n.t('car'), this.$i18n.t('electricity'), this.$i18n.t('food'), this.$i18n.t('clothes'), this.$i18n.t('available')], 
            datasets: [{
              data: [(this.spendingsRent).toFixed(2), (this.spendingsCar).toFixed(2), (this.spendingsElectricity).toFixed(2), (this.spendingsFood).toFixed(2), (this.spendingsClothes).toFixed(2), (this.spendingsOthers).toFixed(2)],
              backgroundColor: ["#71c5c7", "#0caeaa", "#176668", "#b1b1b1", "#6e7373", "#f29940"]
            }]
          }
        }
      },
      created(){
        var refRent = db.collection('ausgaben').where("datum", ">", this.currentMonth).where("datum", "<", this.nextMonth).where("kategorie", "==", "miete")
        var refCar = db.collection('ausgaben').where("datum", ">", this.currentMonth).where("datum", "<", this.nextMonth).where("kategorie", "==", "auto")
        var refElectricity = db.collection('ausgaben').where("datum", ">", this.currentMonth).where("datum", "<", this.nextMonth).where("kategorie", "==", "strom")
        var refFood = db.collection('ausgaben').where("datum", ">", this.currentMonth).where("datum", "<", this.nextMonth).where("kategorie", "==", "essen")
        var refClothes = db.collection('ausgaben').where("datum", ">", this.currentMonth).where("datum", "<", this.nextMonth).where("kategorie", "==", "kleidung")
        var refOthers = db.collection('ausgaben').where("datum", ">", this.currentMonth).where("datum", "<", this.nextMonth).where("kategorie", "==", "sonstiges")

        var vm = this;

        refRent.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {vm.spendingsRent += doc.get("wert");});
        });

        refCar.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {vm.spendingsCar += doc.get("wert");});
        });

        refElectricity.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {vm.spendingsElectricity += doc.get("wert");});
        });

        refFood.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {vm.spendingsFood += doc.get("wert");});
        });

        refClothes.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {vm.spendingsClothes += doc.get("wert");});
        });

        refOthers.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {vm.spendingsOthers += doc.get("wert");});
            vm.fillData();
        });
      },
      computed: {
        myStyles () {
          return {
            height: '150px',
            padding: '0px'
          }
        }
    }
  }
</script>

<style scoped>

  #chart3Container{border-radius: 10px; height: 200px; margin-top: 10px; width: 100%; background-color: white;}

  .ContainerContent{height: 200px;}

  p{padding-bottom: 0px; margin-bottom: 5px;}

</style>