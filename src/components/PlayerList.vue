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
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        async created(){
            const url = "/REST/playerall";
            const headers = {"Content-Type":"application/json"}
            const response = await axios.get(url, {headers});
            console.log(response);
            this.players = response.data.player;
        },
        data(){
            return{
                players : []
            }
        }
    }
</script>

<style scoped>

</style>