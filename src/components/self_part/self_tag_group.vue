<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import axios from 'axios';

import { JsonRequest } from '../../../cat_define/server_class';
import { returnVoidFunction } from '../../../cat_define/type_define';
import { ServerManager } from '../../../cat_define/server_info';

// static
const jsonRequest = new JsonRequest('name', 'tag_info');

// respond
const tagsList: Ref<Array<{name: string, id: number}>> = ref([]);
// method
const getTags: returnVoidFunction = () =>  {
    axios.get(ServerManager.getTextApi + jsonRequest.parse())
    .then(res => {
        const returnInfo: {message: string, state: number} = JSON.parse(res.headers['x-detail-info']);
        if (returnInfo && !returnInfo.state) {
            tagsList.value = res.data;
        } else throw Error;
    })
    .catch(() => {
        tagsList.value = [{name: 'error', id: -1 }];
    })
}

const toTargetUrl: returnVoidFunction = (target: string) => {
    const targetSite: string =`https://baike.baidu.com/item/${target}?fromModule=lemma_search-box`;
    window.open(targetSite, '_blank');
}

onMounted(() => {
    getTags()
})
</script>

<template>
    <div class="tags-container">
        <div class="tag-content" v-for="tag in tagsList" :key="tag.id">
            <span @click="toTargetUrl(tag.name)">{{tag.name}}</span>
            <img src="src/assets/self_part_imgs/line.svg" alt="">
        </div>
    </div>
</template>

<style scoped>
.tags-container {
    display: flex;
    width: 74vw;
    overflow-x: auto;
    scrollbar-width: none;
}

.tags-container::-webkit-scrollbar {
    display: none;
}

.tags-container .tag-content {
    margin-right: 1%;
}

.tags-container .tag-content span {
    font-weight: bold;
    margin-right: 6px;
    text-align: center;
    vertical-align: top;
    transition: 0.6s ease-in-out;
    font-size: 1.2rem;
}

.tags-container .tag-content:hover span{
    cursor: pointer;
    color: rgba(128, 128, 128);
}

.tags-container .tag-content img {
    height: 1.7rem;
    width: auto;
    transform: rotateZ(15deg);
}

/* 以下为设备适配 */
/** Phone **/
@media only screen and (min-width: 320px) and (max-width: 1024px) {
    .tags-container .tag-content span {
        font-size: 1rem;
    }
}
</style>