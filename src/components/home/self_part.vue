<script setup lang="ts">
import { ExtractPropTypes, Ref, ref } from 'vue';

// respond
const reseiver: Readonly<ExtractPropTypes<{anchor: StringConstructor;}>> = defineProps({anchor: String});
console.log(reseiver)

// method
</script>

<template>
    <div class="container">111</div>
</template>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    background-color: blue;
    
}
</style>