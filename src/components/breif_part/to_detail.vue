<script setup lang="ts">
import { ExtractPropTypes, Ref, inject, ref } from 'vue';
import { returnVoidFunction } from '../../../cat_define/type_define';

// static:
const props: Readonly<ExtractPropTypes<{
    message: StringConstructor,
    id: StringConstructor;}>> = defineProps({ message: String, id: String });

// respond
const showDetail: Ref<Boolean> = ref(true);
const changePage: returnVoidFunction = inject('toPageMethod') || function () { alert('error'); };

// method:
</script>

<template>
    <div class="detail" @mouseover="showDetail = false" @mouseout="showDetail = true"
    @click="changePage(props.id)">
        <p>{{ showDetail? '详 情 Detail' : `点击前往${props.message || ''}详情页面` }}</p>
        <img src="../../assets/breif_part_imgs/arrow.right.svg" alt="前往">
    </div>
</template>

<style scoped>
.detail {
    position: absolute;
    background-color: rgba(128, 128, 128);
    height: 99%;
    width: 3%;
    right: 0;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.5;
    transition: 0.6s ease-in-out;
}

.detail:hover {
    cursor: pointer;
    height: 80%;
    width: 100%;
    opacity: 0.9;
}

.detail p {
    writing-mode: vertical-rl;
    margin: 0;
    height: 75%;
    padding-top: 40%;
    font-size: 1rem;
}

.detail:hover p {
    font-size: 2rem;
    writing-mode: horizontal-tb;
    width: 90%;
    text-align: center;
    height: 50%;
    padding: 0;
    margin: auto;
    margin-top: 3%;
}

.detail img{
    height: 10%;
    width: auto;
    transform: translate(30%, -75%);
}

.detail:hover img {
    display: inline-block;
    height: 50%;
    width: auto;
    margin-top: -10px;
}

/* 以下为屏幕适配 */

/** Phone **/
@media only screen and (min-width: 320px) and (max-width: 767px) {
    .detail {
        background-color: transparent;
    }

    .detail:hover {
        background-color: rgba(128, 128, 128, 0.9);
    }

    .detail p {
        width: 20px;
        transform: translateX(-15px);
        line-height: 1rem;
    }

    .detail:hover p {
        font-size: 1.2rem;
        margin-top: 8%;
        text-align: right;
    }

    .detail img {
      transform: translate(-15px, -20px);  
    } 

    .detail:hover img {
        height: 40%;
        width: auto;
        transform: translate(15%, -100%);
    }
}

/* Others */
@media only screen and (max-width: 319px) {
    .detail {
        background-color: transparent;
    }

    .detail:hover {
        background-color: rgba(128, 128, 128, 0.9);
    }

    .detail p {
        width: 20px;
        transform: translateX(-15px);
        line-height: 1rem;
    }

    .detail:hover p {
        font-size: 1.2rem;
        margin-top: 8%;
        text-align: right;
    }

    .detail img {
      transform: translate(-15px, -20px);  
    } 

    .detail:hover img {
        height: 40%;
        width: auto;
        transform: translate(15%, -100%);
    }
}
</style>