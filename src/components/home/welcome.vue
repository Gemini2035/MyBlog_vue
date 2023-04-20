<script setup lang="ts">
import { ref } from 'vue';

const classType = defineProps({
    state: String
})

const className = ref(classType.state)

const clickBehavior = () => {
    className.value = ''
}
</script>
<template>
    <div :class="className" @click="clickBehavior">
        <h1>Welcome!</h1>
        <img src="../../assets/arrow.right.svg" alt="" v-if="className === 'active'">
    </div>
</template>

<style scoped>
div {
    font-size: 50px;
    width: 100vw;
    position: relative;
    padding-left: 10px;
    
}

div :hover{
    cursor: pointer;
}

div h1{
    margin: 0;
    transition: 0.6s ease-in-out;
}

div.active{
        margin-top: 15%;
        margin-bottom: 100vh;
    }
div.active h1 {
    font-size: 15rem;
}

@media (max-width: 1249px) {
    div.active h1{
        text-align: center;
    }

    div img {
        display: none;
    }
}

@media (min-width: 1250px) {
    div.active img {
        height: 75px;
        width: auto;
        position: absolute;
        right: 3vw;
        top: 45%;
        /* transform: translateY(-30%); */
    }

    div img {
        animation: animate 3s infinite;
    }

    div img:hover {
        animation: animate 1s infinite;
    }

    @keyframes animate {
        50% { opacity: 0.3; }
    }
}


</style>