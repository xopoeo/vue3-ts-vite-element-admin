<script lang="ts" setup>
import { ref } from "vue"
import UploadComponent from "@/components/Upload/index.vue"
import { type FileRequestData } from "@/api/file/types"

defineOptions({ name: "Dictionary" })

const value = ref<FileRequestData[]>([])

const generateHTML = () => {
  return value.value
    .map((item) => {
      return `<p>${item.name} ---  ${item.url}</p>`
    })
    .join("")
}
</script>

<template>
  <div class="app-container">
    <el-card shadow="hover" header="上传组件">
      <h4>
        fileList:
        <span v-html="generateHTML()" style="font-weight: 400; color: cadetblue" />
      </h4>
      <upload-component v-model="value" />
    </el-card>
  </div>
</template>
