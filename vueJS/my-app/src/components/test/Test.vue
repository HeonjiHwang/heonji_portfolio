<template>
    <div>
        <h2>
            {{getCounter}}
        </h2>
        <div class="btnWrapper">
            <button @click="addCounter(5)">+</button>
            <button @click="subCounter">-</button>
        </div>

        <child></child>
    </div>
</template>


<script>
import Child from './Child.vue';
import {mapGetters, mapMutations} from 'Vuex';

export default{
    components:{
        child:Child
    },
    computed: {
        ...mapGetters([
            'getCounter'
        ])
    },
    methods:{
        ...mapMutations({
            addCounter : 'addCounter'
        }),     //or addCounter(){this.$store.commit('addCounter')}
        subCounter(){
            this.$store.dispatch('subCounter')
        }
    }
}
</script>
