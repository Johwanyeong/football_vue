<template>
    <div>
        <h3>스카우트 목록</h3>
        <input type="hidden" v-model="text" 
            placeholder="검색" @keyup.enter="handleSearch" />
        <table border="1">
            <tr>
                <td>번호</td>
                <td>이름</td>
                <td>나이</td>
                <td>국적</td>
                <td>포지션</td>
                <td>몸 값</td>
                <td>삭제</td>
            </tr>
            <tr v-for="scoutlist in scoutlists" v-bind:key="scoutlist">
                <td>{{scoutlist.scoutno}}</td>
                <td><a href="#" @click="nextPage(scoutlist.player.playerno)">{{scoutlist.player.playername}}</a></td>
                <td>{{scoutlist.player.playerage}}</td>
                <td>{{scoutlist.player.playercountry}}</td>
                <td>{{scoutlist.player.playerposition}}</td>
                <td>{{scoutlist.player.playerprice}}</td>
                <td><el-button @click="handleDelete" type="danger">
                    <input type="hidden" v-model="sno" >{{scoutlist.scoutno}}</el-button></td>
            </tr>
        </table>
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
                const url = `/REST/mscout?page=${this.page}`;
                const headers = {"Content-Type":"application/json",
                    token : this.token}
                const response = await axios.get(url, {headers});
                // console.log(response);
                this.scoutlists = response.data.scoutlist;
 
                const url1 = `REST/scoutcount` //스카우트 숫자 조회 주소 입력
                const response1 = await axios.get(url1, {headers}); //userid를 찾기 위해 토큰 사용
                // console.log(response1);
                //스카우트 숫자를 통해 페이지네이션 숫자 생성
                this.totalpage = Number(response1.data.count);
            },
            async nextPage(playerno) {
                this.$router.push({name: 'Player_One', query:{no:playerno}});
            },
            async handleDelete(){
                const url = `/REST/scoutdelete?sno=${this.sno}`;
                const headers = {"Content-Type":"application/json",
                    token : this.token};
                const response = await axios.delete(url,{headers});
                console.log(response);
            }
        },
        async created(){
            await this.handleSearch();
        },
        data(){
            return{
                //세션 스토리지에서 토큰 읽기
                token : sessionStorage.getItem("TOKEN"),
                page : '',
                scoutlists : [],
                player: [],
                totalpage : '',
                text : '',

                sno : ''
            }
        }
    }
</script>

<style scoped>

</style>