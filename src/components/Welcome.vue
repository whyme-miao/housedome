<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片区域 -->
        <el-row :gutter="20" class="home" style="height:720px">
            <el-col :span="10" >
                <!-- 管理员信息 -->
                <el-card shadow="hover" style="height:350px" class="manage">
                    <!-- 说明文本 -->
                    <div class="login-info">
                        <h2>欢迎来到后台管理系统</h2>
                        <p>在这里可以了解到你想要的信息~</p>
                    </div>
                    <!-- 管理员登录信息 --> 
                    <div class="user">
                        <img :src="url" alt="">
                        <div class="userinfo">
                            <h1 class="name">{{username}}</h1>
                            <p class="role" v-if="getLevel">超级管理员</p>
                            <p class="role" >登录时间 : {{time}}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="13">
                <!-- 顾客和订单数量 -->
                <div class="num">
                    <el-card shadow="hover"  :body-style="{display: 'flex', padding: 0}">
                        <i class="icon" :style="{backgroundColor:'#2ec7c9'}" :class="`el-icon-s-data`"></i>
                        <div class="desc">
                            <p class="client">顾客总数:</p>
                            <p :style="{fontSize:'20px'}">{{vclient}}</p>
                        </div>
                    </el-card>
                    <el-card shadow="hover"  :body-style="{display: 'flex', padding: 0}">
                        <i class="icon" :style="{backgroundColor:'#2ec7c9'}" :class="`el-icon-success`"></i>
                        <div class="desc">
                            <p class="client">订单总数:</p>
                            <p :style="{fontSize:'20px'}">{{vorder}}</p>
                        </div>
                    </el-card>
                    
                </div>
                <!-- 柱状图 -->
                <el-card shadow="hover" >
                    <div class="zhu">
                        <my-echarts></my-echarts>
                    </div>
                </el-card>

            </el-col>


        </el-row>
        
    </div>
</template>

<script>
import '../assets/less/home.css'
// 引入myecharts组件
import MyEcharts from './Echarts.vue'
export default {
    components: {
        MyEcharts
    },
    data() {
        return {
            username: '',
            url: '',
            level: 0,
            vclient: 0,
            vorder:0,
            time: new Date().toLocaleString()

        }
    },
    created() {
        this.username = window.sessionStorage.getItem('username')
        this.url = window.sessionStorage.getItem('url')
        this.level = window.sessionStorage.getItem('level')
        this.getClientList()
        this.getOrderList()
    },
    methods: {
        // 获取顾客总数
        async getClientList() {
            const {data: res} = await this.$http.get('/user/alluser')
            this.vclient = res.length
        },
        // 获取订单总数
        async getOrderList () {
            const { data : res} = await this.$http.get('/user/allorder')
            this.vorder = res.length
        },
    },
    computed: {
        getLevel() {
            if(this.level == 0){
                return true
            }else {
                return false
            }

        }
    }
}

</script>

<style lang="less" scoped>
</style>
