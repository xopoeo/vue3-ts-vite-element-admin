<script lang="ts" setup>
import { ref } from "vue"
import { Plus } from "@element-plus/icons-vue"
import headCropper from "@/components/Cropper/index.vue"

defineOptions({ name: "Cropper" })

const visible = ref(false)
const imgUrl = ref("") // 要裁剪的图片
const base64 = ref("") // 裁剪后的图片

const clickUpload = () => {
  document.getElementById("imgReader")?.click()
}

const loadingImg = ($event: Event) => {
  const file = ($event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      imgUrl.value = e.target?.result as string
      visible.value = true
    }
  }
}

// 这里可以上传服务器 base64Data是裁剪后的base64
const returnCropperImg = (base64Data: string) => {
  base64.value = base64Data
}

const cropperRef = ref()
const submit = () => {
  cropperRef.value?.confirm()
  visible.value = false
}
</script>

<template>
  <div class="app-container">
    <el-card shadow="hover" header="裁剪组件">
      <input type="file" accept="image/*" id="imgReader" @change="loadingImg($event)" style="display: none" />

      <el-button :icon="Plus" @click="clickUpload"> 上传 </el-button>

      <el-alert v-show="base64" title="裁剪后" type="success" effect="dark" :closable="false" style="margin: 20px 0" />

      <el-image
        v-if="base64"
        style="width: 100px; height: 100px"
        :src="base64"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :preview-src-list="[base64]"
        :initial-index="0"
        fit="cover"
      />

      <el-dialog v-model="visible" title="Tips" width="50%">
        <head-cropper
          ref="cropperRef"
          v-if="visible"
          :imgUrl="imgUrl"
          @returnCropperImg="returnCropperImg"
          @chooseImage="clickUpload"
        />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="visible = false">Cancel</el-button>
            <el-button type="primary" @click="submit"> Confirm </el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>
