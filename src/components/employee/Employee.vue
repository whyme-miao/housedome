<template>
    <div class="common-table">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>员工管理</el-breadcrumb-item>
            <el-breadcrumb-item>员工列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片区域 -->
        <el-card >
            <!-- 搜索与添加区 -->
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input clearable placeholder="请输入员工ID" v-model="queryInfo.query" @clear="getEmployeeList"  >
                        <el-button slot="append" icon="el-icon-search" style="background-color:#93b3e5;" 
                        @click="getEmployeeListById"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                     <!-- <el-button type="success" @click="addDialogVisible = true">添加员工</el-button> -->
                     <el-button type="success" @click="turnAdd">添加员工</el-button>
                </el-col>
            </el-row>
            <!-- 用户列表区 -->
            <el-table   style="width: 100%" :data="employeeList" border stripe >
                <el-table-column type="expand" >
                    <template slot-scope="props">
                        <el-form  style="color:red" label-position="left" inline class="demo-table-expand">
                            <el-form-item label="工号：">
                                <span>{{ props.row.employeeid }}</span>
                            </el-form-item>
                            <el-form-item label="姓名：">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="身份证：">
                                <span>{{ props.row.idcard }}</span>
                            </el-form-item>
                            <el-form-item label="政治面貌：">
                                <span>{{ props.row.political }}</span>
                            </el-form-item>
                            <el-form-item label="手机号码：">
                                <span>{{ props.row.number }}</span>
                            </el-form-item>
                            <el-form-item label="性别：">
                                <span>{{ props.row.sex }}</span>
                            </el-form-item>
                            <el-form-item label="住址：">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="雇佣状态：">
                                <span>{{ props.row.state }}</span>
                            </el-form-item>
                            <el-form-item label="员工：">
                                <span>{{ props.row.section }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>

                <el-table-column 
                align='center'
                sortable
                prop="employeeid"
                label="ID" width="80px"></el-table-column>
                <el-table-column 
                prop="name"
                label="姓名"></el-table-column>
                <!-- <el-table-column 
                prop="idcard" width="200px"
                label="身份证"></el-table-column> -->
                <el-table-column 
                prop="number"
                label="手机号码"></el-table-column>
                <!-- <el-table-column 
                prop="political"
                label="政治面貌">
                </el-table-column> -->
                <el-table-column 
                prop="sex"
                label="性别" width="90"></el-table-column>
                <!-- <el-table-column 
                prop="address"
                label="住址"></el-table-column> -->
                <el-table-column prop="state" label="雇佣状态">
                    <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.state"
                        active-color="#13ce66"
                        @change="employeeStateChanged(scope.row)"
                        active-value="雇佣中"
                        inactive-value="未雇佣">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column 
                prop="section"
                label="员工">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.section === '正式工'" type="success">正式工</el-tag>
                        <el-tag v-else="scope.row.section === '临时工'">临时工</el-tag>
                    </template>
                </el-table-column>
                <el-table-column 
                value-format="yyyy-MM-dd" 
                prop="birthdate"
                label="出生日期">
                    <template slot-scope="scope">
                        {{scope.row.birthdate | getBirthDate }} 
                    </template>
                </el-table-column>
                <el-table-column 
                prop="avgscore"
                label="评分">
                    <template slot-scope="scope">
                        <el-rate
                        v-model="scope.row.avgscore"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                        </el-rate>
                    </template>
                   
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <!--  修改 -->
                        <el-button type="success" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.employeeid)">修改</el-button>
                        <!-- 删除 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeEmployeeById(scope.row.employeeid)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 修改员工信息对话框  -->
            <el-dialog
            title="修改员工"
            :visible.sync="editDialogVisible"
            width="50%"
             @close="editDialogClosed"
            >
            <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="90px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex" >
                    <el-radio v-model="editForm.sex" label="女">女</el-radio>
                    <el-radio v-model="editForm.sex" label="男">男</el-radio>
                </el-form-item>
                <el-form-item label="手机号码" prop="number">
                    <el-input v-model="editForm.number"></el-input>
                </el-form-item>
                <el-form-item label="政治面貌" prop="political">
                    <el-select v-model="editForm.political" placeholder="请选择">
                        <el-option label="中共党员"  value="中共党员"></el-option>
                        <el-option label="共青团员"  value="共青团员"></el-option>
                        <el-option label="群众" value="群众"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="住址" prop="address">
                    <el-input v-model="editForm.address"></el-input>
                </el-form-item>
                <el-form-item label="员工类别" prop="section">
                    <el-select v-model="editForm.section" placeholder="请选择">
                        <el-option label="正式工"  value="正式工"></el-option>
                        <el-option label="临时工"  value="临时工"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="雇用状态" prop="state">
                    <el-select v-model="editForm.state" placeholder="请选择">
                        <el-option label="雇佣中"  value="雇佣中"></el-option>
                        <el-option label="未雇佣"  value="未雇佣"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="身份证号" prop="idcard" >
                    <el-input v-model="editForm.idcard" disabled></el-input>
                </el-form-item>
                
                <el-form-item label="出生日期" prop="birthdate">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birthdate" style="width: 30%;">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" >
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="success" @click="editEmployeeInfo">确 定</el-button>
            </span>
            </el-dialog>



        </el-card>

    </div>
</template>

