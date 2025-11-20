<script setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import * as api from "@/api";

const router = useRouter();
const route = useRoute()

onMounted(()=>{
  console.log("mounted")
})

</script>
<template>
  <h1>Hello World</h1>
</template>

<style lang="less" scoped>
h1{
  font-size: 14dvw;
}
</style>
