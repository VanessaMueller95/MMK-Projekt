<template>
    <div id="chart2Container">
        <div class="ContainerContent">
            <div id="content1">test</div>
            <div id="content2">test</div>
        </div>
    </div>
</template>

<script>
    export default{
        name:"chart2",
        data(){
            return{

            };
        }
    };
</script>

<style scoped>

#chart2Container{
    border-radius: 10px;
    height: 200px;
    margin-top: 10px;
    width: 100%;
}

#content1, #content2{
    background-color:white;
    height: 90px;
    border-radius:10px;
    width: 100%;
    padding: 15px;
}

#content1{
    margin-bottom:20px;
}

.ContainerContent{
    padding: 0px !important;
  }

</style>