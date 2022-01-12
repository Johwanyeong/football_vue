<template>
    <div>
        <h3>팀 등록</h3>
        팀 명 <input type="text" v-model="teamname" placeholder="팀 명 입력"/> <br />
        <input type="button" @click="handelTeam" value="팀 등록" />
        <hr />

        <h3>에이전트 등록</h3>
        에이전트 명 <input type="text" v-model="agentname" placeholder="에이전트 명 입력"/> <br />
        <input type="button" @click="handelAgent" value="에이전트 등록" />
        <hr />

        <!-- <h3>선수 등록</h3>
        이름 <input type="text" v-model="playername" placeholder="이름 입력"/> <br />
        나이 <input type="text" v-model="playerage" placeholder="나이 입력"/> 세 <br />
        신장 <input type="text" v-model="playerheight" placeholder="신장 입력"/> cm<br />
        몸무게 <input type="text" v-model="playerweight" placeholder="몸무게 입력"/> kg <br />
        포지션 <input type="text" v-model="playerposition" placeholder="포지션 입력"/> <br />
        나라 <input type="text" v-model="playercountry" placeholder="나라 입력"/> <br />
        몸값 <input type="text" v-model="playerprice" placeholder="몸값 입력"/> \<br />
        사진 <input type="file" @change="handleFile" /> <br />
        소속 팀 <input type="text" v-model="team" placeholder="몸값 입력"/> <br />
        에이전트 <input type="text" v-model="agent" placeholder="몸값 입력"/> <br />
        <hr /> -->

    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        methods:{
            async handelTeam(){
                //유효성 검사
                if(this.teamname.length === 0){
                    alert("팀 명을 입력하세요.");
                }
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
            },
            async handelAgent(){
                //유효성 검사
                if(this.agentname.length === 0){
                    alert("에이전트 명을 입력하세요.");
                }
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
            },
        },
        data(){
            return{
                //세션 스토리지에서 토큰 읽기
                token : sessionStorage.getItem("TOKEN"),

                teamname : '',

                agentname : '',
            }
        }
    }
</script>

<style scoped>

</style>