<template>
    <header>
        <div class="logoWrapper">
            <router-link to="/" class="homelink">
                <img src="../../assets/imgs/logo.png" alt="logo" height="30"/>
                <h1>Vue.js Test App</h1>
            </router-link>
        </div>
        <div class="menuWrapper">
            <ul>
                <li><router-link to="/">HOME</router-link></li>
                <li><a href="#">MAP</a></li>
                <li><a href="#">MY PAGE</a></li>
            </ul>
        </div>
    </header>
</template>

<script setup>
    import {ref} from 'vue'
</script>
