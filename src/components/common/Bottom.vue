<template>
<div>
    <el-col class="bottom" :span="20">

    </el-col>
    <span class="copyright">
        @copyright
    </span>
</div>
</template>

<script>
export default {
    name: "Bottom"
}
</script>

<style scoped>
.bottom{
    height: 40px;
    background-color: white;
    position: fixed;
    bottom: 0;
    right: 0;
}

.copyright{
    height: 40px;
    background-color: white;
    position: fixed;
    bottom: 0;

}
</style>