import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
export const i18n = new VueI18n({
    locale: 'de',
    messages: {
        en: {
            months:[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
            mainHeadline: 'FINANCIAL OVERVIEW',
            inWork: "IN PROGRESS",
            budget: "BUDGET",
            in: "IN",
            currency: "$",
            rest: "BUDGET",
            monSpending: "SPENDINGS OF THE CURRENT MONTH",
            yearSpending: "MONTHLY SPENDINGS",
            overview: "OVERVIEW",
            income: "INCOME",
            spendings: "SPENDINGS",
            spendingsSM: "Spendings",
            settings: "SETTINGS",
            rent: "Rent",
            car: "Car",
            electricity: "Electricity",
            food: "Food",
            clothes: "Clothes",
            available: "Others",
            bal: "Balance",
            balance: "BALANCE OF THE LAST 5 MONTH",
            left: "Left Budget",
            leftDays: "Days in the month",
            addIncome: "ADD INCOME",
            dateIncome: "Date of Income",
            valueIncome: "Value of Income",
            value: "Value",
            add: "Add",
            earlierIncome: "ALL INCOME",
            number: "NUMBER",
            bigValue: "VALUE",
            date: "DATE",
            delete: "DELETE",
            addSpending: "ADD SPENDING",
            dateSpending: "Date of Spending",
            valueSpending: "Value of Spending",
            catSpending: "Category of Spending",
            setBudget: "Change monthly Budget",
            allSpendings: "ALL SPENDINGS",
            category: "CATEGORY",
            label1: "Past Days of the Month",
            label2: "Left Budget",
            days: "Days",
            spendingInfo: "Spending was added succesfully",
            incomeInfo: "Income was added succesfully",
            budgetInfo: "Monthly Budget was changed successfully"
        },
        de: {
            months:[
                "Januar",
                "Februar",
                "März",
                "April",
                "Mai",
                "Juni",
                "Juli",
                "August",
                "September",
                "Oktober",
                "November",
                "Dezember",
            ],
            mainHeadline: "FINANZ ÜBERSICHT",
            inWork: "IN ARBEIT",
            budget: "GESAMTGUTHABEN",
            in: "IM",
            currency: "€",
            rest: "MONATSBUDGET",
            monSpending: "AUSGABEN DES AKTUELLEN MONATS",
            yearSpending: "MONATLICHE AUSGABEN",
            overview: "ÜBERSICHT",
            income: "EINNAHMEN",
            spendings: "AUSGABEN",
            spendingsSM: "Ausgaben",
            settings: "EINSTELLUNGEN",
            rent: "Miete",
            car: "Auto",
            electricity: "Strom",
            food: "Nahrung",
            clothes: "Kleidung",
            available: "Sonstiges",
            balance: "BILANZ DER LETZTEN 5 MONATE",
            bal: "Bilanz",
            left: "Restbudget",
            leftDays: "Vergangene Tage im Monat",
            addIncome: "EINNAHMEN HINZUFÜGEN",
            dateIncome: "Datum der Einnahme",
            valueIncome: "Wert der Einnahme",
            value: "Wert",
            add: "Hinzufügen",
            earlierIncome: "ALLE EINNAHMEN",
            number: "NUMMER",
            bigValue: "WERT",
            date: "DATUM",
            delete: "LÖSCHEN",
            addSpending: "AUSGABE HINZUFÜGEN",
            dateSpending: "Datum der Ausgabe",
            valueSpending: "Wert der Ausgabe",
            catSpending: "Kategorie der Ausgabe",
            setBudget: "Monatsbudget anpassen",
            allSpendings: "ALLE AUSGABEN",
            category: "KATEORIE",
            label1: "Vergangene Tage im Monat",
            label2: "Restbudget",
            days: "Tage",
            spendingInfo: "Ausgabe wurde erfolgreich hinzugefügt",
            incomeInfo: "Einnahme wurde erfolgreich hinzugefügt",
            budgetInfo: "Monatsbudget wurde erfolgreich angepasst"
        }
    }
})

new Vue({
    i18n,
    render: h => h(App)
  }).$mount('#app')