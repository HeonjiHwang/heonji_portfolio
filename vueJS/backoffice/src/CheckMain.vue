<template>
    <div> helloM</div>
</template>

<script setup>
/* eslint-disable */
import {computed, onBeforeMount} from 'vue';
import {useStore} from 'vuex';
import axios from 'axios';

const store = useStore();
const userInfo = computed(() => store.getters['userStore/getUserInfo']);

onBeforeMount(() => {
    // if(!userInfo.value.user_cd){

    // }

    axios.post("/signin", {user_id:'hjhwang95', user_pwd:'test'}).then(res => console.log(res))
})
</script>