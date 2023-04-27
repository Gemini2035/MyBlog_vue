<script setup lang="ts">
import { onMounted } from 'vue';

import { returnStringFunction } from '../../../cat_define/type_define';
import SiteCircle from '../self_and_site/site_circle.vue';
import Background from '../basic_componets/background.vue';
import SelfBreif from '../self_and_site/self_breif.vue';
import SiteBreif from '../self_and_site/site_breif.vue';
import PlayBreif from '../self_and_site/play_breif.vue';
import StudyBreif from '../self_and_site/study_breif.vue';

const componentsList: Array<object> = [SelfBreif, SiteBreif, PlayBreif, StudyBreif];

// methods:

onMounted(() => {
    
})
</script>

<template>
    <div class="all-container">
        <h1 class="site-title">这里是Carloss2035的个人博客 \\\ ///</h1>
        <div class="main-container">
            <div class="circle-container">
                <SiteCircle />
            </div>
            <div class="background-container">
                <Background />
            </div>
            <div class="main-menu"> 
                <div v-for="(component, index) in componentsList" :key="index" class="item-container">
                    <component :is="component" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.all-container {
    width: 100vw;
    height: 100vh;
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
    /* transform: translateY(-10%); */
}

.all-container .main-menu {
    width: 60vw;
    height: 87vh;
    margin: 0 5px;
    display: flex;
    flex-direction: column;
    /* background-color: red; */
}

.main-menu .item-container {
    border-bottom: 1px solid;
    /* border-top: 1px solid; */
    height: calc(25% - 2px);
    /* border-radius: 15px; */
    padding: 5px;
    transition: 0.6s ease-in-out;
}

.main-menu .item-container:hover {
    box-shadow: -5px -5px rgba(128, 128, 128, 0.6);
    animation: opacityAnimate 2s infinite;
    transform: translate(5px, 5px);
}
@keyframes opacityAnimate {
    50% { opacity: 0.5; }
}

.main-menu .item-container:hover {
    cursor: pointer;
}


.background-container {
    position: fixed;
    z-index: -1;
}

</style>