<template>
	<div>
		<nav-bar title="商品评论"></nav-bar>
		<comment :cId="$route.query.id"></comment>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				// id:'',
			}
		},
		created(){
			// this.id = this.$route.query.id
		}
	}
</script>
<style>
	
</style>