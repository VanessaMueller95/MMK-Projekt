<template>
    <div id="chart2Container">
        <div class="ContainerContent">
            <div id="content1">
                <div class="gesamtText">
                    <p>
                        <span class="text">{{ $t('budget') }} </span><br>
                        <span class="money">{{bud}} {{$t('currency')}}</span> 
                    </p>
                </div>
            </div>
            <div id="content2">
                <div class="gesamtText">
                    <p>
                        <span class="text">{{ $t('rest') }} </span><br>
                        <span class="money">{{thisMonthBalance}} {{$t('currency')}}</span> 
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import db from "@/db.js"

    export default{
        name:"chart2",
        data(){
            return{
                einnahmen: [],
                ausgaben: [],
                budget: 0.0,
                spendings: 0.0,
                wholeBudgetDoc: {},
                bud: 0.0,
                monthBudget: 0.0,
                thisMonthRef: [],
                monthBudgetRef: [],
                thisMonthBalance: 0,
                currentMonth : new Date(new Date().getFullYear(),new Date().getMonth(), 1),
                nextMonth : new Date(new Date().getFullYear(),new Date().getMonth()+1, 1),
            };
        },
        
        methods:{
            calculateBudget(){
                var i;
                for (i = 0; i < this.einnahmen.length; i++) {
                    this.budget = this.budget + this.einnahmen[i].wert;
                } 
            },
            calculateSpendings(){
                var i;
                for (i = 0; i < this.ausgaben.length; i++) {
                    this.spendings = this.spendings + this.ausgaben[i].wert;
                } 
            },         
        },
        mounted(){
            this.$bind('einnahmen', db.collection('einnahmen'))
                .then(() => {
                    this.calculateBudget()
                })
                .catch((error) => {
                    console.log('error in loading: ', error)
                })
            this.$bind('ausgaben', db.collection('ausgaben'))
                .then(() => {
                    this.calculateSpendings()
                })
                .catch((error) => {
                    console.log('error in loading: ', error)
                })
            this.$bind("wholeBudgetDoc", db.collection('budget').doc('gesamtbudget'))
                .then((doc) => {
                    this.bud= doc.wert; 
                this.bud= (this.budget-this.spendings).toFixed(2);
                }).catch(err => {
                    console.error(err)
                })
            this.$bind("monthBudgetRef", db.collection('budget').doc('monatsbudget'))
                .then((doc) => {
                    this.monthBudget= doc.wert;

                    this.$bind('thisMonthRef', db.collection('ausgaben').where("datum", ">", this.currentMonth).where("datum", "<", this.nextMonth))
                    .then(() => {
                      var i;
                      for (i = 0; i < this.thisMonthRef.length; i++) {this.thisMonthBalance += this.thisMonthRef[i].wert; }
                      this.thisMonthBalance = (this.monthBudget - this.thisMonthBalance).toFixed(2);
                    })
                })
        }
    };

</script>

<style scoped>

    #chart2Container{border-radius: 10px; height: 200px; margin-top: 10px; width: 100%;}

    #content1, #content2{background-color:white; height: 90px; border-radius:10px; width: 100%; padding: 15px;}

    #content1{margin-bottom:20px; background-color: #13B4B6; background-image: url('~@/assets/gesamtBudget-bg1.jpg'); background-size: 100%;}

    #content2{background-color:#f39b42; background-image: url('~@/assets/gesamtBudget-bg2.jpg'); background-size: 100%;}

    .ContainerContent{padding: 0px !important;}

    .gesamtText{height: 60px; float:left; margin-right: 30px; vertical-align:bottom; line-height: 1.3;}

    .gesamtText p{font-size: 16px; color: white;}

    .money{padding-top: 0px; padding-left: 15px; font-size: 35px; color: white;}

    .text{padding-left: 15px; padding-bottom: 0px;}

</style>