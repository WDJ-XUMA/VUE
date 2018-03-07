<template>
	<div>
		<div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a @click="goBack">返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="msg"></textarea>
                </li>
                <li>
                   <mt-button @click="sendComment" size="large" type="primary">发表评论按钮</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>66条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(comment,index) in comments " :key="index">
                    {{comment.user_name}}:{{comment.content}}{{comment.add_time | convertDate}}    
                </li>
            </ul>
            <mt-button @click="loadPage" type="danger" size="large" plain>加载更多按钮</mt-button>
        </div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				comments:[],
                pageIndex:1,
                msg:''
			}
		},
		props:['cId'],
		methods:{
			getComments(){
                this.$axios.get('comment'+this.cId+'pageindex1.json')
                .then(res=>{
                    this.comments = res.data.message;
                })
                .catch(err=>{
                    console.log(err);
                })
            },
            loadPage(){
                this.$axios.get('comment'+this.cId+'pageindex'+(++this.pageIndex)+'.json')
                .then(res=>{
                    this.comments = this.comments.concat(res.data.message);
                })
                .catch(err=>{
                    console.log(err);
                })
            },
            sendComment(){
                this.$axios.post('comment'+this.cId+'pageindex1.json','content='+this.msg)
                .then(res=>{
                    console.log(res);
                    this.getComments();
                    this.msg = '';
                })
                .catch(err=>{
                    console.log(err);
                })
            },
            goBack(){
                this.$router.go(-1);
            }
		},
		created(){
			this.getComments();
		}
	}
</script>
<style scoped>
	.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

</style>