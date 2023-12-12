<template>
  <div class="app-container">
    <el-card shadow="hover" header="书写函数式组件，在本页面内使用。但它不会将连字符属性转换为小驼峰写法 请注意">
      <demo1 />
    </el-card>

    <hr />

    <el-card shadow="hover" header="tsx 文件中函数式组件">
      <demo2 title="字符串测试" />
    </el-card>

    <el-card shadow="hover" header="tsx表格">
      <about />
    </el-card>
  </div>
</template>

<script setup lang="tsx">
import demo1 from "./components/demo1.vue"
import demo2 from "./components/demo2"
import about from "./components/about"
</script>

<style></style>
