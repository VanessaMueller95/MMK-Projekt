<template>
    <div id="chart1Container">
        <div class="ContainerContent">
            <Dounut :chartData="this.datacollection" :styles="myStyles" :options="this.options"></Dounut>
        </div>
    </div>
</template>

<script>
    import Dounut from "./DonutChart.js";
    import db from "@/db.js"

    export default{
        components: {
            Dounut
        },
        data () {
            return {
                gesAusgabenMonth: 0.0,
                monthBudget: 0,
                leftDays: 0,
                pastDays: 0,
                currentMonth : new Date(new Date().getFullYear(),new Date().getMonth(), 1),
                nextMonth : new Date(new Date().getFullYear(),new Date().getMonth()+1, 1),
                datacollection: {},
                options: {}
            };
        },
        methods: {
            calculateDaysInMonth(){
                var date = new Date();
                var day = date.getDate();
                var month = date.getMonth()+1;
                var year = date.getYear();
                this.pastDays = Number(day);
                this.leftDays = this.daysInMonth(month, year)-day;
            },
            daysInMonth (month, year) {
                return new Date(year, month, 0).getDate();
            },
            fillData(){
                var label1 = this.$i18n.t('label1');
                var label2 = this.$i18n.t('label2');
                var days = this.$i18n.t('days');
                var currency = this.$i18n.t('currency');
                this.options = {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugin: true,
                    rotation: (-0.5 * Math.PI) + (50/180 * Math.PI),
                    fontFamily: 'Muli',
                    cutoutPercentage: 60,
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            generateLabels: function() {
                                return [
                                    {text: label2, fillStyle: '#13B4B6',lineWidth: 0},
                                    {text: label1, fillStyle: '#f39b42', lineWidth: 0}
                                ]
                            },
                            usePointStyle: true,
                        }
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                if (tooltipItem.datasetIndex === 0) {
                                    return data['datasets'][0]['data'][tooltipItem['index']] + currency;
                                } else if (tooltipItem.datasetIndex === 1) {
                                    return data['datasets'][1]['data'][tooltipItem['index']] + days;
                                }
                            }
                        }
                    }
                },
                this.datacollection = {
                    datasets: [
                        {
                            data: [(this.monthBudget).toFixed(2), (this.gesAusgabenMonth).toFixed(2)],
                            backgroundColor: ["#13B4B6", "#ECECEC"]
                        },
                        {
                            data: [this.leftDays, this.pastDays],
                            backgroundColor: ["#ECECEC", "#f39b42"]
                        }
                    ],
                }
            }
        },
        computed: {
            myStyles () {
                return {
                    height: '185px',
                    padding: '0px'
                }
            },
        },
        created(){
            var newAusgabenMonth = db.collection('ausgaben').where("datum", ">", this.currentMonth).where("datum", "<", this.nextMonth);
            var newMonthBudgetRef = db.collection('budget').doc('monatsbudget');

            var vm = this;

            vm.calculateDaysInMonth();

            newMonthBudgetRef.get().then(function(doc) {
                vm.monthBudget = doc.data().wert;
                newAusgabenMonth.get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {vm.gesAusgabenMonth += doc.get("wert");});
                    vm.monthBudget -= vm.gesAusgabenMonth;
                    vm.fillData();
                });
            });
        }
    }
</script>

<style scoped>

    #chart1Container{border-radius: 10px; height: 200px; margin-top: 10px; width: 100%; background-color: white;}

    .ContainerContent{height: 200px;}

    p{padding-bottom: 0px; margin-bottom: 5px;}

</style>

