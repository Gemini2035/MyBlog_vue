<script setup lang="ts">
import { ExtractPropTypes, Ref, onMounted, ref } from 'vue';
import axios from 'axios';

import { returnVoidFunction } from '../../../cat_define/type_define';
import { JsonRequest } from '../../../cat_define/server_class';
import { ServerManager } from '../../../cat_define/server_info';

// static
const parm: Readonly<ExtractPropTypes<{initActive: BooleanConstructor;}>> = defineProps({initActive: Boolean});
const jsonRequest: JsonRequest = new JsonRequest('name', 'contributor_info');

// respond
const isActive: Ref<boolean> = ref(false);
const dynamicHeight: Ref<number> = ref(0);
const contributorList: Ref<Array<{name: string, headImg: string, personage: string}>> = ref([]);

// mehtod
const changeHeight: returnVoidFunction = () => {
    if (isActive.value) dynamicHeight.value = (document.querySelector('#contributors-title')!.clientHeight + 
                                                document.querySelector('#contributors-body')!.clientHeight);
    else dynamicHeight.value = document.querySelector('#contributors-title')!.clientHeight;
}

const toUserPage: returnVoidFunction = (username: string) => {
    window.open(`https://github.com/${username}`, '_blank');
}

const initFunc: returnVoidFunction = () => {
    axios.get(ServerManager.getTextApi + jsonRequest.parse())
    .then(response => {
        contributorList.value = response.data;
    })
    .catch(() => {
        contributorList.value = [{name: 'Error', headImg: '', personage: 'error'}];
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

onMounted(() => {
    initFunc();
})
</script>

<template>
    <div class="contributors-container" :style="{height: `${dynamicHeight}px`}">
        <div class="title" :class="isActive? 'active' : ''" id="contributors-title">
            <h1>本站点的主要贡献者</h1>
            <img src="src/assets/site_part_imgs/arrow.right.svg" alt="详细" :class="isActive? 'active' : ''" @click="chageState()">
        </div>
        <div class="contributors-content" id="contributors-body">
            <div v-for="(contributor, index) in contributorList" class="contributor-item" :key="index"
            @click="toUserPage(contributor.name)">
                <img :src="contributor.headImg" alt="headImg">
                <div>
                    <h2>{{contributor.name}}</h2>
                    <p>代码贡献量: {{contributor.personage}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    transition: 0.6s ease-in-out;
}

.contributors-container {
    width: 99%;
    height: 6%;
    overflow-y: hidden;
    margin: 0 auto 1%;
}

.contributors-container .title {
    position: relative;
}

.contributors-container .title h1 {
    margin: 0;
}

.contributors-container .title img {
    height: 75%;
    width: auto;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
}

.contributors-container .title img:hover {
    cursor: pointer;
    animation: rightHoverAnimate 2s infinite;
}
@keyframes rightHoverAnimate {
    50% { opacity: 0.5; }
}

.contributors-container .title img.active {
    transform: translateY(-50%) rotateZ(90deg);
}

.contributors-container .contributors-content {
    width: 99%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
}

.contributor-item {
    width: calc(33% - 2px);
    display: flex;
    height: 100px;
    border-radius: 20px;
    transition: 0.6s ease-in-out;
    background-color: rgba(128, 128, 128, 0.9);
    border: 1px solid;
}

.contributor-item:hover {
    cursor: pointer;
    background-color: rgba(68, 68, 68, 0.5);
}

.contributor-item>img{
    border: 1px solid;
    border-radius: 50%;
    height: 75%;
    width: auto;
    margin: auto;
    margin-left: 5px;
}

.contributor-item div{
    height: 75%;
    overflow: hidden;
    width: calc(90% - 13px);
    border-left: 1px solid;
    margin: auto 0 auto 10px;
    overflow-x: auto;
}

.contributor-item div h2{
    margin: 0;
    margin-left: 10px;
}

.contributor-item div p{
    margin-top: 3px;
    height: 75%;
    overflow-y: auto;
    overflow-x: hidden;
    word-wrap: break-word;
    padding-left: 10px;
    padding-top: 10px;
    font-weight: bold;
    line-height: 1.5;
}

/* 以下为移动端屏幕适配 */
/** Pad **/
@media only screen and (min-width: 320px) and (max-width: 1024px) {
    .contributor-item {
        border: none;
        background-color: transparent;
    }

    .contributor-item img{
        margin: auto;
    }

    .contributor-item div {
        display: none;
    }

}

</style>