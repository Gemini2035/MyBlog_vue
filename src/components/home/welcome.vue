<script setup lang="ts">
import { Ref, onMounted, onUnmounted, ref } from 'vue';
import { returnVoidFunction } from  '../../../cat_define/type_define'

// 颜色列表
const colorList: Array<object> = [
    { bgc: 'rgba(255, 20, 147, 1)', fc: 'rgba(255, 255, 255, 0.9)'},
    { bgc: 'rgba(255, 182, 193, 1)', fc: 'rgba(0, 0, 0, 0.7)'},
    { bgc: 'rgba(220, 20, 60, 1)', fc: 'rgba(255, 255, 255, 0.9)'},
    { bgc: 'rgba(255, 69, 0, 1)', fc: 'rgba(255, 255, 255, 0.9)'},
    { bgc: 'rgba(240, 230, 140, 1)', fc: 'rgba(0, 0, 0, 0.7)'},
    { bgc: 'rgba(255, 239, 213, 1)', fc: 'rgba(0, 0, 0, 0.7)'},
    { bgc: 'rgba(0, 100, 0, 1)', fc: 'rgba(255, 255, 255, 0.9)'},
    { bgc: 'rgba(152, 251, 152, 1)', fc: 'rgba(0, 0, 0, 0.7)'},
    { bgc: 'rgba(240, 248, 255, 1)', fc: 'rgba(0, 0, 0, 0.7)'},
    { bgc: 'rgba(244, 255, 255, 1)', fc: 'rgba(0, 0, 0, 0.7)'}
]

// 由于setInterval函数有两个重载，一个是NodeJS.Timer返回类型, 一个是number返回类型。注意区别
let LoopTimer: number | undefined = undefined;

const bgcolor: Ref | undefined = ref('rgba(0, 0, 0, 1)');
const fcolor: Ref | undefined = ref('rgba(255, 255, 255, 0.9)')

// methods:
const randomColor: returnVoidFunction = () => {
    let oldColor: string = bgcolor.value;
    let { bgc, fc } = {bgc: '', fc: ''};
    do {
        ({ bgc, fc } = (colorList[Math.floor(Math.random()*colorList.length)] as { bgc: string, fc: string }));
    } while ( bgc === oldColor)
    bgcolor.value = bgc;
    fcolor.value = fc;
}


const timerClear: returnVoidFunction = () => {
    window.clearInterval(LoopTimer);
}

onMounted(() => {
    LoopTimer = window.setInterval(randomColor, 3000);
});

onUnmounted(() => {
    timerClear();
});
</script>
<template>
    <div :style="{backgroundColor: bgcolor}">
        <h1 :style="{color: fcolor}">Welcome!</h1>
    </div>
</template>

<style scoped>
div {
    position: relative;
    width: 100vw;
    height: 100vh;
    transition: 1.5s ease-in-out;
}

div h1 {
    position: absolute;
    margin: 0;
    font-size: 17rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.6s ease-in-out;
}

div h1:hover {
    cursor: pointer;
}
/* 以下为移动端屏幕适配 */
/** Pad **/
@media only screen and (min-width: 768px) and (max-width: 1024px) {
    div h1 {
        font-size: 10rem;
    }
}
/** Phone **/
@media only screen and (min-width: 320px) and (max-width: 767px) {
    div h1 {
        font-size: 4rem;
    }
}
/** Others **/
@media only screen and (max-width: 319px) {
    div h1 {
        font-size: 2.5rem;
    }
}
</style>