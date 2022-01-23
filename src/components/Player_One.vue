<template>
    <div>
        <h3>선수 상세 페이지</h3>
        {{no}}
        <hr />
        <!-- <el-form ref="formRef" :model="form" label-width="120px"> -->
            <el-form-item label="사진">
                <img :src="`${playerimg}`" style="width: 100px; height: 100px" />
            </el-form-item>
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
        <!-- </el-form> -->
        <hr />

        <el-form-item label="내용">
            <el-input v-model="content" type="textarea" placeholder="리뷰 내용 입력" style="width: 300px;" ></el-input>
        </el-form-item>
        <el-form-item label="평점">
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
        </el-form-item>
        
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
                        console.log(response);
                        if(response.data.status === 200){
                            alert("리뷰 등록에 성공했습니다.");
                        }
                    }
                    else{
                        alert("로그인 후 이용 가능합니다.");
                        this.$router.push({name:'Login'}); // 로그인 화면으로 이동
                    }
                }
                
               
            }
        },
        data(){
            return {
                player : '',
                playerimg : '',
                no : this.$route.query.no,

                //세션 스토리지에서 토큰 읽기
                token : sessionStorage.getItem("TOKEN"),
                content : '',
                rating : 0

            }
        },
        async mounted(){
            await this.handleContent();
        }
        
    }
</script>

<style scoped>

</style>