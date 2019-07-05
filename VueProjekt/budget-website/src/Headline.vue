<template>
    <div id="headlineContainer">
        <div class="ContainerContent">
            <h1>{{ $t('mainHeadline') }}</h1>
        </div>
    </div>
</template>

<script>
    export default{
        name:"headline"
    };
</script>

<style scoped>

    #headlineContainer{border-radius: 10px; width: 100%; height: 200px; margin-top: 10px;}

    h1{font-size: 3.5em; margin-bottom: 10px; color: #2E3754;}

</style>