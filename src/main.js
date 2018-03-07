'use strict';

import Vue from 'vue';
//引入第三方包开始
import VueRouter from 'vue-router';
Vue.use(VueRouter);


//引入样式
import 'mint-ui/lib/style.css';
//mint-ui按需引入
import Header from 'mint-ui/lib/header';
import Switch from 'mint-ui/lib/switch';
import Swipe from 'mint-ui/lib/swipe';
import SwipeItem from 'mint-ui/lib/swipe-item';
import Lazyload from 'mint-ui/lib/lazyload';
import Loadmore from 'mint-ui/lib/loadmore';
import Indicator from 'mint-ui/lib/indicator';
import Button from 'mint-ui/lib/button';
Vue.component(Header.name, Header);
Vue.component(Switch.name, Switch);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Button.name, Button);
Vue.use(Lazyload);

//引入mui样式
import './static/vendor/mui/dist/css/mui.css';

//引入自己的样式
import './static/css/global.css';

//引入moment
import Moment from 'moment';

//引入vue-preview
import VuePreview from 'vue-preview';
Vue.use(VuePreview);


//引入第三方包结束

//引入全局组件所需的组建对象 开始
import NavBar from './components/common/navBar.vue';
import Comment from './components/common/comment.vue';
import MySwipe from './components/common/swipe.vue';

// 注册全局组件
Vue.component('navBar',NavBar);
Vue.component('comment',Comment);
Vue.component('mySwipe',MySwipe);

//全局过滤器
Vue.filter('convertDate',function(value){
	return Moment(value).format('YYYY-MM-DD');
});

//引入全局组件所需的组建对象 结束



//引入自己的vue文件开始
import App from './app.vue';

const Home = resolve => require (['./components/home/home.vue'],resolve);
const Member = resolve => require (['./components/member/member.vue'],resolve);
const Shopcart = resolve => require (['./components/shopcart/shopcart.vue'],resolve);
const Search = resolve => require (['./components/search/search.vue'],resolve);
const NewsList = resolve => require (['./components/news/newsList.vue'],resolve);
const NewsDetail = resolve => require (['./components/news/newsDetail.vue'],resolve);
const PhotoShare = resolve => require (['./components/photo/photoShare.vue'],resolve);
const PhotoDetail = resolve => require (['./components/photo/photoDetail.vue'],resolve);
const GoodsList = resolve => require (['./components/goods/goodsList.vue'],resolve);
const GoodsDetail = resolve => require (['./components/goods/goodsDetail.vue'],resolve);
const GoodsComment = resolve => require (['./components/goods/goodsComment.vue'],resolve);

import Axios from 'axios';
Axios.defaults.baseURL = 'http://wudongjun.cn';
Axios.interceptors.request.use(function(config){
	Indicator.open({
		text: '加载中...',
		spinnerType: 'fading-circle'
	});
	return config;
});
Axios.interceptors.response.use(function(config){
	Indicator.close();
	return config;
});
Vue.prototype.$axios = Axios;


//引入自己的vue文件结尾


//配置路由

let router = new VueRouter({
	linkActiveClass:'mui-active',

	routes:[
		{path:'',redirect:{name:'home'}},
		{name:'home',path:'/home',component:Home},
		{name:'member',path:'/member',component:Member},
		{name:'shopcart',path:'/shopcart',component:Shopcart},
		{name:'search',path:'/search',component:Search},
		{name:'news_list',path:'/news/list',component:NewsList},
		{name:'news_datail',path:'/news/detail',component:NewsDetail},
		{name:'photo_share',path:'/photo/share',component:PhotoShare},
		{name:'photo_detail',path:'/photo/detail/:id',component:PhotoDetail},
		{name:'good_list',path:'/goods/list',component:GoodsList},
		{name:'good_detail',path:'/goods/detail',component:GoodsDetail},
		{name:'good_comment',path:'/goods/comment',component:GoodsComment},
		{name:'good_info',path:'/goods/info',component:NewsDetail}
	]
});

//创建vue实例
new Vue({
	el:'#app',
	router:router,
	render: c => c(App)
})