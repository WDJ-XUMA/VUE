<template>
    <div class="tmpl">
        <!-- 引入返回导航 -->
        <nav-bar title="图文分享"></nav-bar>

        <div class="photo-header">
            <ul>
                <li v-for="category in categorys" :key="category.id">
                    <a href="javascript:;" @click="loadImg(category.id)">{{category.title}}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="img in imgs" :key="img.id">
                    <router-link :to="{name:'photo_detail',params:{id:img.id} }">
                        <!-- <img :src="img.img_url"> -->
                        <img v-lazy="img.img_url">
                        <p>
                            <span v-text="img.title"></span>
                            <br>
                            <span v-text="img.zhaiyao"></span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                categorys:[],
                imgs:[],
            }
        },
        created(){
            this.$axios.get('category.json')
            .then(res=>{
                this.categorys = res.data.message;

                 this.categorys.unshift({
                    id:0,
                    title:"全部"
                })
            })
            .catch(err=>{
                console.log(err);
            })


            this.$axios.get('getimgs0.json')
            .then(res=>{
                this.imgs = res.data.message;
            })
            .catch(err=>{
                console.log(err);
            })
        },
        methods:{
            loadImg(id){
                this.$axios.get('getimgs'+id+'.json')
                .then(res=>{
                    this.imgs = res.data.message;
                })
                .catch(err=>{
                    console.log(err);
                })
            }
        }
    }
</script>
<style>
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}


/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}

image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}



</style>
