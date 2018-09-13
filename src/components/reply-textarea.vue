<template>
<div>
    <p class="comment-title">发言区</p>
    <textarea class="comment-conntent" name="" id="" cols="30" rows="10" placeholder="请输入评论内容" v-model="contentMessage"></textarea>
    <button class="comment-submit" @click="submitContent">提 交</button>
</div>
</template>

<script>
import axios from 'axios'
import formatDate from '../utils/data.js'
export default {
    data(){
        return {
            contentMessage: ''
        }
    },
    props: ['cookiename','list','count'],
    methods: {
        submitContent(){
            var anotherCount = this.count
            axios.post('/comment/add',{
                user: this.cookiename,
                content: this.contentMessage,
                time: formatDate(new Date()),
                id: anotherCount ++
            }).then(res=>{
                console.log(res)
                this.$emit('parent-change',{
                    name: this.cookiename,
                    content: this.contentMessage,
                    time: formatDate(new Date())
                })
                this.contentMessage = ''
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>


<style scoped>
.comment-title {
    line-height: 40px;
    background-color: #333;
    color: #fff;
    padding-left: 10px;
}

.comment-conntent {
    width: 100%;
    height: 60px;
    border-radius: 5px;
    border: solid 1px #ccc;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px;
    box-sizing: border-box;
}

.comment-submit {
    height: 40px;
    border-radius: 5px;
    background-color: #333;
    color: #fff;
    width: 100%;
    border: none;
    font-size: 16px;
    cursor: pointer;
}

</style>
