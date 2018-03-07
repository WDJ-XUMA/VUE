<template>
	<div>
		<!-- 头部 -->
		<mt-header title="信息管理系统"></mt-header>
		<transition name="router" mode="out-in">
			<router-view></router-view>
		</transition>
		<!-- 底部 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" :to="{name:'home'}">
				<span class="mui-icon icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{name:'member'}">
				<span class="mui-icon icon-huiyuan"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{name:'shopcart'}">
				<span class="mui-icon icon-gouwuche">
					<span class="mui-badge">{{pickNum}}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{name:'search'}">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">查找</span>
			</router-link>
		</nav>
	</div>
</template>
<script>
	import connect from './components/common/connect.js';
	import prodTools from './components/common/prodTools.js';

	export default {
		data(){
			return {
				pickNum:prodTools.getTotalCount(),
			}
		},
		created(){
			// var self = this;
			// connect.$on('addShopcart',function(num){
			// 	console.log(this);
			// 	console.log('接受到了');
			// 	self.pickNum = self.pickNum + num;

			// })
			connect.$on('addShopcart',num=>{
				this.pickNum = this.pickNum + num;
			})
		}
	}
</script>
<style scoped>
	.router-enter-active,.router-leave-active{
		transition :opacity 0.5s;
	}
	.router-enter,.router-leave-to{
		opacity:0;
	}
</style>