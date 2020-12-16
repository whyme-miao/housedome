<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区 -->
            <div class="avatar_box">
                <img :src="loginForm.url" alt="">
            </div>
            <!-- 登录表单区  ref可以拿到整个表单的实例对象-->
            <el-form  ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user" clearable></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password" >
                    <!-- <el-input prefix-icon="iconfont icon-3702mima"></el-input> -->
                    <el-input 
                    v-model="loginForm.password" 
                    type="password"
                    prefix-icon="el-icon-lock"
                    show-password
                    ></el-input>
                </el-form-item>
                <!-- 按钮区 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login" style="background-color:#339999">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 这是登录表单的数据绑定对象
            loginForm: {
                username:'admin',
                password:'123',
                // url: require(`../assets/${5}.jpg`)
                url: ''
            },
            // 这是表单的验证规则对象
            loginFormRules: {
                // 验证用户名是否合法
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                // 验证密码是否合法
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    created(){
        var i = Math.floor(Math.random()*11)
        let urlTemp = `assets/${i}.jpg`
        this.loginForm.url = require('@/'+ urlTemp)
    },
    methods: {
        // 点击重置按钮，重置登录表单
        resetLoginForm() {
            // console.log(this);
            this.$refs.loginFormRef.resetFields()
        },
        // 随机生成头像
        getImage() {
            
        },
        // 点击登录按钮，先进行预验证
        login() {
            this.$refs.loginFormRef.validate(async valid => {
                // console.log(valid);
                if(!valid) return;
                // { data : res} 解构data的值
                const res  = await this.$http.post('admin/login', this.loginForm)
                console.log(res);
                if(res.data.code === 401){
                    return this.$message.error(res.data.msg)
                }
                // if(res.) return this.$message.error('登录失败！')
                this.$message.success('登录成功')
                // 1. 将登录成功之后的token，保存到客户端的sessionStorage中
                //  1.1项目中除了登录之外的其他API接口，必须在登录之后才能访问
                //  1.2token只应当在当前往网站打开期间生效，所讲将token保存在sessionStorage中
                window.sessionStorage.setItem("level", res.data.role_name == "超级管理员" ? 0 : 2)
                window.sessionStorage.setItem("username", this.loginForm.username)
                window.sessionStorage.setItem("url", this.loginForm.url)
                // 2. 通过编程式导航跳转到后台主页，路由地址是/home 
                this.$router.push("/home")
            })
        }
    }
};
</script>

<style lang="less" scoped>
.login_container {
    // background-image: linear-gradient(#BC95C6, #7DC4CC);
    // background-image: linear-gradient(#B2B9BE, #2F4052);
    background-image: linear-gradient(to top right ,#18545A, #F1F2B5);
    // background-image: linear-gradient(rgba(255, 0, 0, .2), #BC95C6, #7DC4CC);
    height: 100vh;
}
.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    box-shadow: #ddd 0px 0px 15px 10px;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .avatar_box {
        width: 110px;
        height: 110px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        background-color: #fff;
        transform: translate(-50%, -50%);
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .btns{
        display: flex;
        justify-content: center;
    }
}
// .login_container:hover .login_box{
//     transition-property:all ; 
//     transition-duration: 0.2s;
//     transition-delay:0s;
//     box-shadow: 0 0 5px rgba(0,0,0,.4);
// }


.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 30px 40px;
    box-sizing: border-box;
}
</style>
