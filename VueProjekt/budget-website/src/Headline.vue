<template>
    <div id="headlineContainer">
        <div class="ContainerContent">
            <h1>{{ $t('mainHeadline') }}</h1>
        </div>
        <ul>
            <li v-for="(t, idx) in test" :key="idx"> 
                Test + {{ t.Wert }}
            </li>
        </ul>
    </div>
</template>

<script>
    import db from "@/db.js"
    /*import Vue from 'vue'
    import { firestorePlugin } from 'vuefire'
    Vue.use(firestorePlugin)
    
    import firebase from 'firebase'
    firebase.initializeApp({
        databaseURL: "https://budgetwebsite-d5b36.firebaseio.com",
        projectId: "budgetwebsite-d5b36"
    })
    var db = firebase.firestore();*/

    export default{
        name:"headline",
        data(){
            return{
                test: []
            };
        },
        firestore (){
            return {
                test: db.collection('Einnahmen')
            }
        },
    };
</script>

<style scoped>

#headlineContainer{
    border-radius: 10px;
    width: 100%;
    height: 200px;
    margin-top: 10px;
    /*background-color: white;*/
}

h1{
    font-size: 4vw;
    margin-bottom: 10px;
    color: #2E3754;
}

</style>