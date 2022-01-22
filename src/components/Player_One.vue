<template>
    <div>
        <h3>선수 상세 페이지</h3>
        {{no}}
        <hr />
        <el-form ref="formRef" :model="form" label-width="120px">
            <el-form-item label="사진">
                <img :src="`${playerimg}`" style="width: 100px; height: 100px" />
            </el-form-item>
            <el-form-item label="이름">
                {{player.playername}}
            </el-form-item>
            <el-form-item label="나이">
                {{player.playername}}
            </el-form-item>
            <el-form-item label="신장">
                {{player.playerheight}}
            </el-form-item>
            <el-form-item label="몸무게">
                {{player.playerweight}}
            </el-form-item>
            <el-form-item label="포지션">
                {{player.playerposition}}
            </el-form-item>
            <el-form-item label="국적">
                {{player.playercountry}}
            </el-form-item>
            <el-form-item label="몸 값">
                {{player.playerprice}}
            </el-form-item>
        </el-form>

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
            }
        },
        data(){
            return {
                player : '',
                playerimg : '',
                no : this.$route.query.no
            }
        },
        async mounted(){
            await this.handleContent();
        }
        
    }
</script>

<style scoped>

</style>