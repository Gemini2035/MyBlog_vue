<script setup lang="ts">
import { Ref, onMounted, onUnmounted, ref } from 'vue';
import { returnVoidFunction, returnNumberFunction } from '../../../cat_define/type_define';


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
    const target: number = getDays('2023.03.20');

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
        <img src="../../assets/circle.svg" alt="错误" :style="{ rotate: imgDegree }">
        <div class="text-group">
            <h1>本站点已上线</h1>
            <div class="day-container">
                <span class="day">{{ siteDays }}</span>
                <span class="others">天</span>
            </div>
            <!-- <h3>天</h3> -->
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
    /* background-color: gray; */
    text-align: center;
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
</style>