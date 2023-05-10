<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import axios from 'axios';

import { returnVoidFunction } from '../../../cat_define/type_define';
import SelfTagGroup from './self_tag_group.vue';
import { ServerManager } from '../../../cat_define/server_info';
import { JsonRequest } from '../../../cat_define/server_class';

// static
const jsonRequest: JsonRequest = new JsonRequest('name', 'self_intro');

// respond
const selfIntro: Ref<string> = ref('正在加载...');

// method
const getSelfIntro: returnVoidFunction = () => {
    axios.get(ServerManager.getTextApi + jsonRequest.parse())
    .then(res => {
        const returnInfo: {message: string, state: number} = JSON.parse(res.headers['x-detail-info']);
        if (returnInfo && !returnInfo.state) {
            selfIntro.value = res.data;
        } else throw Error;
    })
    .catch(() => {
        selfIntro.value = '加载失败T.T';
    })
}

onMounted(() => {
    getSelfIntro()
})
</script>

<template>
    <div class="passage-container">
        <h1 class="plate-title">努力精简的自我介绍</h1>
        <SelfTagGroup />
        <p class="passage-content">{{selfIntro}}</p>
        <hr>
    </div>
</template>

<style scoped>
.passage-container .plate-title {
    margin: 5px 0;
}

.passage-container .passage-content {
    text-indent: 2em;
    font-size: 1.5rem;
    line-height: 2rem;
    margin-top: 1%;
}

/* 以下为设备适配 */
/** Phone **/
@media only screen and (min-width: 320px) and (max-width: 1024px) {
    .passage-container .plate-title {
        font-size: 1.5rem;
    }

    .passage-container .passage-content {
        font-size: 1rem;
        line-height: 1.5rem;
    }
}

</style>