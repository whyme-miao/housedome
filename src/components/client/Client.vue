<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>客户管理</el-breadcrumb-item>
            <el-breadcrumb-item>客户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片区域 -->
        <el-card>
            <!-- 搜索与添加区 -->
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input clearable placeholder="输入客户名称" v-model="queryInfo.name" @clear="getClientList" >
                        <el-button style="background-color:#97d8ae;" slot="append" icon="el-icon-search" @click="getClientListByName"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-input clearable placeholder="请输入客户ID" v-model="queryInfo.query" @clear="getClientList" >
                        <el-button style="background-color:#97d8ae;" slot="append" icon="el-icon-search" @click="getClientListById"></el-button>
                    </el-input>
                </el-col>         
            </el-row>
            <!-- 客户列表区 -->
            <el-table
                :header-cell-style="{background:'#97d8ae',color:'black'}"
                :data="clientlist" border >
                <el-table-column 
                prop="id"
                label="ID"></el-table-column>
                <el-table-column 
                prop="name"
                label="客户名称"></el-table-column>
                <el-table-column 
                prop="address"
                label="地址"></el-table-column>
                <el-table-column 
                prop="number"
                label="手机号码"></el-table-column>
                <el-table-column 
                prop="sex"
                label="性别"></el-table-column>
                <el-table-column 
                prop="username"
                label="账户名称"></el-table-column>
                <el-table-column 
                prop="avatar"
                label="用户头像">
                    <template slot-scope="scope">
                        <img :src="scope.row.avatar" alt="">
                    </template>
                </el-table-column>
                
            </el-table>
        </el-card>
    </div>
</template>

<script>

export default {
    data() {
        return {
            queryInfo: {
                query:'',
                name: ''
            },
            clientlist:[]
        }
    },
    created() {
        this.getClientList()
    },
    methods: {
        async getClientList() {
            const {data: res} = await this.$http.get('/user/alluser')
            // console.log(res)
            this.clientlist = res
            // console.log(this.clientlist)

        },
        // 通过id获取客户信息
        async getClientListById() {
            if(!this.queryInfo.query) {
                return this.$message.warning('请输入客户Id')
            }
            const {data: res} = await this.$http.get(`user/info/${this.queryInfo.query}`)
            this.clientlist = res
        },
        // 模糊查询客户名称
        async getClientListByName() {
            // console.log(this.queryInfo.name)
            if(!this.queryInfo.name) {
                return this.$message.warning('请输入客户名称')
            }
            const {data: res} = await this.$http.post('user/info/', {
                name:this.queryInfo.name
            })
            this.clientlist = res

            
        }
    }
}
</script>
<style lang='less' scoped>
.el-card {
    width: 94%;
    margin: 40px auto 0;
}
img{
    width: 50px;
    height: 50px;
}

</style>