<template>
<div>
    <p class="big-title">COMMENT AREA</p>
    <p class="welcome">欢迎您~{{ yonghu }}</p>
    <span class="login-out" @click="loginOut">退出登录</span>
    <p class="comment-title">评论区</p>
    <div class="comment-list" v-for="(item,index) in commentList" v-bind:key="index">
        <div class="name-time">
            <p class="name">{{ item.name }}</p>
            <p class="time">{{ item.time }}</p>
            <p class="reply" @click="popReplyBox(item)">回复</p>
        </div>
        <p class="content">{{ item.content }}</p>
            <div class="comment-list op" v-for="(ele,index2) in item.replyArr" v-bind:key="index2">
                <div class="name-time">
                    <p class="name">{{ ele.name === yonghu? '你':ele.name  }} 回复 {{ ele.replyman === yonghu? '你':ele.replyman }}</p>
                    <p class="time">{{ ele.time }}</p>
                    <p class="reply" @click="popReplyBox2(item,ele)">回复</p>
                </div>
                <p class="content">{{ ele.content }}</p>
            </div>
    </div>
    <el-pagination background layout="prev, pager, next" :total="totalCount" :page-size="pageSize"  :current-page="currentPage"  @current-change="handleCurrentChange">
</el-pagination>
    <replyTextarea v-bind:count="totalCount" v-bind:cookiename="yonghu" v-bind:list="commentList" v-on:parent-change="change" />
    <div class="shade-box" v-if="showme" @click="showme = false">
        <div class="pop-box">
            <textarea @click.stop="ddd" v-model="replycontent" class="reply-input" name="" id="" cols="30" rows="10" placeholder="回复内容"></textarea>
            <button class="reply-btn" @click="replyComment">提 交</button>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import replyTextarea from './reply-textarea'
import formatDate from '../utils/data.js'
export default {
    data(){
        return {
            commentList: [],
            currentPage: 1,
            pageSize:5,
            totalCount: 0,
            yonghu: '',
            replycontent: '',
            getContent: '',
            showme: false,
            getId: '',
            replyman: ''
        }
    },
    components: {
        replyTextarea
    },
    computed: {
    },
    methods: {
        getList(){                        //分页
            axios.get('/comment',{
                params: {
                    page: this.currentPage,
                    pageSize: this.pageSize
                }
            }).then(res=>{
                this.commentList = res.data
            }).catch(err=>{
                console.log(err)
            })
        }, 
        getTotal(){                                //获取评论总数
            axios.get('/comment').then((res)=>{
                this.totalCount = res.data.length
            })
        },
        handleCurrentChange(val){
            this.currentPage = val
            this.getList()
        },
        getYonghu(){
            var cookieArr = document.cookie.split('; ')
            var needCookie = cookieArr.filter(item=>{
                return item.indexOf('username') != -1
            })
            console.log(document.cookie)
            this.yonghu = needCookie[0].substring(9) || ''
        },
        change(item){
            if(this.commentList.length >= 5){
                this.commentList.pop()          //删除最后一个元素
                this.commentList.unshift(item)      //添加第一个元素到开头
            }else {
                this.commentList.unshift(item) 
            }
            this.getTotal()
        },
        popReplyBox(item){
            this.getId = item.id
            this.showme = true
            this.replyman = item.name
        },
        popReplyBox2(item,ele){
            this.getId = item.id
            this.showme = true
            this.replyman = ele.name
        },
        replyComment(){
            axios.post('/comment/reply',{
                name: this.yonghu,
                content: this.replycontent,
                time: formatDate(new Date()),
                id: this.getId,
                replyman: this.replyman
            }).then(res=>{
                console.log(res)
                this.getList()                   //回复评论后立即看到
            }).catch(err=>{
                console.log(err)
            })
            this.showme = false
        },
        ddd(){
            console.log('ok')
        },
        loginOut(){
            axios.get('/comment/loginout').then(res=>{
                this.$message({
                    message: res.data.result,
                    type: 'success'
                }); 
                this.$router.push('/login')
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    mounted(){
        this.getTotal()
        this.getList()
        this.getYonghu()
    }   
}
</script>


<style scoped>
.login-out {
    position: absolute;
    right:30px;
    top: 60px;
    font-weight: bold;
    color: #eb900f;
    cursor: pointer;
}

.shade-box{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.pop-box {
    position: absolute;
    left:50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 5px;
    background-color: #fff;
    width: 400px;
    height: 300px;
    box-sizing: border-box;
    padding: 20px;
}

.reply-input {
    width: 100%;
    border: solid 1px #ccc;
    border-radius: 4px;
    height: 200px;
    padding-left: 10px;
    line-height: 40px;
    box-sizing: border-box;
}

.reply-btn {
    width: 100%;
    height: 40px;
    background-color: #333;
    border-radius: 5px;
    border: none;
    color: #fff;
    line-height: 40px;
    margin-top: 10px;
}

.welcome {
    text-align: center;
    margin-bottom: 10px;
}

.big-title {
    font-size: 28px;
    color: #333;
    text-align: center;
    margin: 10px 0;
}

.comment-title {
    line-height: 40px;
    background-color: #333;
    color: #fff;
    padding-left: 10px;
}

.comment-list {
    display: flex;
    flex-direction: column;
    border-bottom: solid 1px #ccc;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 10px;
}

.name-time {
    display: flex;
    flex-direction: row;
    height: 30px;
    align-items: center;
    line-height: 30px;
}

.name {
    margin-right: 20px;
    font-weight: bold;
    font-size: 16px;
}

.time {
    font-weight: bold;
    font-size: 16px;
}

.reply {
    font-weight: bold;
    font-size: 14px; 
    color: #be9228;
    margin-left: auto;
    margin-right: 20px;
    cursor: pointer;
}

.content {
    line-height: 22px;
    font-size: 14px;
    color: #6d6d6d;
    margin-bottom: 10px;
}

.el-pagination {
    margin: 20px 0;
    text-align: center;
}

.pagination--small .el-pager li{
    font-size: 16px !important;
}

.op {
    border-top: solid 1px #ccc;
    border-bottom: none;
    padding-top: 0px;
}
</style>
