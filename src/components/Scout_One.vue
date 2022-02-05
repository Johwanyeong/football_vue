<template>
    <div>
        {{sno}} <br />
        스카우트 번호 {{scout.scoutno}} <br />
        선수 이름 {{playername}} <br />
        선수 나이 {{playerage}} <br />
        선수 몸 값 {{playerprice}} <br />
        <hr />
        <el-button type="danger" @click="handleDelete" plain>목록 삭제</el-button>
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
            this.playername = response.data.scout.player.playername;
            this.playerage = response.data.scout.player.playerage;
            this.playerprice = response.data.scout.player.playerprice;
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
        },
        data(){
            return{
                //세션 스토리지에서 토큰 읽기
                token : sessionStorage.getItem("TOKEN"),
                sno : this.$route.query.sno,
                scout : '',
                playername : '',
                playerage : '',
                playerprice : ''
            }
        }
    }
</script>

<style scoped>

</style>