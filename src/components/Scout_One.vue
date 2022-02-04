<template>
    <div>
        {{sno}} <br />
        <!-- <el-button @click="handleDelete()" type="danger">
            <input type="hidden" v-model="sno" >삭제</el-button> -->
            <a href="#" @click="handleDelete()">삭제</a>
        <el-button @click="handleContract()" type="danger">
            <input type="hidden" v-model="sno" >계약</el-button>       
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        methods:{
            async handleDelete(){
                const url = `/REST/scoutdelete?sno=${this.sno}`;
                const headers = {"Content-Type":"application/json",
                    token : this.token};
                const response = await axios.delete(url,{headers});
                console.log(response);
                this.$router.push({name:'Home'}); //성공 시 home으로 이동
            },
        },
        data(){
            return{
                sno : this.$route.query.sno,
            }
        }
    }
</script>

<style scoped>

</style>