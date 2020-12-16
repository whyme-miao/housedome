<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>业务管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片区域 -->
        <el-card>
            <!-- 搜索与添加区  @click="getEmployeeListById"-->
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input clearable placeholder="请输入顾客ID" v-model="queryInfo.query" @clear="getOrderList" >
                        <el-button style="background-color:#fdf6ec;" slot="append" icon="el-icon-search" @click="getOrderListById"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <!-- 订单列表区 -->
            <el-table
                :header-cell-style="{background:'#fdf6ec',color:'black'}"
                :row-class-name="OrderClass"
                :data="orderlist" border >
                 <el-table-column 
                prop="id"
                label="订单ID"></el-table-column>
                <el-table-column 
                prop="employeename"
                label="服务人员"></el-table-column>
                <el-table-column 
                prop="hiredate"
                label="创建时间">
                    <template slot-scope="scope">
                        {{scope.row.hiredate | dateFormat }} 
                    </template>
                
                </el-table-column>
                <el-table-column 
                prop="day"
                label="雇佣天数">
                    <template slot-scope="scope">
                        {{scope.row.day | getDay }} 
                    </template>
                </el-table-column>
                <el-table-column 
                prop="name"
                label="顾客姓名"></el-table-column>
                <el-table-column 
                prop="salary"
                label="支付工资">
                    <template slot-scope="scope">
                        {{scope.row.salary | getSal }} 
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="服务状态">
                    <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.status"
                        active-color="#13ce66"
                        @change="orderStatusChanged(scope.row)"
                        active-value="未安排"
                        inactive-value="完成">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column 
                prop="type"
                label="服务类型">
                </el-table-column>

                <!--  修改 -->
                <!-- <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button type="success" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
                    </template>
                </el-table-column> -->

            </el-table>

        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            queryInfo: {
                query: ''
            },
            orderlist: [],

            
        }
    },
    created() {
        this.getOrderList()
    },
    methods: {
        async getOrderList () {
            const { data : res} = await this.$http.get('/user/allorder')
            this.orderlist = res
            // console.log(this.orderlist)
        },
        // 查看某个顾客订单
        async getOrderListById() {
            const {data: res} = await this.$http.get(`user/order/${this.queryInfo.query}`)
            console.log(res)
            this.orderlist = res
        },
        async orderStatusChanged(orderInfo) {
            const data = await this.$http.put('user/order', {
                id: orderInfo.id,
                status: orderInfo.status
            })
            // 更新失败
            if (data.data.code === 401) {
                if( orderInfo.status == '未安排' ){
                    orderInfo.status = '完成'
                }else {
                    orderInfo.status = '未安排'
                }
                return this.$message.error(data.data.msg)
            }
            // 更新成功
            this.$message.success('更新状态成功')  
        },
        // 隔行变色
        OrderClass({row, rowIndex}) {
          if(rowIndex%2==1){
            return 'warning-row';
          }else{
            return 'success-row';
          }
        },

    },
    // 过滤器
    filters: {
        getDay(val) {
            return val + '天'
        },
        getSal(val) {
            return val + '元'
        }

    },
}

</script>
<style lang='less' >

</style>