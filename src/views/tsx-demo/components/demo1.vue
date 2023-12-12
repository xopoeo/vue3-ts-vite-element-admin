<template>
  <User :userName="name" />
</template>

<script setup lang="tsx">
import { ref } from "vue"
const name = ref("User组件的参数")
const User = (props: { userName: string }) => {
  return <>{props.userName} --- 其他参数</>
}
</script>

<style></style>
