<template>
    <div class="tmpl">
        <nav-bar :title="title"></nav-bar>
        <div class="news-title">
            <p v-text="newsDetail.title"></p>
            <div>
                <span>{{newsDetail.click}}次点击</span>
                <span>分类:民生经济</span>
                <span>添加时间:{{newsDetail.add_time | convertDate}}</span>
            </div>
        </div>
        <div class="news-content" v-html="newsDetail.content"></div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                newsDetail:{},
                title:'',
                //就是为了象征性的表示其数据类型
            }
        },
        created(){},
        methods:{
            getData(url,id){
                this.$axios.get(url)
                .then(res=>{
                this.newsDetail = res.data.message[id];
                })
                .catch(err=>{
                    console.log(err);
                })
            }
        },
        beforeRouteEnter(to,from,next){
            let id = to.query.id;
            let myTitle = '';
            let myUrl = '';
            if (from.name === 'news_list'){
                myTitle = '新闻详情';
                myUrl = 'getnews.json';
            }else if(from.name === 'good_detail'){
                myTitle = '图文介绍';
                myUrl = 'goodsinfo.json';
            }
            next(vm=>{
                vm.title = myTitle;
                vm.url = myUrl;

                vm.getData(vm.url,id)
            });
        }
    }
</script>
<style scoped>
.news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
}

.news-title span {
    margin-right: 30px;
}

.news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

/*主体文章的左右距离*/

.news-content {
    padding: 10 5;
}
</style>
