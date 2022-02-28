<template>
    <div>
        <h3>{{team.teamname}} 선수 목록</h3>
        <input type="text" v-model="text" 
            placeholder="검색" @keyup.enter="handleSearch" />
        <table border="1">
            <tr>
                <td>이름</td>
                <td>나이</td>
                <td>국적</td>
                <td>포지션</td>
                <td>몸 값</td>
            </tr>
            <tr v-for="player in players" v-bind:key="player">
                <td><a href="#" @click="nextPage(player.playerno)">{{player.playername}}</a></td>
                <td>{{player.playerage}}</td>
                <td>{{player.playercountry}}</td>
                <td>{{player.playerposition}}</td>
                <td>{{player.playerprice}}</td>
            </tr>
        </table>
        <hr />
            <el-pagination 
                background layout="prev, pager, next" :total="totalpage"
                @current-change="handleCurrentChange">
            </el-pagination>
       
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        
        methods:{
             //페이지 이동
            async handleCurrentChange(val){
                this.page = val;
                await this.handleSearch();
            },
            async handleSearch() {
                const url = `/REST/bnoplayer?page=${this.page}&bno=${this.no}`;
                const headers = {"Content-Type":"application/json"}
                const response = await axios.get(url, {headers});
                console.log(response);
                this.players = response.data.player;
 
                const url1 = `/REST/teamplayercount?bno=${this.no}` //팀 별 선수 숫자 조회 주소 입력
                const response1 = await axios.get(url1);
                console.log(response1);
                //팀 별 선수 수를 통해 페이지네이션 숫자 생성
                this.totalpage = Number(response1.data.count);
            },
            async nextPage(playerno) {
                this.$router.push({name: 'Player_One', query:{no:playerno}});
            }
        },
        async created(){
            await this.handleSearch();
            //팀 정보
            const url2 = `/REST/teamone?bno=${this.no}`;
            const headers2 = {"Content-Type":"application/json"}
            const response = await axios.get(url2, {headers2});
            console.log(response);
            this.team = response.data.team;
        },
        data(){
            return{
                no: this.$route.query.no,
                page : 1,
                totalpage : 0,
                text : '',
                players : [],
                team : ''
            }
        }
       
    }
</script>

<style lang="scss" scoped>

</style>