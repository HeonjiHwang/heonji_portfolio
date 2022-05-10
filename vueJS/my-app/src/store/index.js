import axios from 'axios';
import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        counter:0
    },
    getters:{
        getCounter(state){
            return state.counter;
        }
    },
    mutations:{
        addCounter(state, payload){
            state.counter += payload;
        },
        subCounter(state, payload){
            state.counter--;
        }
    },
    actions:{
        subCounter(context){
            //commit의 subCounter은 mutations의 subCounter ㄴ의미
            return context.commit('subCounter');
        }
    }
})

export default store;