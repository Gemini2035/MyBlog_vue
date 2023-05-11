<script setup lang="ts">
import { ExtractPropTypes, Raw, markRaw, onMounted } from 'vue';

import { returnVoidFunction } from '../../../cat_define/type_define';
import Contributor from '../site_part/contributor.vue';
import Language from '../site_part/language.vue';
import Others from '../site_part/others.vue';
import Tool from '../site_part/tool.vue';

// static
const reseiver: Readonly<ExtractPropTypes<{anchor: StringConstructor;}>> = defineProps({anchor: String});
const componentsList: Raw<Array<{id: string, component: object}>> = markRaw([
    {
        id: '工具列表',
        component: Tool
    }, 
    {
        id: '语言统计',
        component: Language
    }, 
    {
        id: '贡献者',
        component: Contributor
    }, 
    {
        id: '其他',
        component: Others
    }
]);


// method

onMounted(() => {
    // toAnchor(reseiver.anchor);
})
</script>

<template>
    <div class="site-container">
        <div class="title">
            <h1>关于本站点</h1>
            <p>200天20小时12秒</p>
        </div>
        <hr>
        <component v-for="(component, index) in componentsList" :key="index" :is="component.component" 
        :init-active="component.id === reseiver.anchor? true : false"/>
    </div>
</template>

<style scoped>
.site-container {
    width: 100vw;
    height: 100vh;
    /* background-color: blue; */
}
.site-container .title {
    position: relative;
}

.site-container .title h1 {
    font-size: 3rem;
    margin-top: 0;
    margin-bottom: 0;
}

.site-container .title p {
    position: absolute;
    top: -50%;
    transform: translateY(50%);
    right: 1%;
    font-size: 2rem;
}
</style>