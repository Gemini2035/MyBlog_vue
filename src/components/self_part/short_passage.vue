<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import axios from 'axios';

import { returnVoidFunction } from '../../../cat_define/type_define';
import { SERVERURL } from '../../../cat_define/server_info'

// respond
const selfIntro: Ref<string> = ref('正在加载...');

// method
const getSelfIntro: returnVoidFunction = () => {
    axios.get(SERVERURL + '/api/text/get')
    .then(res => {
        const returnInfo: {message: string, state: number} = JSON.parse(res.headers['x-detail-info']);
        selfIntro.value = res.data[0].content;
        console.log(returnInfo);
    })
}

onMounted(() => {
    getSelfIntro()
})
</script>

<template>
    <div class="passage-container">
        <h1>努力精简的自我介绍</h1>
        <p>{{selfIntro}}</p>
    </div>
</template>

<style scoped>
.passage-container {
    height: 100vh;
}

.passage-container p {
    /* background-color: red; */
}
</style>