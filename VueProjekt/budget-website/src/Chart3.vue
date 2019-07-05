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
          refRent: [], refCar: [], refElectricity: [], refFood: [], refClothes: [], refOthers: [],
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
      mounted(){
            this.$bind('refRent', db.collection('ausgaben').where("datum", ">", this.currentMonth).where("datum", "<", this.nextMonth).where("kategorie", "==", "miete"))
                    .then(() => {
                      var i;
                      for (i = 0; i < this.refRent.length; i++) {this.spendingsRent += this.refRent[i].wert; }
                    })
                    .catch((error) => {
                        console.log('error in loading: ', error)
                    })
            this.$bind('refCar', db.collection('ausgaben').where("datum", ">", this.currentMonth).where("datum", "<", this.nextMonth).where("kategorie", "==", "auto"))
                    .then(() => {
                      var i;
                      for (i = 0; i < this.refCar.length; i++) {this.spendingsCar += this.refCar[i].wert;}
                    })
                    .catch((error) => {
                        console.log('error in loading: ', error)
                    })
            this.$bind('refElectricity', db.collection('ausgaben').where("datum", ">", this.currentMonth).where("datum", "<", this.nextMonth).where("kategorie", "==", "strom"))
                    .then(() => {
                      var i;
                      for (i = 0; i < this.refElectricity.length; i++) {this.spendingsElectricity += this.refElectricity[i].wert;}
                    })
                    .catch((error) => {
                        console.log('error in loading: ', error)
                    })
            this.$bind('refFood', db.collection('ausgaben').where("datum", ">", this.currentMonth).where("datum", "<", this.nextMonth).where("kategorie", "==", "essen"))
                    .then(() => {
                      var i;
                      for (i = 0; i < this.refFood.length; i++) {this.spendingsFood += this.refFood[i].wert;}
                    })
                    .catch((error) => {
                        console.log('error in loading: ', error)
                    })
            this.$bind('refClothes', db.collection('ausgaben').where("datum", ">", this.currentMonth).where("datum", "<", this.nextMonth).where("kategorie", "==", "kleidung"))
                    .then(() => {
                      var i;
                      for (i = 0; i < this.refClothes.length; i++) {this.spendingsClothes += this.refClothes[i].wert;}
                    })
                    .catch((error) => {
                        console.log('error in loading: ', error)
                    })
            this.$bind('refOthers', db.collection('ausgaben').where("datum", ">", this.currentMonth).where("datum", "<", this.nextMonth).where("kategorie", "==", "sonstiges"))
                    .then(() => {
                      var i;
                      for (i = 0; i < this.refOthers.length; i++) {this.spendingsOthers += this.refOthers[i].wert;}
                      this.fillData()
                    })
                    .catch((error) => {
                        console.log('error in loading: ', error)
                    })
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