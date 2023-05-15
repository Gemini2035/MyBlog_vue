<script setup lang="ts">
import { ExtractPropTypes, Raw, Ref, markRaw, onMounted, ref } from 'vue';
import axios from 'axios';

import { returnVoidFunction } from '../../../cat_define/type_define';
import { ServerManager } from '../../../cat_define/server_info';
import EssayDetail from './essay_detail.vue';

// static
const parm: Readonly<ExtractPropTypes<{anchor: StringConstructor;}>> = defineProps({anchor: String});
const menuInfo: Raw<Array<{name: string, id: string, imgSrc: string}>> = markRaw([
    { name: '全部文章', id: 'all', imgSrc: 'src/assets/study_part_img/a.circle.svg' },
    { name: '前端文章', id: 'web', imgSrc: 'src/assets/study_part_img/f.circle.svg' },
    { name: 'Python文章', id: 'python', imgSrc: 'src/assets/study_part_img/p.circle.svg' },
    { name: 'C&CPP文章', id: 'c&cpp', imgSrc: 'src/assets/study_part_img/c.circle.svg' },
    { name: 'SwiftUI文章', id: 'swiftUI', imgSrc: 'src/assets/study_part_img/s.circle.svg' },
    { name: '其他文章', id: '其他', imgSrc: 'src/assets/study_part_img/o.circle.svg' },
]);

// respond
const page: Ref<string> = ref(parm.anchor?.toLocaleLowerCase() || 'all');
const dynamicWidth: Ref<number> = ref(70);
const isActive: Ref<boolean> = ref(false);
const essayList: Ref<Array<{title: string, pubdate: string, essayId: number, filePath: string, classify: string}>> = ref([]);
const showDetail: Ref<boolean> = ref(false);
const parmId: Ref<number> = ref(0);

// method
const changeWidth: returnVoidFunction = () => {
    if (isActive.value) dynamicWidth.value = 250;
    else dynamicWidth.value = document.querySelector('.menu-item img')!.clientWidth;
}

const hoverBehavior: returnVoidFunction = () => {
    isActive.value = !isActive.value;
    changeWidth();
}

const getEssayList: returnVoidFunction = () => {
    axios.get(ServerManager.getEssayList)
    .then(response => {
        if (!response.data.state) essayList.value = response.data.data;
        else throw Error;
    })
    .catch(() => {
        essayList.value = [{title: 'Error', pubdate: "????-??-??", essayId: -1, filePath: '', classify: ''}];
    })
}

const changePage: returnVoidFunction = (toPage: string) => {
    page.value = toPage;
}

const toEssayDetail: returnVoidFunction = (id: number = 0) => {
    if (id) parmId.value = id;
    showDetail.value = !showDetail.value;
}

const addEssay: returnVoidFunction = () => {
    console.log('111');
}

onMounted(() => {
    getEssayList();
})
</script>

<template>
    <div class="essay-container">
        <div class="essay-menu" :style="{width: `${dynamicWidth}px`}">
            <div v-for="(menuItem, index) in menuInfo" :key="index" class="menu-item" :class="menuItem.id === page? 'isChoosen' : ''"
            @mouseenter="hoverBehavior()" @mouseleave="hoverBehavior()" @click="changePage(menuItem.id)">
                <img :src="menuItem.imgSrc" alt="" />
                <transition name="menu-text">
                    <span class="menu-detail" :class="isActive? 'active' : ''">{{menuItem.name}}</span>
                </transition>
            </div>
        </div>
        <div class="essay-list" :style="{width: `calc(100% - ${dynamicWidth}px - 6px)`}">
            <transition-group name="essay">
                <div class="essay-item" v-for="(essayInfo, index) in essayList" :key="index" v-show="page === 'all' || page === essayInfo.classify" @click="toEssayDetail(essayInfo.essayId)">
                    <img src="src/assets/study_part_img/defaultImg.svg" alt="文章图片">
                    <h1>{{essayInfo.title}}</h1>
                    <div>
                        <p>发表时间: {{essayInfo.pubdate.split('T')[0]}}</p>
                        <p>文章分类: {{essayInfo.classify}}</p>
                    </div>
                </div>
                <p class="end-text" :key="-1">没有更多了哦~</p>
                <p class="essay-add" :key="-2" @click="addEssay()">新增</p>
            </transition-group>
        </div>
        <transition name="essay">
            <EssayDetail v-show="showDetail" :changeState="toEssayDetail" :essayId="parmId"/>
        </transition>
    </div>
</template>

<style scoped>
* {
    transition: 0.6s ease-in-out;
}

.essay-container {
    width: 100%;
    margin: auto;
    display: flex;
    height: 80%;
}

