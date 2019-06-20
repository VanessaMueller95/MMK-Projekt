import Vue from 'vue'
import App from './App'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import i18n from './i18n.js'

import VueFire from 'vuefire'
import 'firebase/firestore'
import { firestorePlugin } from 'vuefire'
Vue.use(VueFire)
Vue.use(firestorePlugin)
import firebase from 'firebase'
