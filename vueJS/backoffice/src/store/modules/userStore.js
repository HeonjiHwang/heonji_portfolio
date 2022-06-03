const userStore = {
    namespaced: true,
    // 전역 변수
    state: {
        $userInfo : {}
    },
    // 전역 변수의 값을 리턴하는 함수
    getters: {
        getUserInfo(state){
            return state.$userInfo;
        }
    },
    // setter에 해당하는 전역 변수의 값을 변경하는 함수
    mutations: {
        resetUserInfo(state){
            state.$userInfo = {};
        },
        setUserInfo(state, data){
            state.$userInfo = data;
        }
    },
    // mutations을 호출하고 값을 전달하는 함수
    actions: {
    },
}
  
export default userStore
  