.essay-menu {
    max-width: 250px;
    overflow: hidden;
}

.essay-menu .menu-item {
    border-radius: 5px;
    margin-bottom: 1%;
}

.essay-menu .menu-item.isChoosen {
    background-color: rgba(128, 128, 128, 1);
}

.essay-menu .menu-item:hover {
    cursor: pointer;
    background-color: rgba(128, 128, 128, 0.7);
}


.essay-menu .menu-item img {
    height: 4rem;
    width: auto;
    vertical-align: text-bottom;
}

.menu-detail {
    font-weight: bold;
    font-size: 2rem;
    position: absolute;
    margin-left: 5px;
    margin-top: 7px;
    opacity: 0;
}

.menu-detail.active {
    opacity: 1;
}

.menu-detail.active {
    opacity: 1;
}

.essay-list {
    margin-left: 3px;
    border-left: 3px solid;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    padding: 5px;
    height: calc(100% - 10px);
    /* background-color: yellow; */
    overflow-x: hidden;
    overflow-y: auto;
}

.essay-item {
    margin: 15px;
    margin-left: 5px;
    height: 100px;
    transition: 0.6s ease-in-out;
    background-color: #c0c0c0;
    border: 1px solid #fff;
    border-radius: 10px;
    padding: 10px;
    opacity: 0.7;
    position: relative;
    box-shadow: 5px 3px 1px #808080;
}

.essay-item:hover {
    cursor: pointer;
    opacity: 1;
}

.essay-item img {
    height: 100%;
    width: auto;
}

.essay-item h1 {
    display: inline;
    position: absolute;
    margin-left: 10px;
}

.essay-item div {
    position: absolute;
    right: 1%;
    top: 30%
}

.essay-item div p {
    margin: 1px;
}

.essay-leave-from {
    transform: none;
    opacity: 1;
}

.essay-leave-active {
    transition: 0.6s ease-in-out;
}

.essay-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

.end-text {
    text-align: center;
    margin: 0;
}

.essay-add {
    text-align: center;
    cursor: default;
    margin: 0;
    color: rgba(150, 198, 230, 0.9)
}

.essay-add:hover {
    cursor: pointer;
    text-decoration: underline;
}

.essay-enter-from,
.essay-leave-to {
    transform: translateY(-30%);
}

.essay-enter-active,
.essay-leave-active {
    transition: 0.6s ease-in-out,
}

.essay-enter-to,
.essay-enter-from {
    transform: none;
}



/* 以下为屏幕适配 */
@media only screen and (min-width: 320px) and (max-width: 649px) {
    .essay-container {
        flex-direction: column;
    }

    .essay-menu {
        width: 100% !important;
        max-width: none;
        display: flex;
        overflow-x: auto;
        scrollbar-width: 0;
    }

    .essay-menu::-webkit-scrollbar{
        display: none;
    };

    .essay-menu .menu-item {
        margin-right: 3px;
    }

    .essay-menu .menu-item img {
        display: none;
    }

    .essay-menu .menu-item .menu-detail {
        position: inherit;
        white-space: nowrap;
        /* display: none; */
        font-size: 1rem;
    }

    .essay-item img {
        width: auto;
        height: 90%;
    }

    .essay-item h1 {
        font-size: 1.5rem;
    }

    .essay-item div {
        display: none;
    }

    .essay-list {
        width: 100% !important;
        border: none;
        border-top: 3px solid;
        border-top-right-radius: 15px;
        margin: 0;
    }

    .menu-text-enter-from,
    .menu-text-leave-to {
        opacity: 0;
    }

    .menu-text-enter-active,
    .menu-text-leave-active {
        transition: 0.6s ease-in-out;
    }

    .menu-text-enter-to,
    .menu-text-leave-from {
        opacity: 1;
    }
}

@media only screen and (min-width: 650px) and (max-width: 1024px) {
    .essay-container {
        flex-direction: column;
    }

    .essay-menu {
        width: 100% !important;
        max-width: none;
        display: flex;
    }

    .essay-menu .menu-item {
        margin-right: 3px;
    }

    .essay-menu .menu-item .menu-detail {
        position: inherit;
        white-space: nowrap;
        display: none;
    }

    .essay-menu .menu-item:hover .menu-detail {
        display: inline-block;
        vertical-align: top;
    }

    .essay-list {
        width: 100% !important;
        border: none;
        border-top: 3px solid;
        border-top-right-radius: 15px;
    }

    .menu-text-enter-from,
    .menu-text-leave-to {
        opacity: 0;
    }

    .menu-text-enter-active,
    .menu-text-leave-active {
        transition: 0.6s ease-in-out;
    }

    .menu-text-enter-to,
    .menu-text-leave-from {
        opacity: 1;
    }
}
</style>