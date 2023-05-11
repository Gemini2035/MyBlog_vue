<script setup lang="ts">
import { ExtractPropTypes } from 'vue';

// static
const parm: Readonly<ExtractPropTypes<{ content: ArrayConstructor, toAnchor: FunctionConstructor }>> = defineProps({content: Array<String>, toAnchor: Function});

// respond

// method
</script>

<template>
    <div class="self-menu">
        <h1 class="menu-title">目录</h1>
        <hr />
        <div class="menu-content">
            <h2 v-for="(message, index) in parm.content" :key="index" @click="parm.toAnchor!(message)">{{ message }}</h2>
        </div>
    </div>
</template>

<style scoped>
* {
    transition: 0.6s ease-in-out;
}

.self-menu {
    height: 50%;
    width: 100%;
    border-top: 3px solid rgba(128, 128, 128, 0.7);
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    border-bottom: 3px solid rgba(128, 128, 128, 0.7);
}

.self-menu * {
    text-align: right;
    margin-right: 3%;
    cursor: default;
}

.self-menu hr {
    width: 80%;
    margin-right: 0;
}

.self-menu .menu-content {
    height: 70%;
    display: flex;
    flex-direction: column;
}

.self-menu .menu-content h2:hover {
    cursor: pointer;
    transition: 0.6s ease-in-out;
    animation: hoverAnimate 2s infinite;
    border-top: 1px solid rgba(128, 128, 128, 0.7);
    border-top-right-radius: 5px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.7);
    border-bottom-right-radius: 5px;
}
@keyframes hoverAnimate {
    0% { transform: translateX(-3px); }
    50% { transform: translateX(-10px); }
    100% { transform: translateX(-3px); }
}

/* 以下为设备适配 */
@media only screen and (min-width: 320px) and (max-width: 719px) {
    .self-menu {
        display: flex;
        border: none;
        width: 100%;
        height: 100%;
    }
    
    .self-menu hr {
        display: none;
    }

    .self-menu .menu-title {
        margin: 0;
        margin-left: 3%;
        margin-top: 1%;
        font-size: 15px;
    }

    .self-menu .menu-content {
        width: 85%;
        flex-direction: row;
        font-size: 10px;
    }
    
    .self-menu .menu-content h2 {
        margin: 0;
        width: 100px;
        flex: 1;
        padding-right: 5px;
        margin-top: 1%;
        border-right: 3px solid rgb(128, 128, 128);
    }

    .self-menu .menu-content h2:hover {
        border: none;
        transform: translateX(3px);
    }
}
@media only screen and (min-width: 720px) and (max-width: 1024px) {
    .self-menu {
        display: flex;
        border: none;
        width: 100%;
        height: 100%;
    }
    
    .self-menu hr {
        display: none;
    }

    .self-menu .menu-title {
        margin: 0;
        margin-left: 3%;
    }

    .self-menu .menu-content {
        width: 85%;
        flex-direction: row;
    }
    
    .self-menu .menu-content h2 {
        margin: 0;
        width: 100px;
        flex: 1;
        padding-right: 5px;
        margin-top: 1%;
        border-right: 3px solid rgb(128, 128, 128);
    }

    .self-menu .menu-content h2:hover {
        border: none;
        transform: translateX(3px);
    }
}
</style>