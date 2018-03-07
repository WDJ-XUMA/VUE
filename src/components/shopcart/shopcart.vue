<template>
    <div class="tmpl">
    	<nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li v-for="(good,index) in goodsList" :key="good.id" class="p-list">
                    <mt-switch v-model="good.isPicked"></mt-switch>
                    <img :src="good.img_url">
                    <div class="pay-calc">
                        <p>{{good.title}}</p>
                        <div class="calc">
                            <span>￥{{good.sell_price}}</span>
                            <span @click="sub(index)">-</span>
                            <span>{{good.num}}</span>
                            <span @click="add(index)">+</span>
                            <a href="javascript:;" @click="del(index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{payment.num}}件，总价￥{{payment.price}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>

	import prodTools from '../common/prodTools.js';
	import connect from '../common/connect.js';

	export default {
		data(){
			return {
				goodsList:[]
			}
		},
		created(){
			let prods = prodTools.getProds();
			let keys = Object.keys(prods);
			// if(keys.length === 0) return;
			let self = this;
			this.$axios.get('goodsDetail.json')
			.then(res=>{
				keys.forEach(function(ele){
					self.goodsList.push(res.data.message[ele]);
				});
				this.goodsList.forEach((ele)=>{
					if(prods[ele.id]){
						// ele.num = prods[ele.id];
						// ele.isPicked = true;
						this.$set(ele,'num',prods[ele.id]);
						this.$set(ele,'isPicked',true);
					}
				});
			})
			.catch(err=>{
				console.log(err);
			})
		},
		methods:{
			sub(i){
				if(this.goodsList[i].num <=1) return;
				this.goodsList[i].num--;
				connect.$emit('addShopcart',-1);
				prodTools.addData({
                    id:this.goodsList[i].id,
                    num:-1
                });

			},
			add(i){
				this.goodsList[i].num++;
				connect.$emit('addShopcart',1);
				prodTools.addData({
                    id:this.goodsList[i].id,
                    num:1
                });
			},
			del(i){
				let good = this.goodsList[i];

				prodTools.delete(good.id);
				connect.$emit('addShopcart',-good.num)

				this.goodsList.splice(i,1)
			}
		},
		computed:{
			payment(){
				let num = 0;
				let sum = 0;
				this.goodsList.forEach((ele)=>{
					if(ele.isPicked == true){
						num += ele.num;
						sum += ele.num*ele.sell_price;
					}
				});

				return {
					num:num,
					price:sum
				}
			}
		}
	}
</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
