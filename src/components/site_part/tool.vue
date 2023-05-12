<script setup lang="ts">
import { ExtractPropTypes, Ref, onMounted, ref } from 'vue';
import axios from 'axios';

import { returnVoidFunction } from '../../../cat_define/type_define';
import { JsonRequest } from '../../../cat_define/server_class';
import { ServerManager } from '../../../cat_define/server_info';
import PartMenu from '../basic_componets/part_menu.vue';
import ToTop from '../basic_componets/to_top.vue';

// static
const parm: Readonly<ExtractPropTypes<{initActive: BooleanConstructor;}>> = defineProps({initActive: Boolean});

// respond
const sitesList: Ref<Array<{name: string, id: string, src: string, description: string}>> = ref([]);
const isActive: Ref<boolean> = ref(false);
const dynamicHeight: Ref<number> = ref(0);

// mehtod
const changeHeight: returnVoidFunction = () => {
    if (isActive.value) dynamicHeight.value = (document.querySelector('#tool-title')!.clientHeight + 
                                                document.querySelector('#tool-body')!.clientHeight);
    else dynamicHeight.value = document.querySelector('#tool-title')!.clientHeight;
}

const initFunc: returnVoidFunction = () => {
    const jsonRequest: JsonRequest = new JsonRequest('name', 'tool_info');
    axios.get(ServerManager.getTextApi + jsonRequest.parse())
    .then(res => {
        sitesList.value = res.data;
    })
    .catch(() => {
        sitesList.value = [{name: "Error", id: "error", src: "", description: ""}];
    })
    .finally(() => {
        isActive.value = parm.initActive!;
        changeHeight();
    })
}

const chageState: returnVoidFunction = () => {
    isActive.value = !isActive.value;
    changeHeight();

}

const toTargetUrl: returnVoidFunction = (index: number) => {
    window.open(sitesList.value[index].src, '_blank');
}

const backToTop: returnVoidFunction = () => {
    document.querySelector('#tool-title')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
    initFunc();
})
</script>

<template>
    <div class="sites-container" :style="{height: `${dynamicHeight}px`}">
        <PartMenu :init-x="100" :init-y="-100"/>
        <div class="title" :class="isActive? 'active' : ''" id="tool-title">
            <h1>构建本站点使用的工具</h1>
            <img src="src/assets/site_part_imgs/arrow.right.svg" alt="详细" :class="isActive? 'active' : ''" @click="chageState()">
        </div>
        <div class="sites-content" id="tool-body">
            <div v-for="(siteInfo, index) in sitesList" class="site-item" :key="index">
                <img :src="`src/assets/site_part_imgs/${siteInfo.id}.svg`" alt="icon" class="icon">
                <div class="info-content">
                    <h1>{{siteInfo.name}}</h1>
                    <h3 @click="toTargetUrl(index)">{{siteInfo.src}}</h3>
                    <p v-html="siteInfo.description"></p>
                </div>
            </div>
            <p class="tips">注: 带*号的可能需要魔法，懂得都懂</p>
        </div>
        <ToTop v-show="isActive" :to-top-function="backToTop"/>
    </div>
</template>

<style scoped>
* {
    transition: 0.6s ease-in-out;
}

.sites-container {
    width: 99%;
    margin: 0 auto 1%;
    height: 6%;
    overflow-y: hidden;
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

.sites-container .sites-content .site-item {
    width: 100%;
    margin: 0 auto 25px auto;
    display: flex;
    height: 250px;
    border-radius: 20px;
}

.sites-container .sites-content .site-item .icon {
    width: 10%;
    height: auto;
    margin: auto;
}

.sites-container .sites-content .site-item .info-content {
    height: 95%;
    overflow: hidden;
    width: calc(90% - 13px);
    border-left: 3px solid;
    margin: auto 0 auto 10px;
    padding-top: 10px;
    cursor: default;
}

.sites-container .sites-content .site-item .info-content h1,
.sites-container .sites-content .site-item .info-content h3 {
    margin: 0;
    margin-left: 10px;
}

.sites-container .sites-content .site-item .info-content h3:hover {
    text-decoration: underline;
    cursor: pointer;
}

.sites-container .sites-content .site-item .info-content p {
    margin-top: 3px;
    border-top: 1px solid;
    width: 99%;
    height: 64%;
    overflow-y: auto;
    overflow-x: hidden;
    word-wrap: break-word;
    padding-left: 10px;
    padding-top: 10px;
    font-weight: bold;
    line-height: 1.5;
}

.sites-container .sites-content .site-item .info-content p:deep() img {
    height: 25px;
    width: auto;
    vertical-align: text-bottom;
}

.sites-container .sites-content .site-item .info-content p:deep() a {
    text-decoration: none;
    color: inherit;
}

.sites-container .sites-content .site-item .info-content p:deep() a:hover {
    text-decoration: underline;
    cursor: pointer;
}


</style>