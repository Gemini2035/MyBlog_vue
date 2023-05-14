<script setup lang="ts">
import { ExtractPropTypes } from 'vue';

import EssayList from '../study_part/essay_list.vue';

const reseiver: Readonly<ExtractPropTypes<{anchor: StringConstructor;}>> = defineProps({anchor: String});
</script>

<template>
    <div class="study-container">
        <div class="study-title">
            <img src="src/assets/breif_part_imgs/book.svg" alt="">
            <h1>学习记录 Study Log</h1>
        </div>
        <hr>
        <EssayList :anchor="reseiver.anchor" class="study-content" />
    </div>
</template>

<style scoped>
.study-container {
    width: 100vw;
    height: 100vh;
}

.study-content {
    width: 98%;
}

.study-container hr {
    margin: 0;
}

.study-title {
    padding-top: 1%;
    padding-left: 1%;
    /* display: flex; */
}


.study-title img {
    width: 5%;
    height: auto;
}

.study-title h1 {
    margin-left: 1%;
    display: inline-block;
}

.study-content {
    width: 90%;
    margin: 3% auto;
}
</style>