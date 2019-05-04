<template>
<html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300|Montserrat:300|Muli:200,300|Poppins:200,300" rel="stylesheet"> 
  </head>
  <body>
    <div id="nav">
      <ul class="navlist">
        <li class="active"><a href="#">ÜBERSICHT</a></li>
        <li><a href="#">EINNAHMEN</a></li>
        <li><a href="#">AUSGABEN</a></li>
        <li><a href="#">EINSTELLUNGEN</a></li>
      </ul>
    </div>
    <div id="content">
      <HeadlineComponent></HeadlineComponent>
      <Chart1Component></Chart1Component>
      <Chart2Component></Chart2Component>
    </div>
  </body>
</html>
</template>

<script>
  import HeadlineComponent from "@/Headline.vue"
  import Chart1Component from "@/Chart1.vue"
  import Chart2Component from "@/Chart2.vue"

  export default{
    name: "Budget Website",
    components:{
      HeadlineComponent,
      Chart1Component,
      Chart2Component
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
    background-color: #EFEFEF;
    font-family: 'Muli', sans-serif;
    font-weight:200;
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
    padding-left: 40px;
    padding-top: 12px;
    padding-bottom: 12px;
    margin-bottom: 15px;
    list-style-type: none;
  }

  #nav .active{
    background-color: #29B5B8;
  }

</style>
