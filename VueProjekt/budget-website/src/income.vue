<template>
    <div id="incomeForm">
        <h1>{{ $t('addIncome') }}</h1>
        <form id="income" v-on:submit.prevent="addIncome(wert, newDate)">
        <div class="containerInput">
            <div class="row">
                <div class="label">{{ $t('dateIncome') }}</div>
                <input type="date" v-model="newDate" ><br>
            </div>
            <div class="row">
                <div class="label">{{ $t('valueIncome') }}</div>
                <input v-model.number="wert" type="number" step="0.01" placeholder="0" min="0"><br>
            </div>
            <button id="submitButton" type="submit">{{ $t('add') }}</button>
        </div>
        </form>
        <h2>{{ $t('earlierIncome') }}:</h2>
        <div id="tabelleEinnahmen">
            <table>
                <tr id="headlines">
                    <th> {{ $t('number') }} </th>
                    <th> {{ $t('bigValue') }} </th>
                    <th> {{ $t('date') }} </th>
                    <th> </th>
                </tr>
                <tr v-for="(einnahme, idx) in einnahmen" :key="idx">
                    <td>{{idx }} </td>
                    <td>{{ einnahme.wert }} {{ $t('currency') }}</td>
                    <td>{{ einnahme.datum | formatDate }} </td>
                    <td><button class="deleteButton" @click="deleteIncome(einnahme.id)">{{ $t('delete') }}</button> </td>
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
                einnahmen: [],
                newDate: new Date(),
                wert: null,
                wholeBudget: 0.0
            }
        },
        methods:{
            addIncome(wert, newDate){
                var vm = this;
                var timestamp = firebase.firestore.Timestamp.fromDate(new Date(newDate));
                db.collection('einnahmen').add({datum: timestamp, wert: wert});
                vm.wholeBudget = vm.wholeBudget+wert;
                db.collection('budget').doc('gesamtbudget').update({wert:vm.wholeBudget});
                this.newDate = null,
                this.wert = null,
                alert(this.$i18n.t('incomeInfo'));

            },
            deleteIncome(id){
                var value = 0;
                var vm = this;
                db.collection('einnahmen').doc(id).get().then(function(doc) {
                   value = doc.data().wert;
                   vm.wholeBudget = vm.wholeBudget-value;
                   db.collection('budget').doc('gesamtbudget').update({wert:vm.wholeBudget});
                   db.collection('einnahmen').doc(id).delete();
                });
            }
        },
        firestore (){
            return {
                einnahmen: db.collection('einnahmen').orderBy("datum","desc")
            }
        },
        created(){
            var WholeBudgetRef = db.collection('budget').doc('gesamtbudget');
            var vm= this;

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

    #incomeForm{padding: 10px 15px 10px 15px;}

    h1{margin-bottom: 50px; color: #2E3754;}

    h2{font-size: 28px; margin-top: 30px;}

    table{width: 650px; text-align: center;}

    tr:nth-child(even) {background: white;}

    td {padding: 3px; border-bottom-color: white; border-bottom-width: 3px; font-size: 14px}

    input{height: 40px; width: 400px; padding: 5px; min-width: 300px;}

    .label{width: 250px; padding-top: 8px; min-width: 200px;}

    .row{margin-right: 50px; width: 100%; padding-left: 20px; padding-bottom: 40px;}

    .containerInput{margin-top: 50px; margin: auto;}

    #submitButton{background-color: #13B4B6; border: none; color: white; padding: 10px 32px; width: 650px; text-align: center; text-decoration: none; font-size: 16px; margin-left: 5px; margin-bottom: 30px;}

    #tabelleEinnahmen{margin-top: 20px; margin-left: 5px;}

    #headlines{background-color: #13B4B6; color: white;}

    th{padding: 8px; font-weight: normal;}

    .deleteButton{background-color: #f39b42; border: none; color: white; text-align: center; text-decoration: none; font-size: 11px; padding: 3px;}

</style>