<script setup lang="ts">
import { ExtractPropTypes, Ref, onMounted, ref } from 'vue';
import axios from 'axios';

import { returnVoidFunction } from '../../../cat_define/type_define';
import { JsonRequest } from '../../../cat_define/server_class';
import { ServerManager } from '../../../cat_define/server_info';
import ToTop from '../basic_componets/to_top.vue';

// static
const parm: Readonly<ExtractPropTypes<{initActive: BooleanConstructor;}>> = defineProps({initActive: Boolean});
const jsonRequest: JsonRequest = new JsonRequest('name', 'affirm_info');

// respond
const isActive: Ref<boolean> = ref(false);
const dynamicHeight: Ref<number> = ref(0);
const otherContent: Ref<Array<{name: string, content: string}>> = ref([]);

// mehtod
const changeHeight: returnVoidFunction = () => {
    if (isActive.value) dynamicHeight.value = (document.querySelector('#others-title')!.clientHeight + 
                                                document.querySelector('#others-body')!.clientHeight);
    else dynamicHeight.value = document.querySelector('#others-title')!.clientHeight;
}

const backToTop: returnVoidFunction = () => {
    document.querySelector('#others-title')?.scrollIntoView({ behavior: 'smooth' })
}

const initFunc: returnVoidFunction = () => {
    axios.get(ServerManager.getTextApi + jsonRequest.parse())
    .then(response => {
        otherContent.value = response.data;
    })
    .catch(() => {
        otherContent.value = [{name: 'Error', content: 'error'}];
    })
    .finally(() => {
        isActive.value = parm.initActive!;
        changeHeight();
    });
}

const chageState: returnVoidFunction = () => {
    isActive.value = !isActive.value;
    changeHeight();
}

onMounted(() => {
    initFunc();
})
</script>

<template>
    <div class="others-container" :style="{height: `${dynamicHeight}px`}">
        <div class="title" :class="isActive? 'active' : ''" id="others-title">
            <h1>其他内容</h1>
            <img src="src/assets/site_part_imgs/arrow.right.svg" alt="详细" :class="isActive? 'active' : ''" @click="chageState()">
        </div>
        <div class="others-content" id="others-body">
            <div v-for="(other, index) in otherContent" :key="index" class="others-item">
                <hr>
                <h2>[{{other.name}}]</h2>
                <p class="others-content" v-html="other.content"></p>
            </div>
        </div>
        <ToTop v-show="isActive" :to-top-function="backToTop"/>
    </div>
</template>

<style scoped>
* {
    transition: 0.6s ease-in-out;
}

.others-container {
    width: 99%;
    margin: 0 auto 1%;
    height: 6%;
    overflow-y: hidden;
}

.others-container .title {
    position: relative;
}

.others-container .title h1 {
    margin: 0;
}

.others-container .title img {
    height: 75%;
    width: auto;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
}

.others-container .title img:hover {
    cursor: pointer;
    animation: rightHoverAnimate 2s infinite;
}
@keyframes rightHoverAnimate {
    50% { opacity: 0.5; }
}

.others-container .title img.active {
    transform: translateY(-50%) rotateZ(90deg);
}

.others-container .others-content {
    width: 95%;
    margin: auto;
}
</style>