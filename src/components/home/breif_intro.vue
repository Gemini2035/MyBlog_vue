<script setup lang="ts">
import SiteCircle from '../self_and_site/site_circle.vue'
</script>

<template>
    <div class="main-container">
        <div class="circle-container">
            <SiteCircle />
        </div>
    </div>
</template>

<style scoped>
.main-container {
    width: 100vw;
    height: 100vh;
    background-color: yellow;
    position: relative;
}

.circle-container {
    height: 50vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>