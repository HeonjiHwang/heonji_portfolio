<template>
    <div>
        <h1>{{idx ? $t('modifyboard') : $t('registerboard')}}</h1>
        
        <div class="AddWrap">
            <form>
                <table class="tbAdd">
                    <colgroup>
                        <col width="15%"/>
                        <col width="+"/>
                    </colgroup>
                    <tr>
                        <th>{{$t("title")}}</th>
                        <td><input type="text" v-model="subject" ref="subject"/></td>
                    </tr>
                    <tr>
                        <th>{{$t("contents")}}</th>
                        <td><textarea v-model="cont" ref="cont"></textarea></td>
                    </tr>
                </table>
            </form>
        </div>

        <div class="btnWrap">
            <a href="javascript:;" @click="fnList" class="btn">{{$t('list')}}</a>
            <a href="javascript:;" v-if="!idx" @click="fnAddProc" class="btnAdd btn">{{$t("register")}}</a>
            <a href="javascript:;" v-else @click="fnModProc" class="btnAdd btn">{{$t("modify")}}</a>
        </div>
    </div>
</template>

<script>
export default{
    data() { //변수 생성
		return{
			board_code:'news',
			subject:'',
			cont:'',
			id:'admin',
            idx:this.$route.query.idx,
            body:this.$route.query,
			form:'' //form 전송 데이터
		}
	},
    mounted(){
        if(this.idx){
            this.fnGetView();
        }
    },
    methods:{
        fnList(){
            delete this.body.idx;
            this.$router.push({path:'./list', query:this.body})
        },
        fnGetView(){
            this.$axios.get('http://localhost:3000/board/'+this.body.idx, {params:this.body}).then((res)=>{
                if(res.data.isSuccess){
                    let {subject, cont} = res.data;
                    this.subject = subject;
                    this.cont = cont;
                }else{
                    alert(this.$t("fail"));
                }
            }).catch((err)=>{
                console.log(err);
            })
        },
        fnAddProc(){
            if(!this.subject){
                alert(this.$t("pleasechecktitle"));
                this.$refs.subject.focus();
                return;
            }
            this.form = {
                board_code:this.board_code,
                subject:this.subject,
                cont:this.cont,
                id:this.id
            }

            this.$axios.post('http://localhost:3000/board', this.form).then((res)=>{
                if(res.data.isSuccess){
                    this.fnList();
                }else{
                    alert(this.$t("fail"));
                }
            }).catch((err)=>{
                console.log(err);
            })
        },
        fnModProc(){
            if(!this.subject){
                alert(this.$t("pleasechecktitle"));
                this.$refs.subject.focus();
                return;
            }
            this.form = {
                board_code:this.board_code,
                subject:this.subject,
                cont:this.cont,
                id:this.id,
                idx:this.idx
            }

            this.$axios.post('http://localhost:3000/board', this.form).then((res)=>{
                if(res.data.isSuccess){
                    alert("수정됨");
                    this.fnView();
                }else{
                    alert(this.$t("fail"));
                }
            }).catch((err)=>{
                console.log(err);
            })
        },
        fnView(){
            this.$router.push({path:'./view', query:this.body});
        }
    }
}
</script>

<style scoped>
	.tbAdd{border-top:1px solid #888;}
	.tbAdd th, .tbAdd td{border-bottom:1px solid #eee; padding:5px 0;}
	.tbAdd td{padding:10px 10px; box-sizing:border-box;}
	.tbAdd td input{width:100%; min-height:30px; box-sizing:border-box; padding:0 10px;}
	.tbAdd td textarea{width:100%; min-height:300px; padding:10px; box-sizing:border-box;}
	.btnWrap{text-align:center; margin:20px 0 0 0;}
	.btnWrap a{margin:0 10px;}
	.btnAdd {background:#43b984}
	.btnDelete{background:#f00;}
</style>