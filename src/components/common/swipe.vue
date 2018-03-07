<template>
	<div>
		<mt-swipe :auto="4000">
		  <mt-swipe-item v-for="(img,index) in imgs" :key="index"><a :href="img.img_url"><img :src="img.src"></a></mt-swipe-item>
		</mt-swipe>
	</div>
</template>
<script>
	export default{
		data(){
			return {}
		},
		props:['imgs']
	}
</script>
<style scoped>
	.mint-swipe{
		height:187px;
	}
	.mint-swipe img{
		height:187px;
		width:100%;
	}
</style>