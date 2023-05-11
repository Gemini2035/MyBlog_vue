<script setup lang="ts">
import { ExtractPropTypes, markRaw, Raw, onMounted } from 'vue';

import PartMenu from '../basic_componets/part_menu.vue';
import SelfMenu from '../self_part/site_menu.vue';
import ShortPassage from '../self_part/short_passage.vue';
import ContactWay from '../self_part/contact_way.vue';
import SiteIntro from '../self_part/site_intro.vue';
import Others from '../self_part/others.vue';
import { returnVoidFunction } from '../../../cat_define/type_define';

// static
const reseiver: Readonly<ExtractPropTypes<{anchor: StringConstructor;}>> = defineProps({anchor: String});
const componentsList: Raw<Array<{id: string, component: object}>> = markRaw([
    {
        id: '小短文',
        component: ShortPassage
    }, 
    {
        id: '联系方式',
        component: ContactWay
    }, 
    {
        id: '秘密基地',
        component: SiteIntro
    }, 
    {
        id: '其他',
        component: Others
    }
]);
// respond
// method
const toAnchor: returnVoidFunction = (anchor: string) => {
    if (!anchor) return;
    document.querySelector(`#${anchor}`)?.scrollIntoView({ behavior: 'smooth' });
}

onMounted(() => {
    toAnchor(reseiver.anchor);
})
</script>

<template>
    <div class="self-container">
        <PartMenu now-position="self" />
        <div class="breif-container">
            <SelfMenu :content="componentsList.map(item => { return item.id })" :to-anchor="toAnchor"/>
        </div>
        <div class="main-content">
            <h1 class="title">我是谁</h1>
            <hr>
            <component v-for="(component, index) in componentsList" :key="index" :id="component.id" :is="component.component" />
        </div>
    </div>
</template>

<style scoped>
* {
    transition: 0.6s ease-in-out;
}

.self-container {
    width: 100vw;
    height: 100vh;
    display: flex;
}

.self-container .breif-container {
    width: calc(25% - 5px);
    height: 99%;
    margin: auto;
    border-right: 5px solid rgba(128, 128, 128, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.self-container .main-content {
    width: 75%;
    height: 98%;
    overflow-y: auto;
    padding: 1%;
}

.self-container .title {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 3rem;
}

/* 以下为设备适配 */
/** Phone **/
@media only screen and (min-width: 320px) and (max-width: 1024px) {
    .self-container {
        flex-direction: column;
    }

    .self-container .breif-container {
        width: 100%;
        height: auto;
        border-bottom: 1px solid rgba(128, 128, 128, 0.7);
    }

    .self-container .main-content {
        width: 100%;
    }

    .self-container .main-content .title {
        font-size: 2.5rem;
    }
}
</style>