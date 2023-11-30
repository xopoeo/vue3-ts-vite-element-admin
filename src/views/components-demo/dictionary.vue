<script lang="ts" setup>
import { ref } from "vue"
import Dictionary from "@/components/Dictionary/index.vue"

defineOptions({ name: "Dictionary" })

const value = ref<number | undefined>(undefined)
const optionsValue = ref<number | undefined>(undefined)

const value1 = ref<number | undefined>(undefined)
const optionsValue1 = ref<number | undefined>(undefined)
</script>

<template>
  <div class="app-container">
    <h4>本地获取: {{ value }}</h4>
    <h5>optionsValue :{{ optionsValue }}</h5>
    <el-col :span="8">
      <Dictionary v-model="value" v-model:options-value="optionsValue" key-code="sys-apply-review-status" />
    </el-col>

    <h4>接口获取: {{ value1 }}</h4>
    <h5>optionsValue :{{ optionsValue1 }}</h5>
    <el-col :span="8">
      <Dictionary v-model="value1" v-model:options-value="optionsValue1" dictId="1" :is-api="true" />
    </el-col>
  </div>
</template>
