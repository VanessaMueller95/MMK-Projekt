<template>
    <div id="incomeForm">
        <h1>{{ $t('addSpending') }}</h1>
        <form v-on:submit.prevent="addSpending(wert, newDate, kategorie)">
        <div class="containerInput">
            <div class="row">
                <div class="label">{{ $t('dateSpending') }}</div>
                <input type="date" v-model="newDate" ><br>
            </div>
            <div class="row">
                <div class="label">{{ $t('valueSpending') }}</div>
                <input v-model.number="wert" type="number" step="0.01" placeholder="0" min="0"><br>
            </div>
            <div class="row">
                <div class="label">{{ $t('catSpending') }}</div>
                 <select v-model.number="kategorie" name="category">
                    <option selected value="sonstiges">{{ $t('available') }}</option>
                    <option value="auto">{{ $t('car') }}</option>
                    <option value="miete">{{ $t('rent') }}</option>
                    <option value="strom">{{ $t('electricity') }}</option>
                    <option value="essen">{{ $t('food') }}</option>
                    <option value="kleidung">{{ $t('clothes') }}</option>
                </select> 
            </div>
            <button id="submitButton" type="submit">{{ $t('add') }}</button>
        </div>
        </form>
        <form id="changeBudget" v-on:submit.prevent="updateBudget()">
            <div class="row">
                <div class="label">{{ $t('setBudget') }}</div>
                <input id="budgetInput" v-model.number="monthBudget" type="number" step="0.01" min="0">
                <button id="saveButton" type="submit">{{ $t('add') }}</button>
            </div>
        </form>
        <h2>{{ $t('allSpendings') }}</h2>
        <div id="tabelleEinnahmen">
            <table>
                <tr id="headlines">
                    <th> {{ $t('number') }} </th>
                    <th> {{ $t('bigValue') }} </th>
                    <th> {{ $t('category') }} </th>
                    <th> {{ $t('date') }} </th>
                    <th> </th>
                </tr>
                <tr v-for="(ausgabe, idx) in ausgaben" :key="idx">
                    <td>{{idx }} </td>
                    <td>{{ ausgabe.wert }} {{ $t('currency') }} </td>
                    <td>{{ ausgabe.kategorie }} </td>
                    <td>{{ ausgabe.datum | formatDate }} </td>
                    <td><button class="deleteButton" @click="deleteSpending(ausgabe.id)">{{ $t('delete') }}</button> </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import db from "@/db.js"
    import moment from 'moment'
    import firebase from 'firebase'

    export default{
        name:"incomeForm",
        data(){
            return{
                ausgaben: [],
                newDate: new Date(),
                wert: null,
                kategorie: null,
                monthBudget: null,
                wholeBudget: 0
            }
        },
        methods:{
            addSpending(wert, newDate, kategorie){
                var vm= this;
                var timestamp = firebase.firestore.Timestamp.fromDate(new Date(newDate));
                db.collection('ausgaben').add({datum: timestamp, wert: wert, kategorie: kategorie});
                
                vm.wholeBudget = vm.wholeBudget-wert;
                db.collection('budget').doc('gesamtbudget').update({wert:vm.wholeBudget});

                this.newDate = null;
                this.wert = null;
                this.kategorie = null;
                alert(this.$i18n.t('spendingInfo'));
            },
            deleteSpending(id){
                var value = 0;
                var vm = this;
                db.collection('ausgaben').doc(id).get().then(function(doc) {
                   value = doc.data().wert;
                   vm.wholeBudget = vm.wholeBudget+value;
                   db.collection('budget').doc('gesamtbudget').update({wert:vm.wholeBudget});
                   db.collection('ausgaben').doc(id).delete();
                });
            },
            updateBudget(){
                db.collection('budget').doc('monatsbudget').update({wert:this.monthBudget});
                alert(this.$i18n.t('budgetInfo'));
            }
        },
        firestore (){
            return {
                ausgaben: db.collection('ausgaben').orderBy("datum","desc")
            }
        },
        created(){
            var MonthBudgetRef = db.collection('budget').doc('monatsbudget');
            var WholeBudgetRef = db.collection('budget').doc('gesamtbudget');

            var vm = this;

            MonthBudgetRef.get().then(function(doc) {
                vm.monthBudget = doc.data().wert;
            });

            WholeBudgetRef.get().then(function(doc) {
                vm.wholeBudget = doc.data().wert;
            });

        },
        filters: {
            formatDate: function(value) {
            if (value) {
                var date = value.toDate();
                return moment(String(date)).format('DD/MM/YYYY')
            }
        }
    }
};
    
</script>

<style scoped>
    #incomeForm{padding-top: 10px; padding-bottom: 10px; padding-left: 15px; padding-right: 15px;}

    h1{margin-bottom: 50px; color: #2E3754;}

    h2{font-size: 28px; margin-top: 30px;}

    table{width: 650px; text-align: center;}

    tr:nth-child(even) {background: white;}

    td {padding: 3px; border-bottom-color: white; border-bottom-width: 3px; font-size: 14px}

    #changeBudget{margin-top: 40px}

    input, select{height: 40px; width: 400px; padding: 5px}
    
    #budgetInput{width: 190px; min-width: 180px;}

    .label{width: 250px; padding-top: 8px; min-width: 200px;}

    .row{margin-right: 50px; width: 100%; padding-left: 20px; padding-bottom: 40px; }

    .containerInput{margin-top: 50px; margin: auto;}

    #submitButton, #saveButton{background-color: #13B4B6; border: none; color: white; padding: 10px 32px; width: 650px; text-align: center; text-decoration: none; font-size: 16px; margin-left: 5px; margin-bottom: 30px;}

    #saveButton{width:190px; padding: 8px 32px; margin-left: 20px;}

    #tabelleEinnahmen{margin-top: 20px; margin-left: 5px;}

    #headlines{background-color: #13B4B6; color: white;}

    th{padding: 8px; font-weight: normal;}

    .deleteButton{background-color: #f39b42; border: none; color: white; text-align: center; text-decoration: none; font-size: 11px; padding: 3px;}

</style>