<script setup lang="ts">
import { ExtractPropTypes, Raw, Ref, markRaw, onMounted, ref } from 'vue';
import axios from 'axios';

import { returnVoidFunction } from '../../../cat_define/type_define';
import { ServerManager } from '../../../cat_define/server_info';
// static
const parm: Readonly<ExtractPropTypes<{initActive: BooleanConstructor;}>> = defineProps({initActive: Boolean});
const langColorList: Raw<Array<string>> = markRaw([
    'rgba(50, 205, 50)', 'rgba(75, 0, 130)', 'rgba(255, 215, 0)', 'rgba(255, 69, 0)', 'rgba(105, 105, 105)'
]);

// respond
const isActive: Ref<boolean> = ref(false);
const showPart: Ref<string> = ref('loading'); // success, loading, error三种状态，用于响应加载状态
const dynamicHeight: Ref<number> = ref(0);
const dynamicContent: Ref<Array<{name: string, personage: string}>> = ref(
    [
        {
            "name": "Vue",
            "personage": "96.6%"
        },
        {
            "name": "TypeScript",
            "personage": "2.3%"
        },
        {
            "name": "Other",
            "personage": "1.1%"
        }
    ]
);
const dynamicColor: Ref<Array<string>> = ref([]);
const langIsHover: Ref<Array<boolean>> = ref([]);

// mehtod
const changeHeight: returnVoidFunction = () => {
    if (isActive.value) dynamicHeight.value = (document.querySelector('#lang-title')!.clientHeight + 
                                                document.querySelector('#lang-body')!.clientHeight);
    else dynamicHeight.value = document.querySelector('#lang-title')!.clientHeight;
}

const getDynamicColor: returnVoidFunction = () => {
    if (dynamicContent.value.length <= langColorList.length) {
        dynamicColor.value = langColorList.slice(0, dynamicContent.value.length);
        return;
    } else {
        for(let i = 0; i < dynamicContent.value.length; i ++) dynamicColor.value[i] = 'rgba(0, 0, 0)';
    }
}

const getDynamicContent: returnVoidFunction = () => {
    showPart.value = 'loading';
    axios.get(ServerManager.getLangApi)
    .then(res => {
        const result = res.data;
        if (result.state) throw Error(result);
        else dynamicContent.value = result.data;
        getDynamicColor();
        for (let i = 0; i < dynamicContent.value.length; i ++) langIsHover.value[i] = false;
        showPart.value = 'success';
    })
    .catch(() => {
        showPart.value = 'error';
    })
    .finally(() => changeHeight())
}

const initFunc: returnVoidFunction = () => {
    isActive.value = parm.initActive!;
    changeHeight();
    getDynamicContent();
}

const chageState: returnVoidFunction = () => {
    isActive.value = !isActive.value;
    changeHeight();
}

const mouseEnterBehavior: returnVoidFunction = (index: number) => langIsHover.value[index] = true;

const mouseOutBehavior: returnVoidFunction = (index: number) => langIsHover.value[index] = false;

onMounted(() => {
    initFunc();
})
</script>

<template>
    <div class="lang-container" :style="{height: `${dynamicHeight}px`}">
        <div class="title" :class="isActive? 'active' : ''" id="lang-title">
            <h1>本站点使用的语言统计</h1>
            <img src="src/assets/site_part_imgs/arrow.right.svg" alt="详细" :class="isActive? 'active' : ''" @click="chageState()">
        </div>
        <div class="lang-content" id="lang-body">
            <div v-show="showPart === 'success'" class="success">
                <h1 class="lang-title">
                    Languages
                </h1>
                <div class="progress">
                    <span v-for="(language, index) in dynamicContent" 
                    :style="{width: language.personage, backgroundColor: dynamicColor[index]}"
                    :class="langIsHover[index]? 'isChoosen' : ''"
                    @mouseenter="mouseEnterBehavior(index)" @mouseout="mouseOutBehavior(index)">
                    </span>
                </div>
                <div class="lang-list">
                    <div v-for="(language, index) in dynamicContent" class="lang-item" :class="langIsHover[index]? 'isChoosen' : ''"
                    @mouseenter="mouseEnterBehavior(index)" @mouseout="mouseOutBehavior(index)">
                        <span class="lang-icon" :style="{backgroundColor: dynamicColor[index]}"></span>
                        <span class="lang-name">{{language.name}}</span>
                    </div>
                </div>
            </div>
            <div v-show="showPart === 'loading'" class="loading">
                <img src="src/assets/site_part_imgs/goforward.svg" alt="加载中">
                <span>正在加载中...</span>

            </div>
            <div v-show="showPart === 'error'" class="error">
                <img src="src/assets/site_part_imgs/exclamationmark.triangle.svg" alt="加载失败">
                <span>加载失败!</span>
                <span class="text-botton" @click="getDynamicContent()">重试</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    transition: 0.6s ease-in-out;
}

.lang-container {
    width: 99%;
    margin: 0 auto 1%;
    height: 6%;
    overflow-y: hidden;
}

.lang-container .title {
    position: relative;
}

.lang-container .title h1 {
    margin: 0;
}

.lang-container .title img {
    height: 75%;
    width: auto;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
}

.lang-container .title img:hover {
    cursor: pointer;
    animation: rightHoverAnimate 2s infinite;
}
@keyframes rightHoverAnimate {
    50% { opacity: 0.5; }
}

.lang-container .title img.active {
    transform: translateY(-50%) rotateZ(90deg);
}

.lang-container .lang-content .success {
    width: 99%;
    margin: auto;
}

.lang-container .lang-content .success * {
    margin: 0;
}

.success .lang-title {
    font-size: 2.5rem;
}

.lang-container .lang-content .success .progress {
    width: 99%;
    margin: 0 auto;
    display: flex;
    border-radius: 10px;
    overflow: hidden;
    height: 20px;
}

.lang-container .lang-content .success .progress span.isChoosen {
    animation: choosenMove 1.5s infinite;
}

@keyframes choosenMove {
    50% { opacity: 0.3;}       
}

.lang-container .lang-content .success .lang-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin: 5px auto;
    width: 95%;
}

.lang-item {
    width: 33.3%;
    display: flex;
    cursor: default;
}

.lang-item.isChoosen{
    animation: choosenMove 1.5s infinite;
}

.lang-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}

.lang-name {
    width: calc(100% - 40px);
    font-size: 1.2rem;
    transform: translateX(10px);
}

.lang-container .lang-content .error,
.lang-container .lang-content .loading {
    display: flex;
}

.lang-container .lang-content .error img,
.lang-container .lang-content .loading img {
    height: 50px;
    width: auto;
    margin: 0 5px;
}

.lang-container .lang-content .loading img {
    animation: loadingAnimate 1.5s infinite;
}
@keyframes loadingAnimate {
    20% { transform: rotateZ(0deg); }
    100% { transform: rotateZ(360deg); }
}

.lang-container .lang-content .loading span,
.lang-container .lang-content .error span {
    font-size: 1.5rem;
    margin-right: 10px;
    height: 100%;
    margin-top: auto;
    margin-bottom: auto;
    cursor: default;
}

.lang-container .lang-content .error span.text-botton:hover {
    cursor: pointer;
    text-decoration: underline;
}
</style>