<template>
    <header>
        <h1><router-link to="/"><img src="../../assets/logo.png" alt="Vue logo" width="80"/></router-link></h1>
        <div class="menuWrap">
            <ul class="menu">
                <li><router-link to="/board/list">게시판</router-link></li>
                <li><router-link to="/test/test">테스트</router-link></li>
                <li><router-link to="/vuex/example">Vuex예제</router-link></li>
                <li><a href="javascript:;">메뉴4</a></li>
            </ul>
        </div>
    </header>
</template>

<script>
export default{

}
</script>

<style scoped>

header{
    width:100%;
    height:auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid #e4e4e4;
}
header h1{
    margin-left:100px;
}
header ul.menu:after{
    display:block;
    clear:both;
    content: '';
}
header ul.menu{
    margin-right:50px;
}
header ul.menu li{
    float:left;
    padding:10px 20px;
    list-style: none;
}
a{
    text-decoration: none;
    color:#444;
}
</style>
