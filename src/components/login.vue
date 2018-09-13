<template>
<div class="input-box">
    <p class="login-p">欢迎登录</p>
    <input class="login-input" type="text" placeholder="请输入用户名" v-model="user">
    <input class="login-input" type="text" placeholder="请输入密码" v-model="pwd" @keyup.enter="open">
    <button class="login-btn" @click="open">登 录</button>
    <router-link class="register-tips" to="/register">没账号？去注册啊</router-link>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            user: '',
            pwd: ''
        }
    },
    methods: {
        open(){
            if(this.user === ''){
                this.$message({
                    message: '请输入用户名',
                    type: 'warning'
                });
            }else if(this.pwd === ''){
                this.$message({
                    message: '请输入密码',
                    type: 'warning'
                });
            }else {
                axios.post('/user',{
                    username:this.user,
                    password:this.pwd
                }).then(res=>{
                    console.log(res.data)
                    if(res.data.status === 1){
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                        this.$router.push('/comments')
                    }else {
                        this.$message({
                            message: res.data.result,
                            type: 'warning'
                        });                        
                    }
                }) 
            }
        }
    }
}
</script>


<style scoped>
.register-tips {
    font-size: 14px;
    color: #333;
    text-align: center;
    margin: 10px 0;
    text-decoration: underline;
    cursor: pointer;
}

.input-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 150px;
}

.login-p {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
}

.login-input {
    width: 400px;
    border-radius: 5px;
    background-color: #fff;
    border: solid 1px #ccc;
    padding-left: 20px;
    box-sizing: border-box;
    height: 40px;
    margin-bottom: 20px
}

.login-btn {
    width: 400px;
    border-radius: 5px;
    background-color: #2a93fe;
    text-align: center;
    line-height: 40px;
    height: 40px;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 16px;
}
</style>
