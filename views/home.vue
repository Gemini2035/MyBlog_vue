<script setup lang="ts">
import WellcomePart from '../src/components/home/welcome.vue'
import BreifIntro from '../src/components/home/breifIntro.vue'
</script>

<template>
    <div class="container">
        <div>
            <WellcomePart state='active'/>
            <BreifIntro />
        </div>
    </div>
</template>

<style scoped>
.container{
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: gray;
}
</style>