<script setup lang="ts">
import { Ref, onMounted, onUnmounted, ref } from 'vue';
import axios from 'axios';

import { returnVoidFunction, returnNumberFunction } from '../../../cat_define/type_define';
import { JsonRequest } from '../../../cat_define/server_class';
import { ServerManager } from '../../../cat_define/server_info';

// static
const jsonRequest: JsonRequest = new JsonRequest('name', 'basic_info');

// respond
const imgDegree: Ref<string> = ref('0deg');
const siteDays: Ref<number> = ref(0);
let LoopTimer: number | undefined = undefined;
// methods:
const randomDegree: returnVoidFunction = () => {
    imgDegree.value = Math.floor(Math.random() * 360) + 'deg';
}

const getDays: returnNumberFunction = (date: string) => {
    const targetDate = new Date(date);
    const today = new Date();
    const diff = today.getTime() - targetDate.getTime();
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    return days;
}

const initDays: returnVoidFunction = () => {
    axios.get(ServerManager.getTextApi + jsonRequest.parse())
    .then(response => {
        const target: number = getDays(response.data.timeOfSite);
        const updateCounter: returnVoidFunction = () => {
            const c: number = +siteDays.value;
            const increment: number = target / 200
            if(c < target) {
                siteDays.value = Math.ceil(c + increment);
                setTimeout(updateCounter, 3);
            } else {
                siteDays.value = target;
            }
        }
        updateCounter();
    })
    .catch(() => {
        siteDays.value = 0;
    })
}

onMounted(() => {
    LoopTimer = window.setInterval(randomDegree, 1000);
    initDays();
})

onUnmounted(() => {
    window.clearInterval(LoopTimer);
})
</script>

<template>
    <div class="site-circle">
        <img src="src/assets/breif_part_imgs/circle.svg" alt="错误" :style="{ rotate: imgDegree }">
        <div class="text-group">
            <h1 class="first-raw">本站点已上线</h1>
            <div class="day-container">
                <span class="day">{{ siteDays }}</span>
                <span class="others">天</span>
            </div>
        </div>
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
    animation: circleAnimate 2.5s infinite;
    transition: 0.3s ease-in-out;
}
@keyframes circleAnimate {
    50% { opacity: 0.4; }
}

.site-circle .text-group {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.site-circle .text-group .first-raw {
    transform: translateX(-15%);
}

.site-circle .text-group .day-container {   
    position: absolute;
    top: 70%;
    left: 60%;
    transform: translate(-50%, -50%);
    width: 20vw;
}

.site-circle .text-group .day-container .day {
    font-weight: bold;
    font-size: 5rem;
}

.site-circle .text-group .day-container .others {
    margin-left: 3%;
    font-size: 2rem;
    font-weight: bold;
}

/* 以下为移动端屏幕适配 */
/** Pad **/
@media only screen and (min-width: 768px) and (max-width: 1024px) {
    .site-circle .text-group .first-raw {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>