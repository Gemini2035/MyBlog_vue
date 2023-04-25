<script setup lang="ts">
import { Ref, onMounted, onUnmounted, ref } from 'vue';
import { returnVoidFunction } from '../../../cat_define/type_define';


const imgDegree: Ref<string> = ref('0deg');
let LoopTimer: number | undefined = undefined;
// methods:
const randomDegree: returnVoidFunction = () => {
    imgDegree.value = Math.floor(Math.random() * 360) + 'deg';
}

onMounted(() => {
    LoopTimer = window.setInterval(randomDegree, 1000);
})

onUnmounted(() => {
    window.clearInterval(LoopTimer);
})
</script>

<template>
    <div class="site-circle">
        <img src="../../assets/circle.svg" alt="错误" :style="{ rotate: imgDegree }">
        <div class="text-group">111</div>
    </div>
</template>

<style scoped>
.site-circle {
    height: 100%;
    position: relative;
}

.site-circle img {
    height: 100%;
    width: auto;
    animation: circleAnimate 3s infinite;
    transition: 0.3s ease-in-out;
}
@keyframes circleAnimate {
    50% { opacity: 0.3; }
}

.site-circle .text-group {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>