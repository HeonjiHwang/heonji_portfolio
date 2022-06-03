<template>
    <div>main</div>
</template>

<script setup>
import {computed, onBeforeMount} from 'vue';
import {useRouter} from 'vue-router'
import {useStore} from 'vuex';

const store = useStore();

const userInfo = computed(()=>{store.getters['userStore/getUserInfo']});

onBeforeMount(()=>{
    if(!userInfo.value.user_cd){

    }
})
</script>