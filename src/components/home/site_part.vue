<script setup lang="ts">
import { ExtractPropTypes, Raw, Ref, markRaw, onMounted, ref } from 'vue';
import axios from 'axios';

import { returnVoidFunction } from '../../../cat_define/type_define';
import Contributor from '../site_part/contributor.vue';
import Language from '../site_part/language.vue';
import Others from '../site_part/others.vue';
import Tool from '../site_part/tool.vue';
import { JsonRequest } from '../../../cat_define/server_class';
import { ServerManager } from '../../../cat_define/server_info';

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
const jsonRequest: JsonRequest = new JsonRequest('name', 'basic_info');
let Timer: number | undefined;

// respond
const componentContainerHeight: Ref<number> = ref(0);
const timeOfSite: Ref<string> = ref('');

// method
const getHeight: returnVoidFunction = () => {
    componentContainerHeight.value = document.querySelector('#site-title')!.clientHeight + 6;
}

const initFunc: returnVoidFunction = () => {
    getHeight();
    axios.get(ServerManager.getTextApi + jsonRequest.parse())
    .then(response => {
        const startDay: Date = new Date(response.data.timeOfSite);
        let diff: number = new Date().getTime() - startDay.getTime();
        Timer = window.setInterval(() => {
            let second: number = Math.floor(diff / 1000);
            let day: number = Math.floor(second / 86400);
            second -= day * 86400;
            let hour: number = Math.floor(second / 3600);
            second -= hour * 3600;
            let minute = Math.floor(second / 60);
            second -= minute * 60;
            timeOfSite.value = `${day}天 ${hour < 10? '0' + hour : hour}时 ${minute < 10? '0' + minute : minute}分 ${second < 10? '0' + second : second}秒`;
            diff += 1000;
        }, 1000)
    })
    .catch(() => {
        timeOfSite.value = '???天???分???秒';
    })
}

onMounted(() => {
    initFunc();
})

</script>

<template>
    <div class="site-container">
        <div class="title" id="site-title">
            <h1>关于本站点</h1>
            <p>{{timeOfSite}}</p>
            <hr>
        </div>
        <div class="component-container" :style="{height: `calc(100vh - ${componentContainerHeight}px)`}">
            <component v-for="(component, index) in componentsList" :key="index" :is="component.component" 
            :init-active="component.id === reseiver.anchor? true : false"/>
        </div>
    </div>
</template>

<style scoped>
.site-container {
    width: 100vw;
    height: 100vh;
}

.site-container .title {
    position: relative;
}

.site-container .title h1 {
    font-size: 3rem;
    margin-top: 0;
    margin-bottom: 0;
}

.site-container .title hr {
    margin-bottom: 0;
}

.site-container .title p {
    position: absolute;
    top: -50%;
    transform: translateY(50%);
    right: 1%;
    font-size: 2rem;
}

.site-container .component-container {
    margin-top: 5px;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none;
}

.site-container .component-container::-webkit-scrollbar {
    display: none;
}

/* 以下为设备适配 */
/** Phone **/
@media only screen and (min-width: 320px) and (max-width: 1024px) {

    .site-container .title * {
        margin: 0;
    }

    .site-container .title h1 {
        position: relative;
    }

    .site-container .title p {
        position: inherit;
        margin: -3% 0 5% 1%;
    }
}
</style>