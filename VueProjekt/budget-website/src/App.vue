<template>
<html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300|Montserrat:300|Muli:200,300|Poppins:200,300" rel="stylesheet"> 
  </head>
  <body>
    <div id="nav">
      <ul class="navlist">
        <li class="active"><a href="#"><img src="~@/assets/icon-uebersicht.png" height="20" width="20">ÜBERSICHT</a></li>
        <li><a href="#"><img src="~@/assets/icon-einnahmen.png" height="20" width="20">EINNAHMEN</a></li>
        <li><a href="#"><img src="~@/assets/icon-ausgaben.png" height="20" width="20">AUSGABEN</a></li>
        <li><a href="#"><img src="~@/assets/icon-einstellungen.png" height="20" width="20">EINSTELLUNGEN</a></li>
      </ul>
    </div>
    <div id="content">
      <div class="row top-buffer">
        <div class="col-sm-4" style="height:220px;"><HeadlineComponent></HeadlineComponent></div>
        <div class="col-sm-4" style="height:220px;"><Chart1Component></Chart1Component></div>
        <div class="col-sm-4" style="height:220px;"><Chart2Component></Chart2Component></div>
      </div>
      <div class="row top-buffer">
        <div class="col-sm-8" style="height:220px;"><Chart3Component></Chart3Component></div>
        <div class="col-sm-4" style="height:220px;"><Chart4Component></Chart4Component></div>
      </div>
      <div class="row top-buffer">
        <div class="col-sm-12" style="height:220px;"><Chart5Component></Chart5Component></div>
      </div>
      
    </div>
  </body>
</html>
</template>

<script>
  import HeadlineComponent from "@/Headline.vue"
  import Chart1Component from "@/Chart1.vue"
  import Chart2Component from "@/Chart2.vue"
  import Chart3Component from "@/Chart3.vue"
  import Chart4Component from "@/Chart4.vue"
  import Chart5Component from "@/Chart5.vue"

  export default{
    name: "Budget Website",
    components:{
      HeadlineComponent,
      Chart1Component,
      Chart2Component,
      Chart3Component,
      Chart4Component,
      Chart5Component
    },
    data(){
      return{

      };
    },
    methods:{
    }
  };
</script>

<style>

  @font-face {
    font-family: "ClearSans";
    src: url("assets/ClearSans-Thin.ttf") format("ttf");
  }

  * {
  margin: 0;
  padding:0;
  }

  html, body{
    width: 100%;
    height: 100%;
  }

  body{
    background-color: #EFEFEF !important;
    font-family: 'Muli', sans-serif !important;
    font-weight:200;
    height: 100%;
  }

  h1{
    font-family: 'Muli', sans-serif;
    font-weight:200;
  }

  #content{
    margin: 20px;
    margin-left: 270px;
  }

  #nav{
    position: fixed; 
    z-index: 1; 
    top: 0; 
    left: 0;
    overflow-x: hidden; 
    width: 250px;
    height: 100%;
    background-color: #2E3754;
    padding-top: 100px;
    color: white;
    font-weight:300;
  }
  #nav a{
    color: white;
    text-decoration: none;
  }

  #nav li{
    padding-left: 35px;
    padding-top: 12px;
    padding-bottom: 12px;
    margin-bottom: 15px;
    list-style-type: none;
  }

  #nav .active{
    background-color: #F29940;
  }

  .ContainerContent{
    padding: 15px;
  }

  .top-buffer { margin-top:10px; }

  a img{
    margin-right: 15px;
  }

</style>
