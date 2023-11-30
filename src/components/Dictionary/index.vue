<script lang="ts" setup>
import $dictionary from "@/config/dictionary"
import DictionaryApi from "@/api/dictionary"
import { useVModel } from "@vueuse/core"
import { ref, onBeforeMount } from "vue"

const props = defineProps({
  keyCode: {
    type: String,
    required: false
  },
  modelValue: {
    type: [Number, String],
    default: undefined
  },
  placeholder: {
    type: String,
    default: "请选择"
  },
  // 带全部的多为查询场景 不允许清除
  clearable: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  // 字典接口
  isApi: {
    type: Boolean,
    default: false
  },
  // 接口字典类型 例id
  dictId: {
    type: String,
    default: "1"
  }
})

const emits = defineEmits(["update:modelValue", "update:optionsValue"])

const selectedValue = useVModel(props, "modelValue", emits)

const options = ref<DictOptions[]>([])

onBeforeMount(async () => {
  if (props.isApi) {
    const res = await DictionaryApi.getDictData(props.dictId)
    options.value = res.data.map((item: DictOptions) => {
      return {
        value: Number(item.value),
        label: item.label
      }
    })
  } else {
    if (!$dictionary.hasKey(props.keyCode as string)) {
      throw new Error(`字典${props.keyCode}不存在`)
    }
    options.value = $dictionary.getValue(props.keyCode as string)
  }
  emits("update:optionsValue", options.value)
})
</script>

<template>
  <div>
    <el-select
      style="width: 100%"
      v-model="selectedValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="clearable"
    >
      <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value" />
    </el-select>
  </div>
</template>

<style scoped></style>

<!-- 使用 -->
/** import UploadComponent from "@/components/Upload/index.vue"
<!-- 本地获取 -->
<dictionary-component v-model="value" v-model:options-value="optionsValue" key-code="sys-company" />

<!-- 接口获取 -->
<dictionary-component v-model="value" v-model:options-value="optionsValue" dictId="1" :is-api="true" />
