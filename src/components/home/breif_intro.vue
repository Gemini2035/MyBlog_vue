<script setup lang="ts">
import SiteCircle from '../self_and_site/site_circle.vue';
import Background from '../basic_componets/background.vue';
</script>

<template>
    <div class="main-container">
        <div class="circle-container">
            <SiteCircle />
        </div>
        <div class="background">
            <Background />
        </div>
    </div>
</template>

<style scoped>
.main-container {
    width: 100vw;
    height: 100vh;
    /* background-color: rgba(128, 128, 128, 1); */
    position: relative;
}

.circle-container {
    height: 60vh;
    position: absolute;
    top: 50%;
    left: 3%;
    transform: translateY(-50%);
}

.background-container {
    position: fixed;
    z-index: -1;
}
</style>