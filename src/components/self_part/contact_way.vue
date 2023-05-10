<script setup lang="ts">
import axios from 'axios';
import { Ref, onMounted, ref } from 'vue';

import { JsonRequest } from '../../../cat_define/server_class';
import { returnVoidFunction } from '../../../cat_define/type_define';
import { ServerManager } from '../../../cat_define/server_info';

// static
const jsonRequest: JsonRequest = new JsonRequest('name', 'contact_info');
let Timer: Array<number | undefined >= [];

// respond
const contactList: Ref<Array<{name: string, id: string, content: string}>> = ref([]);
const isActive: Ref<Array<boolean>> = ref([]);

// method
const getContactList: returnVoidFunction = () => {
    axios.get(ServerManager.getTextApi + jsonRequest.parse())
    .then(response => {
        const returnInfo: {message: string, state: number} = JSON.parse(response.headers['x-detail-info']);
        if (returnInfo && !returnInfo.state) {
            contactList.value = response.data;
            for (let i = 0; i < contactList.value.length; i ++) isActive.value[i] = true;
        } else throw Error;
    })
    .catch(() => {
        contactList.value = [{name: 'Error', id: 'error', content: '获取账户列表发生错误'}];
    })
}

const mouseOverBehavior: returnVoidFunction = (index: number) => {
    window.clearTimeout(Timer[index]);
    isActive.value[index] = false;
}

const mouseOutBehavior: returnVoidFunction = (index: number) => {
    Timer[index] = window.setTimeout(() => isActive.value[index] = true, 3000);
}

onMounted(() => {
    getContactList();
})
</script>

<template>
    <div class="contact-container">
        <h1 class="plate-title">我的联系方式</h1>
        <div class="contact-content">
            <div v-for="(contactWay, index) in contactList" :key="contactWay.id" class="contact-box"
            @mouseover="mouseOverBehavior(index)" @mouseleave="mouseOutBehavior(index)">
                <img :src="`src/assets/self_part_imgs/${contactWay.id}.svg`" alt="error" :class="isActive[index]? 'active' : ''">
                <div class="text-content" :class="isActive[index]? 'hide' : ''">
                    <h3 :class="isActive[index]? 'hide' : ''">通过{{contactWay.name}}联系我</h3>
                    <p :class="isActive[index]? 'hide' : ''">{{contactWay.content}}</p>
                </div>
            </div>
        </div>
        <hr>
    </div>
</template>

<style scoped>

.contact-container .plate-title {
    margin: 5px 0;
}

.contact-container .contact-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.contact-container .contact-content .contact-box {
    flex: 0 0 calc((33.33% - 22px));
    margin: 0 5px 5px;
    padding: 5px;
    height: 15vh;
    min-height: 100px;
    position: relative;
    border-top: 3px solid;
    border-bottom: 3px solid;
    border-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(128, 128, 128, 0.9) 50%, rgba(255, 255, 255, 0) 100%) 2 2 2 2;
    overflow-x: hidden;
}

.contact-container .contact-content .contact-box * {
    cursor: default;
    transition: 0.6s ease-in-out;
}

.contact-container .contact-content .contact-box img {
    width: 15%;
    height: auto;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(50%, -50%);
}

.contact-container .contact-content .contact-box img.active{
    width: 25%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.contact-container .contact-content .contact-box .text-content {
    height: 99%;
    border-left: 3px solid rgba(128, 128, 128, 0.7);
    margin-left: 3%;
    width: 64%;
    float: right;
    padding-left: 3%;
    overflow: hidden;
}

.contact-container .contact-content .contact-box .text-content.hide {
    transform: translateX(150%);
}

.contact-container .contact-content .contact-box .text-content h3 {
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.3rem;
}

.contact-container .contact-content .contact-box .text-content p {
    font-size: 1.2rem;
    font-weight: bold;
}

.contact-container .contact-content .contact-box .text-content h3.hide {
    transform: translateX(200%);
}

.contact-container .contact-content .contact-box .text-content p.hide {
    transform: translateX(400%);
}

/* 以下为屏幕适配 */
/** Phone **/
@media only screen and (min-width: 320px) and (max-width: 1024px) {
    .contact-container .contact-content .contact-box img {
        display: none;
    }

    .contact-container .contact-content .contact-box .text-content,
    .contact-container .contact-content .contact-box .text-content.hide {
        border: none;
        width: 100%;
        margin: 0;
        transform: none;
    }

    .contact-container .contact-content .contact-box .text-content h3,
    .contact-container .contact-content .contact-box .text-content h3.hide {
        transform: none;
        font-size: 0.6rem;
    }

    .contact-container .contact-content .contact-box .text-content p,
    .contact-container .contact-content .contact-box .text-content p.hide {
        transform: none;
        font-size: 0.6rem;
    }

}
</style>