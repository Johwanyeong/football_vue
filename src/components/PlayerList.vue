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
        <paging : totalpage="totalpage" @movePage="movePage" />
    </div>
</template>

<script>
    import axios from 'axios';
    import Paging from './Paging.vue';
    export default {
    components: { Paging },
        movePage(page) {
            this.fetchData(page)
        },
        async created(){
            const url = `/REST/playerall?page=${this.page}`;
            const headers = {"Content-Type":"application/json"}
            const response = await axios.get(url, {headers});
            console.log(response);
            this.players = response.data.player;
            this.totalpage = response.data.totalpage;
        },
        data(){
            return{
                players : [],
                page : 1,
                totalpage : null
            }
        }
    }
</script>

<style scoped>

</style>