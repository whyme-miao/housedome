<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>员工管理</el-breadcrumb-item>
            <el-breadcrumb-item>员工服务</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区 -->
        <el-card>
            <!-- 搜索  -->
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input clearable placeholder="请输入员工ID" v-model="queryInfo.query" @clear="getServiceAndSalary">
                        <el-button 
                        slot="append" 
                        icon="el-icon-search"
                        style="background-color:#93b3e5;"
                        @click="getServiceListById"
                        ></el-button>
                    </el-input>
                </el-col>
                <!-- <el-col :span="6">
                    <el-input clearable placeholder="请输入服务类型" v-model="queryInfo.type" @clear="getServiceAndSalary">
                        <el-button 
                        slot="append" 
                        icon="el-icon-search"
                        style="background-color:#93b3e5;"
                        @click="getServiceListByType"
                        ></el-button>
                    </el-input>
                </el-col> -->
            </el-row>

            <!-- 全部员工的服务类型与薪水 -->
            <el-table 
            :header-cell-style="{background:'#93b3e5',color:'black'}"
            :row-class-name="tableRowClassName"
            :data="serviceList" border  >   
                <el-table-column type="index" label="序列" width="60px"></el-table-column>
                <el-table-column prop="name" label="姓名" width="120px"></el-table-column>
                <el-table-column prop="workExperience" label="工作经验" width="120px">
                    <template slot-scope="scope">
                        {{scope.row.workExperience|getExper}}
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="服务类型" width="120px"></el-table-column>
                <el-table-column prop="salary" label="薪水" width="120px">
                    <template slot-scope="scope">
                        {{scope.row.salary|getSal}}
                    </template>
                </el-table-column>
                <el-table-column prop="time" label="工作时间" width="120px">
                    <template slot-scope="scope">
                        {{scope.row.time|getTime}}
                    </template>
                </el-table-column>
                <el-table-column prop="synopsis" label="服务类型简介"></el-table-column>
                
            </el-table>


        </el-card>
        
    </div>
</template>

<script>

export default {
    data() {
        return {
            queryInfo: {
                query: '',
                type: ''
            },
            serviceList:[]
        }
    },
    created() {
        this.getServiceAndSalary()
    },
    methods: {
        async getServiceAndSalary() {
            const {data: res} = await this.$http.get('service')
            this.serviceList = res
        },
        async getServiceListById() {
            if(!this.queryInfo.query) {
                return this.$message.warning('请输入员工Id')
            }
            const {data: res} =  await this.$http.get(`service/${this.queryInfo.query}`)
            this.serviceList = res

        },

        // 根据服务类型查询员工
        // async getServiceListByType() {
        //     const data = await this.$http.post('service/employee',{
        //         type: this.queryInfo.type
        //     })
        //     this.serviceList = data.data
            
        // },

        tableRowClassName({row, rowIndex}) {
          if(rowIndex%2==1){
            return 'warning-row';
          }else{
            return 'success-row';
          }
        },



    },
    filters: {
        getExper(val) {
            return val + '年'
        },
        getSal(val) {
            return val + '元'
        },
        getTime(val) {
            return val + '小时'
        }
    }
}
</script>
<style lang='less' >

.el-table .warning-row {
    background: #f0f9eb;
}
.el-table .success-row {
    background: #fff;
}
.el-input {
    width: 230px;
  }
.cWidth {
    width: 120px;
}
</style>