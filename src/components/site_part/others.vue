<script setup lang="ts">
import { ExtractPropTypes, Ref, onMounted, ref } from 'vue';

import { returnVoidFunction } from '../../../cat_define/type_define';

// static
const parm: Readonly<ExtractPropTypes<{initActive: BooleanConstructor;}>> = defineProps({initActive: Boolean});

// respond
const isActive: Ref<boolean> = ref(false);
const dynamicHeight: Ref<number> = ref(0);

// mehtod
const initFunc: returnVoidFunction = () => {
    console.log(parm.initActive)
    if (!parm.initActive) { 
        dynamicHeight.value = document.querySelector('#title')!.clientHeight;
        return;
    }
    isActive.value = parm.initActive!;
    dynamicHeight.value = (document.querySelector('#title')!.clientHeight + document.querySelector('#body')!.clientHeight);
}

const chageState: returnVoidFunction = () => {
    isActive.value = !isActive.value;
    if (isActive.value) dynamicHeight.value = (document.querySelector('#title')!.clientHeight + document.querySelector('#body')!.clientHeight);
    else dynamicHeight.value = document.querySelector('#title')!.clientHeight;

}

onMounted(() => {
    initFunc();
})
</script>

<template>
    <div class="sites-container" :style="{height: `${dynamicHeight}px`}">
        <div class="title" :class="isActive? 'active' : ''" id="title">
            <h1>其他内容</h1>
            <img src="src/assets/site_part_imgs/arrow.right.svg" alt="详细" :class="isActive? 'active' : ''" @click="chageState()">
        </div>
        <div class="sites-content" id="body">111</div>
    </div>
</template>

<style scoped>
* {
    transition: 0.6s ease-in-out;
}

.sites-container {
    width: 99%;
    background-color: red;
    margin: 0 auto 1%;
    height: 6%;
    overflow-y: hidden;
    /* height: 100%; */
}

.sites-container .title {
    position: relative;
}

.sites-container .title h1 {
    margin: 0;
}

.sites-container .title img {
    height: 75%;
    width: auto;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
}

.sites-container .title img:hover {
    cursor: pointer;
    animation: rightHoverAnimate 2s infinite;
}
@keyframes rightHoverAnimate {
    50% { opacity: 0.5; }
}

.sites-container .title img.active {
    transform: translateY(-50%) rotateZ(90deg);
}

.sites-container .sites-content {
    background-color: blue;

}
</style>