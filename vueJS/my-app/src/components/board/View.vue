<template>
    <div>
		<h1>{{$t('boarddetail')}}</h1>

		<div class="AddWrap">
			<form>
				<table class="tbAdd">
					<colgroup>
						<col width="15%" />
						<col width="*" />
					</colgroup>
					<tr>
						<th>{{$t("title")}}</th>
						<td>{{subject}}</td>
					</tr>
					<tr>
						<th>{{$t("contents")}}</th>
						<td class="txt_cont" v-html="cont"></td>
					</tr>
				</table>
			</form>
		</div>

		<div class="btnWrap">
			<a href="javascript:;" @click="fnList()" class="btn">{{$t("list")}}</a>
            <a href="javascript:;" @click="fnModify()" class="btnAdd btn">{{$t("modify")}}</a>
            <a href="javascript:;" @click="fnDelete()" class="btnDelete btn">{{$t("delete")}}</a>
		</div>	
	</div>
</template>

<script>
export default{
    name : 'View',
    data(){
        return{
            body:this.$route.query,
            subject:'',
            cont:'',
            view:'',
            idx:this.$route.query.idx
        }
    },
    mounted(){
        this.fnGetView();
    },
    methods : {
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
        fnList(){
            delete this.body.idx;
            this.$router.push({path:'./list', query:this.body});
        },
        fnModify(){
            this.$router.push({path:'./write', query:this.body});
        },
        fnDelete(){
            if(confirm(this.$t("doyouwanttodelete"))){
                this.$axios.post("http://localhost:3000/delete-board", this.body).then((res)=>{
                    if(res.data.isSuccess){
                        delete this.body.idx;
                        this.$router.push({path:'./list', query:this.body});
                        alert(this.$t("success"));
                    }else{
                        alert(this.$t("fail"));
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }
    }
}
</script>

<style scoped>
	.tbAdd{border-top:1px solid #888;}
	.tbAdd th, .tbAdd td{border-bottom:1px solid #eee; padding:5px 0; }
	.tbAdd td{padding:10px 10px; box-sizing:border-box; text-align:left;}
	.tbAdd td.txt_cont{height:300px; vertical-align:top;}
	.btnWrap{text-align:center; margin:20px 0 0 0;}
	.btnWrap a{margin:0 10px;}
	.btnAdd {background:#43b984}
	.btnDelete{background:#f00;}
</style>