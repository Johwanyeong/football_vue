<template>
    <div>
        <h3>팀 등록</h3>
        팀 명 <input type="text" v-model="teamname" placeholder="팀 명 입력"/> <br />
        <input type="button" @click="handleTeam" value="팀 등록" />
        <hr />

        <h3>에이전트 등록</h3>
        에이전트 명 <input type="text" v-model="agentname" placeholder="에이전트 명 입력"/> <br />
        <input type="button" @click="handleAgent" value="에이전트 등록" />
        <hr />

        <h3>선수 등록</h3>
        이름 <input type="text" v-model="playername" placeholder="이름 입력"/> <br />
        나이 <input type="text" v-model="playerage" placeholder="나이 입력"/> 세 <br />
        신장 <input type="text" v-model="playerheight" placeholder="신장 입력"/> cm<br />
        몸무게 <input type="text" v-model="playerweight" placeholder="몸무게 입력"/> kg <br />
        포지션 <select v-model="playerposition" >
                        <option value="FWD">FWD</option>
                        <option value="MD">MD</option>
                        <option value="DF">DF</option> 
                    </select> <br />
        나라 <input type="text" v-model="playercountry" placeholder="나라 입력"/> <br />
        몸값 <input type="text" v-model="playerprice" placeholder="몸값 입력"/> \<br />
        사진 <input type="file" @change="handleFile" /> <br />
        소속 팀  <select  v-model="team">
                        <option value="undefined">선택안함</option>
                        <option v-for="(team, index) in teams" v-bind:key="index" :value="team.teamno">
                            {{team.teamname}}
                        </option>
                    </select> <br />
        에이전트 <select  v-model="agent">
                        <option value="undefined">선택안함</option>
                        <option v-for="(agent, index) in agents" v-bind:key="index" :value="agent.agentno">
                            {{agent.agentname}}
                        </option>
                    </select> <br />
        <input type="button" @click="handlePlayer" value="선수 등록" />
        <hr />

    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        methods:{
            async handleTeam(){
                //유효성 검사
                if(this.teamname.length === 0){
                    alert("팀 명을 입력하세요.");
                }
                else{
                    const url = "/REST/admin/teaminsert";
                    const headers = {"Content-Type":"application/json",
                    token : this.token}
                    const body = [{teamname :this.teamname}]
                    if(this.token != null){
                        const response = await axios.post(url, body, {headers});
                        console.log(response);
                        if(response.data.status === 200){
                            alert("팀 등록에 성공했습니다.");
                        }
                    }
                    else{
                        alert("관리자 id로 로그인 후 등록 가능합니다.")
                    }
                }
                
            },
            async handleAgent(){
                //유효성 검사
                if(this.agentname.length === 0){
                    alert("에이전트 명을 입력하세요.");
                }
                else{
                    const url = "/REST/admin/agentinsert";
                    const headers = {"Content-Type":"application/json",
                    token : this.token}
                    const body = [{agentname :this.agentname}]
                    if(this.token != null){
                        const response = await axios.post(url, body, {headers});
                        console.log(response);
                        if(response.data.status === 200){
                            alert("에이전트 등록에 성공했습니다.");
                        }
                    }
                    else{
                        alert("관리자 id로 로그인 후 등록 가능합니다.")
                    }
                }
            },
            handleFile(e){  //사진 등록
                this.file = e.target.files[0];
            },
            async handlePlayer(){
                //유효성 검사
                if(this.playername.length === 0){
                    alert("이름을 입력하세요.");
                }
                else if(this.playerage.length === 0){
                    alert("나이를 입력하세요.");
                }
                else if(this.playerheight.length === 0){
                    alert("신장을 입력하세요.");
                }
                else if(this.playerweight.length === 0){
                    alert("몸무게를 입력하세요.");
                }
                else if(this.playerposition.length === 0){
                    alert("포지션을 입력하세요.");
                }
                else if(this.playercountry.length === 0){
                    alert("나라를 입력하세요.");
                }
                else if(this.playerprice.length === 0){
                    alert("몸 값을 입력하세요.");
                }
                else if(this.file === null){
                    alert("사진을 등록하세요.");
                }
                else if(this.team.length === 0){
                    alert("소속 팀을 입력하세요.");
                }
                else if(this.agent.length === 0){
                    alert("에이전트를 입력하세요.");
                }
                else{
                    const url = "/REST/admin/playerinsert";
                    const headers = {"Content-Type":"application/json",
                    token : this.token}
                    const body = new FormData();
                        body.append("playername", this.playername);
                        body.append("playerage", this.playerage);
                        body.append("playerheight", this.playerheight);
                        body.append("playerweight", this.playerweight);
                        body.append("playerposition", this.playerposition);
                        body.append("playercountry", this.playercountry);
                        body.append("playerprice", this.playerprice);
                        body.append("file", this.file); //백엔드에서 등록할 때의 requestparam 값과 맞춤
                        body.append("team", this.team);
                        body.append("agent", this.agent);
                    if(this.token != null){
                        const response = await axios.post(url, body, {headers});
                        console.log(response);
                        if(response.data.status === 200){
                            alert("선수 등록에 성공했습니다.");
                        }
                    }
                    else{
                        alert("관리자 id로 로그인 후 등록 가능합니다.")
                    }
                }
            }
        },
        async created(){    
            //팀 목록 조회
            const url = "/REST/teamall";
            const headers = {"Content-Type":"application/json"}
            const response = await axios.get(url, {headers});
            console.log(response);
            this.teams = response.data.team;
            //에이전트 목록 조회
            const url1 = "/REST/agentall";
            // const headers = {"Content-Type":"application/json"}
            const response1 = await axios.get(url1, {headers});
            console.log(response1);
            this.agents = response1.data.agent;
        },
        data(){
            return{
                //세션 스토리지에서 토큰 읽기
                token : sessionStorage.getItem("TOKEN"),

                teamname : '',

                agentname : '',

                playername : '',
                playerage : '',
                playerheight : '',
                playerweight : '',
                playerposition : '',
                playercountry : '',
                playerprice : '',
                file : '',
                team : '',
                agent : '',
                agents : [],
                teams : []
            }
        }
    }
</script>

<style scoped>

</style>