import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state : {
        user_id:''
    },
    mutations: {
        setUserInfo(state, payload){
            this.state.user_id = payload.user_id;
        }
    }
})

export default store;