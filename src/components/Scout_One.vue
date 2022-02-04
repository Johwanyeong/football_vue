<template>
    <div>
        {{sno}} <br />
        스카우트 번호 {{scout.scoutno}} <br />
        선수 이름 {{scout.player.playername}} <br />
        선수 나이 {{scout.player.playerage}} <br />
        선수 몸 값 {{scout.player.playerprice}} <br />
            
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
            console.log(response);
            this.scout = response.data.scout;
        },
        methods:{
            async handleDelete(){
                const url = `/REST/scoutdelete?sno=${this.sno}`;
                const headers = {"Content-Type":"application/json",
                    token : this.token};
                const response = await axios.delete(url,{headers});
                console.log(response);
                this.$router.push({name:'Home'}); //성공 시 home으로 이동
            },
        },
        data(){
            return{
                //세션 스토리지에서 토큰 읽기
                token : sessionStorage.getItem("TOKEN"),
                sno : this.$route.query.sno,
                scout : ''
            }
        }
    }
</script>

<style scoped>

</style>