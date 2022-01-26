<template>
    <div>
        <h3>선수 상세 페이지</h3>
        {{no}}
            <el-container>
            <el-aside width="200px">
                Aside
                <img :src="`${playerimg}`" style="width: 200px; height: 200px" />
            </el-aside>
            <el-main>
                Main
            <el-form-item label="이름">
                {{player.playername}}
            </el-form-item>
            <el-form-item label="나이">
                {{player.playerage}} 세
            </el-form-item>
            <el-form-item label="신장">
                {{player.playerheight}} cm
            </el-form-item>
            <el-form-item label="몸무게">
                {{player.playerweight}} kg
            </el-form-item>
            <el-form-item label="포지션">
                {{player.playerposition}}
            </el-form-item>
            <el-form-item label="국적">
                {{player.playercountry}}
            </el-form-item>
            <el-form-item label="몸 값">
                {{player.playerprice}} \
            </el-form-item>
            <el-form-item label="소속 팀">
                {{teamname}}
            </el-form-item>
            <el-form-item label="에이전트">
                {{agentname}}
            </el-form-item>
            </el-main>
            </el-container>
        <hr />
        <el-button type="primary" @click="handleScout" plain>스카우트</el-button>
        <hr />
        <input type="hidden" v-model="text" 
            placeholder="검색" @keyup.enter="handleSearch" />
        <table border="1">
            <tr>
                <td>리뷰</td>
                <td>평점</td>
            </tr>
            <tr v-for="review in reviews" v-bind:key="review">
                <td>{{review.content}}</td>
                <td>{{review.rating}}/10</td>
            </tr>
        </table>
        <el-pagination 
                background layout="prev, pager, next" :total="totalpage"
                @current-change="handleCurrentChange">
            </el-pagination>
        <hr />
            <span class="ml-3 w-35 text-gray-600 inline-flex items-center">내용</span>
                <el-input v-model="content" type="textarea" placeholder="리뷰 내용 입력" style="width: 300px;" ></el-input>
            <br />
            <span class="ml-3 w-35 text-gray-600 inline-flex items-center">평점</span>
                <select v-model="rating" >
                    <option value=1>1</option>
                    <option value=2>2</option>
                    <option value=3>3</option>
                    <option value=4>4</option>
                    <option value=5>5</option>
                    <option value=6>6</option>
                    <option value=7>7</option>
                    <option value=8>8</option>
                    <option value=9>9</option>
                    <option value=10>10</option> 
                </select>
            <br />
        <el-button type="primary" @click="handleReview" plain>리뷰 등록</el-button>

    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        methods: {
            async handleContent(){
                const url = `/REST/playerone?no=${this.no}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.get(url, headers);
                console.log(response);
                this.player = response.data.player;
                this.playerimg = response.data.playerimg;
                this.teamname = response.data.teamname;
                this.agentname = response.data.agentname;
            },
            async handleReview() {
                //유효성 검사
                if(this.content.length === 0){
                    alert("리뷰 내용을 입력하세요.");
                }
                else{
                    const url = `/REST/reviewinsert?pno=${this.no}`;
                    const headers = {"Content-Type":"application/json",
                    token : this.token};
                     const body = {content : this.content, rating : this.rating};
                    if(this.token != null){
                        const response = await axios.post(url,body,{headers});
                        // console.log(response);
                        if(response.data.status === 200){
                            alert("리뷰 등록에 성공했습니다.");
                        }
                    }
                    else{
                        alert("로그인 후 이용 가능합니다.");
                        this.$router.push({name:'Login'}); // 로그인 화면으로 이동
                    }
                }
            },
            //리뷰 목록
            //페이지 이동
            async handleCurrentChange(val){
                this.page = val;
                await this.handleSearch();
            },
            async handleSearch() {
                const url = `/REST/pnoreview?page=1&pno=${this.no}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.get(url,{headers});
                // console.log(response);
                this.reviews = response.data.review;
 
                const url1 = `/REST/pnoreviewcount?pno=${this.no}` //선수 별 리뷰 숫자 조회 주소 입력
                const response1 = await axios.get(url1);
                // console.log(response1);
                //선수 별 리뷰 숫자를 통해 페이지네이션 숫자 생성
                this.totalpage = Number(response1.data.count);
            },
            //스카우트 목록 추가
            async handleScout(){
                const url = `/REST/scoutinsert`;
                const headers = {"Content-Type":"application/json",
                    token : this.token};
                const body = {player : this.player};
                if(this.token != null){
                    const response = await axios.post(url,body,{headers});
                    console.log(response);
                    if(response.data.status === 200){
                        alert("스카우트 목록에 추가하였습니다.");
                    }
                    else if(response.data.status === "선수 중복"){
                        alert("이미 스카우트 목록에 추가된 선수입니다.");
                    }
                }
                else{
                    alert("로그인 후 이용 가능합니다.");
                    this.$router.push({name:'Login'}); // 로그인 화면으로 이동
                }
            }
        },
        async created(){
            await this.handleSearch();
        },
        data(){
            return {
                //선수 정보
                player : '',
                playerimg : '',
                teamname : '',
                agentname : '',
                no : this.$route.query.no,

                //리뷰 목록
                reviews : [],
                page : 1,
                totalpage : 0,
                text : '',

                //리뷰 등록
                //세션 스토리지에서 토큰 읽기
                token : sessionStorage.getItem("TOKEN"),
                content : '',
                rating : 0,

            }
        },
        async mounted(){
            await this.handleContent();
        }
        
    }
</script>

<style scoped>

</style>