<template>
    <div>
        {{sno}} <br />
        스카우트 번호 {{scout.scoutno}} <br />
        선수 이름  <input type="text" v-model="player.playername" readonly>  <br />
        선수 나이 <input type="text" v-model="player.playerage" readonly>세 <br />
        선수 몸 값 <input type="text" v-model="player.playerprice" >\ <br />
        선수 신장 <input type="text" v-model="player.playerheight" readonly>cm <br />
        선수 몸무게 <input type="text" v-model="player.playerweight" readonly>kg <br />
        선수 포지션 <input type="text" v-model="player.playerposition" readonly> <br />
        선수 국적 <input type="text" v-model="player.playercountry" readonly> <br />
        선수 소속 팀 <select  v-model="team">
                            <option value="undefined">소속 팀 선택</option>
                            <option v-for="(team, index) in teams" v-bind:key="index" :value="team.teamno">
                                {{team.teamname}}
                            </option>
                        </select> <br />
        선수 에이전트 <input type="text" v-model="agent.agentname" readonly> <br />
        <hr />
        <el-button type="danger" @click="handleDelete" plain>목록 삭제</el-button>
        <el-button type="primary" @click="handleContract" plain>계약하기</el-button>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        async created(){
            const url = `/REST/scoutone?sno=${this.sno}`;
            const headers = {"Content-Type":"application/json",
                    token : this.token};
            const response = await axios.get(url,{headers});
            // console.log(response);
            this.scout = response.data.scout;
            this.player = response.data.scout.player;
            this.agent = response.data.scout.player.agent;

            //팀 목록 조회
            const url2 = "/REST/teamall";
            const response2 = await axios.get(url2, {headers});
            // console.log(response2);
            this.teams = response2.data.team;
        },
        methods:{
            async handleDelete(){
                    const result = confirm("스카우트 목록에서 삭제하시겠습니까?");
                    console.log(result);
                    if(result){
                        const url = `/REST/scoutdelete?sno=${this.sno}`;
                        const headers = {"Content-Type":"application/json",
                            token : this.token};
                        const response = await axios.delete(url,{headers});
                        console.log(response);
                        alert("삭제되었습니다.");
                        this.$router.push({name:'ScoutList'}); //성공 시 ScoutList로 이동
                    }
                    else{
                        alert("취소되었습니다.");
                    }
            },
            async handleContract(){
                const url = `/REST/contractinsert`;
                const headers = {"Content-Type":"application/json",
                            token : this.token};
                const body = {scout : this.scout}
                const response = await axios.post(url,body,{headers});
                console.log(response);
                // this.$router.push({name:'ScoutList'}); //성공 시 ScoutList로 이동
            }
        },
        data(){
            return{
                //세션 스토리지에서 토큰 읽기
                token : sessionStorage.getItem("TOKEN"),
                sno : this.$route.query.sno,
                scout : '',
                player : '',
                team : '',
                agent : '',
                teams : []
            }
        }
    }
</script>

<style scoped>

</style>