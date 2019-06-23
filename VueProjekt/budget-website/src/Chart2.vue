<template>
    <div id="chart2Container">
        <div class="ContainerContent">
            <div id="content1">
                <div class="gesamtText">
                    <p>
                        <span class="money">{{bud}} {{$t('currency')}}</span> 
                        <span class="text">{{ $t('budget') }} </span>
                    </p>
                </div>
            </div>
            <div id="content2">
                <div class="gesamtText">
                    <p>
                        <span class="money">{{spendings}} {{$t('currency')}}</span> 
                        <span class="text">{{ $t('rest') }} </span>
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
            };
        },
        
        methods:{
            calculateBudget(){
                console.log("Summe wird berechnet");
                var i;
                for (i = 0; i < this.einnahmen.length; i++) {
                    this.budget = this.budget + this.einnahmen[i].wert;
                } 
            },
            calculateSpendings(){
                console.log("Ausgaben wird berechnet");
                var i;
                for (i = 0; i < this.ausgaben.length; i++) {
                    this.spendings = this.spendings + this.ausgaben[i].wert;
                } 
            },         
        },
        mounted(){
            this.$bind('einnahmen', db.collection('einnahmen'))
                .then((doc) => {
                    this.calculateBudget()
                })
                .catch((error) => {
                    console.log('error in loading: ', error)
                })
            this.$bind('ausgaben', db.collection('ausgaben'))
                .then((doc) => {
                    this.calculateSpendings()
                })
                .catch((error) => {
                    console.log('error in loading: ', error)
                })
            this.$bind("wholeBudgetDoc", db.collection('budget').doc('gesamtbudget'))
                .then((doc) => {
                    this.bud= doc.wert; // => __ob__: Observer
                }).catch(err => {
                    console.error(err)
                })
        }
    };

</script>

<style scoped>

#chart2Container{
    border-radius: 10px;
    height: 200px;
    margin-top: 10px;
    width: 100%;
}

#content1, #content2{
    background-color:white;
    height: 90px;
    border-radius:10px;
    width: 100%;
    padding: 15px;
}

#content1{
    margin-bottom:20px;
    background-color: #13B4B6;
    background-image: url('~@/assets/gesamtBudget-bg1.jpg');
    background-size: 100%;
}

#content2{
    background-color:#f39b42;
    background-image: url('~@/assets/gesamtBudget-bg2.jpg');
    background-size: 100%;
}

.ContainerContent{
    padding: 0px !important;
  }

.gesamtText{
    height: 60px;
    float:left;
    margin-right: 30px;
    vertical-align:bottom;
}

.gesamtText p{
    margin: 3px;
    font-size: 1vw;
    color: white;
}

.money{
    padding-top: 0px;
    padding-left: 15px;
    font-size: 2.5vw;
    color: white;
}

.text{
    padding-left: 15px;
}

</style>