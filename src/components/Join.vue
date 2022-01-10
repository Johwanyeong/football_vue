<template>
    <div>
        <h3>회원 가입</h3>
        아이디 <input type="text" v-model="userid" placeholder="아이디 입력"/>
        <input type="button" @click="handleCheck" value="중복 확인" /><br />
        비밀번호 <input type="password" v-model="userpw" placeholder="비밀번호 입력"/><br />
        이름 <input type="text" v-model="username" placeholder="이름 입력"/><br />
        <input type="button" @click="handleJoin" value="회원가입" />
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        methods:{
            async handleCheck() {
                const url = "/REST/member/check";
                const headers = {"Content-Type":"application/json"}
                const body = {
                    userid : this.userid
                }
                const response = await axios.post(url, body, {headers});
                console.log(response);
                if(response.data.check === 0){
                    alert("사용 가능한 아이디 입니다.")
                }
                else{
                    alert("이미 가입된 아이디 입니다.")
                }
            },
            async handleJoin(){
                // 유효성 검사
                if(this.userid.length === 0){
                    alert("아이디를 입력하세요.");
                }
                if(this.userpw.length === 0){
                    alert("비밀번호를 입력하세요.");
                }
                if(this.username.length === 0){
                    alert("이름을 입력하세요.");
                }
                const url = "/REST/member/join";
                const headers = {"Content-Type":"application/json"}
                const body = {
                    userid : this.userid,
                    userpw : this.userpw,
                    username : this.username
                }
                const response = await axios.post(url, body, {headers});
                console.log(response);
                if(response.data.check === 1){
                    alert("이미 가입된 아이디 입니다.")
                }
                else{
                    if(response.data.status === 200){
                    alert("회원 가입 되었습니다.");
                    this.$router.push({name:'Home'}); //성공 시 home으로 이동
                    }
                    else{
                        alert("회원 가입 실패했습니다.");
                    }
                }
            }
        },
        data(){
            return{
                userid : '',
                userpw : '',
                username : ''
            }
        }
    }
</script>

<style scoped>
</style>