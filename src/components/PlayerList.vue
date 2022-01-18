<template>
    <div>
        <h3>선수 목록</h3>
        <table border="1">
            <tr>
                <td>이름</td>
                <td>나이</td>
                <td>국적</td>
                <td>포지션</td>
                <td>몸 값</td>
            </tr>
            <tr v-for="player in players" v-bind:key="player">
                <td>{{player.playername}}</td>
                <td>{{player.playerage}}</td>
                <td>{{player.playercountry}}</td>
                <td>{{player.playerposition}}</td>
                <td>{{player.playerprice}}</td>
            </tr>
        </table>
        <hr />
        <div class="block">
            <span class="demonstration">When you have few pages</span>
            <el-pagination layout="prev, pager, next" :total="totalpage"
            @current-change="handleCurrentChange"></el-pagination>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        async created(){
            const url = `/REST/playerall?page=${this.page}`;
            const headers = {"Content-Type":"application/json"}
            const response = await axios.get(url, {headers});
            console.log(response);
            this.players = response.data.player;
            this.totalpage = response.data.totalpage;
        },
        methods:{
             //페이지 이동
            async handleCurrentChange(val){
                this.page = val;
                await this.created();
            }
        },
       
        data(){
            return{
                players : [],
                page : 1,
                totalpage : 20,
                pages : 100
            }
        }
    }
</script>

<style >

</style>