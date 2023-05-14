<script setup lang="ts">
import { ExtractPropTypes, Raw, Ref, markRaw, onMounted, ref } from 'vue';
import { returnVoidFunction } from '../../../cat_define/type_define';
import axios from 'axios';
import { ServerManager } from '../../../cat_define/server_info';

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
                <span class="menu-detail" :class="isActive? 'active' : ''">{{menuItem.name}}</span>
            </div>
        </div>
            <div class="essay-list" :style="{width: `calc(100% - ${dynamicWidth}px - 6px)`}">
                <transition-group name="essay">
                    <div class="essay-item" v-for="(essayInfo, index) in essayList" :key="index" v-show="page === 'all' || page === essayInfo.classify">
                        <img src="src/assets/study_part_img/defaultImg.svg" alt="文章图片">
                        <h1>{{essayInfo.title}}</h1>
                        <div>
                            <p>发表时间: {{essayInfo.pubdate.split('T')[0]}}</p>
                            <p>文章分类: {{essayInfo.classify}}</p>
                        </div>
                    </div>
                    <p class="end-text" :key="-1">没有更多了哦~</p>
                </transition-group>
            </div>
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
    opacity: 1;
}

.essay-leave-active {
    transition: 0.6s ease-in-out;
}

.essay-leave-to {
    opacity: 0;
}

.end-text {
    text-align: center;
}

</style>