<script>
import dayjs, { locale } from "dayjs";
export default {
    data() {
        // 验证手机号的规则
        var checkMobile = (rule, value, cb) => {
            // 验证手机号的正则表达式
            const regMobile =  /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if(regMobile.test(value)){
                return cb()
            }
            cb(new Error('请输入合法的手机号'))
        }
        // 验证身份证号
        var checkIdcard = (rule, value, cb) => {
            // 验证手机号的正则表达式
            const regIdcard =  /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
            if(regIdcard.test(value)){
                return cb()
            }
            cb(new Error('请输入合法的身份证号'))
        }
        return {
            queryInfo: {
                query: ''
            },
            // 员工信息表
            employeeList: [],

            // 添加表单验证规则对象
            addFormRules: {
                name: [
                    { required: true, message: '请输入员工名称', trigger: 'blur'},
                    { min: 2, max: 6, message: '用户名长度在2~6个字符之间', trigger: 'blur'}
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'blur'},

                ],
                number: [
                    { required: true, message: '请输入手机号', trigger: 'blur'},
                    { validator: checkMobile, trigger: 'blur'}
                ],
                political: [
                    { required: true, message: '请选择政治面貌', trigger: 'blur'},
                ],
                address: [
                    { required: true, message: '请输入住址', trigger: 'blur'},
                ],
                section: [
                    { required: true, message: '选择员工类别', trigger: 'blur'},
                ],
                state: [
                    { required: true, message: '选择雇用状态', trigger: 'blur'},
                ],
                idcard: [
                    { required: true, message: '请输入身份证号', trigger: 'blur'},
                    { validator: checkIdcard, trigger: 'blur'}
                ]
            },
            
            // 控制修改员工对话框的显示与隐藏
            editDialogVisible: false,
            // 查询到的员工信息对象
            editForm: {
            },
            // 修改表单验证规则对象
            editFormRules: {

            }
        }
    },
    created() {
        this.getEmployeeList()
    },
    methods: {
        async getEmployeeList() {
            const { data : res} = await this.$http.get('employee')
            // const { data : res} = await this.$http.get('/user/allorder')
            // console.log( res );
            this.employeeList = res.result
        },
        // 通过Id搜索员工
        async getEmployeeListById() {
            if(!this.queryInfo.query) {
                return this.$message.warning('请输入员工Id')
            }
            const {data :res }= await this.$http.get(`employee/${this.queryInfo.query}`)
            // console.log(res);
            this.employeeList = []
            this.employeeList.push( res ) 
        },
         // 监听添加用户对话框的关闭事件
        // addDialogClosed(){
        //     // 重置表单
        //     this.$refs.addFormRef.resetFields();
        // },
        // 点击按钮，添加员工
        // addUser() {
        //     this.$refs.addFormRef.validate(async valid => {
        //         if(!valid) return 
        //         // 校验成功，可以发起网络请求
        //         const data = await this.$http.post('employee/add', this.addForm)
        //         // console.log(data);
        //         if (data.data.code === 401) {
        //             this.$message.warning(data.data.msg)
        //             return this.addDialogVisible = false
        //         }
        //         this.$message.success('添加员工成功')               
        //         // 隐藏对话框
        //         this.addDialogVisible = false
        //         // 重新获取员工列表列表
        //         this.getEmployeeList()
        //     })
        // },
        // 展示修改员工的对话框
        async showEditDialog(id) {
            const {data: res} = await this.$http.get('employee/' + id )
            this.editForm = res
            console.log(this.editForm)
            this.editDialogVisible = true
        },
        // 修改员工信息并提交
        editEmployeeInfo() {
             this.$refs.editFormRef.validate( async valid => {
                if(!valid) return
                // 发起修改用户数据请求
                const data = await this.$http.put('employee/' + this.editForm.employeeid, this.editForm
                )
                if (data.data.code === 401) {
                    this.$message.warning(data.data.msg)
                    return this.editDialogVisible = false
                }
                // 关闭对话框
                this.editDialogVisible = false
                // 刷新数据列表
                this.getEmployeeList()
                // 提示修改成功
                this.$message.success('更新员工成功')
            })
        },
        // 监听修改用户对话框的关闭事件
        editDialogClosed(){
            // 清空表单
            this.$refs.editFormRef.resetFields()
        },

        

        // 根据Id删除员工信息
        async removeEmployeeById(id){
            // 弹框询问用户是否删除数据
            const confirmResult = await this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(err => err)
            if(confirmResult !== 'confirm'){
                return this.$message.info('已取消删除')
            } 
            const  {data :res} = await this.$http.delete('employee/'+id)
            console.log(res);
            if (res.code === 401) {
                return this.$message.warning(res.msg)
            }
        
            this.$message.success('删除员工成功')
            // 注意刷新列表
            this.getEmployeeList()
        },
        // 监听雇佣状态改变
        async employeeStateChanged(employeeInfo) {
            const data = await this.$http.put('state', {
                id: employeeInfo.employeeid,
                state: employeeInfo.state
            } )
            if( data.data.code === 401) {
                if( employeeInfo.state == '雇佣中' ){
                    employeeInfo.state = '未雇佣'
                }else {
                    employeeInfo.state = '雇佣中'
                }
                return this.$message.error(data.data.msg)
            }
            this.$message.success('更新雇佣状态成功')
        },

        // 跳转到添加页面
        turnAdd() {
            this.$router.push('/addedit')
        }
        
    },
    // 过滤器
    filters: {
        getBirthDate(date) {
        return dayjs(date).format("YYYY-MM-DD");
        }
    }
}


</script>
<style lang='less' scoped>
.common-table{
        height: 100% ; // 总的高度 - 64px
}
.demo-table-expand {
    font-size: 0;
  }
.demo-table-expand label {
    width: 90px;
}
.demo-table-expand .el-form-item {
    margin-bottom: 0;
    width: 50%;
}



</style>