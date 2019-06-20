import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

import firebase from 'firebase'
const Firebase = firebase.initializeApp({
    databaseURL: "https://budgetwebsite-d5b36.firebaseio.com",
    projectId: "budgetwebsite-d5b36"
})

const db = firebase.firestore();

export default db;