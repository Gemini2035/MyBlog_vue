<script setup lang="ts"></script>

<template>
    <div class="self-container">
        <div class="title">
            <h1 class="title-text">个人简介</h1>
            <img src="../../assets/self_intro_imgs/person.svg" alt="图片" class="title-img">
        </div>
        <div class="self-content">
            1
        </div>
    </div>
</template>

<style scoped>
.self-container {
    width: 100%;
    height: 100%;
}

.self-container .title {
    /* background-color: red; */
    display: flex;
}

.self-container .title .title-text {
    margin: 0 1%;
    /* color: rgba(128, 128, 128, 1); */
}

.self-container .title .title-img {
    height: 2rem;
    width: auto;
    margin: auto 0 auto 1%;
}

.self-container .self-content {
    display: flex;

    background-color: red;
}
</style>