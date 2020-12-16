<template>
    <div class="container">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>员工管理</el-breadcrumb-item>
            <el-breadcrumb-item>员工添加</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片区域 -->
        <el-card class="mycard">
            <h3>添加员工</h3>
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio v-model="addForm.sex" label="女">女</el-radio>
                    <el-radio v-model="addForm.sex" label="男">男</el-radio>
                </el-form-item>
                <el-form-item label="手机号码" prop="number">
                    <el-input v-model="addForm.number"></el-input>
                </el-form-item>
                <el-form-item label="政治面貌" prop="political">
                    <el-select v-model="addForm.political" placeholder="请选择">
                        <el-option label="中共党员"  value="中共党员"></el-option>
                        <el-option label="共青团员"  value="共青团员"></el-option>
                        <el-option label="群众" value="群众"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="住址" prop="address">
                    <el-input v-model="addForm.address"></el-input>
                </el-form-item>
                <el-form-item label="员工类别" prop="section">
                    <el-select v-model="addForm.section" placeholder="请选择">
                        <el-option label="正式工"  value="正式工"></el-option>
                        <el-option label="临时工"  value="临时工"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="雇用状态" prop="state">
                    <el-select v-model="addForm.state" placeholder="请选择">
                        <el-option label="雇佣中"  value="雇佣中"></el-option>
                        <el-option label="未雇佣"  value="未雇佣"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="身份证号" prop="idcard" >
                    <el-input v-model="addForm.idcard" ></el-input>
                </el-form-item>
                
                <el-form-item label="出生日期" prop="birthdate">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birthdate" style="width: 30%;">
                    </el-date-picker>
                </el-form-item>
            
                <el-form-item>
                    <el-button type="success" @click="addUser">添加</el-button>
                    <el-button type="info"  @click="resetForm">重置</el-button>
                    <el-button style="background-color:#339999;color:#fff"  @click="returnList">返回</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>

<script>

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
            addForm: {
                name:'',
                sex:'',
                number:'',
                address:'',
                state:'',
                birthdate:'',
                section:'',
                political:'',
                idcard:'',
            },
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
            }
        }
    },
    create() {
        
    },
    methods: {
        // 添加员工
        addUser() {
            this.$refs.addFormRef.validate(async valid => {
            if(!valid) return 
            // 校验成功，可以发起网络请求
            const data = await this.$http.post('employee/add', this.addForm)
            // console.log(data);
            if (data.data.code === 401) {
                return this.$message.warning(data.data.msg)
            }
            this.$message.success('添加员工成功')               
            // 重新获取员工列表列表
            // this.getEmployeeList()
            this.$router.push('/employee')
            })
        },
        // 监听添加用户表单的关闭事件
        resetForm(){
            // 重置表单
            this.$refs.addFormRef.resetFields();
        },
        returnList() {
            this.$router.push('/employee')
        }
    }
}
</script>
<style lang='less' scoped>
.mycard {
    width: 700px;
    margin: 50px auto 0px;
    // box-shadow: 0 0 10px #ddd;
    box-shadow: 0 0 20px rgba(0, 0, 0,0.5)!important;
}


</style>