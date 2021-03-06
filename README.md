# adminFramework

项目在线演示地址：[http://www.pfuni.cn/test/adminFramework](http://www.pfuni.cn/test/adminFramework)  
用户名：admin
密码：123123

## Project setup
## 安装依赖
```
npm install
```

### Compiles and hot-reloads for development
### 启动服务
```
npm run serve 启动环镜-localhost：8888 接口地址配置代理即可正常
npm run dev   启动开发环镜接口地址
```

### Compiles and minifies for production
### 打包发到正式环境
```
npm run build
npm run build:dev 打包到开发环境
npm run build:test 打包到测试环境
npm run build:prod 打包到生产（正式）环境
注：修改打包环境目录需在以下文件修改
.env.prod-对应正式
.env.test-对应测试
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### 提示warning delete ·· (prettier/prettier) 可执行
```
npm run lint -- --fix
 
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 目录结构

```
├── dist                                         #打包文件
├── node_modules                                 #依赖文件
├── public                                       #静态资源文件-public放别人家js文件（也就是不会变动）
      ├──css                                 #样式图片
          ├──fonts                                 #图标文件
          ├──quill                                 #富文本编辑器样式
          ├──themes                                 #主题
              ├──blue                                 #红色主题
              ├──style                                 #自定义主题样式    
      ├──img                                 #图片文件。  
      ├──js                                  #JS文件。
         ├──lisbs                            #第三方库。
             ├──axios.js                            #主要做ajax处理的
             ├──element-ui.js                            #element-ui主题库
             ├──quill.js                            #富文本编辑器库
      ├──updata                              #上传图片地址  注：后台要按功能建目录-并按时间建文件添加在功能目录文件里。    
      ├──measurement                         #测试图片地址   注：止文件为测试图片 可以删除    
      ├──index.html                                     #views下所有路由页面-index.html
      ├──user.html                                     #pang-user所有路由页面-user.html		       
├── src                                          #源码目录
    ├── assets                                   #静态资源-assets放自己写的js文件（需要改动的文件）
         ├──img                                  #图片文件  
         ├──js                                   #JS文件 
            ├──api                                   #接js口文
            ├──common                                   #共用文件
                ├──langs                                   #语言  
                     ├──en.js                                   #英文   
                     ├──en.js                                   #中文 
               ├──ajax.js                                  #ajax共用方法实现请求后台数据 
               ├──AMap.js                                  #谷德地图  
               ├──BMap.js                                  #百度地图  
               ├──instance.js                                  #接口拦截处理   
               ├──map.js                                  #地图公用方法  
               ├──theme.js                                  #主题处理  
               ├──tool.js                                  #工具类方法   
            ├──router                                   #子路由配置  
         ├── mock                                     #mock数据，模拟后台接口--如果不需要可以删除获在main.js注释引用
              ├── json                            #JSON数据文件
                   ├── user.json                      #用户信息
              ├── index.js                            #接口地址配置 
         ├── config                                   #共用的项目配置
	├── components                               #组件文件夹，自己写的组件都放在这个文件夹下
			├── layout                            #公用页面布局组件
			     ├── footer.vue                            #页脚
			     ├── head.vue                              #页头
			     ├── left.vue                              #业务系统功能导航
			     ├── sidebar.vue                           #业务系统导航
			     ├── Main.vue                              #中间主体框架
			     ├── tag.vue                              #面包屑导航
        ├── index.js                             #共用的项目配置详情
	├──pages                                     #多页面处理
	    ├── user                                 #多页面处理-所有路由页面	
	        ├──views                                     #所有路由页面
	            ├──index.vue                                     #首页
	            ├──personal.vue                                     #个人信息
	        ├──main.js                                   #程序入口文件，加载各种公共组件
	        ├──router.js                                 #路由	  			
	├──views                                     #所有路由页面
	    ├──warehouse                                     #仓库
	    ├──product                                     #产品		
	    ├──management                                     #管理		 
	├──App.vue                                   #页面入口文件主体框架	
	├──main.js                                   #程序入口文件，加载各种公共组件	                                  
	├──router.js                                 #路由
	├──store.js                                  #状态控制
├── .env.prod                                    #生产环境(正式环境)打包配置
├── .env.tets                                    #测试环境打包配置
├── .env.dev                                     #开发环境打包配置
├── .browserslistrc                              #ES6语法编译配置
├── .eslintrc.js                                 #代码编写规格
├── .gitignore                                   #忽略的文件
├── package.json                                 #项目及工具的依赖配置文件
├── package-lock.json                            #锁定安装时的包的版本号-保证其他人在npm install时大家的依赖能保证一致。注：如安装一直无法成功时，可以删除此文件再安装
├── postcss.config.js                            #配置，将px转化成rem
├── README.md                                    #说明
├── vue.config.js                                #配置
```

### 技术选型

技术 | 说明 | 官网
----|----|----
Vue | 前端框架 | [https://vuejs.org/](https://vuejs.org/)
Vue-router | 路由框架 | [https://router.vuejs.org/](https://router.vuejs.org/)
Vuex | 全局状态管理框架 | [https://vuex.vuejs.org/](https://vuex.vuejs.org/)
Element | 前端UI框架 | [https://element.eleme.io/](https://element.eleme.io/)
Axios | 前端HTTP框架 | [https://github.com/axios/axios](https://github.com/axios/axios)
v-charts | 基于Echarts的图表框架 | [https://v-charts.js.org/](https://v-charts.js.org/)
nprogress | 进度条控件 | [https://github.com/rstacruz/nprogress](https://github.com/rstacruz/nprogress)
vue-i18n | 多语言处理 | [http://kazupon.github.io/vue-i18n/](http://kazupon.github.io/vue-i18n/)
vue-puzzle-vcode | 滑动验证 | [https://github.com/javaLuo/vue-puzzle-vcode](https://github.com/javaLuo/vue-puzzle-vcode)
vuedraggable| 可拖拽组件 | [https://github.com/SortableJS/Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)
vuedraggable| 可拖拽组件 | [https://github.com/SortableJS/Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)
vue-quill-editor| 富文本编辑器 | [https://github.surmon.me/vue-quill-editor/](https://github.surmon.me/vue-quill-editor/)
VueTreeselect| 多选树形控件 | [https://www.vue-treeselect.cn/](https://www.vue-treeselect.cn/)
