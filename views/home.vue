<script setup lang="ts">
import { Ref, ref } from 'vue'
import WellcomePart from '../src/components/home/welcome.vue'
import BreifIntro from '../src/components/home/breif_intro.vue'
import PlayPart from '../src/components/home/play_part.vue'
import StudyPart from '../src/components/home/study_part.vue'
import ErrorPart from '../src/components/home/home_error.vue'
import { returnVoidFunction } from '../cat_define/type_define'

const pageNum: Ref<string> = ref('menu'); // 'hello', 'menu', 'play', 'study'

// method:
const changeToPage: returnVoidFunction = (toPage: string) => pageNum.value = toPage
</script>

<template>
        <div class="container">
            <transition name="transition" mode="in-out">
                <WellcomePart v-if="pageNum === 'hello'" @click="changeToPage('menu')"/>
                <BreifIntro v-else-if="pageNum === 'menu'" @click="changeToPage('play')"/>
                <PlayPart v-else-if="pageNum === 'play'" @click="changeToPage('study')"/>
                <StudyPart v-else-if="pageNum === 'study'" @click="changeToPage('menu')"/>
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
    /* background-color: gray; */
}

.transition-leave-to {
    opacity: 0.2;
}

.transition-leave-active {
    transition: 0.6s ease-in-out;
}
</style>