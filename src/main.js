import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";

import Ajax from "assets/js/common/ajax.js";
import Tool from "assets/js/common/tool.js";
import Map from "assets/js/common/map.js";
Vue.use(Element, { size: "small", zIndex: 3000 });
require("assets/mock"); //引入mock数据，关闭则注释该行

/**主题处理**/
/***
 * 主题需要去~public/css/themes/red.scss
 * 配置路径-public无法使用相对路径-此方法需要优化-不然次打报都需要配置
 * **/
import theme from "assets/js/common/theme.js";
let isThemes = localStorage.getItem("themes");
if (isThemes) {
  //自定义主题
  require("@@/css/themes/" + isThemes + "/" + isThemes + ".scss");
  window.document.documentElement.setAttribute("data-theme", isThemes); //这里处理自定义
} else {
  //根据季节变化主题
  let isSeasonBgThemes = theme.seasonBg(); //获取主题
  require("@@/css/themes/" +
    isSeasonBgThemes +
    "/" +
    isSeasonBgThemes +
    ".scss");
  window.document.documentElement.setAttribute("data-theme", isSeasonBgThemes); //这里处理自定义
}

// 引入插件和语言包
import VueI18n from "vue-i18n";
import zh from "assets/js/common/langs/zh"; //中文
import en from "assets/js/common/langs/en"; //英文
Vue.use(VueI18n);
//实例化vue-i18n https://kazupon.github.io/vue-i18n/zh/
const i18n = new VueI18n({
  // 从本地存储中取，如果没有默认为中文，
  // 这样可以解决切换语言后，没记住选择的语言，刷新页面后还是默认的语言
  // 查看当前使用的语言
  //console.log(this.$i18n.locale)
  // 改变当前使用的语言
  //this.$i18n.locale = 'en'  // 将当前使用的语言切换到英文
  //模板引用{{$t('nav.home')}}
  //js引用 this.$t('sidebar.authority')
  locale: localStorage.getItem("lang") || "zh", //就是我们切换语言后，刷新又是默认语言，这点我们在上面已经用本地存储localStorage解决了
  messages: {
    zh: zh, // 中文语言包
    en: en // 英文语言包
  }
});
//Vue.use(axios);
//Vue.use(Vuex);
Vue.prototype.$http = Ajax; //封装ajax方法
Vue.prototype.$Tool = Tool; //工具公用方法
Vue.prototype.$Map = Map; //地图方法方法
Vue.prototype.$theme = theme; //地图方法方法
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: function(h) {
    return h(App);
  },
  beforeCreate() {
    Vue.prototype.bus = this; //处理子组件之间相互传递
  }
}).$mount("#app");
