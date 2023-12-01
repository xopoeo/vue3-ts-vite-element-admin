<script lang="ts" setup>
import { ref } from "vue"
import printJs from "print-js"

defineOptions({ name: "Print" })

const printRef = ref()

const onPrintJsHtml = () => {
  printJs({
    printable: printRef.value,
    type: "html",
    css: ["//at.alicdn.com/t/c/font_2298093_rnp72ifj3ba.css", "//unpkg.com/element-plus/dist/index.css"],
    scanStyles: false,
    style: `@media print{.m-b-15{margin-bottom:15px;}}`,
    showModal: true,
    modalMessage: "正在生成打印文件，请稍等..."
  })
}

const onPrintJs = () => {
  printJs({
    printable: ["https://lh3.googleusercontent.com/ogw/AKPQZvxSFZ55zcyhVb4iUuB2dyqXXs15Z-hRoA-_YY88=s32-c-mo"],
    type: "image",
    header: null,
    imageStyle: `display: block;margin: 0 auto;page-break-after: always;max-width:100%`
  })
}
</script>

<template>
  <div class="app-container" ref="printRef">
    <el-card shadow="hover" header="打印">
      <el-alert title="请在打印弹窗 `更多设置` 中开启 `背景图形。`" type="success" :closable="false" class="m-b-15" />
      <el-button @click="onPrintJsHtml" type="primary" class="m-b-15"> 打印页面 </el-button>
      <el-button @click="onPrintJs" type="primary" class="m-b-15"> 打印图片/pdf </el-button>
    </el-card>
  </div>
</template>

<style scoped>
.m-b-15 {
  margin-bottom: 15px;
}
</style>
