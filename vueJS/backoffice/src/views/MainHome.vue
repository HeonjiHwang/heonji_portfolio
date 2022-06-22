<template>
    <div class="wrapper">
        main
    </div>
</template>

<script setup>
/* eslint-disable */
import {computed, onBeforeMount} from 'vue';
import {useRouter} from 'vue-router'
import {useStore} from 'vuex';

const store = useStore();

const userInfo = computed(()=>{store.getters['userStore/getUserInfo']});
console.log(userInfo.value);

onBeforeMount(()=>{
    if(!userInfo.value.user_cd){

    }
})
</script>

<style scoped>
.wrapper{
    width:100vw;
    height:100vh;
}
</style>