<template>
    <el-container class="content-area">
        <!-- 页面侧边栏 -->
        <el-aside :width="isCollapse ? '70px' : '250px'">
            
            <!-- unique-opened只打开一个菜单，如果要用属性绑定，需要冒号，如:unique-opened="true" , 否则unique-opened="true"只表示后面的结果是一个字符串-->
            <el-menu
            style="font-size:20px"
            :default-active="$route.path"
            background-color="#1d1e23"
            text-color="#fff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            active-text-color="pink">
                <!-- 一级菜单  index接收字符串，所有给它后面拼接'' -->
                <el-menu-item>
                    <h1 v-show="!isCollapse">家政后台管理系统</h1>
                    <h1 v-show="isCollapse">家政</h1>
                </el-menu-item>
                <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id" >
                    <template slot="title">
                        <i :class="iconsObj[item.id]"></i>
                        <span style="font-size:20px">{{item.authName}}</span>
                    </template>
                    <!-- 二级菜单 -->
                    <el-menu-item :index="'/'+subItem.path " v-for="subItem in item.children" :key="subItem.id">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>{{subItem.authName}}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <!-- 页面主体区 -->
        <el-container>
            <!-- 头部部分 -->
            <el-header>
                <div class="toggle-button" @click="toggleCollapse">
                    |||
                </div>
                <el-button type="info" @click="loginOut">退出</el-button>
            </el-header>
            <!-- 主体部分 -->
            <el-main>
                <!-- 路由占位符 -->

                <div id="app" class="app">
                    <router-view></router-view>
                    <el-backtop target=".app" ><i class="el-icon-caret-top"></i></el-backtop>
                </div>
            </el-main>
        </el-container>
        
    </el-container>

    
</template>

<script>

export default {
    data(){
        return{
            // 左侧菜单数据
            menulist:[
                {
                    "id": 101,
                    "authName": "员工管理",
                    "path": null,
                    "children": [
                        {
                            "id": 1,
                            "authName": "员工列表",
                            "path": "employee",
                            "children": []
                        },{
                            "id": 2,
                            "authName": "员工服务",
                            "path": "service",
                            "children": []
                        },{
                            "id": 3,
                            "authName": "员工添加",
                            "path": "addedit",
                            "children": []
                        },
                    ]
                },
                {
                    "id": 102,
                    "authName": "业务管理",
                    "path": null,
                    "children": [
                        {
                            "id": 11,
                            "authName": "订单列表",
                            "path": "order",
                            "children": [ ]
                        }
                    ]
                },
                {
                    "id": 103,
                    "authName": "客户管理",
                    "path": null,
                    "children": [
                        {
                            "id": 33,
                            "authName": "客户列表",
                            "path": "client",
                            "children": []
                        }
                    ]
                },
                // {
                //     "id": 145,
                //     "authName": "图表管理",
                //     "path": null,
                //     "children": [
                //         {
                //             "id": 44,
                //             "authName": "图表展示",
                //             "path": "show",
                //             "children": []
                //         }
                //     ]
                // }
            ],
            iconsObj:{
                '101': 'iconfont icon-user',
                '103': 'iconfont icon-tijikongjian',
                '101': 'iconfont icon-shangpin',
                '102': 'iconfont icon-danju',
                '145': 'iconfont icon-baobiao'
            },
            // 是否折叠
            isCollapse: false
        }
    },
    // created(){
    //     this.getMenuList()
    // },
    methods:{
        loginOut(){
            // 清空信息
            window.sessionStorage.clear();
            // 跳转到登录页
            this.$router.push('/login');
        },
        // 获取所有的菜单
        // async getMenuList(){
        //     const {data : res} = await this.$http.get('menus')
        //     if(res.meta.status != 200) return this.$message.error(res.meta.msg)
        //     this.menulist = res.data
        //     // console.log(res);
        // },
        // 点击按钮，切换菜单的折叠与展开
        toggleCollapse(){
            this.isCollapse = !this.isCollapse;
        }
    }
}
</script>
<style lang='less' scoped>

.el-container{
    height: 100%;
}
.el-header{
    background-color: #2a2b30;
    .el-button{
        position: absolute;
        right: 10px;
        top: 8px;
    }
    .toggle-button{
        width: 30px;
        height: 30px;
        background-color: #fff;;
        font-size: 13px;
        line-height: 30px;
        text-align: center;
        letter-spacing: 0.2em;
        border-radius: 50%;
        margin-top: 18px;
        cursor: pointer;
        
    }
    .toggle-button:hover {
        background-color: #ccffff;
        color: #fff;
    }
}
.el-aside{
    background-color: #1d1e23;
    .el-menu{
        border-right: none;
    }
    .el-menu-item {
        font-size: 18px;
    }
 
}
.el-main{
    background-color:#f5f7f9;
    .app {
        height: 100vh;
        overflow-x: hidden;
    }
}
.iconfont{
    margin-right: 10px;
    color: #fff;
    font-size:23px;
}

</style>