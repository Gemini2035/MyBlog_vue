<script setup lang="ts">
import { Raw, markRaw } from 'vue';

import SiteCircle from '../breif_part/site_circle.vue';
import BreifPartItem from '../breif_part/breif_part_item.vue';

// static:
const itemInfo: Raw<Array<{title: string, titleImg: string, itemMenu: Array<string>, id: string;}>> = markRaw([
    {
        title: '自我介绍',
        titleImg: "src/assets/breif_part_imgs/person.svg",
        itemMenu: ['小短文', '联系方式', '秘密基地', '其他'],
        id: 'self'
    },
    {
        title: '站点简介',
        titleImg: "src/assets/breif_part_imgs/paperplane.svg",
        itemMenu: ['工具列表', '语言统计', '贡献者', '其他'],
        id: 'site'
    },
    {
        title: '日常生活',
        titleImg: "src/assets/breif_part_imgs/gamecontroller.svg",
        itemMenu: ['动漫', '现实生活', '游戏人生'],
        id: 'play'
    },
    {
        title: '学习记录',
        titleImg: "src/assets/breif_part_imgs/book.svg",
        itemMenu: ['Web', 'Python', 'C&Cpp', 'SwiftUI', '其他'],
        id: 'study'
    }
]);


</script>

<template>
    <div class="all-container">
        <h1 class="site-title">这里是Carloss2035的个人博客 \\\ ///</h1>
        <div class="main-container">
            <div class="circle-container">
                <SiteCircle />
            </div>
            <div class="main-menu">
                <BreifPartItem v-for="(everyItemInfo, index) in itemInfo" :key="index" class="item-content"
                :title="everyItemInfo.title"
                :title-img="everyItemInfo.titleImg"
                :item-menu="everyItemInfo.itemMenu"
                :id="everyItemInfo.id"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.all-container {
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
}

.all-container .site-title {
    margin: 1%;
    font-size: 3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.all-container .main-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.all-container .main-container .circle-container {
    height: 60vh;
    left: 3%;
    margin-left: 3px;
}

.all-container .main-menu {
    width: 60vw;
    height: 87vh;
    margin: 0 5px;
    display: flex;
    flex-direction: column;
}

.main-menu .item-content {
    border-bottom: 1px solid;
    height: calc(25% - 2px);
    padding: 5px;
    transition: 0.6s ease-in-out;
}

.main-menu .item-content:hover {
    box-shadow: -5px -5px rgba(128, 128, 128, 0.6);
    animation: opacityAnimate 2s infinite;
    transform: translate(5px, 5px);
}
@keyframes opacityAnimate {
    50% { opacity: 0.8; }
}

.main-menu .item-container:hover {
    cursor: pointer;
}

/* 以下为屏幕适配 */
/** Phone **/
@media only screen and (min-width: 320px) and (max-width: 1024px) {
    .all-container {
        overflow-y: auto;
    }

    .all-container .site-title {
        font-size: 1.5rem;
    }

    .all-container .main-menu {
        width: 95%;
    }

    .all-container .main-container .circle-container {
        display: none;
    }
}
/** Others **/
@media only screen and (max-width: 319px) {
    .all-container {
        overflow-y: auto;
    }

    .all-container .site-title {
        font-size: 1rem;
    }

    .all-container .main-menu {
        width: 95%;
    }

    .all-container .main-container .circle-container {
        display: none;
    }
}
</style>