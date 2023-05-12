<script setup lang="ts">
import { Ref, provide, ref } from 'vue';

import WellcomePart from '../src/components/home/welcome.vue';
import BreifIntro from '../src/components/home/breif_part.vue';
import SelfPart from '../src/components/home/self_part.vue';
import SitePart from '../src/components/home/site_part.vue';
import PlayPart from '../src/components/home/play_part.vue';
import StudyPart from '../src/components/home/study_part.vue';
import ErrorPart from '../src/components/home/home_error.vue';
import Background from '../src/components/basic_componets/background.vue';
import { returnVoidFunction } from '../cat_define/type_define';

// respond:
const pageNum: Ref<string> = ref('menu'); // 'hello', 'menu', 'self', 'site', 'play', 'study'
const anchor: Ref<string> = ref('');

// method:
const changeToPage: returnVoidFunction = (toPage: string, anchorPoint: string = '') => {
    pageNum.value = toPage;
    anchor.value = anchorPoint;
}

provide('toPageMethod', changeToPage);

</script>

<template>
        <div class="container">
            <Background />
            <transition name="transition" mode="in-out">
                <WellcomePart v-if="pageNum === 'hello'" @click="changeToPage('menu')" />
                <BreifIntro v-else-if="pageNum === 'menu'"/>
                <SelfPart v-else-if="pageNum === 'self'" :anchor="anchor"/>
                <SitePart v-else-if="pageNum === 'site'" :anchor="anchor"/>
                <PlayPart v-else-if="pageNum === 'play'" :anchor="anchor"/>
                <StudyPart v-else-if="pageNum === 'study'" :anchor="anchor"/>
                <ErrorPart v-else/>
            </transition>
        </div>
    
</template>

<style scoped>
.container{
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.transition-leave-to {
    opacity: 0.2;
}

.transition-leave-active {
    transition: 0.6s ease-in-out;
}
</style>