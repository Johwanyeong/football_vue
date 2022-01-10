<template>
    <div>
    </div>
</template>

<script>
    export default {
        async created() {
            const result = confirm("로그아웃 하시겠습니까?"); 
            console.log(result)
            if(result) {
                sessionStorage.removeItem("TOKEN");
                this.$router.push({name:'Home'}); //성공 시 home으로 이동
            }
            this.$router.push({name:'Home'}); // home으로 이동
        }
    }
</script>

<style scoped>

</style>