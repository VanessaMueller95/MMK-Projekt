<template>
<html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300|Montserrat:300|Muli:200,300|Poppins:200,300" rel="stylesheet"> 
  </head>
  <body>
    <div id="nav">
      <ul class="navlist">
        <li class="active"><a href="#"><img src="~@/assets/icon-uebersicht.png" height="20" width="20">{{ $t('overview') }}</a></li>
        <li><a href="#"><img src="~@/assets/icon-einnahmen.png" height="20" width="20">{{ $t('income') }}</a></li>
        <li><a href="#"><img src="~@/assets/icon-ausgaben.png" height="20" width="20">{{ $t('spendings') }}</a></li>
        <li><a href="#"><img src="~@/assets/icon-einstellungen.png" height="20" width="20">{{ $t('settings') }}</a></li>
      </ul>
    </div>
	<div id="app">	</div>	
    <div id="content">
      <div class="row top-buffer">
        <div class="col-sm-4" style="height:220px;"><HeadlineComponent></HeadlineComponent></div>
        <div class="col-sm-4" style="height:220px;"><Chart1Component :key="this.$i18n.locale"></Chart1Component></div>
        <div class="col-sm-4" style="height:220px;"><Chart2Component></Chart2Component></div>
      </div>
      <div class="row top-buffer">
        <div class="col-sm-4" style="height:220px;"><Chart3Component :key="this.$i18n.locale"></Chart3Component></div>
        <div class="col-sm-4" style="height:220px;"><Chart7Component :key="this.$i18n.locale"></Chart7Component></div>
        <div class="col-sm-4" style="height:220px;"><Chart4Component></Chart4Component></div>
      </div>
      <div class="row top-buffer">
        <div class="col-sm-12" style="height:220px;">
          <Chart5Component :key="this.$i18n.locale" v-if="this.line"></Chart5Component>
          <Chart6Component :key="this.$i18n.locale" v-if="!this.line"></Chart6Component>
          <button class="barButton" @click="changeChart()">BAR/LINE</button>
        </div>
      </div>
      <button @click="changeLang()">CHANGE LANGUAGE</button> 
      <section>
      <p v-for="(einnahm, idx) in einnahmen" :key="idx">
        <span>Test + {{ einnahme.datum }} + {{ einnahme.wert }}</span>
      </p>
      </section>
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
  import Chart6Component from "@/Chart5-2.vue"
  import Chart7Component from "@/Chart6.vue"

  import db from "@/db.js"

  export default{
    name: "BudgetWebsite",
    components:{ 
		HeadlineComponent,
		Chart1Component,
		Chart2Component,
    Chart3Component,
    Chart4Component,
		Chart5Component,
    Chart6Component,
    Chart7Component,
    },
    data(){
      return{
        line: false,
        einnahmen: []
      };
    },
    firestore (){
      return {
        einnahmen: db.collection('einnahmen')
      }
    },
    methods:{
      changeChart () {
        if(this.line==true){
          this.line=false;
        }else{
          this.line=true;
        }
    },
      changeLang () {
        if (this.$i18n.locale == 'de'){
          this.$i18n.locale = 'en'
        }else{
          this.$i18n.locale = 'de'
        }
      }
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
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
  }

  .top-buffer { margin-top:10px; }

  a img{
    margin-right: 15px;
  }

  p{
    font-size: 14px;
  }

 .barButton{
  position: absolute;
  right: 65px;
  top: 25px;
  background-color:#F39B42;
  border: none;
  color: white;
  padding: 5px 10px 5px 10px;
  text-align: center;
  text-decoration: none;
  font-size: 12px !important;
  margin: 4px 2px;
  cursor: pointer;
}

.barButton:hover{
  background-color:rgb(235, 130, 25);
  color: white;
}

.vc-day-content{
    font-size: 0.7rem !important;
}

.vc-container {
  --weekday-padding: 0px;
  --weeks-padding: 0px;
  --day-content-margin: 0rem auto;
  --day-content-height: 1.5rem;
  --header-padding: 2px 10px 5px 10px;
  --arrows-padding: 1px 80px;
  --highlight-height: 1.5rem;
  --orange: #fd7e14;
}

.in-next-month div, .in-prev-month div{
  opacity: 0.5 !important;
}

.vc-text-sm{
  font-size: 0.8rem;
}

.vc-text-lg{
  font-size: 1rem;
}

.vc-border{
  border-width: 0px;
}

.vc-weekday{
  color: #13B4B6;
}

.vc-title{
  color: #f39b42;
}

</style>
