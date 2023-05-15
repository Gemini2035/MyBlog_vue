<script setup lang="ts">
import { ExtractPropTypes, onUpdated, reactive } from 'vue';
import axios from 'axios';
import MarkdownIt from 'markdown-it';

import { JsonRequest } from '../../../cat_define/server_class';
import { returnVoidFunction } from '../../../cat_define/type_define';
import { ServerManager } from '../../../cat_define/server_info';

// static
const parm: Readonly<ExtractPropTypes<{changeState: FunctionConstructor, essayId: NumberConstructor;}>> = defineProps({essayId: Number, changeState: Function});

// respond:
const essayInfo: {title: string, pubdate: string, classify: string, content: string} = reactive({title: '', pubdate: '', classify: '', content: ''});

// method:
const getEssayInfo: returnVoidFunction = (id: number) => {
    const jsonRequest: JsonRequest = new JsonRequest('essayId', id);
    axios.get(ServerManager.getEssayDetail + jsonRequest.parse())
    .then(response => {
        if (response.headers['x-detail-info']) {
            const { state }: { state: number} = JSON.parse(response.headers['x-detail-info']).state;
            if (!state) {
                const { title, pubdate, classify}: { title: string, pubdate: string, classify: string} = JSON.parse(response.headers['x-detail-info']).data;
                essayInfo.title = title;
                essayInfo.pubdate = pubdate.split('T')[0];
                essayInfo.classify = classify;
                essayInfo.content = new MarkdownIt().render(response.data);
            }
        } else throw Error();
    })
    .catch(e => {
        essayInfo.title = '???';
        essayInfo.pubdate = '????.??.??';
        essayInfo.classify = '?';
        essayInfo.content = '获取文章信息失败';
    })
}

onUpdated(() => {
    getEssayInfo(parm.essayId);
})
</script>

<template>
    <div class="detail-container">
        <img src="src/assets/study_part_img/xmark.circle.svg" alt="关闭" class="close" @click="parm.changeState!()">
        <div class="detail-title">
            <h1>文章标题: {{essayInfo.title}}</h1>
            <p>发布时间: {{essayInfo.pubdate}}</p>
            <p>文章分类: {{essayInfo.classify}}</p>
        </div>
        <div class="detail-content" v-html="essayInfo.content">
        </div>
        <div class="detail-comments">
            <h1 class="header">评论</h1>
            <hr>
            <div class="comments-container"></div>
        </div>
    </div>
</template>

<style scoped>
.detail-container {
    height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: 5;
    background-color: rgba(255, 255, 255, 0.9);
    top: 0;
    left: 0;
    display: flex;
}

.detail-container .close {
    width: 50px;
    height: auto;
    top: 1%;
    left: calc(25% - 75px);
    position: fixed;
    z-index: 5;
}

.detail-container .close:hover {
    cursor: pointer;
}

.detail-title {
    width: calc(25% - 13px);
    height: 40%;
    margin: auto;
    text-align: right;
    padding-right: 10px;
}

.detail-title p {
    font-size: 1.2rem;
}

.detail-content {
    width: 50%;
    height: 99%;
    margin: auto;
    overflow-x: hidden;
    overflow-y: auto;
    border-left: 3px solid;
    border-right: 3px solid;
    padding: 10px;
}

.detail-comments {
    width: calc(25% - 10px);
    padding: 5px;
    background-color: yellow;
}

.comments-container {
    overflow-x: hidden;
    overflow-y: auto;
    height: 87%;
    background-color: red;
}

/* 以下为屏幕适配 */
@media only screen and (min-width: 320px) and (max-width: 649px) {
    .detail-container {
        display: block;
        height: 100vh;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .detail-container .close {
        top: 10%;
    }

    .detail-title {
        width: 100%;
        text-align: center;
        height: auto;
    }

    .detail-content {
        width: 100%;
        border: none;
        height: auto;
        overflow: hidden;
    }

    .detail-comments {
        width: 100%;
    }
}
</style>