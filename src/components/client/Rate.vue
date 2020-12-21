<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>客户管理</el-breadcrumb-item>
            <el-breadcrumb-item>客户评分</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片区域 -->
        <el-card>
            <!-- 搜索与添加区 -->
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input clearable placeholder="请输入客户ID" v-model="queryInfo.query" @clear="getRateList" >
                        <el-button style="background-color:#aed2f6;" slot="append" icon="el-icon-search" @click="getRateListById"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <!-- 评分列表 -->
            <el-table
                :header-cell-style="{background:'#aed2f6',color:'black'}"
                :data="ratelist" border >
                <!-- <el-table-column
                align='center'
                type="index"
                width="60px"
                label="序号"></el-table-column> -->
                <el-table-column
                align='center' 
                prop="id"
                label="客户ID"></el-table-column>
                <el-table-column
                align='center'
                prop="rate"
                label="评分">
                    <template slot-scope="scope">
                        <el-rate
                        v-model="scope.row.rate"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                        </el-rate>
                    </template>
                </el-table-column>
                <el-table-column
                align='center' 
                prop="name"
                label="客户姓名"></el-table-column>
                <el-table-column 
                align='center'
                prop="evaluate"
                label="客户留言"></el-table-column>
                <el-table-column 
                align='center'
                prop="employeename"
                label="员工姓名"></el-table-column>
                
                
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            queryInfo : {
                query: ''
            },
            // 评分列表
            ratelist:[]
        }
    },
    created() {
        this.getRateList()
    },
    methods: {
        // 获取评分列表
        async getRateList() {
            const {data: res} = await this.$http.get('/rate/all')
            // console.log(res);
            if (res.code === 401) {
                return this.$message.warning('获取列表失败')
            }
            this.ratelist = res
            this.ratelist.forEach(item => {
                this.$http.post("user/info", {name: item.name}).then(result => {
                    // console.log(result.data)
                    item.id = result.data[0].id
                    // console.log(item.id)
                })
            })  
        },
        // 根据id获取评分信息
        async getRateListById() {
            if(!this.queryInfo.query) {
                return this.$message.warning('请输入客户Id')
            }
            const {data: res} = await this.$http.get(`rate/user/${this.queryInfo.query}`)
            res.map(item => {
                item.employeename = item.employee
                item.id = this.queryInfo.query
            })
            // console.log(res)
            this.ratelist = res
            
        }
    }
}
</script>
<style lang='less' scoped>
.el-card {
    width: 94%;
    margin: 40px auto 0;
}


</style>