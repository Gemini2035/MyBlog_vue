<script setup lang="ts">
import { Raw, inject, markRaw, reactive, Ref, ref, ExtractPropTypes } from 'vue';

import { returnVoidFunction } from '../../../cat_define/type_define';

// static
const partInfo: Raw<Array<{ name: string, id: string, position: {x: string, y: string; }; }>> = markRaw([
    { name: '索引目录', id: 'menu', position: { x: '38%', y: '10%' } },
    { name: '自我介绍', id: 'self', position: { x: '70%', y: '30%' } },
    { name: '站点简介', id: 'site', position: { x: '65%', y: '65%' } },
    { name: '日常生活', id: 'play', position: { x: '10%', y: '65%' } },
    { name: '学习记录', id: 'study', position: { x: '5%', y: '30%' } }
]);

// respond
const parm: Readonly<ExtractPropTypes<{nowPosition: StringConstructor, initX: NumberConstructor, initY: NumberConstructor}>> = defineProps({nowPosition: String, x: Number, y: Number});
const menuPosition: { x: number, y: number} = reactive({ x: parm.initX || 0, y: parm.initY || 0 });
const isActive: Ref<boolean> = ref(false);
const isDragging: Ref<boolean> = ref(false);
const className: Ref<string> = ref('');

// method
const changePage: returnVoidFunction = inject('toPageMethod') || function () { alert('error'); }
const everyPartClick: returnVoidFunction = (target: string) => {
    if (!isActive.value || target === parm.nowPosition) return;
    changePage(target);
}
const clickBehavior: returnVoidFunction = () => {
    isActive.value = !isActive.value;
    let Timer: number = 0;
    if (isActive.value) {
        Timer = window.setTimeout(() => {
            className.value = 'active';
        }, 600)
    } else {
        window.clearTimeout(Timer);
        className.value = '';
    }
}
const mouseDownBehavior: returnVoidFunction = () => {
    isDragging.value = true;
}
const dragBehavior: returnVoidFunction = (event: {clientX: number, clientY: number}) => {
    if (!isDragging.value || isActive.value) return;
    menuPosition.x = event.clientX - 150;
    menuPosition.y = event.clientY - 100;
}

const mouseUpBehavior: returnVoidFunction = () => {
    isDragging.value = false;
}

</script>

<template>
    <div class="menu-container" :class="isActive? 'active' : ''"
    @mousedown="mouseDownBehavior" @mouseup="mouseUpBehavior" @mouseleave="mouseUpBehavior" @mousemove="dragBehavior"
    :style="{left: `${menuPosition.x}px`, top: `${menuPosition.y}px`}">
        <div class="menu-circle" :class="isActive? 'active' : ''" @click="clickBehavior()">
            <span :class="isActive? 'active' : ''">Menu</span>
            <img src="src/assets/menu_imgs/xmark.svg" alt="关闭" :class="isActive? 'active' : ''" draggable="false"> 
        </div>
        <div v-for="(everyPart, index) in partInfo" :key="index" class="menu-content" :class="(everyPart.id === parm.nowPosition)? className : (className + ' hoveriable')"
        :style="{top: everyPart.position.y, left: everyPart.position.x}" 
        @click="everyPartClick(everyPart.id)">
            <span :style="{color: (everyPart.id === parm.nowPosition? 'rgba(128, 128, 128)' : 'inherit')}">{{ everyPart.name }}</span>
        </div>
    </div>
</template>

<style scoped>
* {
    transition: 0.6s ease-in-out;
}

.menu-container {
    width: 300px;
    height: 200px;
    display: flex;
    z-index: 0;
    position: relative;
    transition: none;
    opacity: 0.5;
}

.menu-container:hover {
    opacity: 0.9;
}

.menu-container.active {
    opacity: 0.9;
}

.menu-container .menu-circle {
    background-image: url('src/assets/menu_imgs/circle.svg');
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
}

.menu-container .menu-circle.active {
    width: 100px;
    height: 100px;
}

.menu-container .menu-circle *:hover {
    cursor: pointer;
}

.menu-container .menu-circle span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    font-weight: bold;
    opacity: 1;
}

.menu-container .menu-circle span.active {
    opacity: 0;
}

.menu-container .menu-circle img {
    width: 50px;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotateZ(45deg);
    opacity: 0;
}

.menu-container .menu-circle img.active {
    opacity: 1;
    transform: translate(-50%, -50%);
}

.menu-container .menu-content {
    cursor: default;
    position: absolute;
    opacity: 0;
    transform: rotateZ(15deg) translateX(-15px);
}

.menu-container .menu-content.active {
    opacity: 1;
    font-weight: bolder;
    transform: none;
}

.menu-container .menu-content.active.hoveriable:hover {
    opacity: 0.9;
    cursor: pointer;
    text-decoration: underline;
    transform: rotateZ(-10deg);
}

.menu-container .menu-content span {
    font-size: 1.2rem;
    font-weight: bold;
}

/* 固定尺寸，不作适配haha */
</style>