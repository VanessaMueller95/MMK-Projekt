<template>
<html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet"> 
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
    </div>
  </body>
</html>
</template>

<script>
  export default{
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
    font-family: ClearSans;
    src: url(/src/assets/ClearSans-Light.ttf);
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
    font-family: 'Roboto', sans-serif;
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
