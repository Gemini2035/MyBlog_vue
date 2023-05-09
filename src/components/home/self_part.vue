<script setup lang="ts">
import { ExtractPropTypes, Ref, ref } from 'vue';

import Menu from '../basic_componets/menu.vue';

// respond
const reseiver: Readonly<ExtractPropTypes<{anchor: StringConstructor;}>> = defineProps({anchor: String});

// method
</script>

<template>
    <div class="container">
        <Menu now-position="menu" />
    </div>
</template>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    /* background-color: blue; */
    
}
</style>