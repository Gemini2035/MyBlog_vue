<script setup lang="ts">
import { Ref, ref, onMounted } from 'vue';
import { returnVoidFunction } from '../../../cat_define/type_define';

const imgOffsets: Ref<string> = ref('translate(0, 0)');
const transitionMode: Ref<string> = ref('0.1s ease-in-out');
const responseTime = 1500 //s

// methods:
const clearOffset: returnVoidFunction = () => { 
    imgOffsets.value = 'translate(0, 0)';
    transitionMode.value = '0.6s ease-in-out'
}

let LoopTimer: number | undefined = window.setTimeout(clearOffset, responseTime);

const mouseMoveBehavior: returnVoidFunction = () => {
    window.addEventListener('mousemove', (ev: object) => {
        clearTimeout(LoopTimer);
        LoopTimer =  window.setTimeout(clearOffset, responseTime);
        const standerdX: number = document.body.clientWidth / 2;
        const standerdY: number = document.body.clientHeight / 2;
        const { pageX, pageY } = ev as { pageX: number, pageY: number };
        transitionMode.value = '0.1s ease-in-out';
        imgOffsets.value = 'translate(' + Math.ceil((pageX - standerdX)) / 10 + 'px,' + Math.ceil((pageY - standerdY) / 5) + 'px)';
    })
}



onMounted(() => {
    mouseMoveBehavior();
})

</script>

<template>
    <div class="background" :style="{ transform: imgOffsets, transition: transitionMode }">
    </div>
</template>

<style scoped>
.background {
    position: fixed;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    background-image: url('src/assets/basic_imgs/background_imgs.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 1%;
    opacity: 0.1;
}

/* 屏幕适配 */
@media only screen and (max-width: 412px) {
    .background {
        background-image: url('src/assets/basic_imgs/background_imgs_row.svg');
    }
}
</style>