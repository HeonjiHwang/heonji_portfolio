<template>
    <div id="board-lists">
        <h2>{{$t('boardlist')}}</h2>
        <div class="searchWrap">
          <input type="text" v-model="keyword" @keyup.enter="fnSearch" />
          <a href="javascript:;" @click="fnSearch" class="btnSearch btn">{{$t('search')}}</a>
        </div>
        <div class="listWrap">
          <table class="tbList">
            <colgroup>
              <col width="6%" />
              <col width="*" />
              <col width="10%" />
              <col width="15%" />
            </colgroup>
            <tr>
              <td>no</td>
              <td>{{$t('title')}}</td>
              <td>{{$t('id')}}</td>
              <td>{{$t('date')}}</td>
            </tr>
            <tr v-for="(row, idx) in list" :key="idx">
              <td>{{idx+1}}</td>
              <td class="txt_left"><a href="javascript:;" @click="fnView(`${row.idx}`)">{{row.subject}}</a></td>
              <td>{{row.id}}</td>
              <td>2022-05-09</td>
            </tr>
            <tr v-if="list.length === 0">
              <td colspan="4">{{$t("thereisnodata")}}</td>
            </tr>
          </table>
        </div>
        <div class="btnRightWrap">
            <a href="javascript:;" @click="fnAdd" class="btn">{{$t("register")}}</a>
        </div>
    </div>
</template>

<script>

export default {
  data(){   //변수생성
    return{
      body:'',
      board_code:'news',
      list:'',
      no:'',
      keyword:this.$route.query.keyword
    }
  },
  mounted(){  //페이지 시작하면 자동 함수 실행
    this.fnGetList();
  },
  methods:{
    fnGetList(){    //데이터 가져오는 함수
      this.body = { 
        board_code:this.board_code,
        keyword : this.keyword,
        page : this.page
      }
      this.$axios.get("http://localhost:3000/board", {params:this.body}).then((res)=>{
        if(res.data.isSuccess){
          this.list = JSON.parse(res.data.list);
        }else{
          alert(this.$t('fail'));
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    fnAdd(){
      this.$router.push("./write");
    },
    getList(){
      this.$axios.get("http://localhost:3000/board").then((res)=>{
        console.log(res);
      }).then((err)=>{
        console.log(err);
      })
    },
    fnSearch(){
      this.fnGetList();
    },
    fnPage(n){
      if(this.page != n){
        this.page = n;
        this.fnGetList();
      }
    },
    fnView(idx){
      this.body.idx = idx;
      this.$router.push({path:'./view', query:this.body});    //상세페이지 라우터
    }
  }
}
</script>

<style scoped>
	.searchWrap{border:1px solid #888; border-radius:5px; text-align:center; padding:20px 0; margin-bottom:40px;}
	.searchWrap input{width:60%; height:36px; border-radius:3px; padding:0 10px; border:1px solid #888;}
	.searchWrap .btnSearch{display:inline-block; margin-left:10px;}
	.tbList th{border-top:1px solid #888;}
	.tbList th, .tbList td{border-bottom:1px solid #eee; padding:5px 0;}
	.tbList td.txt_left{text-align:left;}
	.btnRightWrap{text-align:right; margin:30px 0 0 0;}

	.pagination{margin:20px 0 0 0; text-align:center;}
	.first, .prev, .next, .last{border:1px solid #666; margin:0 5px;}
	.pagination span{display:inline-block; padding:0 5px; color:#333;}
	.pagination a{text-decoration:none; display:inline-blcok; padding:0 5px; color:#666;}
</style>
