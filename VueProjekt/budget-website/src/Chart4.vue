<template>
    <div id="chart4Container">
        <vc-calendar :key="this.$i18n.locale" locale="en" v-if="this.$i18n.locale=='en'" is-expanded :attributes='attrs'></vc-calendar>
        <vc-calendar :key="this.$i18n.locale" locale="de" v-if="this.$i18n.locale=='de'" is-expanded :attributes='attrs'></vc-calendar>
    </div>
</template>

<script>
import Vue from 'vue';
import VCalendar from 'v-calendar';
Vue.use(VCalendar, {componentPrefix: 'vc'});

    export default {
    data() {
    return {
        attrs: [
        {
            key: 'today',
            highlight: 'orange',
            dates: new Date()
        }
    ]
    }
  }
}

</script>

<style scoped>

#chart4Container{
    border-radius: 10px;
    height: 200px;
    margin-top: 10px;
    width: 100%;
    background-color: white;
}



</style>