<template>
    <div id="chart2Container">
        <div class="ContainerContent">
            <div id="content1">
                <div class="gesamtText">
                    <p>GESAMTGUTHABEN</p>
                    <p>IM  
                        <select>
                            <option value="januar">JANUAR</option>
                            <option value="februar">FEBRUAR</option>
                            <option value="märz">MÄRZ</option>
                            <option value="april" selected >APRIL</option>
                        </select> 
                    </p>
                </div>
                <div class="gesamtMoney">
                    <p>2.456,89€</p>
                </div>
            </div>
            <div id="content2">
                <div class="gesamtText">
                    <p>RESTGUTHABEN</p>
                    <p>IM  
                        <select>
                            <option value="januar">JANUAR</option>
                            <option value="februar">FEBRUAR</option>
                            <option value="märz">MÄRZ</option>
                            <option value="april" selected >APRIL</option>
                        </select> 
                    </p>
                </div>
                <div class="gesamtMoney">
                    <p>156,89€</p>
                </div>
            </div>
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
    background-color: #13B4B6;
    background-image: url('~@/assets/gesamtBudget-bg1.jpg');
    background-size: 100%;
}

#content2{
    background-color: #F39B42;
    background-image: url('~@/assets/gesamtBudget-bg2.jpg');
    background-size: 100%;
}

.ContainerContent{
    padding: 0px !important;
  }

.gesamtText{
    height: 60px;
    width: 130px;
    float:left;
    margin-right: 30px;
    padding-top: 8px;
}

.gesamtText p{
    margin: 3px;
    font-size: 0.8vw;
}

.gesamtMoney{
    height: 60px;
    float:left;
}

.gesamtMoney p{
    padding-top: 0px;
    font-size: 2.5vw;
    color: white;
}

option{
    background: rgba(0, 0, 0, 0);
}

select{
    background: rgba(0, 0, 0, 0);
    border: 1px;
    border-color: white;
}

</style>