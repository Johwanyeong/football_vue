<template>
    <div>
        <el-container>
            <el-aside width="500px">
                <el-row class="tac">
                    <el-col :span="5">
                    <h5 class="mb-2">TeamList</h5>
                        <el-menu default-active="2" class="el-menu-vertical-demo" v-model="team" @open="handleOpen" @close="handleClose">
                            <el-menu-item index="2" v-for="(team,index) in teams" v-bind:key="index" :value="team.teamno" >
                                <el-icon><icon-menu /></el-icon>
                                    <span>
                                        <a @click="handelTeam(team.teamno)">{{team.teamname}}</a>
                                    </span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-main>
                <h3>선수 목록</h3>
                <!-- <input type="text" v-model="text" 
                    placeholder="검색" @keyup.enter="handleSearch" /> -->
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
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        async mounted(){
            //팀 목록 조회
            const url = "/REST/teamall";
            const headers = {"Content-Type":"application/json"}
            const response = await axios.get(url, {headers});
            console.log(response);
            this.teams = response.data.team;
        },
        methods:{

            //페이지 이동
            async handleCurrentChange(val){
                this.page = val;
                await this.handleSearch();
            },
            async handelPlayer() {
                const url = `/REST/bnoplayer?page=${this.page}&bno=${this.bno}`;
                const headers = {"Content-Type":"application/json"}
                const response = await axios.get(url, {headers});
                console.log(response);
                this.players = response.data.player;
 
                const url1 = `/REST/playercount` //전체 선수 숫자 조회 주소 입력
                const response1 = await axios.get(url1);
                console.log(response1);
                //전체 선수 수를 통해 페이지네이션 숫자 생성
                this.totalpage = Number(response1.data.count);
            },
            async nextPage(playerno) {
                this.$router.push({name: 'Player_One', query:{no:playerno}});
            },
            async handelTeam(teamno) {
                this.$router.push({name: 'TeamPlayerList', query:{no:teamno}});
            },
        },
        
        data(){
            return{
                teams : [],
                players : [],
                no: '',
                bno: this.$route.query.teamno,
                page : 1,
                totalpage : 0,
                text : ''
            }
        },
    }
</script>

<style scoped>

</style>