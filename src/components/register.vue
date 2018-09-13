<template>
<div class="input-box">
    <p class="login-p">欢迎注册</p>
    <input class="login-input" type="text" placeholder="请输入用户名" v-model="firstname">
    <input class="login-input" type="text" placeholder="请输入密码" v-model="firstpwd">
    <button class="login-btn" @click="registerBtn">注 册</button>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            firstname: '',
            firstpwd: ''
        }
    },
    methods: {
        registerBtn(){
            if(this.firstname != '' && this.firstpwd != ''){
                axios.post('/user/register',{
                    register_name: this.firstname,
                    register_pwd: this.firstpwd
                }).then(res=>{
                    this.$message({
                        message: res.data.result,
                        type: 'success'
                    });   
                    this.$router.push('/login')
                }).catch(err=>{
                    console.log(err)
                })
            }else {
                this.$message({
                    message: '注册失败，账号或密码不能为空!',
                    type: 'warning'
                });   
            }
        }
    }
}
</script>


<style scoped>
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
    background-color: #ee8c19;
    text-align: center;
    line-height: 40px;
    height: 40px;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 16px;
}
</style>