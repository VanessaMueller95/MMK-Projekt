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
                <input v-model.number="wert" type="number" step="0.01" placeholder="0"><br>
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
                    <td><button class="deleteButton" @click="deleteIncome(ausgabe.id)">{{ $t('delete') }}</button> </td>
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
                newDate: null,
                wert: null,
                kategorie: null
            }
        },
        methods:{
            addSpending(wert, newDate, kategorie){
                var timestamp = firebase.firestore.Timestamp.fromDate(new Date(newDate));
                db.collection('ausgaben').add({datum: timestamp, wert: wert, kategorie: kategorie})
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });

            },
            deleteIncome(id){
                db.collection('ausgaben').doc(id).delete();
            }
        },
        firestore (){
            return {
                ausgaben: db.collection('ausgaben').orderBy("datum","desc")
            }
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
#incomeForm{
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
}

h1{
    font-size: 3vw;
    margin-bottom: 50px;
    color: #2E3754;
}
h2{
    font-size: 1.5vw;
    margin-top: 30px;
}
table{
    width: 55%;
    text-align: center;
}

tr{
    width: 80%;
}
tr:nth-child(even) {
    background: white;
    }

td {
    width: 30%;
    padding: 3px;
    border-bottom-color: white;
    border-bottom-width: 3px;
}

input, select{
    height: 40px;
    width: 65%;
    padding: 5px;
    min-width: 300px;
}

.label{
    width: 35%;
    padding-top: 8px;
    min-width: 200px;
}

.row{
    margin-right: 50px;
    width: 100%;
    padding-left: 20px;
    padding-bottom: 40px;
    width: 55%;
}
.containerInput{
    margin-top: 50px;
    margin: auto;
}

#submitButton{
    background-color: #13B4B6; 
    border: none;
    color: white;
    padding: 10px 32px;
    width: 55%;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin-left: 5px;
    margin-bottom: 30px;
    
}

#tabelleEinnahmen{
    margin-top: 20px;
    margin-left: 5px;
}

#headlines{
    background-color: #13B4B6;
    color: white;
}

th{
    padding: 8px;
    font-weight: normal;
}

.deleteButton{
    background-color: #f39b42; 
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 11px;
    padding: 3px;
}

</style>