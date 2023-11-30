<template>
  <el-upload
    class="custom-upload"
    :multiple="multiple"
    :show-file-list="showFileList"
    :drag="drag"
    v-model:file-list="fileList"
    :before-upload="handleBeforeUpload"
    :http-request="handleUpload"
    :on-remove="handleRemove"
    :on-preview="previewImg"
    :on-exceed="handleExceed"
    :limit="limit"
    ref="uploadRef"
  >
    <div class="flex-h-center" v-show="drag">
      <el-icon :size="22" color="#2F3133">
        <Plus />
      </el-icon>
      <div class="el-upload__text">{{ dragText }}</div>
    </div>
  </el-upload>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import $utilsFun from "@/utils/tools/utilsFun"
import type { UploadInstance } from "element-plus"
import { uploadFileApi } from "@/api/file/index"
import { type FileRequestData } from "@/api/file/types"
import { UploadRawFile, UploadRequestOptions, UploadUserFile, UploadFile, UploadProps, ElMessage } from "element-plus"

const emit = defineEmits(["update:modelValue"])
const uploadRef = ref<UploadInstance>()

const props = defineProps({
  /**
   * 文件路径集合
   */
  modelValue: {
    type: Array<FileRequestData>,
    default: [] as Array<FileRequestData>
  },
  /**
   * 文件上传数量限制
   */
  limit: {
    type: Number,
    default: 10
  },
  /**
   * 文件上传大小限制
   */
  fileSize: {
    type: Number,
    default: 5 * 1024 * 1024
  },
  /**
   * 文件上传类型限制 image/file/all
   */
  accept: {
    type: String,
    default: "image"
  },
  // 拖拽文字提示
  dragText: {
    type: String,
    default: "请将图片/文件拖入此框"
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: true
  },
  // 是否可拖拽
  drag: {
    type: Boolean,
    default: true
  },
  // 是否显示文件列表
  showFileList: {
    type: Boolean,
    default: true
  }
})

const FileType = ref(["pdf"])
const ImageType = ref(["jpg", "jpeg", "png", "gif"])
const AllType = ref([...FileType.value, ...ImageType.value])

const fileList = ref([] as UploadUserFile[])
watch(
  () => props.modelValue,
  (newVal: FileRequestData[]) => {
    fileList.value = newVal
      .filter((file) => file.url) // fileList默认值是本地文件对象 这里过滤一下
      .map((file: FileRequestData) => {
        return { url: file.url, name: file.name } as UploadUserFile
      })
  },
  { immediate: true }
)

/**
 * 自定义图片上传
 * @param params
 */
async function handleUpload(options: UploadRequestOptions): Promise<any> {
  $utilsFun.showFullLoading()
  const { data: fileInfo } = await uploadFileApi(options.file)

  // console.log(fileInfo.rows[0])

  fileList.value.push({
    name: `图片${$utilsFun.createRandomFileName()}`,
    url: fileInfo.rows[0].url
  } as UploadUserFile)

  $utilsFun.closeFullLoading()

  emit(
    "update:modelValue",
    fileList.value.filter((file) => file.url).map(({ url, name }) => ({ url, name }))
  )
}

/**
 * 删除图片
 */
function handleRemove(removeFile: UploadFile) {
  const filePath = removeFile.url

  if (filePath) {
    emit(
      "update:modelValue",
      fileList.value.filter((file) => file.url).map(({ url, name }) => ({ url, name }))
    )
  }
}

/**
 * 限制用户上传文件的格式和大小和数量
 */
function handleBeforeUpload(file: UploadRawFile) {
  const fileName = file.name.split(".")
  const fileExt = fileName[fileName.length - 1]
  let acceptedTypes: string[] = []

  if (props.accept === "all") {
    acceptedTypes = AllType.value
  } else {
    acceptedTypes = props.accept === "image" ? ImageType.value : FileType.value
  }

  const isTypeOK = acceptedTypes.some((type) => type.indexOf(fileExt) >= 0)

  if (!isTypeOK) {
    ElMessage.warning(`文件格式不正确, 请上传${acceptedTypes.join("/")}格式文件!`)
    return false
  }

  if (file.size > props.fileSize) {
    ElMessage.warning(`上传图片不能大于${props.fileSize / 1024 / 1024}M`)
    return false
  }
  return true
}

const handleExceed = () => {
  ElMessage.warning(`最多上传${props.limit}个文件`)
}

/**
 * 预览文件
 */
const previewImg: UploadProps["onPreview"] = (uploadFile) => {
  window.open(uploadFile.url, "_blank")
}
</script>

<style lang="scss" scope></style>

<!-- 使用 -->
/** import UploadComponent from "@/components/Upload/index.vue"
<upload-component accept="file" />
// 文件
<upload-component accept="image" />
// 图片 */
