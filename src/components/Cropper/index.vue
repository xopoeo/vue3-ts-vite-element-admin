<template>
  <div class="cropper-warp">
    <div class="cropper-warp-left">
      <img v-if="!isRefresh" :src="props.imgUrl" class="cropper-warp-left-img" />
    </div>
    <div class="cropper-warp-right">
      <div class="cropper-warp-right-title">预览</div>
      <div class="cropper-warp-right-item">
        <div class="cropper-warp-right-value">
          <img :src="afterImg" class="cropper-warp-right-value-img" />
        </div>
        <div class="cropper-warp-right-label">100 x 100</div>
      </div>
      <div class="cropper-warp-right-item">
        <div class="cropper-warp-right-value">
          <img :src="afterImg" class="cropper-warp-right-value-img cropper-size" />
        </div>
        <div class="cropper-warp-right-label">50 x 50</div>
      </div>
    </div>
  </div>
  <el-button-group v-show="props.imgUrl" class="cropper-button-group">
    <el-button type="primary" @click="chooseImage"> 更换图片 </el-button>
    <el-button type="primary" @click="zoomImage(0.2)"> 放大 </el-button>
    <el-button type="primary" @click="zoomImage(-0.2)"> 缩小 </el-button>
    <el-button type="primary" @click="rotateImage(90)"> 左转90° </el-button>
    <el-button type="primary" @click="rotateImage(-90)"> 右转90° </el-button>
  </el-button-group>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick, watch } from "vue"
import $utilsFun from "@/utils/tools/utilsFun"
import Cropper from "cropperjs"
import "cropperjs/dist/cropper.css"

const emit = defineEmits(["returnCropperImg", "chooseImage"])

const props = defineProps({
  imgUrl: {
    type: String,
    default: ""
  }
})

watch(
  () => props.imgUrl,
  async () => {
    isRefresh.value = true
    await nextTick()
    isRefresh.value = false
    await $utilsFun.delay(10)
    initCropper()
  }
)

// 裁剪后的图片
const afterImg = ref("")
// Cropper实例
const myCropper = ref()
// 是否刷新
const isRefresh = ref(false)

const initCropper = () => {
  let leftImg = <HTMLImageElement>document.querySelector(".cropper-warp-left-img")
  myCropper.value = new Cropper(leftImg, {
    viewMode: 1,
    dragMode: "none",
    initialAspectRatio: 1,
    aspectRatio: 1,
    background: false,
    autoCropArea: 0.6,
    zoomOnWheel: false,
    crop: () => {
      afterImg.value = myCropper.value.getCroppedCanvas().toDataURL("image/jpeg")
    }
  } as Cropper.Options)
}

onMounted(async () => {
  await nextTick()
  if (myCropper.value) {
    myCropper.value.destroy()
  }
  initCropper()
})

// 旋转
const rotateImage = (angle: number) => {
  myCropper.value.rotate(angle)
}
// 缩放
const zoomImage = (num: number) => {
  myCropper.value.zoom(num)
}
// 更换图片
const chooseImage = () => {
  emit("chooseImage")
}

const confirm = () => {
  emit("returnCropperImg", afterImg.value) // 把裁剪的图片返回到父组件
}

defineExpose({
  confirm
})
</script>

<style scoped lang="scss">
.cropper-warp {
  display: flex;
  .cropper-warp-left {
    position: relative;
    display: inline-block;
    height: 350px;
    flex: 1;
    background: var(--el-color-white);
    overflow: hidden;
    background-repeat: no-repeat;
    cursor: move;
    border-radius: var(--el-border-radius-base);
    .cropper-warp-left-img {
      width: 100%;
      height: 100%;
    }
  }
  .cropper-warp-right {
    width: 150px;
    height: 350px;
    .cropper-warp-right-title {
      text-align: center;
      height: 20px;
      line-height: 20px;
    }
    .cropper-warp-right-item {
      margin: 15px 0;
      .cropper-warp-right-value {
        display: flex;
        .cropper-warp-right-value-img {
          width: 100px;
          height: 100px;
          border-radius: var(--el-border-radius-circle);
          margin: auto;
        }
        .cropper-size {
          width: 50px;
          height: 50px;
        }
      }
      .cropper-warp-right-label {
        text-align: center;
        font-size: 12px;
        color: var(--el-text-color-primary);
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
.cropper-button-group {
  margin-top: 20px;
}
</style>
