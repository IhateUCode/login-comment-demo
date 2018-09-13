<template>
    <p @click="gotoComment">前往登录中心</p>
</template>

<style scoped>
p {
    cursor: pointer;
    text-align: center;
    text-decoration: underline;
}
</style>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        gotoComment(){
            this.$router.push('/login')
        }
    }
}
</script>
