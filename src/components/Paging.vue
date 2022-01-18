<template>
    <ul class="paging">
        <li v-for="(page, idx) in totalpage" :key="idx">{{page}}</li>
    </ul>
</template>

<script>
    export default {
        props : ["totalpage"],
        data() {
            return {};
        },
        methods : {
            movePage(page) {
                this.$emit("movePage", page);
            }
        }
    }
</script>

<style scoped>

</style>