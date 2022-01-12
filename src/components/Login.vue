<template>
    <div>
        <h3>로그인</h3>
        아이디 <input type="text" v-model="userid" placeholder="아이디 입력"/><br />
        비밀번호 <input type="password" v-model="userpw" placeholder="비밀번호 입력"/><br />
        <input type="button" @click="handleLogin" value="로그인" />
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        methods:{
            async handleLogin(){
                // 유효성 검사
                if(this.userid.length === 0){
                    alert("아이디를 입력하세요.");
                }
                if(this.userpw.length === 0){
                    alert("비밀번호를 입력하세요.");
                }
                const url = "/REST/member/login";
                const headers = {"Content-Type":"application/json"}
                const body = {
                    userid : this.userid,
                    userpw : this.userpw
                }
                const response = await axios.post(url, body, {headers});
                console.log(response);
               if(response.data.result === 200){
                   sessionStorage.setItem("TOKEN", response.data.token); //토큰 저장
                   sessionStorage.setItem("ROLE", response.data.role); // role 저장 
                   alert("로그인 되었습니다.");
                   this.$router.push({name:'Home'}); //성공 시 home으로 이동
               }
               else{
                   alert("로그인 실패했습니다.");
               }
            }

        },
        data(){
            return{
                userid : '',
                userpw : ''
            }
        }
    }
</script>

<style scoped>
</style>