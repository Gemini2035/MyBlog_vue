<script setup lang="ts">
import { StyleValue, reactive } from 'vue';
import { returnVoidFunction } from  '../../../cat_define/type_define'

// 由于setInterval函数有两个重载，一个是NodeJS.Timer返回类型, 一个是number返回类型。注意区别
let timer: number | null = null;
const containerColor: StyleValue = reactive({
    backgroundColor: 'rgba(254, 100, 100, 0.1)'
});
const headerColor: StyleValue = reactive({
    
});

// methods:
const randomColor: returnVoidFunction = () => {

}
</script>
<template>
    <div :style="containerColor">
        <h1 :style="headerColor">Welcome!</h1>
    </div>
</template>

<style scoped>
div {
    position: relative;
    width: 100vw;
    height: 100vh;
    transition: 0.6s ease-in-out;
}

div h1 {
    position: absolute;
    margin: 0;
    font-size: 18rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

div h1:hover {
    cursor: pointer;
}
</style>