<template>
    <div id="chart2Container">
        <div id="content1">test</div>
        <div id="content2">test</div>
    </div>
</template>

<script>
    export default{
        name:"chart1",
        data(){
            return{

            };
        }
    };
</script>

<style scoped>

#chart2Container{
    margin:1.5%;
    border-radius: 10px;
    width: 23%;
    height: 170px;
    float:left;
}

#content1, #content2{
    background-color:white;
    width: 100%;
    height: 75px;
    border-radius:10px;
    padding: 12px;
}

#content1{
    margin-bottom:20px;
}

</style>