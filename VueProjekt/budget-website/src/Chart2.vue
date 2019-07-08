<template>
    <div id="chart2Container">
        <div class="ContainerContent">
            <div id="content1">
                <div class="gesamtText">
                    <p>
                        <span class="text">{{ $t('budget') }} </span><br>
                        <span class="money">{{wholeBudget}} {{$t('currency')}}</span> 
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
                budget: 0.0,
                spendings: 0.0,
                thisMonthBalance: 0,
                currentMonth : new Date(new Date().getFullYear(),new Date().getMonth(), 1),
                nextMonth : new Date(new Date().getFullYear(),new Date().getMonth()+1, 1),
                wholeBudget: 0.0
            };
        },
        created(){
            var MonthBudgetRef = db.collection('budget').doc('monatsbudget');
            var newAusgabenMonth = db.collection('ausgaben').where("datum", ">", this.currentMonth).where("datum", "<", this.nextMonth);

            var WholeBudgetRef = db.collection('budget').doc('gesamtbudget');
            var vm = this;

            WholeBudgetRef.get().then(function(doc) {
                vm.wholeBudget = (doc.data().wert).toFixed(2);
            });

            MonthBudgetRef.get().then(function(doc) {
                var gesAusgabenMonth = 0;
                vm.thisMonthBalance = doc.data().wert;
                newAusgabenMonth.get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {gesAusgabenMonth += doc.get("wert");});
                    vm.thisMonthBalance = (vm.thisMonthBalance - gesAusgabenMonth).toFixed(2);
                });
            });
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