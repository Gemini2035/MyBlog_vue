<script setup lang="ts">
import { ExtractPropTypes, Raw, Ref, inject, markRaw, ref } from 'vue';

import { returnVoidFunction, returnStringFunction } from '../../../cat_define/type_define';
import ToDetail from './to_detail.vue';

// static:
const hoverEffect: Raw<Array<string>> = markRaw(['rotateZ(15deg)', 'rotateZ(-15deg)', 'translate(3px, 3px)', 'rotateZ(360deg)', 'rotateZ(-360deg)']);

// respond:
const anchor: Ref<string> = ref('');
const effect: Ref<Array<string>> = ref([]);
const everyItemInfo: Readonly<ExtractPropTypes<{
    title: StringConstructor,
    titleImg: StringConstructor,
    itemMenu: ArrayConstructor,
    id: StringConstructor;}>> = defineProps({
        title: String,
        titleImg: String,
        itemMenu: Array<String>,
        id: String
    });

// method:
const changePage: returnVoidFunction = inject('toPageMethod') || function () { alert('error'); };
const hoverBehavior: returnVoidFunction = (index: number) => effect.value[index] = hoverEffect[Math.floor(Math.random() * hoverEffect.length)];
const clearHoverBehavior: returnVoidFunction = (index: number) => effect.value[index] = 'none';
const getMenuWidth: returnStringFunction = () => { return `calc(${100 / (everyItemInfo.itemMenu?.length || 1)}% - 8px)`; };
const jumpToPage: returnVoidFunction = (index: number) => {
    changePage(everyItemInfo.id, everyItemInfo.itemMenu![index]);
}
</script>

<template>
    <div class="breif-item-container">
        <div class="title">
            <h1 class="title-text">{{ everyItemInfo.title }}</h1>
            <img :src="everyItemInfo.titleImg" alt="图片" class="title-img">
        </div>
        <hr style="margin: 3px 0 0 0; width: 60%;"/>
        <div class="item-content-container">
            <div v-for="(menuItem, index) in everyItemInfo.itemMenu" :key="index" class="item-content"
            @click="jumpToPage(index)"
            @mouseover="hoverBehavior(index)" @mouseout="clearHoverBehavior(index)" :style="{transform: effect[index], width: getMenuWidth()}">
                <p>{{ menuItem }}</p>
            </div>
            <ToDetail :message="everyItemInfo.title" :id="everyItemInfo.id"/>
        </div>
    </div>
</template>

<style scoped>
.breif-item-container {
    width: 100%;
    height: 100%;
}

.breif-item-container .title {
    display: flex;
    height: 25%;
}

.breif-item-container .title .title-text {
    margin: 0 1%;
}

.breif-item-container .title .title-img {
    height: 2rem;
    width: auto;
    margin: auto 0 auto 1%;
}

.breif-item-container .item-content-container {
    position: relative;
    height: 74%;
}

.breif-item-container .item-content-container .item-content {
    height: 100%;
    display: inline-block;
    transition: 0.6s ease-in-out;
    background-repeat: no-repeat;
    background-size: cover;
    transform: none;
}

.breif-item-container .item-content-container .item-content:hover {
    cursor: pointer;
    color: rgba(128, 128, 128);
}

.breif-item-container .item-content-container .item-content:hover p{
    text-decoration: underline;
}

.breif-item-container .item-content-container .item-content p{
    margin-top: 22%;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    transition: inherit;
}

/* 以下为屏幕适配 */

/** Phone **/
@media only screen and (min-width: 320px) and (max-width: 767px) {
    .breif-item-container .title .title-text {
        font-size: 1.5rem;
    }

    .breif-item-container .title .title-img {
        height: 1.5rem;
        width: auto;
    }

    .breif-item-container .item-content-container .item-content p {
        font-size: 1rem;
    }
}

/* Others */
@media only screen and (max-width: 319px) {
    .breif-item-container .title .title-text {
        font-size: 1.5rem;
    }

    .breif-item-container .title .title-img {
        height: 1.5rem;
        width: auto;
    }

    .breif-item-container .item-content-container .item-content p {
        font-size: 1rem;
    }
}
</style>