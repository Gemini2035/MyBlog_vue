<script setup lang="ts">
import { ExtractPropTypes } from 'vue';
import { returnVoidFunction } from '../../../cat_define/type_define';

// static
const parm: Readonly<ExtractPropTypes<{toTopFunction: FunctionConstructor;}>> = defineProps({toTopFunction: Function});

// respond


// method
const clickBehavior: returnVoidFunction = () => {
    parm.toTopFunction!();
}

</script>

<template>
    <div class="top-container" >
        <img src="src/assets/basic_imgs/arrow.up.to.line.svg" alt="" @click="clickBehavior()">
    </div>
</template>

<style scoped>
.top-container {
    width: 50px;
    height: 50px;
    position: fixed;
    z-index: 4;
    top: 70%;
    right: 0;
}

.top-container img {
    height: 80%;
    width: auto;
    opacity: 0.5;
}

.top-container img:hover {
    opacity: 1;
    cursor: pointer;
    animation: upHoverAnimate 1.5s ease-in-out;
}
@keyframes upHoverAnimate {
    50% { transform: translateY(-10px); }
}

</style>