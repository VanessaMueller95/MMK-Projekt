import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
export const i18n = new VueI18n({
    locale: 'de',
    messages: {
        en: {
            mainHeadline: 'FINANCIAL OVERVIEW',
            inWork: "IN PROGRESS",
            budget: "BUDGET",
            in: "IN",
            currency: "$",
            jan: "January",
            feb: "February",
            mar: "March",
            apr: "April",
            may: "May",
            jun: "June",
            jul: "July",
            aug: "August",
            sep: "September",
            oct: "October",
            nov: "November",
            dec: "December",
            rest: "BUDGET",
            monSpending: "MONTHLY SPENDINGS IN JUNE",
            yearSpending: "MONTHLY SPENDINGS 2018",
            overview: "OVERVIEW",
            income: "INCOME",
            spendings: "SPENDINGS",
            settings: "SETTINGS",
            rent: "Rent",
            car: "Car",
            electricity: "Electricity",
            food: "Food",
            clothes: "Clothes",
            available: "Available",
            balance: "BALANCE OF THE LAST 5 MONTH",
            left: "Left Budget",
            leftDays: "Days in the month"

        },
        de: {
            mainHeadline: "FINANZ ÜBERSICHT",
            inWork: "IN ARBEIT",
            budget: "GUTHABEN",
            in: "IM",
            currency: "€",
            jan: "Januar",
            feb: "Februar",
            mar: "März",
            apr: "April",
            may: "Mai",
            jun: "Juni",
            jul: "Juli",
            aug: "August",
            sep: "September",
            oct: "Oktober",
            nov: "November",
            dec: "Dezember",
            rest: "BUDGET",
            monSpending: "MONATLICHE AUSGABEN IM JUNI",
            yearSpending: "MONATLICHE AUSGABEN 2018",
            overview: "ÜBERSICHT",
            income: "EINNAHMEN",
            spendings: "AUSGABEN",
            settings: "EINSTELLUNGEN",
            rent: "Miete",
            car: "Auto",
            electricity: "Strom",
            food: "Nahrung",
            clothes: "Kleidung",
            available: "Verfügbar",
            balance: "BILANZ DER LETZTEN 5 MONATE",
            left: "Restbudget",
            leftDays: "Vergangene Tage im Monat"
        }
    }
})

Vue.config.productionTip = false

new Vue({
    i18n,
    render: h => h(App)
  }).$mount('#app')