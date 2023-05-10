<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import axios from 'axios';


import { JsonRequest } from '../../../cat_define/server_class';
import { returnVoidFunction } from '../../../cat_define/type_define';
import { ServerManager } from '../../../cat_define/server_info';

// static
const jsonRequest: JsonRequest = new JsonRequest('name', 'sites_intro');
const HoverTimer: Array<number | undefined >= [];
const ScrollTimer: Array<number | undefined >= [];
const scrollFlag: Array<boolean> = [];
const isDown: Array<boolean> = [];


// respond
const sitesList: Ref<Array<{siteName: string, id: string, src: string, description: string}>> = ref([]);
const isActive: Ref<Array<boolean>> = ref([]);

// method:
const getSitesList: returnVoidFunction = () => {
    axios.get(ServerManager.getTextApi + jsonRequest.parse())
    .then(response => {
        const returnInfo: {message: string, state: number} = JSON.parse(response.headers['x-detail-info']);
        if (returnInfo && !returnInfo.state) {
            sitesList.value = response.data;
            for (let i = 0; i < sitesList.value.length; i ++) {
                isActive.value[i] = true;
                scrollFlag[i] = true;
                isDown[i] = true;
            }
        } else throw Error;
    })
    .catch(() => {
        sitesList.value = [{siteName: 'Error', id: 'error', src: '', description: '获取账户列表发生错误'}];
    })
}

const mouseOverBehavior: returnVoidFunction = (index: number) => {
    window.clearTimeout(HoverTimer[index]);
    isActive.value[index] = false;

    if (scrollFlag[index]) {
        ScrollTimer[index] = window.setInterval(() => {
            let container: Element = document.querySelectorAll('.sites-container .site-content .site-box .intro-content p')[index];
            let distance: number = container.scrollHeight - container.clientHeight;
            if(container && scrollFlag[index]){
                if(isDown[index]){
                    container.scrollTop += 1;
                    if (container.scrollTop == distance - 1) {
                        scrollFlag[index] = false;
                        isDown[index] = !isDown[index];
                        setTimeout(() => scrollFlag[index] = true, 2000);
                    }
                } else {
                    container.scrollTop -= 1;
                    if (container.scrollTop == 0) {
                        scrollFlag[index] = false;
                        isDown[index] = !isDown[index];
                        setTimeout(() => scrollFlag[index] = true, 2000);
                    }
            }
        }
        }, 25);
    }
}

const mouseOutBehavior: returnVoidFunction = (index: number) => {
    HoverTimer[index] = window.setTimeout(() => isActive.value[index] = true, 3000);
    window.clearTimeout(ScrollTimer[index])
}

const clickBehavior: returnVoidFunction = (targetUrl: string) => {
    window.open(targetUrl, '_blank');
}

onMounted(() => {
    getSitesList();
})
</script>

<template>
    <div class="sites-container">
        <h1 class="plate-title">宝藏网站</h1>
        <div class="site-content">
            <div class="site-box" v-for="(siteInfo, index) in sitesList"
            @mouseover="mouseOverBehavior(index)" @mouseout="mouseOutBehavior(index)">
                <img :src="`src/assets/self_part_imgs/${siteInfo.id}.svg`" alt="error" :class="isActive[index]? 'active' : ''">
                <div class="intro-content" :class="isActive[index]? 'hide' : ''" @click="clickBehavior(siteInfo.src)">
                    <h4>{{siteInfo.siteName}}</h4>
                    <h5>{{siteInfo.src}}</h5>
                    <hr>
                    <p>{{siteInfo.description}}</p>
                </div>
            </div>
        </div>
        <p class="tips">注: 带*号的可能需要魔法，懂得都懂</p>
        <hr>
    </div>
</template>

<style scoped>
.sites-container .plate-title {
    margin: 5px 0;
}

.sites-container .site-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.sites-container .site-content .site-box {
    flex: 0 0 calc(50% - 26px);
    margin: 5px;
    padding: 5px;
    border-left: 3px solid;
    border-right: 3px solid;
    border-image: linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(128, 128, 128, 0.9) 50%, rgba(255, 255, 255, 0) 100%) 2 2 2 2;
    height: 15vh;
    min-height: 100px;
    max-height:200px;
    min-width: 100px;
    overflow: hidden;
    position: relative;
    text-align: center;
}

.sites-container .site-content .site-box * {
    transition: 0.6s ease-in-out;
}

.sites-container .site-content .site-box:hover {
    cursor: pointer;
}

.sites-container .site-content .site-box img.active {
    opacity: 1;
}

.sites-container .site-content .site-box img {
    width: 20%;
    height: auto;
    opacity: 0.2;
}

.sites-container .site-content .site-box .intro-content {
    width: 99%;
    height: 95%;
    position: absolute;
    padding: 3px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(128, 128, 128, 0.2);
    border-radius: 5px;
    opacity: 1;
}

.sites-container .site-content .site-box .intro-content.hide {
    opacity: 0;
}

.sites-container .site-content .site-box .intro-content h4 {
    margin: 0;
}

.sites-container .site-content .site-box .intro-content h5 {
    width: 100%;
    margin: 0;
    white-space: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
}

.sites-container .site-content .site-box .intro-content h5::-webkit-scrollbar {
    display: none;
}

.sites-container .site-content .site-box .intro-content hr {
    width: 95%;
    margin: 1px auto;
}

.sites-container .site-content .site-box .intro-content p {
    text-align: left;
    width: 99%;
    text-indent: 2em;
    font-size: 1.2rem;
    line-height: 1.2rem;
    overflow-y: auto;
    overflow-x: hidden;
    height: 60%;
    margin: auto;
    scrollbar-width: none;
}

.sites-container .site-content .site-box .intro-content p::-webkit-scrollbar {
    display: none;
}

.sites-container .tips {
    text-decoration: underline;
    text-align: right;
    padding-right: 1%;
}

.sites-container .tips:hover {
    cursor: pointer;
}

/* 以下为设备适配 */
/** Phone **/
@media only screen and (min-width: 320px) and (max-width: 1024px) {
    .sites-container .site-content .site-box .intro-content p {
        font-size: 1rem;
    }

}
</style>