import {createStore} from 'vuex';

import createPersistedState from 'vuex-persistedstate';
import userStore from './modules/userStore';

export default createStore({
    modules : {
        userStore : userStore
    },
    plugins:[
        createPersistedState({
            storage : window.sessionStorage,
            path : ['userStore']
        })
    ]
})