<template>
	<div class="tmpl" style="height:577px;overflow:scroll;">
		<nav-bar title="商品列表"></nav-bar>
		<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="isAutoFill" ref="loadmore">
			<ul class="mui-table-view mui-grid-view">
	            <li v-for="good in goodsList" :key="good.id" class="mui-table-view-cell mui-media mui-col-xs-6">
	                <router-link :to="{name:'good_detail',query:{id:good.id} }">
	                    <img class="mui-media-object" :src="good.img_url">
	                    <div class="mui-media-body">{{good.title}}</div>
	                    <div class="desc">
	                        <div class="sell">
	                            <span>￥{{good.sell_price}}</span>
	                            <s>￥{{good.market_price}}</s>
	                        </div>
	                        <div class="detail">
	                            <div class="hot">
	                                热卖中
	                            </div>
	                            <div class="count">
	                                剩{{good.stock_quantity}}件
	                            </div>
	                        </div>
	                    </div>
	                </router-link>
	            </li>
	        </ul>
    	</mt-loadmore>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				goodsList:[],
				allLoaded:false,
				isAutoFill:false,
				pageIndex:0,
			}
		},
		methods:{
			loadBottom(){
				// console.log('出发了');
				this.loadMorePage();
				
			},
			loadMorePage(){
				this.$axios.get('goodspage'+(++this.pageIndex)+'.json')
				.then(res=>{
					if(res.data.message.length < 10){
						this.allLoaded = true;
					};
					this.goodsList = this.goodsList.concat(res.data.message);


					this.$refs.loadmore.onBottomLoaded();
				})
				.catch(err=>{
					console.log(err);
				})
			}
		},
		created(){
			this.$axios.get('goodspage0.json')
			.then(res=>{
				this.goodsList = res.data.message;
			})
			.catch(err=>{
				console.log(err);
			})
		}
	}
</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
}
</style>