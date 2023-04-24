<script setup lang="ts">
import { Ref, ref } from 'vue'
import WellcomePart from '../src/components/home/welcome.vue'
import BreifIntro from '../src/components/home/breif_intro.vue'
import { returnVoidFunction } from '../cat_define/type_define'

const pageNum: Ref<string> = ref('hello'); // 'hello', 'menu', 'play', 'study'

// method:
const changeToPage: returnVoidFunction = (toPage: string) => pageNum.value = toPage
</script>

<template>
        <div class="container">
            <WellcomePart v-if="pageNum === 'hello'" @click="changeToPage('menu')"/>
            <transition>
                <BreifIntro v-if="pageNum === 'menu'"/>
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
</style>